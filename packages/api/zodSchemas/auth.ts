import { z } from "zod";
import { t } from "i18next";
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
            .min(1, {message: t('nonEmptyEmailError')})
            .email({message: t('invalidEmailError')}),
        password: z.string().min(6, {message: t('shortPasswordError')})
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
            .min(1, {message: t('nonEmptyEmailError')})
            .email({message: t('invalidEmailError')}),
        name: z.string().max(100, {message: t('signup.invalidEmailError')}),
        password: z.string().min(6, {message: t('shortPasswordError')})
    })
