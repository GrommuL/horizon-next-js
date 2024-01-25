import { AuthHeader } from '@/components/auth/auth-header'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='flex h-full flex-col'>
			<AuthHeader />
			<div className='flex h-full items-center justify-center'>{children}</div>
		</div>
	)
}

export default AuthLayout
