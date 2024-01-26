import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { database } from '@/lib/database'
import authConfig from '@/auth.config'
import { getUserById } from './services/user'

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut
} = NextAuth({
	callbacks: {
		//@ts-ignore
		async session({ token, session }) {
			if (token.sub && session.user) {
				session.user.id = token.sub
			}

			return session
		}
	},
	adapter: PrismaAdapter(database),
	session: { strategy: 'jwt' },
	...authConfig
})
