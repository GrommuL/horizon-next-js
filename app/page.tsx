import { auth, signOut } from '@/auth'
import { Button } from '@/components/ui/button'

const HomePage = async () => {
	const session = await auth()

	return (
		<div className='flex h-full items-center justify-center'>
			{JSON.stringify(session)}
			<form
				action={async () => {
					'use server'

					await signOut()
				}}
			>
				<Button type='submit'>Logout</Button>
			</form>
		</div>
	)
}
export default HomePage
