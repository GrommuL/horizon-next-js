// import { auth } from '@/auth'
// import { database } from '@/lib/database'

// export const getUserByEmail = async (email: string) => {
// 	try {
// 		const user = database.profile.findFirst({ where: { email } })

// 		return user
// 	} catch {
// 		return null
// 	}
// }

// export const getUserById = async (id: string) => {
// 	try {
// 		const user = database.profile.findUnique({ where: { id } })

// 		return user
// 	} catch {
// 		return null
// 	}
// }

// export const currentUser = async () => {
// 	const session = await auth()
// 	return session?.user
// }

// export const currentUserSession = async () => {
// 	const session = await auth()
// 	return session
// }
