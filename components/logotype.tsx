import { Wallpoet } from 'next/font/google'
import { BotIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const font = Wallpoet({ subsets: ['latin'], weight: ['400'] })

export const Logotype = () => {
	return (
		<h1 className={cn(font.className, 'flex w-full items-start justify-center gap-3 text-[60px] uppercase')}>
			<BotIcon className='h-[80px] w-[80px] shrink-0' /> Horizon
		</h1>
	)
}
