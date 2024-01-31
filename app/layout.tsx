import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { cn } from '@/lib/utils'
import { auth } from '@/auth'
import './globals.css'
import { ModalProvider } from '@/components/providers/modal-provider'

const font = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Horizon',
	description: 'Horizon - Your place to talk and hang out'
}

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
	const session = await auth()
	return (
		<SessionProvider session={session}>
			<html lang='en' suppressHydrationWarning>
				<body className={cn(font.className, 'bg-white dark:bg-[#313338]')}>
					<ThemeProvider attribute='class' defaultTheme='dark' enableSystem storageKey='horizon-theme'>
						<ModalProvider />
						{children}
					</ThemeProvider>
				</body>
			</html>
		</SessionProvider>
	)
}

export default RootLayout
