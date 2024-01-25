import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { database } from '@/lib/database'
import authConfig from '@/auth.config'

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut
} = NextAuth({
	adapter: PrismaAdapter(database),
	session: { strategy: 'jwt' },
	...authConfig
})
