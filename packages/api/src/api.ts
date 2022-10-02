import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import { createContext, createRouter } from "./context";
import { TRPCError } from "@trpc/server";
import { AuthRouter } from "./routers/auth-router";
import { prisma } from "../prisma/primsa-client";
import { i18nInit } from "../i18n/i18next";
import * as i18nextMiddlewhere from "i18next-http-middleware";
import i18next from "i18next";

const appRouter = createRouter()
    // .middleware(async ({ path, type, next }) => {
    //     const start = Date.now();
    //     const result = await next();
    //     const durationMs = Date.now() - start;
    //     result.ok
    //         ? console.log('OK request timing:', { path, type, durationMs })
    //         : console.log('Non-OK request timing', { path, type, durationMs });
    //     return result;
    // })
    // .middleware(async ({ ctx, next }) => {
    //     if (!ctx.user) {
    //         throw new TRPCError({ code: "UNAUTHORIZED" });
    //     }
    //     return next()
    // })
    .query("hello", {
        // resolve: ({ctx}) => { return `Hello ${ctx.user?ctx.user.name: "world"}!`;}
        resolve: async ({ctx}) => { return (await prisma.user.findMany())[0];}
        // resolve: async ({ctx}) => { return 1;}
    })
    .merge("auth1/" , 
        createRouter()
        .middleware(async ({ ctx, next }) => {
            if (!ctx.user) {
                throw new TRPCError({ code: 'UNAUTHORIZED' });
            }
            return next()
        })
        .query("ayklam", {
            resolve: ({ctx}) => {
                return {user: ctx.user};}
        })
    ).merge("auth/", AuthRouter);

const app = express();
const port = 8080;
app.use(cors());

// internationalization
i18next.use(i18nextMiddlewhere.LanguageDetector).init(i18nInit);
app.use(i18nextMiddlewhere.handle(i18next));

app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext
    })
);

export type AppRouter = typeof appRouter;

app.get("/", (_req: any, res: any) => {
    res.send("Hello from api ayklam");
});

app.listen(port, () => {
    console.log(`api listening at http://localhost:${port}`);
});
