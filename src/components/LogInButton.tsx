import { useIdentityContext } from "~/contexts/IdentityContext";
import Button from "~/components/Button";
import Icon from "~/components/Icon";

const LogInButton = ({ className }: { className: string }) => {
  const { loginProvider } = useIdentityContext();

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
      <span style={{ marginLeft: "var(--spacing-unit-half" }}>Log in with Github</span>
    </Button>
  );
};

export default LogInButton;
