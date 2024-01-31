import { NextResponse } from 'next/server'
import { createId } from '@paralleldrive/cuid2'
import { currentProfile } from '@/services/profile'
import { database } from '@/lib/database'

export async function PATCH(request: Request, { params }: { params: { serverId: string } }) {
	try {
		const profile = await currentProfile()

		if (!profile) return new NextResponse('Unauthorized', { status: 401 })

		if (!params.serverId) return new NextResponse('Server ID Missing', { status: 400 })

		const server = await database.server.update({ where: { id: params.serverId, profileId: profile.id }, data: { inviteCode: createId() } })

		return NextResponse.json(server)
	} catch (error) {
		console.log('[SERVER_ID]', error)
		return new NextResponse('Internal Error', { status: 500 })
	}
}
