// import NextAuth from 'next-auth'
// import { PrismaAdapter } from '@auth/prisma-adapter'
// import { database } from '@/lib/database'
// import authConfig from '@/auth.config'

// export const {
// 	handlers: { GET, POST },
// 	auth,
// 	signIn,
// 	signOut
// } = NextAuth({
// 	callbacks: {
// 		//@ts-ignore
// 		async session({ token, session }) {
// 			if (token.sub && session.user) {
// 				session.user.id = token.sub
// 			}

// 			return session
// 		},
// 		async jwt({ token }) {
// 			if (!token.sub) return token

// 			return token
// 		}
// 	},
// 	adapter: PrismaAdapter(database),
// 	session: { strategy: 'jwt' },
// 	...authConfig
// })
