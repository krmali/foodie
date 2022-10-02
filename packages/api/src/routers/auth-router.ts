import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { checkValidPassword, hashPassword } from "../authentication/hash";
import { generateAccessToken } from "../authentication/jwt";
import { createRouter } from "../context";
import { prisma } from "../../prisma/primsa-client";
import { LoginSchema, SignUpSchema } from "../../zodSchemas/auth";
import { t } from "i18next";

export const AuthRouter = createRouter()
    .mutation("login",{ 
        input: LoginSchema,
        resolve: async ({ctx, input}) => {
            const user = await prisma.user.findFirst({
                where: {
                    email : input.email.toLowerCase()
                }
            });
            if(!user){
                throw new TRPCError({ code: 'UNAUTHORIZED' , message: t("wrongCredentials", { lng: ctx.lng })});
            }
            else{
                const isValidPassword = await checkValidPassword(input.password, user.password);
                if(isValidPassword)return {accessToken : generateAccessToken(input.email.toLowerCase())};
                else throw new TRPCError({ code: 'UNAUTHORIZED' , message: t("wrongCredentials", { lng: ctx.lng })});
            }
        }
    })
    .mutation("sign-up",{ 
        input: SignUpSchema,
        resolve: async ({ctx, input}) => {
            const user = await prisma.user.findFirst({
                where: {
                    email : input.email.toLowerCase()
                }
            });
            if(user){
                throw new TRPCError({ code: 'UNAUTHORIZED', message: t("userAlreadyExists", { lng: ctx.lng }) });
            }
            else{
                const hashedPassword = await hashPassword(input.password);
                await prisma.user.create(
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
