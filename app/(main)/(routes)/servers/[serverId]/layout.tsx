import { redirect } from 'next/navigation'
import { DEFAULT_AUTH_REDIRECT, REDIRECT_TO_LOGIN } from '@/lib/constants'
import { currentProfile } from '@/services/profile'
import { database } from '@/lib/database'
import { ServerSidebar } from '@/components/server/server-sidebar'

const ServerIdLayout = async ({ children, params }: { children: React.ReactNode; params: { serverId: string } }) => {
	const profile = await currentProfile()

	if (!profile) return redirect(REDIRECT_TO_LOGIN)

	const server = await database.server.findUnique({ where: { id: params.serverId, members: { some: { profileId: profile.id } } } })

	if (!server) return redirect(DEFAULT_AUTH_REDIRECT)

	return (
		<div className='h-full'>
			<div className='fixed inset-y-0 z-20 hidden h-full w-60 flex-col md:flex'>
				<ServerSidebar serverId={params.serverId} />
			</div>
			<main className='h-full md:pl-60'>{children}</main>
		</div>
	)
}
export default ServerIdLayout
