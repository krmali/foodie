import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { checkValidPassword, hashPassword } from "../authentication/hash";
import { generateAccessToken } from "../authentication/jwt";
import { createRouter } from "../context";

export const AuthRouter = createRouter()
    .mutation("login",{ 
        input: z.object({
            email: z.string().email(),
            password: z.string().min(6)
        }),
        resolve: async ({ctx, input}) => {
            const user = await ctx.prisma.user.findFirst({
                where: {
                    email : input.email.toLowerCase()
                }
            });
            if(!user){
                throw new TRPCError({ code: 'UNAUTHORIZED' });
            }
            else{
                const isValidPassword = await checkValidPassword(input.password, user.password);
                if(isValidPassword)return {accessToken : generateAccessToken(input.email.toLowerCase())};
            }
        }
    })
    .mutation("sign-up",{ 
        input: z.object({
            email: z.string().email(),
            name: z.string().max(100),
            password: z.string().min(6)
        }),
        resolve: async ({ctx, input}) => {
            const user = await ctx.prisma.user.findFirst({
                where: {
                    email : input.email.toLowerCase()
                }
            });
            if(user){
                throw new TRPCError({ code: 'UNAUTHORIZED' });
            }
            else{
                const hashedPassword = await hashPassword(input.password);
                await ctx.prisma.user.create(
                    { data:
                        {
                            email: input.email,
                            name: input.name,
                            password: hashedPassword,
                        }

                });
                return {accessToken : generateAccessToken(input.email.toLowerCase())};
            }
        }
    });
