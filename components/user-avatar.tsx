import { UserRoundIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

interface UserAvatarProps {
	src?: string
	className?: string
}

export const UserAvatar = ({ src, className }: UserAvatarProps) => {
	return (
		<Avatar className={cn('h-7 w-7 md:h-10 md:w-10', className)}>
			<AvatarImage width={28} height={28} src={src} />
			<AvatarFallback className='bg-zinc-400/50 text-primary dark:text-white'>
				<UserRoundIcon width={28} height={28} />
			</AvatarFallback>
		</Avatar>
	)
}
