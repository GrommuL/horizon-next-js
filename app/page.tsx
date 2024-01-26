import { redirect } from 'next/navigation'
import { database } from '@/lib/database'
import { initialProfile } from '@/lib/initial-profile'
import { CreateServerModal } from '@/components/modals/create-server-modal'

const SetupPage = async () => {
	const profile = await initialProfile()

	const server = await database.server.findFirst({ where: { members: { some: { profileId: profile.id } } } })

	if (!!server) {
		return redirect(`/servers/${server.id}`)
	}

	return <CreateServerModal />
}
export default SetupPage
