import express from "express";
import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";

const appRouter = trpc.router()
    .query("hello", {
        resolve: () => { return "Hello world!";}
    });

const app = express();
const port = 8080;
app.use(cors());

app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext: () => null
    })
);

export type AppRouter = typeof appRouter;

app.get("/", (_req: any, res: any) => {
  res.send("Hello from api ayklam");
});

app.listen(port, () => {
  console.log(`api listening at http://localhost:${port}`);
});
