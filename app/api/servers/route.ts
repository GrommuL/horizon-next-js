import { createId } from '@paralleldrive/cuid2'
import { currentProfile } from '@/services/profile'
import { NextResponse } from 'next/server'
import { database } from '@/lib/database'
import { MemberRole } from '@prisma/client'

export async function POST(request: Request) {
	try {
		const { name, imageUrl } = await request.json()

		const profile = await currentProfile()

		if (!profile) return new NextResponse('Unauthorize', { status: 401 })

		const server = await database.server.create({
			data: {
				profileId: profile.id,
				name,
				imageUrl,
				inviteCode: createId(),
				channels: {
					create: [{ name: 'general', profileId: profile.id }]
				},
				members: {
					create: [{ profileId: profile.id, role: MemberRole.ADMIN }]
				}
			}
		})

		return NextResponse.json(server)
	} catch (error) {
		console.log('[SERVERS_POST]', error)
		return new NextResponse('Internal Error', { status: 500 })
	}
}
