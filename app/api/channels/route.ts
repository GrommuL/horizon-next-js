import { NextResponse } from 'next/server'
import { MemberRole } from '@prisma/client'
import { currentProfile } from '@/services/profile'
import { database } from '@/lib/database'

export async function POST(request: Request) {
	try {
		const profile = await currentProfile()
		const { name, type } = await request.json()
		const { searchParams } = new URL(request.url)

		const serverId = searchParams.get('serverId')

		if (!profile) {
			return new NextResponse('Unauthorized', { status: 401 })
		}

		if (!serverId) {
			return new NextResponse('Server ID missing', { status: 400 })
		}

		if (name === 'general') {
			return new NextResponse("Name cannot be 'general'", { status: 400 })
		}

		const server = await database.server.update({
			where: {
				id: serverId,
				members: {
					some: {
						profileId: profile.id,
						role: {
							in: [MemberRole.ADMIN, MemberRole.MODERATOR]
						}
					}
				}
			},
			data: {
				channels: {
					create: {
						profileId: profile.id,
						name,
						type
					}
				}
			}
		})

		return NextResponse.json(server)
	} catch (error) {
		console.log('CHANNELS_POST', error)
		return new NextResponse('Internal Error', { status: 500 })
	}
}
