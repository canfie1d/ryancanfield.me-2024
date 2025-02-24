import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { IdentityContextProvider } from "react-netlify-identity";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "~/components/ErrorBoundary";
import Pages from "~/pages/Pages";
import PageTitle from "~/components/PageTitle/PageTitle";
import Layout from "./components/Layout";
import "~/styles/globals.scss";

if (process.env.NODE_ENV !== "production") {
  let { default: axe } = await import("@axe-core/react");
  axe(React, ReactDOM, 2000);
}

const App = () => {
  const queryClient = new QueryClient();
  const url = "https://ryancanfield.netlify.app"; // @todo dynamic identity context urls

  return (
    <ErrorBoundary>
      <IdentityContextProvider url={url}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Layout>
              <PageTitle />
              <Pages />
            </Layout>
          </Router>
        </QueryClientProvider>
      </IdentityContextProvider>
    </ErrorBoundary>
  );
};

export default App;
