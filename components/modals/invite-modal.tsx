'use client'

import axios from 'axios'
import { useState } from 'react'
import { CheckIcon, CopyIcon, RefreshCwIcon } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useModal } from '@/hooks/use-modal-store'
import { useOrigin } from '@/hooks/use-origin'
import { cn } from '@/lib/utils'

export const InviteModal = () => {
	const { onOpen, isOpen, onClose, type, data } = useModal()

	const { server } = data

	const [copied, setCopied] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const origin = useOrigin()

	const isModalOpen = isOpen && type === 'invite'

	const inviteUrl = `${origin}/invite/${server?.inviteCode}`

	const onCopy = () => {
		navigator.clipboard.writeText(inviteUrl)
		setCopied(true)

		setTimeout(() => setCopied(false), 1000)
	}

	const generateNewInviteLink = async () => {
		try {
			setIsLoading(true)
			const response = await axios.patch(`/api/servers/${server?.id}/invite-code`)

			onOpen('invite', { server: response.data })
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
					<DialogTitle className='text-center text-2xl font-bold text-zinc-700 dark:text-zinc-300'>Пригласи своих друзей</DialogTitle>
				</DialogHeader>
				<div className='p-6'>
					<Label className='text-xs font-bold uppercase text-zinc-500'>Ссылка для приглашения на сервер</Label>
					<div className='mt-2 flex items-center gap-x-2'>
						<Input
							disabled={isLoading}
							className='border-0 bg-zinc-300/35 text-black focus-visible:ring-0 focus-visible:ring-offset-0 dark:text-white dark:placeholder:text-white/55'
							value={inviteUrl}
						/>
						<Button disabled={isLoading} size='icon' onClick={onCopy}>
							{copied ? <CheckIcon /> : <CopyIcon className='h-4 w-4' />}
						</Button>
					</div>
					<Button disabled={isLoading} onClick={generateNewInviteLink} variant='link' size='sm' className='mt-4 text-xs text-zinc-500'>
						Сгенерировать новую ссылку для приглашения
						<RefreshCwIcon className={cn('ml-2 h-4 w-4', isLoading ? 'animate-spin' : '')} />
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
