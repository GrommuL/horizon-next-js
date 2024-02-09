import { auth } from '@clerk/nextjs'
import { database } from '@/lib/database'

import { NextApiRequest } from 'next'
import { getAuth } from '@clerk/nextjs/server'

export const currentProfile = async () => {
	const { userId } = auth()

	if (!userId) {
		return null
	}

	const profile = await database.profile.findUnique({
		where: {
			userId
		}
	})

	return profile
}

export const currentProfilePages = async (req: NextApiRequest) => {
	const { userId } = getAuth(req)

	if (!userId) {
		return null
	}

	const profile = await database.profile.findUnique({
		where: {
			userId
		}
	})

	return profile
}
