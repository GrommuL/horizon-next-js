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
