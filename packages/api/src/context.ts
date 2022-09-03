import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { prisma } from "../prisma/primsa-client";
import { decodeAndVerifyJwtToken } from "./authentication/jwt";

export async function createContext({
    req,
    res,
}: trpcNext.CreateNextContextOptions) {
    // Create your context based on the request object
    // Will be available as `ctx` in all your resolvers
    // This is just an example of something you'd might want to do in your ctx fn
    async function getUserFromHeader() {
        console.log(req.headers);
        if (req.headers.authorization) {
            const user = await decodeAndVerifyJwtToken(req.headers.authorization.split(' ')[1])
            return user;
        }
        return null;
    }
    const user = await getUserFromHeader();
    return {
        user,
        prisma 
    };
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
// Helper function to create a router with your app's context
export function createRouter() {
    return trpc.router<Context>();
}
