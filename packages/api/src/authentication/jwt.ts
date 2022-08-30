import prisma from "../../prisma/primsa-client";

const map = new Map<string, string>();
map.set("666", "kareem@ali.com");

export const decodeAndVerifyJwtToken = async (token: string) => {
    const email = map.get(token);
    if(!email)return null;
    const user = await prisma.user.findFirst({
        where: {
            email : email
        }
    });
    return user;
}
