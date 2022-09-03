import * as jwt from "jsonwebtoken";
import {prisma} from "../../prisma/primsa-client";
import {emailTokenMap} from "./email_token_map";

// const map = new Map<string, string>();
// map.set("666", "kareem@ali.com");

export const decodeAndVerifyJwtToken = async (token: string) => {
    const email = emailTokenMap.get(token);
    if(!email)return null;
    const user = await prisma.user.findFirst({
        where: {
            email : email
        }
    });
    return user;
}

export const generateAccessToken = (email: string) => {
    if(!process.env.TOKEN_SECRET) throw new Error('no secret found in environment variables');
    const token = jwt.sign({email: email}, process.env.TOKEN_SECRET, { expiresIn: '2d' })
    emailTokenMap.set(token, email);
    return token;
}
