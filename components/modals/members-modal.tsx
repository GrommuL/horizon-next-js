'use client'

import qs from 'query-string'
import axios from 'axios'
import { MemberRole } from '@prisma/client'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { UserAvatar } from '@/components/user-avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useModal } from '@/hooks/use-modal-store'
import { ServerWithMembersWithProfiles } from '@/types'
import { Check, Gavel, Loader2, MoreVertical, Shield, ShieldAlert, ShieldCheck, ShieldQuestion } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const roleIconMap = {
	GUEST: null,
	MODERATOR: <ShieldCheck className='ml-2 h-4 w-4 text-indigo-500' />,
	ADMIN: <ShieldAlert className='h-4 w-4 text-rose-500' />
}

export const MembersModal = () => {
	const router = useRouter()
	const { onOpen, isOpen, onClose, type, data } = useModal()
	const [loadingId, setLoadingId] = useState('')

	const { server } = data as { server: ServerWithMembersWithProfiles }

	const isModalOpen = isOpen && type === 'members'

	const onKick = async (memberId: string) => {
		try {
			setLoadingId(memberId)
			const url = qs.stringifyUrl({
				url: `/api/members/${memberId}`,
				query: {
					serverId: server?.id
				}
			})

			const response = await axios.delete(url)

			router.refresh()
			onOpen('members', { server: response.data })
		} catch (error) {
			console.log(error)
		} finally {
			setLoadingId('')
		}
	}

	const onRoleChange = async (memberId: string, role: MemberRole) => {
		try {
			setLoadingId(memberId)

			const url = qs.stringifyUrl({
				url: `/api/members/${memberId}`,
				query: {
					serverId: server?.id
				}
			})

			const response = await axios.patch(url, { role })

			router.refresh()

			onOpen('members', { server: response.data })
		} catch (error) {
			console.log(error)
		} finally {
			setLoadingId('')
		}
	}

	return (
		<Dialog open={isModalOpen} onOpenChange={onClose}>
			<DialogContent className='overflow-hidden dark:bg-zinc-300/5'>
				<DialogHeader className='px-5 pt-8'>
					<DialogTitle className='text-center text-2xl font-bold text-zinc-700 dark:text-zinc-300'>Управление участниками сервера</DialogTitle>
					<DialogDescription className='text-center'>{server?.members?.length} members</DialogDescription>
				</DialogHeader>
				<ScrollArea className='mt-8 max-h-[420px] pr-6'>
					{server?.members?.map((member) => (
						<div key={member.id} className='mb-6 flex items-center gap-x-2'>
							<UserAvatar src={member.profile.imageUrl} />
							<div className='flex flex-col gap-y-1'>
								<div className='flex items-center gap-x-1 text-xs font-semibold'>
									{member?.profile?.name}
									{roleIconMap[member.role]}
								</div>
								<p className='text-xs text-zinc-500'>{member.profile.email}</p>
							</div>
							{server.profileId !== member.profileId && loadingId !== member.id && (
								<div className='ml-auto'>
									<DropdownMenu>
										<DropdownMenuTrigger>
											<MoreVertical className='h-4 w-4 text-zinc-500' />
										</DropdownMenuTrigger>
										<DropdownMenuContent side='left'>
											<DropdownMenuSub>
												<DropdownMenuSubTrigger className='flex items-center'>
													<ShieldQuestion className='mr-2 h-4 w-4' />
													<span>Роль</span>
												</DropdownMenuSubTrigger>
												<DropdownMenuPortal>
													<DropdownMenuSubContent>
														<DropdownMenuItem onClick={() => onRoleChange(member.id, 'GUEST')}>
															<Shield className='mr-2 h-4 w-4' />
															Гость
															{member.role === 'GUEST' && <Check className='ml-auto h-4 w-4' />}
														</DropdownMenuItem>
														<DropdownMenuItem onClick={() => onRoleChange(member.id, 'MODERATOR')}>
															<ShieldCheck className='mr-2 h-4 w-4' />
															Модератор
															{member.role === 'MODERATOR' && <Check className='ml-auto h-4 w-4' />}
														</DropdownMenuItem>
													</DropdownMenuSubContent>
												</DropdownMenuPortal>
											</DropdownMenuSub>
											<DropdownMenuSeparator />
											<DropdownMenuItem onClick={() => onKick(member.id)}>
												<Gavel className='mr-2 h-4 w-4' />
												Выгнать с сервера
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							)}
							{loadingId === member.id && <Loader2 className='ml-auto h-4 w-4 animate-spin text-zinc-500' />}
						</div>
					))}
				</ScrollArea>
			</DialogContent>
		</Dialog>
	)
}
