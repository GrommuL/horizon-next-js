'use client'

import { logout } from '@/actions/logout'
import { Button } from '@/components/ui/button'

const ServerPage = () => {
	const handleLogout = () => {
		logout()
	}

	return (
		<div>
			<Button onClick={handleLogout}>Logout</Button>
		</div>
	)
}
export default ServerPage
