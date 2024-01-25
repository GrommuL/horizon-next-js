'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { BackButton } from '@/components/auth/back-button'
import { Logotype } from '@/components/logotype'

type CardWrapperProps = {
	children: React.ReactNode
	description: string
	backButtonLabel: string
	backButtonHref: string
}

export const CardWrapper = ({ children, backButtonHref, backButtonLabel, description }: CardWrapperProps) => {
	return (
		<Card className='w-full max-w-[500px] shadow-md dark:bg-zinc-300/5'>
			<CardHeader className='flex flex-col items-center'>
				<Logotype />
				<p className='text-sm font-bold text-zinc-500 dark:text-zinc-200'>{description}</p>
			</CardHeader>
			<CardContent>{children}</CardContent>
			<CardFooter>
				<BackButton label={backButtonLabel} href={backButtonHref} />
			</CardFooter>
		</Card>
	)
}
