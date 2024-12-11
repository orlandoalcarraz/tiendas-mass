import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from 'next-auth';
import db from "@/lib/db";
import bcrypt from "bcrypt";

export const authOptions :NextAuthOptions = {
    session: { strategy: 'jwt' },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jsmith" },
                password: { label: "Password", type: "password", placeholder: "*****" },
            },
            async authorize(credentials) {
                if (!credentials || !credentials.email || !credentials.password) {
                    throw new Error("Email y contraseña son requeridos")
                }

                if (
                    credentials.email === process.env.NEXTAUTH_SUPERUSER_EMAIL &&
                    credentials.password === process.env.NEXTAUTH_SUPERUSER_PASSWORD
                ) {
                    return {
                        id: "superuser", 
                        name: "Superuser",
                        email: process.env.NEXTAUTH_SUPERUSER_EMAIL,
                        
                    }
                }

                const userFound = await db.user.findUnique({
                    select: {
                        id: true,
                        status: true,
                        name: true,
                        lastName: true,
                        email: true,
                        password: true,
                        role:true,
                    },
                    where: {
                        email: credentials.email,
                    },
                })

                if (!userFound) throw new Error("Correo ingresado no registrado")
                

                if (!userFound.status) throw new Error("El Usuario está deshabilitado")
                

                const match = await bcrypt.compare(credentials.password, userFound.password)

                if (!match) throw new Error("Contraseña ingresada incorrecta")


                const name = userFound.name.split(" ")[0]
                const lastName = userFound.lastName.split(" ")[0]

                return {
                    id: userFound.id.toString(),
                    name: `${name} ${lastName}`,
                    email: userFound.email,
                }
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        jwt: async ({ token, user }:any) => {

            const dbUser = await db.user.findFirst({
                where:{
                    email:token.email
                }
            })
            if (!dbUser) {
                token.id = user!.id
                return token
            }
            return {
                id:dbUser.id,
                name:dbUser.name,
                email:dbUser.email,
                role:dbUser.role
            }
        },
        session: async ({ session, token }:any) => {
            if (token) {
                session.user = {
                    id: token.id,
                    name: token.name,
                    email: token.email,
                    role:token.role
                }
            }

            return session
        },
    },
} satisfies NextAuthOptions;