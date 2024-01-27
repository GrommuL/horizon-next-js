'use client'

import * as React from 'react'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export const ThemeSwitcher = () => {
	const { setTheme } = useTheme()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='outline'
					size='icon'
					className='bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 dark:border-zinc-300/20 dark:text-white dark:hover:bg-zinc-300/25'
				>
					<SunIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
					<MoonIcon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
					<span className='sr-only'>Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem onClick={() => setTheme('light')}>Светлая</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('dark')}>Темная</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('system')}>Система</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
