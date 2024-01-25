import { ThemeSwitcher } from '@/components/theme-switcher'

export const AuthHeader = () => {
	return (
		<header className='flex w-full items-center justify-end p-[12px] text-black'>
			<ThemeSwitcher />
		</header>
	)
}
