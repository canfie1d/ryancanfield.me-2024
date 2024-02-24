import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  public render() {
    const errorUrl = this.state.errorInfo?.componentStack?.split("\n")[1];
    const errorLocation = errorUrl?.match(/\/([^\/?]+)\?/)?.[1];

    if (this.state.hasError) {
      return (
        <div
          style={{
            textAlign: "center",
            marginTop: "var(--spacing-unit-double)",
          }}
        >
          <h1>Oh good, you broke it</h1>
          {this.state.errorInfo && (
            <>
              <code>{this.state.errorInfo.componentStack}</code>
              <p
                style={{
                  maxWidth: "70dvw",
                  margin: "var(--spacing-unit) auto",
                }}
              >
                I'm pretty sure this says something about&nbsp;
                <code className="inline">{errorLocation}</code> but if you know
                what any of this means, please&nbsp;
                <a
                  href={`mailto:ryancanfield@me.com?subject=HELP&body=${this.state.errorInfo.componentStack}`}
                >
                  send me an email
                </a>
                &nbsp;🙏.
              </p>
            </>
          )}
          <div
            style={{
              margin: "var(--spacing-unit-double) 0 var(--spacing-unit-quad)",
            }}
          >
            <a
              style={{
                fontFamily: "var(--body-font)",
                fontSize: "var(--font-medium)",
              }}
              href="/"
            >
              Attempt a fix
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
