import { PrismaClient } from "@prisma/client";

type GlobalWithPrisma = typeof globalThis & {
    prisma?: PrismaClient; 
}

let prism: PrismaClient | null = null


const PrismaClientSingleton = (): PrismaClient => {
    if (!prism) {
        prism = new PrismaClient()
    }
    return prism
}


const GlobalForPrisma: GlobalWithPrisma = globalThis

const prisma: PrismaClient = GlobalForPrisma.prisma ?? PrismaClientSingleton();

export default prisma


if (process.env.NODE_ENV !== "production") {
    GlobalForPrisma.prisma = prisma
}
//todo