import { useEffect, useState } from "react";
import Text from "~/components/Text";

const Loading = ({
  messages = [
    "Fetching data...",
    "Almost there...",
    "Hmmmmm...",
    "Ut oh..",
    "..🫠",
  ],
}) => {
  const [loadingText, setLoadingText] = useState<string>(messages[0]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index++;
      if (index < messages.length) {
        setLoadingText(messages[index]);
      } else {
        clearInterval(interval);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Text as="span" size="small">
      {loadingText}
    </Text>
  );
};

export default Loading;
