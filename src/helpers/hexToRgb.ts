export const hexToRgb = (hex: string) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
};

// 1. ex "rgb(255, 255, 255)"
// `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
//   result[3],
//   16
// )})`

// 2. ex {r: 255, g: 255, b: 255}
// r: parseInt(result[1], 16),
// g: parseInt(result[2], 16),
// b: parseInt(result[3], 16),
