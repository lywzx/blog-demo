import { App } from './app.module';
import { Graphics, Point } from 'pixi.js';

document.addEventListener('DOMContentLoaded', () => {
  document.body.appendChild(App.view);
  var graphics = new Graphics();
  graphics.beginFill(0x00dd00, 1);
  graphics.lineStyle(2, 0x000000, 1);
  const arr = [
    [
      -302.16,
      399.13
    ],
    [
      -353.52,
      400.47
    ],
    [
      -405.22,
      404.53
    ],
    [
      -456.64,
      411.29
    ],
    [
      -507.63,
      420.73
    ],
    [
      -558.07,
      432.82
    ],
    [
      -607.79,
      447.54
    ],
    [
      -656.69,
      464.84
    ],
    [
      -704.6,
      484.67
    ],
    [
      -751.42,
      506.99
    ],
    [
      -797,
      531.72
    ],
    [
      -841.23,
      558.81
    ],
    [
      -883.98,
      588.17
    ],
    [
      -925.13,
      619.74
    ],
    [
      -964.57,
      653.41
    ],
    [
      -1002.2,
      689.1
    ],
    [
      -1037.91,
      726.71
    ],
    [
      -1071.6,
      766.14
    ],
    [
      -1103.18,
      807.27
    ],
    [
      -1132.57,
      850.01
    ],
    [
      -1159.68,
      894.22
    ],
    [
      -1184.43,
      939.79
    ],
    [
      -1206.77,
      986.59
    ],
    [
      -1226.63,
      1034.5
    ],
    [
      -1243.96,
      1083.38
    ],
    [
      -1258.7,
      1133.11
    ],
    [
      -1270.82,
      1183.53
    ],
    [
      -1280.28,
      1234.52
    ],
    [
      -1287.06,
      1285.94
    ],
    [
      -1291.14,
      1337.64
    ],
    [
      -1292.51,
      1389.49
    ],
    [
      -1291.17,
      1441.33
    ],
    [
      -1287.11,
      1493.03
    ],
    [
      -1280.36,
      1544.45
    ],
    [
      -1270.92,
      1595.45
    ],
    [
      -1258.82,
      1645.88
    ],
    [
      -1244.11,
      1695.61
    ],
    [
      -1226.81,
      1744.5
    ],
    [
      -1206.97,
      1792.42
    ],
    [
      -1184.66,
      1839.23
    ],
    [
      -1159.92,
      1884.82
    ],
    [
      -1132.83,
      1929.04
    ],
    [
      -1103.47,
      1971.79
    ],
    [
      -1071.91,
      2012.94
    ],
    [
      -1038.24,
      2052.39
    ],
    [
      -1002.55,
      2090.02
    ],
    [
      -964.94,
      2125.72
    ],
    [
      -925.51,
      2159.42
    ],
    [
      -884.37,
      2191
    ],
    [
      -841.64,
      2220.38
    ],
    [
      -797.43,
      2247.49
    ],
    [
      -751.85,
      2272.25
    ],
    [
      -705.05,
      2294.59
    ],
    [
      -657.14,
      2314.45
    ],
    [
      -608.26,
      2331.77
    ],
    [
      -558.54,
      2346.51
    ],
    [
      -508.11,
      2358.63
    ],
    [
      -457.12,
      2368.09
    ],
    [
      -405.7,
      2374.88
    ],
    [
      -354,
      2378.96
    ],
    [
      -302.16,
      2380.33
    ],
    [
      1767.91,
      2380.33
    ],
    [
      1767.91,
      399.13
    ]
  ];
  graphics.drawPolygon(arr.map((it) => [it[0] + 2000, it[1]].map(i => i /3)).map(it => new Point(...it)));
  graphics.endFill();
  graphics.endFill();
  App.stage.addChild(graphics);

}, false)
