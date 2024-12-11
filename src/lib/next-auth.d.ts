import 'next-auth/jwt'
import type { User } from "next-auth"

type UserId = number

declare module 'next-auth/jwt' {
    interface JWT {
        id: UserId
        role: number
    }
}

declare module 'next-auth' {
    interface Session {
        user: {
            id: UserId
            role: number
            email: string
            name: string
        }
    }
}