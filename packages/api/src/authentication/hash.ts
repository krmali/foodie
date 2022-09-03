import { compare, genSalt, hash } from 'bcrypt';

export const hashPassword = async (password: string) => {
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
}

export const checkValidPassword = async (password: string, dbPassword: string) => {
    return await compare(password, dbPassword);
}
