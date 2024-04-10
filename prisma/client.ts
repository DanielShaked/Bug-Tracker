import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
    return new PrismaClient()
}

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

// import { Pool } from 'pg'
// import { PrismaPg } f`rom '@prisma/adapter-pg'
// import { PrismaClient } from '@prisma/client'

// const connectionString = "postgres://postgres.pswkwxzussmfcgjlgtwf:BugtrackerDash1998!@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"

// const pool = new Pool({ connectionString })
// const adapter = new PrismaPg(pool)
// const prisma = new PrismaClient({ adapter })

// export default prisma



// import { PrismaClient } from '@prisma/client';

// let prisma: PrismaClient;

// if (process.env.NODE_ENV === 'production') {
//     prisma = new PrismaClient();
// } else {
//     if (!global.prisma) {
//         global.prisma = new PrismaClient();
//     }
//     prisma = global.prisma;
// }

// export default prisma;