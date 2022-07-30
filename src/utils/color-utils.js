import tinycolor2 from 'tinycolor2';

export function createColor(c, n) {
  let colorHsv = tinycolor2(c).toHsv();
  colorHsv.s = colorHsv.s * 100;
  colorHsv.v = colorHsv.v * 100;

  let { s, v } = colorHsv;

  colorHsv.v = (v - ((v - 30) / 5) * (n - 6)) / 100;
  colorHsv.s = (s + (n - 6) * 4);

  return tinycolor2(colorHsv).toHex();
}
