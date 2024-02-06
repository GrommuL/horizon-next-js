'use client'

import * as z from 'zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { CircleDashedIcon } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { ServerSchema } from '@/schemas'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FileUpload } from '@/components/file-upload'
import { useRouter } from 'next/navigation'
import { useModal } from '@/hooks/use-modal-store'
import { useEffect } from 'react'

export const EditServerModal = () => {
	const { isOpen, onClose, type, data } = useModal()
	const router = useRouter()

	const isModalOpen = isOpen && type === 'editServer'

	const { server } = data

	const form = useForm({
		resolver: zodResolver(ServerSchema),
		defaultValues: {
			name: '',
			imageUrl: ''
		}
	})

	useEffect(() => {
		if (server) {
			form.setValue('name', server.name)
			form.setValue('imageUrl', server.imageUrl)
		}
	}, [server, form])

	const isLoading = form.formState.isSubmitting

	const onSubmit = async (values: z.infer<typeof ServerSchema>) => {
		try {
			await axios.patch(`/api/servers/${server?.id}`, values)

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
					<DialogTitle className='text-center text-2xl font-bold text-zinc-700 dark:text-zinc-300'>Создай свой сервер</DialogTitle>
					<DialogDescription className='text-center text-zinc-500 dark:text-zinc-500'>
						Придайте своему серверу индивидуальность. Вы всегда можете изменить его позже.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form className='space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
						<div className='space-y-8 px-6'>
							<div className='flex items-center justify-center text-center'>
								<FormField
									control={form.control}
									name='imageUrl'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<FileUpload endpoint='serverImage' value={field.value} onChange={field.onChange} />
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-xs font-bold uppercase text-zinc-500 dark:text-zinc-200'>Название сервера</FormLabel>
										<FormControl>
											<Input
												placeholder='Введите имя сервера'
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
						</div>
						<DialogFooter className='px-6 py-4'>
							<Button variant='default' className='font-bold' size='lg' type='submit' disabled={isLoading}>
								{isLoading ? <CircleDashedIcon className='animate-spin' /> : 'Сохранить'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
