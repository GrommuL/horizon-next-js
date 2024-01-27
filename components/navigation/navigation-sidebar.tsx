import { redirect } from 'next/navigation'
import { DEFAULT_AUTH_REDIRECT } from '@/lib/constants'
import { currentProfile } from '@/services/profile'
import { database } from '@/lib/database'
import { NavigationAction } from '@/components/navigation/navigation-action'
import { NavigationItem } from '@/components/navigation/navigation-item'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { UserButton } from '@/components/user-button'

export const NavigationSidebar = async () => {
	const profile = await currentProfile()

	if (!profile) return redirect(DEFAULT_AUTH_REDIRECT)

	const servers = await database.server.findMany({ where: { members: { some: { profileId: profile.id } } } })

	return (
		<aside className='flex h-full w-full flex-col items-center space-y-4 border-r border-zinc-300/60 py-3 text-primary dark:border-0 dark:bg-[#1E1F22]'>
			<NavigationAction />
			<Separator className='mx-auto h-[2px] w-10 rounded-md bg-zinc-300 dark:bg-zinc-700' />
			<ScrollArea className='w-full flex-1'>
				{servers.map((server) => (
					<div key={server.id} className='mb-4'>
						<NavigationItem id={server.id} name={server.name} imageUrl={server.imageUrl} />
					</div>
				))}
			</ScrollArea>
			<div className='mt-auto flex flex-col items-center gap-y-4 pb-3'>
				<ThemeSwitcher />
				<UserButton profileUrl={profile.imageUrl} profileName={profile.name} />
			</div>
		</aside>
	)
}
