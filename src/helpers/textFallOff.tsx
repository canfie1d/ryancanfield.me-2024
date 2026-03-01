export const textFallOff = (text: string, amount = 10) => {
  // max amount = 10 // globals.scss
  if (text.length < amount) return text;

  const staticText = text.slice(0, text.length - amount);
  const textToWrap = text.slice(text.length - amount, text.length);
  const fallingText = textToWrap.split("").map((letter, i) => {
    return (
      <span key={i} className={`fallingText fallingText-${i + 1}`}>
        {letter}
      </span>
    );
  });

  return (
    <>
      {staticText}
      {fallingText.map((letter) => letter)}
    </>
  );
};
