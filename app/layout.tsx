import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { cn } from '@/lib/utils'
import './globals.css'

const font = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Horizon',
	description: 'Horizon - Your place to talk and hang out'
}

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={cn(font.className, 'bg-white dark:bg-[#313338]')}>
				<ThemeProvider attribute='class' defaultTheme='dark' enableSystem storageKey='horizon-theme'>
					{children}
				</ThemeProvider>
			</body>
		</html>
	)
}

export default RootLayout
