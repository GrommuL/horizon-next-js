import { redirect } from 'next/navigation'
import { currentUser } from '@/services/user'
import { database } from '@/lib/database'
import { REDIRECT_TO_LOGIN } from '@/lib/constants'

export const initialProfile = async () => {
	const user = await currentUser()

	if (!user) return redirect(REDIRECT_TO_LOGIN)

	const profile = await database.profile.findUnique({ where: { userId: user.id } })

	if (profile) return profile

	const newProfile = database.profile.create({
		data: {
			userId: user.id || '',
			name: 'Username',
			imageUrl: '',
			email: user.email || ''
		}
	})

	return newProfile
}
