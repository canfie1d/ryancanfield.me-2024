import React, { createContext, useContext } from "react";
import {
  createRouter,
  createRootRoute,
  createRoute,
  RouterProvider,
  createMemoryHistory,
} from "@tanstack/react-router";

const StoryContext = createContext<React.ReactNode>(null);

const rootRoute = createRootRoute({
  component: () => {
    const story = useContext(StoryContext);
    return <>{story}</>;
  },
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => {
    const story = useContext(StoryContext);
    return <>{story}</>;
  },
});

const routeTree = rootRoute.addChildren([indexRoute]);

const memoryHistory = createMemoryHistory({ initialEntries: ["/"] });
const router = createRouter({ routeTree, history: memoryHistory });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function StorybookRouterDecorator({ children }: { children: React.ReactNode }) {
  return (
    <StoryContext.Provider value={children}>
      <RouterProvider router={router} />
    </StoryContext.Provider>
  );
}
