import express from "express";
import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import i18next, { t } from "i18next";
import { i18nInit } from "./i18n/i18next";
import * as i18nextMiddlewhere from "i18next-http-middleware";

const appRouter = trpc.router()
    .query("hello", {
        resolve: () => { return "Hello world!";}
    });

const app = express();
const port = 8080;
app.use(cors());

// internationalization
i18next.use(i18nextMiddlewhere.LanguageDetector).init(i18nInit);
app.use(i18nextMiddlewhere.handle(i18next));

// trpc endpoint
app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext
        // createContext: () => null
    })
);

export type AppRouter1 = typeof appRouter;

app.get("/", (_req: any, res: any) => {
  res.send("Hello from api ayklam");
});

app.listen(port, () => {
  console.log("-----------------------------------------------------------");
console.log(t("ayklam"));
console.log("-----------------------------------------------------------");

console.log(`api listening at http://localhost:${port}`);
});
