import { createReactQueryHooks } from "@trpc/react";
import { AppRouter } from "api/src/api";

export const trpc = createReactQueryHooks<AppRouter>();
