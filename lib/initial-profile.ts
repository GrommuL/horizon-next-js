// import { redirect } from 'next/navigation'
// import { currentUser } from '@/services/user'
// import { database } from '@/lib/database'
// import { REDIRECT_TO_LOGIN } from '@/lib/constants'

// export const initialProfile = async () => {
// 	const user = await currentUser()

// 	if (!user) return redirect(REDIRECT_TO_LOGIN)

// 	const profile = await database.profile.findUnique({ where: { userId: user.id } })

// 	if (profile) return profile

// 	const newProfile = database.profile.create({
// 		data: {
// 			userId: user.id || '',
// 			name: 'Username',
// 			imageUrl: '',
// 			email: user.email || ''
// 		}
// 	})

// 	return newProfile
// }

import { currentUser, redirectToSignIn } from '@clerk/nextjs'
import { database } from './database'

export const initialProfile = async () => {
	const user = await currentUser()

	if (!user) {
		return redirectToSignIn()
	}

	const profile = await database.profile.findUnique({
		where: {
			userId: user.id
		}
	})
	console.log(profile)

	if (profile) {
		return profile
	}

	const newProfile = await database.profile.create({
		data: {
			userId: user.id,
			name: user?.firstName && user?.lastName ? `${user?.firstName} ${user?.lastName}` : 'Username',
			imageUrl: user.imageUrl,
			email: user.emailAddresses[0].emailAddress
		}
	})

	return newProfile
}
