import { useIdentityContext } from "react-netlify-identity";
import Button from "./Button";
import Icon from "./Icon";

const LogInButton = ({ className }: { className: string }) => {
  const { loginProvider } = useIdentityContext();

  const logInWithGithub = () => {
    loginProvider("github");
  };

  return (
    <Button className={className} onClick={logInWithGithub}>
      <Icon size="small" name="github" />
      <span style={{ marginLeft: "var(--spacing-unit-half" }}>
        Log in with Github
      </span>
    </Button>
  );
};

export default LogInButton;
