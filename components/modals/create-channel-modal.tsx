'use client'

import * as z from 'zod'
import axios from 'axios'
import qs from 'query-string'
import { useForm } from 'react-hook-form'
import { CircleDashedIcon } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChannelSchema } from '@/schemas'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useParams, useRouter } from 'next/navigation'
import { useModal } from '@/hooks/use-modal-store'
import { ChannelType } from '@prisma/client'

export const CreateChannelModal = () => {
	const { isOpen, onClose, type } = useModal()
	const router = useRouter()
	const params = useParams()

	const isModalOpen = isOpen && type === 'createChannel'

	const form = useForm({
		resolver: zodResolver(ChannelSchema),
		defaultValues: {
			name: '',
			type: ChannelType.TEXT
		}
	})

	const isLoading = form.formState.isSubmitting

	const onSubmit = async (values: z.infer<typeof ChannelSchema>) => {
		try {
			const url = qs.stringifyUrl({
				url: '/api/channels',
				query: {
					serverId: params?.serverId
				}
			})

			await axios.post(url, values)

			form.reset()
			router.refresh()
			onClose()
		} catch (error) {
			console.log(error)
		}
	}

	const handleClose = () => {
		form.reset()
		onClose()
	}

	return (
		<Dialog open={isModalOpen} onOpenChange={handleClose}>
			<DialogContent className='overflow-hidden p-0 dark:bg-zinc-300/5'>
				<DialogHeader className='px-6 pt-8'>
					<DialogTitle className='text-center text-2xl font-bold text-zinc-700 dark:text-zinc-300'>Создание канала</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form className='space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
						<div className='space-y-8 px-6'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-xs font-bold uppercase text-zinc-500 dark:text-zinc-200'>Название канала</FormLabel>
										<FormControl>
											<Input
												placeholder='Введите имя канала'
												type='text'
												disabled={isLoading}
												className='border-0 bg-zinc-300/35 text-black focus-visible:ring-0 focus-visible:ring-offset-0 dark:text-white dark:placeholder:text-white/55'
												{...field}
											/>
										</FormControl>
										<FormMessage className='text-xs dark:text-rose-500' />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='type'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Тип канала</FormLabel>
										<Select disabled={isLoading} onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger className='border-0 bg-zinc-300/50 capitalize text-black outline-none ring-offset-0 focus:ring-0 focus:ring-offset-0'>
													<SelectValue placeholder='Select a channel type' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{Object.values(ChannelType).map((type) => (
													<SelectItem key={type} value={type} className='capitalize'>
														{type.toLowerCase()}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<DialogFooter className='px-6 py-4'>
							<Button variant='default' className='font-bold' size='lg' type='submit' disabled={isLoading}>
								{isLoading ? <CircleDashedIcon className='animate-spin' /> : 'Создать'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
