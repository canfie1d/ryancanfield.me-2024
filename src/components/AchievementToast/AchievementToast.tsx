import { useAchievementStore } from "~/stores/achievements";
import Icon from "../Icon";
import Toast from "../Toast";
import Text from "../Text";

const AchievementToast = () => {
  const toast = useAchievementStore((store) => store.toast);
  console.log("toast: ", toast);
  const setToast = useAchievementStore((store) => store.setToast);

  return (
    <Toast
      open={toast.open}
      onClose={() => setToast({ open: false, title: "", message: "" })}
      type="achievement"
    >
      <Icon name="cert" />
      <div>
        <h4>{toast.title}</h4>
        <Text>{toast.message}</Text>
      </div>
    </Toast>
  );
};

export default AchievementToast;
