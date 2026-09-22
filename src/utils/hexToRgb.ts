export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

const HEX_PATTERN = /^#([0-9a-fA-F]{6})$/;

export function hexToRgb(hex: string): RgbColor | null {
  if (!HEX_PATTERN.test(hex)) {
    return null;
  }

  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return { r, g, b };
}

export function rgbToString({ r, g, b }: RgbColor): string {
  return `rgb(${r}, ${g}, ${b})`;
}