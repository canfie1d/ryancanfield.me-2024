import { BrowserRouter as Router } from "react-router-dom";
import Pages from "./pages/Pages";
import Layout from "./components/Layout";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/useThemeProvider";
import "./styles/globals.scss";

const App = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Layout>
          <Router>
            <Pages />
          </Router>
        </Layout>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
