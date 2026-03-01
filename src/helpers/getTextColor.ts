const getRGB = (c: string): number => {
  return parseInt(c, 16) || 0;
};

const getsRGB = (c: string) => {
  return getRGB(c) / 255 <= 0.03928
    ? getRGB(c) / 255 / 12.92
    : Math.pow((getRGB(c) / 255 + 0.055) / 1.055, 2.4);
};

const getLuminance = (hexColor: string) => {
  return (
    0.2126 * getsRGB(hexColor.substr(1, 2)) +
    0.7152 * getsRGB(hexColor.substr(3, 2)) +
    0.0722 * getsRGB(hexColor.substr(-2))
  );
};

const getContrast = (f: string, b: string) => {
  const L1 = getLuminance(f);
  const L2 = getLuminance(b);
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
};

const hexToRgb = (hex: string): [number, number, number] => {
  const h = hex.replace(/^#/, "");
  if (h.length !== 6) return [0, 0, 0];
  return [
    parseInt(h.slice(0, 2), 16) || 0,
    parseInt(h.slice(2, 4), 16) || 0,
    parseInt(h.slice(4, 6), 16) || 0,
  ];
};

const rgbToHex = (r: number, g: number, b: number): string => {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = Math.round(Math.max(0, Math.min(255, x))).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
};

/** Returns a color with sufficient contrast against a light container.
 * Darkens light colors (e.g. pastels) so gems remain visible on off-white backgrounds. */
export const getVisibleJewelColor = (
  color: string,
  containerBg = "#ebebeb",
  minContrast = 3
): string => {
  if (!color?.startsWith("#")) return color;
  if (getContrast(color, containerBg) >= minContrast) return color;
  const [r, g, b] = hexToRgb(color);
  let factor = 0.2;
  let darkColor: string;
  do {
    darkColor = rgbToHex(
      r * (1 - factor),
      g * (1 - factor),
      b * (1 - factor)
    );
    factor += 0.2;
  } while (getContrast(darkColor, containerBg) < minContrast && factor <= 1);
  return darkColor;
};

export const getTextColor = (bgColor: string) => {
  const whiteContrast = getContrast(bgColor, "#ffffff");
  const blackContrast = getContrast(bgColor, "#000000");

  return whiteContrast > blackContrast ? "#ebebeb" : "#363636";
};
