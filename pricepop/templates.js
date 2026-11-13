/* ChatGPT生成デザイン（2026-11-13・サンプルPDFから再現） */
window.TPL = {};
window.TPL.okaidoku = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800">
  <title>お買得品 価格POP</title>
  <defs>
    <style>
      .heavy { font-family:"Noto Sans CJK JP","Hiragino Kaku Gothic ProN","Hiragino Sans","Noto Sans JP","Arial Black",sans-serif; font-weight:900; }
      .price { font-family:"Arial Black","Liberation Sans","Hiragino Kaku Gothic ProN",sans-serif; font-weight:900; font-style:italic; paint-order:stroke fill; stroke:#000; stroke-width:10; stroke-linejoin:round; }
      .bodylabel { font-family:"Noto Sans CJK JP","Hiragino Kaku Gothic ProN","Noto Sans JP",sans-serif; font-weight:900; paint-order:stroke fill; stroke:white; stroke-width:4; stroke-linejoin:round; }
    </style>
    <clipPath id="pageClipA"><rect x="0" y="0" width="600" height="800"/></clipPath>
  </defs>
  <g clip-path="url(#pageClipA)">
    <rect width="600" height="800" fill="#E60012"/>
    <rect x="12" y="154" width="576" height="632" fill="#FFFFFF"/>
    <rect width="600" height="154" fill="#E60012"/>
    <text class="heavy" x="300" y="132" text-anchor="middle" font-size="128" fill="#FFFFFF" textLength="533" lengthAdjust="spacingAndGlyphs">お買得品</text>
    <path fill="#FFEB22" d="M 588 154 L 588 786 L 12 786 L 12 763 L 188 786 L 12 755 L 12 683 L 200 692 L 65 643 L 12 608 L 251 617 L 75 523 L 267 558 L 164 429 L 288 493 L 232 350 L 323 453 L 319 303 L 384 430 L 395 245 L 455 416 L 491 245 L 536 415 Z"/>
    <text class="heavy" x="24" y="188" font-size="26" fill="#0811C7" textLength="430" lengthAdjust="spacingAndGlyphs">{{CATCH}}</text>
    <text class="heavy" x="13" y="255" font-size="55" fill="#000000" textLength="552" lengthAdjust="spacingAndGlyphs">{{NAME1}}</text>
    <text class="heavy" x="13" y="310" font-size="55" fill="#000000" textLength="555" lengthAdjust="spacingAndGlyphs">{{NAME2}}</text>
    <text class="heavy" x="14" y="350" font-size="37" fill="#006B2B" textLength="190" lengthAdjust="spacingAndGlyphs">{{SPEC}}</text>
    <g class="heavy" fill="#000"><text x="16" y="397" font-size="26">{{KIBOLABEL}}</text></g>
    <g class="heavy" fill="#006B2B">
      <text x="220" y="397" font-size="23">{{KIBOSUB}}</text>
      <text x="272" y="397" font-size="47" textLength="135" lengthAdjust="spacingAndGlyphs">{{KIBO}}</text>
      <text x="408" y="397" font-size="24">{{KIBOEN}}</text>
    </g>
    <g>
      <text class="bodylabel" x="16" y="617" font-size="37" fill="#000000">本体</text>
      <text class="bodylabel" x="16" y="658" font-size="37" fill="#000000">価格</text>
    </g>
    <text class="price" x="105" y="625" font-size="292" fill="#E60012" textLength="405" lengthAdjust="spacingAndGlyphs">{{PRICE}}</text>
    <text class="heavy" x="511" y="630" font-size="72" fill="#E60012" stroke="#000" stroke-width="5" paint-order="stroke fill" textLength="66" lengthAdjust="spacingAndGlyphs">円</text>
    <text class="heavy" x="69" y="746" font-size="64" fill="#0017E8" textLength="93" lengthAdjust="spacingAndGlyphs">（税込</text>
    <text class="heavy" x="324" y="750" font-size="122" fill="#0017E8" textLength="190" lengthAdjust="spacingAndGlyphs">{{TAXPRICE}}</text>
    <text class="heavy" x="512" y="750" font-size="59" fill="#0017E8" textLength="72" lengthAdjust="spacingAndGlyphs">円）</text>
  </g>
</svg>`;
window.TPL.tokusen = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800">
  <title>特選品 価格POP</title>
  <defs>
    <style>
      .heavy { font-family:"Noto Sans CJK JP","Hiragino Kaku Gothic ProN","Hiragino Sans","Noto Sans JP","Arial Black",sans-serif; font-weight:900; }
      .price { font-family:"Arial Black","Liberation Sans","Hiragino Kaku Gothic ProN",sans-serif; font-weight:900; font-style:italic; paint-order:stroke fill; stroke:#000000; stroke-width:10; stroke-linejoin:round; }
      .outlined { font-family:"Noto Sans CJK JP","Hiragino Kaku Gothic ProN","Noto Sans JP",sans-serif; font-weight:900; paint-order:stroke fill; stroke:#000000; stroke-width:6; stroke-linejoin:round; }
      .bodylabel { font-family:"Noto Sans CJK JP","Hiragino Kaku Gothic ProN","Noto Sans JP",sans-serif; font-weight:900; paint-order:stroke fill; stroke:#FFFFFF; stroke-width:4; stroke-linejoin:round; }
    </style>
    <clipPath id="pageClipB"><rect width="600" height="800"/></clipPath>
  </defs>
  <g clip-path="url(#pageClipB)">
    <rect width="600" height="800" fill="#E60012"/>
    <rect x="0" y="154" width="600" height="646" fill="#FFFFFF"/>
    <rect x="0" y="0" width="600" height="154" fill="#E60012"/>
    <polygon fill="#FFE829" points="297,0 346,20 402,0 419,32 497,15 473,49 590,37 507,76 590,107 483,105 520,143 427,125 406,154 348,128 292,154 278,126 204,145 233,107 134,115 213,78 134,42 242,52 201,16 274,29"/>
    <g transform="translate(36 19)">
      <path fill="#FFEB00" d="M0 50 C0 18 25 0 49 0 L49 21 C34 21 24 36 24 50 Z"/>
      <path fill="#FFFFFF" d="M49 0 L75 0 L75 48 L49 48 Z"/>
      <path fill="#FFFFFF" d="M0 50 L49 50 L49 75 L0 75 Z"/>
      <path fill="#0069AC" d="M49 48 L75 48 C75 68 61 87 44 89 L29 89 C43 82 49 68 49 48 Z"/>
      <text x="-28" y="117" font-family="Georgia,serif" font-size="26" font-weight="bold" fill="#FFFFFF" textLength="132" lengthAdjust="spacingAndGlyphs">SUNDRUG</text>
    </g>
    <text class="outlined" x="167" y="128" font-size="115" fill="#FFFFFF" textLength="371" lengthAdjust="spacingAndGlyphs">特選品</text>
    <path fill="#FFEB22" d="M600 154 L600 800 L0 800 L0 760 L200 784 L0 752 L0 682 L189 692 L66 642 L0 599 L248 619 L80 525 L269 558 L163 428 L293 493 L232 350 L333 458 L319 302 L389 430 L395 244 L458 415 L490 241 L540 418 Z"/>
    <text class="heavy" x="18" y="186" font-size="27" fill="#0015D9" textLength="440" lengthAdjust="spacingAndGlyphs">{{CATCH}}</text>
    <text class="heavy" x="13" y="263" font-size="79" fill="#000000" textLength="555" lengthAdjust="spacingAndGlyphs">{{NAME1}}</text>
    <text class="heavy" x="13" y="314" font-size="56" fill="#000000" textLength="555" lengthAdjust="spacingAndGlyphs">{{NAME2}}</text>
    <text class="heavy" x="14" y="349" font-size="37" fill="#006B2B" textLength="175" lengthAdjust="spacingAndGlyphs">{{SPEC}}</text>
    <text class="heavy" x="17" y="555" font-size="38" fill="#E60012" stroke="#000000" stroke-width="4" paint-order="stroke fill">{{KAKU}}</text>
    <text class="bodylabel" x="15" y="601" font-size="37" fill="#000">本体</text>
    <text class="bodylabel" x="15" y="644" font-size="37" fill="#000">価格</text>
    <text class="price" x="102" y="627" font-size="300" fill="#E60012" textLength="408" lengthAdjust="spacingAndGlyphs">{{PRICE}}</text>
    <text class="heavy" x="513" y="634" font-size="74" fill="#E60012" stroke="#000000" stroke-width="5" paint-order="stroke fill" textLength="65" lengthAdjust="spacingAndGlyphs">円</text>
    <text class="heavy" x="70" y="748" font-size="62" fill="#0017E8" textLength="92" lengthAdjust="spacingAndGlyphs">（税込</text>
    <text class="heavy" x="325" y="751" font-size="120" fill="#0017E8" textLength="191" lengthAdjust="spacingAndGlyphs">{{TAXPRICE}}</text>
    <text class="heavy" x="514" y="750" font-size="58" fill="#0017E8" textLength="70" lengthAdjust="spacingAndGlyphs">円）</text>
  </g>
</svg>`;
window.TPL.kokoku = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800">
  <title>広告の品 価格POP</title>
  <defs>
    <style>
      .heavy { font-family:"Noto Sans CJK JP","Hiragino Kaku Gothic ProN","Hiragino Sans","Noto Sans JP","Arial Black",sans-serif; font-weight:900; }
      .rounded { font-family:"M PLUS Rounded 1c","Hiragino Maru Gothic ProN","Noto Sans CJK JP",sans-serif; font-weight:900; stroke-linejoin:round; }
      .price { font-family:"Arial Black","Liberation Sans","Hiragino Kaku Gothic ProN",sans-serif; font-style:italic; font-weight:900; paint-order:stroke fill; stroke:#000000; stroke-width:11; stroke-linejoin:round; }
      .bodylabel { font-family:"Noto Sans CJK JP","Hiragino Kaku Gothic ProN","Noto Sans JP",sans-serif; font-weight:900; paint-order:stroke fill; stroke:#FFFFFF; stroke-width:4; stroke-linejoin:round; }
    </style>
    <clipPath id="pageClipC"><rect width="600" height="800"/></clipPath>
  </defs>
  <g clip-path="url(#pageClipC)">
    <rect width="600" height="800" fill="#E60012"/>
    <rect x="12" y="154" width="576" height="632" fill="#FFFFFF"/>
    <rect x="0" y="0" width="600" height="154" fill="#E60012"/>
    <text class="rounded" x="300" y="131" text-anchor="middle" font-size="120" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="2" paint-order="stroke fill" textLength="527" lengthAdjust="spacingAndGlyphs">広告の品</text>
    <path fill="#FFEB22" d="M588 154 L588 786 L12 786 L12 763 L192 786 L12 757 L12 685 L201 691 L69 644 L12 609 L251 619 L78 527 L267 560 L162 431 L295 494 L232 352 L329 454 L317 304 L386 432 L395 242 L457 415 L490 240 L541 416 Z"/>
    <text class="heavy" x="33" y="188" font-size="27" fill="#0015DC" textLength="445" lengthAdjust="spacingAndGlyphs">{{CATCH}}</text>
    <text class="heavy" x="13" y="254" font-size="57" fill="#000000" textLength="554" lengthAdjust="spacingAndGlyphs">{{NAME1}}</text>
    <text class="heavy" x="13" y="311" font-size="57" fill="#000000" textLength="555" lengthAdjust="spacingAndGlyphs">{{NAME2}}</text>
    <text class="heavy" x="13" y="349" font-size="37" fill="#006B2B" textLength="190" lengthAdjust="spacingAndGlyphs">{{SPEC}}</text>
    <text class="heavy" x="16" y="556" font-size="38" fill="#E60012" stroke="#000" stroke-width="4" paint-order="stroke fill">{{KAKU}}</text>
    <g class="bodylabel" fill="#000000">
      <text x="15" y="599" font-size="38">本体</text>
      <text x="15" y="642" font-size="38">価格</text>
    </g>
    <text class="price" x="101" y="627" font-size="296" fill="#E60012" textLength="409" lengthAdjust="spacingAndGlyphs">{{PRICE}}</text>
    <text class="heavy" x="514" y="632" font-size="75" fill="#E60012" stroke="#000000" stroke-width="5" paint-order="stroke fill" textLength="64" lengthAdjust="spacingAndGlyphs">円</text>
    <text class="heavy" x="70" y="747" font-size="62" fill="#0017E8" textLength="92" lengthAdjust="spacingAndGlyphs">（税込</text>
    <text class="heavy" x="323" y="751" font-size="121" fill="#0017E8" textLength="192" lengthAdjust="spacingAndGlyphs">{{TAXPRICE}}</text>
    <text class="heavy" x="513" y="750" font-size="59" fill="#0017E8" textLength="71" lengthAdjust="spacingAndGlyphs">円）</text>
  </g>
</svg>`;
