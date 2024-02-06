import { redirect } from 'next/navigation'
import { DEFAULT_AUTH_REDIRECT, REDIRECT_TO_LOGIN } from '@/lib/constants'
import { currentProfile } from '@/services/profile'
import { database } from '@/lib/database'

type InviteCodePageProps = {
	params: {
		inviteCode: string
	}
}

const InviteCodePage = async ({ params }: InviteCodePageProps) => {
	const profile = await currentProfile()

	if (!profile) redirect(REDIRECT_TO_LOGIN)

	if (!params.inviteCode) redirect(DEFAULT_AUTH_REDIRECT)

	const existingServer = await database.server.findFirst({
		where: { inviteCode: params.inviteCode, members: { some: { profileId: profile.id } } }
	})

	if (existingServer) redirect(`/servers/${existingServer.id}`)

	const server = await database.server.update({
		where: { inviteCode: params.inviteCode },
		data: { members: { create: [{ profileId: profile.id }] } }
	})

	if (server) redirect(`/servers/${server.id}`)

	return null
}
export default InviteCodePage
