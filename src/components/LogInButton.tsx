import { useIdentityContext } from "~/contexts/IdentityContext";
import { useUiStrings } from "~/hooks/useSanityContent";
import Button from "~/components/Button";
import Icon from "~/components/Icon";

const LogInButton = ({ className }: { className: string }) => {
  const { loginProvider } = useIdentityContext();
  const { data: ui } = useUiStrings();

  const logInWithGithub = () => {
    loginProvider("github");
  };

  return (
    <Button
      className={className}
      onClick={logInWithGithub}
    >
      <Icon
        size="small"
        name="github"
      />
      <span style={{ marginLeft: "var(--spacing-unit-half" }}>{ui?.loginButtonGithub ?? ""}</span>
    </Button>
  );
};

export default LogInButton;
