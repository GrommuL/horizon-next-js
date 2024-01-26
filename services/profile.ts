import { currentUser } from '@/services/user'
import { database } from '@/lib/database'

export const currentProfile = async () => {
	const user = await currentUser()

	if (!user?.id) {
		return null
	}

	const profile = database.profile.findUnique({ where: { userId: user.id } })

	return profile
}
