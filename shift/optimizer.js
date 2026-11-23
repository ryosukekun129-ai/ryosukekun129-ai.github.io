"use strict";
/*
 * 休憩自動最適化エンジン (シフト管理アプリ)
 * 既存ルール (2026-11 確定分) をそのまま制約として使う:
 *  - 休憩は 9:30〜21:00 の間のみ
 *  - 休憩中も売場に最低2人 (休憩は3人以上いる時間帯のみ)
 *  - 休憩の重なりは禁止。例外: 園田恵さんのみ他の1名と重なってよい (同時休憩は最大2人まで)
 *  - 休憩は本人の勤務時間内。長さと回数は変更しない
 *  - 同じ従業員の休憩同士は重ならない
 * 最適化の優先順位: 移動する従業員数を最小化 → 移動時間の合計を最小化 → 決定的タイ決着
 * 候補位置は30分グリッド + 現在位置 (既存データの精度は丸めない)
 */
(function (global) {
  const WIN_START = 9 * 60 + 30; // 9:30
  const WIN_END = 21 * 60;       // 21:00
  const STEP = 30;

  function overlaps(aS, aE, bS, bE) { return aS < bE && bS < aE; }

  // intervals: [{empId,start,end}] / staff: [{id,start,end}]
  // 制約チェック: 重なり例外・同時人数・売場最低2人
  function feasible(staff, intervals, exceptionEmpId) {
    const byId = {};
    for (const s of staff) byId[s.id] = s;
    for (const b of intervals) {
      const st = byId[b.empId];
      if (!st) return false;
      if (b.start < st.start || b.end > st.end) return false;      // 勤務時間内
      if (b.start < WIN_START || b.end > WIN_END) return false;    // 9:30〜21:00
    }
    // 同一従業員の重なり禁止 + ペア重なりは例外者のみ
    for (let i = 0; i < intervals.length; i++) {
      for (let j = i + 1; j < intervals.length; j++) {
        const a = intervals[i], b = intervals[j];
        if (!overlaps(a.start, a.end, b.start, b.end)) continue;
        if (a.empId === b.empId) return false;
        if (a.empId !== exceptionEmpId && b.empId !== exceptionEmpId) return false;
      }
    }
    // 掃引: 同時休憩は最大2人 (2人の場合は例外者を含む) かつ 売場に最低2人
    const pts = new Set();
    for (const s of staff) { pts.add(s.start); pts.add(s.end); }
    for (const b of intervals) { pts.add(b.start); pts.add(b.end); }
    const sorted = [...pts].sort((x, y) => x - y);
    for (let k = 0; k + 1 < sorted.length; k++) {
      const t = sorted[k];
      if (t < WIN_START || t >= WIN_END) continue;
      const present = staff.filter(s => s.start <= t && t < s.end);
      if (present.length === 0) continue;
      const onBreak = intervals.filter(b => b.start <= t && t < b.end);
      if (onBreak.length > 2) return false;
      if (onBreak.length === 2 && !onBreak.some(b => b.empId === exceptionEmpId)) return false;
      if (present.length - onBreak.length < 2) return false;
    }
    return true;
  }

  function candidatesFor(staffMember, len, currentStart) {
    const lo = Math.max(staffMember.start, WIN_START);
    const hi = Math.min(staffMember.end, WIN_END) - len;
    const set = new Set();
    // 30分グリッド (:00 / :30 起点)
    const first = Math.ceil(lo / STEP) * STEP;
    for (let t = first; t <= hi; t += STEP) set.add(t);
    if (currentStart >= lo && currentStart <= hi) set.add(currentStart); // 現在位置は精度そのまま
    // 並び: 現在位置 → 移動量が小さい順 → 早い時刻順 (決定的)
    return [...set].sort((a, b) => {
      const da = Math.abs(a - currentStart), db = Math.abs(b - currentStart);
      if (da !== db) return da - db;
      return a - b;
    });
  }

  /*
   * input: {
   *   staff: [{id,name,start,end}],
   *   breaks: [{id,empId,start,end}],       // 現在の配置 (長さは固定)
   *   lockedEmpIds: [empId],                // ロック中 (全休憩固定)
   *   dragged: {breakId, newStart} | null,  // ドラッグで指定された休憩 (固定扱い)
   *   exceptionEmpId: empId | null          // 重なり例外 (園田恵)
   * }
   * returns: {ok:true, breaks:[{id,empId,start,end}], moved:[{empId, breakId, from, to}]}
   *        | {ok:false, reason:string, detail:string}
   */
  function optimize(input) {
    const staffById = {};
    for (const s of input.staff) staffById[s.id] = s;
    const locked = new Set(input.lockedEmpIds || []);
    const dragged = input.dragged || null;
    const exc = input.exceptionEmpId || null;

    const fixed = [], movable = [];
    for (const b of input.breaks) {
      if (dragged && b.id === dragged.breakId) {
        fixed.push({ id: b.id, empId: b.empId, start: dragged.newStart, end: dragged.newStart + (b.end - b.start) });
      } else if (locked.has(b.empId)) {
        fixed.push({ ...b });
      } else {
        movable.push(b);
      }
    }

    // ドラッグ対象自体の検証 (理由を具体的に返す)
    if (dragged) {
      const orig = input.breaks.find(b => b.id === dragged.breakId);
      const st = staffById[orig.empId];
      const len = orig.end - orig.start;
      const ns = dragged.newStart, ne = ns + len;
      if (locked.has(orig.empId)) return { ok: false, reason: "locked", detail: "ロック中の従業員の休憩は移動できません" };
      if (ns < st.start || ne > st.end) return { ok: false, reason: "outside_shift", detail: "勤務時間（" + fmt(st.start) + "〜" + fmt(st.end) + "）の範囲外です" };
      if (ns < WIN_START || ne > WIN_END) return { ok: false, reason: "outside_window", detail: "休憩は9:30〜21:00の間だけです" };
      for (const o of input.breaks) {
        if (o.empId === orig.empId && o.id !== orig.id && overlaps(ns, ne, o.start, o.end)) {
          return { ok: false, reason: "own_overlap", detail: "同じ従業員の他の休憩と重なります" };
        }
      }
    }
    // 固定分同士が既にルール違反なら解なし (原因を示す)
    if (!feasible(input.staff, fixed, exc)) {
      // どの固定休憩が衝突しているか特定を試みる
      let culprit = "";
      outer: for (let i = 0; i < fixed.length; i++) {
        for (let j = i + 1; j < fixed.length; j++) {
          const a = fixed[i], b = fixed[j];
          if (overlaps(a.start, a.end, b.start, b.end) && a.empId !== exc && b.empId !== exc) {
            culprit = "固定された休憩同士が重なっています（" + fmt(a.start) + "〜" + fmt(a.end) + " と " + fmt(b.start) + "〜" + fmt(b.end) + "）";
            break outer;
          }
        }
      }
      return { ok: false, reason: "fixed_conflict", detail: culprit || "固定された休憩時間と既存の休憩ルールを両立できません" };
    }

    // 探索: 従業員の元の並び順を維持 (決定的タイ決着)
    const order = new Map(input.staff.map((s, i) => [s.id, i]));
    movable.sort((a, b) => (order.get(a.empId) - order.get(b.empId)) || (a.start - b.start));
    const candLists = movable.map(b => candidatesFor(staffById[b.empId], b.end - b.start, b.start));

    let best = null; // {movedEmp: Set, movedCount, totalShift, assign:[start...]}
    let nodes = 0;
    const NODE_CAP = 400000;
    const assigned = new Array(movable.length).fill(null);

    function partialCost(idx) {
      let movedEmp = new Set(), total = 0;
      for (let i = 0; i < idx; i++) {
        if (assigned[i] !== movable[i].start) { movedEmp.add(movable[i].empId); total += Math.abs(assigned[i] - movable[i].start); }
      }
      return { count: movedEmp.size, total };
    }

    function dfs(idx, movedCount, totalShift) {
      if (best && (movedCount > best.movedCount || (movedCount === best.movedCount && totalShift >= best.totalShift))) return;
      if (idx === movable.length) {
        const intervals = fixed.concat(movable.map((b, i) => ({ id: b.id, empId: b.empId, start: assigned[i], end: assigned[i] + (b.end - b.start) })));
        if (feasible(input.staff, intervals, exc)) {
          best = { movedCount, totalShift, assign: assigned.slice() };
        }
        return;
      }
      if (++nodes > NODE_CAP) return;
      const b = movable[idx], len = b.end - b.start;
      for (const cand of candLists[idx]) {
        assigned[idx] = cand;
        const intervals = fixed.concat(
          movable.slice(0, idx + 1).map((bb, i) => ({ id: bb.id, empId: bb.empId, start: assigned[i], end: assigned[i] + (bb.end - bb.start) }))
        );
        if (!feasible(input.staff, intervals, exc)) continue;
        const pc = partialCost(idx + 1);
        dfs(idx + 1, pc.count, pc.total);
        if (nodes > NODE_CAP) { assigned[idx] = null; return; }
      }
      assigned[idx] = null;
    }
    dfs(0, 0, 0);

    if (!best) {
      return { ok: false, reason: "no_solution", detail: "固定された休憩時間と既存の休憩ルールを両立できません（配置できる組み合わせがありませんでした）" };
    }
    const resultBreaks = input.breaks.map(b => {
      if (dragged && b.id === dragged.breakId) return { id: b.id, empId: b.empId, start: dragged.newStart, end: dragged.newStart + (b.end - b.start) };
      const mi = movable.findIndex(m => m.id === b.id);
      if (mi >= 0) return { id: b.id, empId: b.empId, start: best.assign[mi], end: best.assign[mi] + (b.end - b.start) };
      return { ...b };
    });
    const moved = [];
    for (const rb of resultBreaks) {
      const orig = input.breaks.find(b => b.id === rb.id);
      if (orig.start !== rb.start) moved.push({ empId: rb.empId, breakId: rb.id, from: { start: orig.start, end: orig.end }, to: { start: rb.start, end: rb.end } });
    }
    return { ok: true, breaks: resultBreaks, moved };
  }

  function fmt(m) { return String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0"); }

  const api = { optimize, feasible, candidatesFor, fmt, WIN_START, WIN_END };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  global.BreakOptimizer = api;
})(typeof window !== "undefined" ? window : globalThis);
