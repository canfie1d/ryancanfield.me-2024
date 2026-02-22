import { useEffect, useState } from "react";
import Text from "~/components/Text";
import { useUiStrings } from "~/hooks/useSanityContent";

const DEFAULT_MESSAGES = ["Fetching data...", "Almost there...", "Hmmmmm...", "Ut oh..", "..🫠"];

const Loading = ({ messages }: { messages?: string[] }) => {
  const { data: ui } = useUiStrings();
  const resolvedMessages =
    messages ??
    (ui?.loadingMessages?.length ? ui.loadingMessages : DEFAULT_MESSAGES) ??
    DEFAULT_MESSAGES;
  const [loadingText, setLoadingText] = useState<string>(
    resolvedMessages[0] ?? DEFAULT_MESSAGES[0],
  );

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index++;
      if (index < resolvedMessages.length) {
        setLoadingText(resolvedMessages[index] ?? DEFAULT_MESSAGES[0]);
      } else {
        clearInterval(interval);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [resolvedMessages]);

  return (
    <Text
      as="span"
      size="small"
    >
      {loadingText}
    </Text>
  );
};

export default Loading;
