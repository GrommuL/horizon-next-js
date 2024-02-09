'use client'

import qs from 'query-string'
import axios from 'axios'
import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useModal } from '@/hooks/use-modal-store'
import { useRouter } from 'next/navigation'

export const DeleteChannelModal = () => {
	const { isOpen, onClose, type, data } = useModal()
	const router = useRouter()

	const { server, channel } = data

	const [isLoading, setIsLoading] = useState(false)

	const isModalOpen = isOpen && type === 'deleteChannel'

	const onClick = async () => {
		try {
			setIsLoading(true)

			const url = qs.stringifyUrl({
				url: `/api/channels/${channel?.id}`,
				query: {
					serverId: server?.id
				}
			})

			await axios.delete(url)

			onClose()
			router.refresh()
			router.push(`/servers/${server?.id}`)
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Dialog open={isModalOpen} onOpenChange={onClose}>
			<DialogContent className='overflow-hidden p-0 dark:bg-zinc-300/5'>
				<DialogHeader className='px-6 pt-8'>
					<DialogTitle className='text-center text-2xl font-bold text-zinc-700 dark:text-zinc-300'>Удалить канал</DialogTitle>
					<DialogDescription className='text-center text-zinc-500'>
						Вы уверены, что хотите удалить канал? <br />
						<span className='font-semibold text-indigo-500'>#{channel?.name}</span> будет удален навсегда.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className='px-6 py-4'>
					<div className='flex w-full items-center justify-between'>
						<Button disabled={isLoading} onClick={onClose} variant='ghost'>
							Отмена
						</Button>
						<Button disabled={isLoading} onClick={onClick}>
							Удалить
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
