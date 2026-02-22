import { useUiStrings } from "~/hooks/useSanityContent";

const Loader = () => {
  const { data: ui } = useUiStrings();
  const text = ui?.loadingText ?? "";

  return (
    <div className="flex justify-center items-center h-full">
      <div className="text-2xl font-bold">{text}</div>
    </div>
  );
};

export default Loader;
