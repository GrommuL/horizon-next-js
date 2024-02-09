'use client'

import { useRouter } from 'next/navigation'
import { UserRoundIcon } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ActionTooltip } from '@/components/action-tooltip'

type UserButtonProps = {
	profileUrl: string
	profileName: string
}

export const UserButtonAuth = ({ profileUrl, profileName }: UserButtonProps) => {
	const router = useRouter()

	const signOut = () => {
		router.refresh()
	}

	return (
		<DropdownMenu>
			<ActionTooltip side='right' align='center' label={profileName}>
				<DropdownMenuTrigger>
					<Avatar>
						<AvatarImage width={48} height={48} src={profileUrl} />
						<AvatarFallback className='bg-zinc-400/50 text-primary dark:text-white'>
							<UserRoundIcon width={28} height={28} />
						</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
			</ActionTooltip>
			<DropdownMenuContent>
				<DropdownMenuItem onClick={signOut}>Logout</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
