import { AuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import prisma from "@/server/db";
import { User } from "@prisma/client";
import { Session } from "@prisma/client";

const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "johndoe@domain.com",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "password",
                },
            },
            async authorize(credentials) {
                try {
                    if (!credentials) throw new Error("No credentials to log in as");
                    const { email, password } = credentials as any;
                    const user = await prisma.user.findFirst({
                        where: {
                            email: email,
                        },
                    });
                    if (!user) throw new Error("User not found!");
                    const passwordMatch = await compare(password, user.password as string);
                    if (!passwordMatch) throw new Error("Invalid password");
                    return user as User;
                } catch (error) {
                    return null;
                }
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            user && (token.user = user);
            return token;
        },
        session: async ({ session, token }) => {
            const user = token as Session;
            session.user = user as any;
            return session;
        },
    },
};

export default authOptions