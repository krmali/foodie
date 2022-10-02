import { z } from "zod";
import { ProcedureParserWithInputOutput } from "@trpc/server/dist/declarations/src/internals/procedure";

export const LoginSchema: ProcedureParserWithInputOutput<
        {
            email: string;
            password: string;
        },
        {
            email: string;
            password: string;
        }> = z.object(
    {
        email: z.string()
            .min(1, {message: 'nonEmptyEmailError' })
            .email({message: 'invalidEmailError' }),
        password: z.string().min(6, {message: 'shortPasswordError'})
    });

export const SignUpSchema: z.ZodObject<{
            email: z.ZodString;
            name: z.ZodString;
            password: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            email: string;
            name: string;
            password: string;
        }, {
            email: string;
            name: string;
            password: string;
        }> = z.object({
        email: z.string()
            .min(1, {message: 'nonEmptyEmailError'})
            .email({message: 'invalidEmailError'}),
        name: z.string().max(100, {message: 'signup.invalidEmailError'}),
        password: z.string().min(6, {message: 'shortPasswordError'})
    })
