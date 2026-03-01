import { lazy } from "react";
import { createFileRoute } from "@tanstack/react-router";

const Writing = lazy(() => import("~/pages/Writing"));

export const Route = createFileRoute("/_app/writing")({
  component: Writing,
});
