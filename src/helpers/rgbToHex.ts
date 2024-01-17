const componentToHex = (c: number) => {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};

export const rgbToHex = ([r, g, b]: [r: string, g: string, b: string]) => {
  return (
    "#" +
    componentToHex(parseInt(r)) +
    componentToHex(parseInt(g)) +
    componentToHex(parseInt(b))
  );
};
