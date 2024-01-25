'use client'

import * as z from 'zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { CircleDashedIcon } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { RegisterSchema } from '@/schemas'
import { registerUser } from '@/actions/register-user'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'

export const RegisterForm = () => {
	const [isPending, setTransition] = useTransition()
	const [error, setError] = useState<string | undefined>('')
	const [success, setSuccess] = useState<string | undefined>('')

	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: ''
		}
	})

	const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
		setError('')
		setSuccess('')

		setTransition(() => {
			registerUser(values).then((data) => {
				if (data?.error) {
					form.reset()
					setError(data.error)
				}

				if (data?.success) {
					form.reset()
					setSuccess(data.success)
				}
			})
		})
	}

	return (
		<CardWrapper backButtonHref='/login' backButtonLabel='У вас уже есть учетная запись?' description='Регистрация аккаунта'>
			<Form {...form}>
				<form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-xs font-bold uppercase text-zinc-500 dark:text-zinc-200'>Почта</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='example@mail.com'
											type='email'
											disabled={isPending}
											className='border-0 bg-zinc-300/25 text-black focus-visible:ring-0 focus-visible:ring-offset-0 dark:text-white dark:placeholder:text-white/55'
										/>
									</FormControl>
									<FormMessage className='text-xs dark:text-rose-500' />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-xs font-bold uppercase text-zinc-500 dark:text-zinc-200'>Пароль</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='******'
											type='password'
											disabled={isPending}
											className='border-0 bg-zinc-300/25 text-black focus-visible:ring-0 focus-visible:ring-offset-0 dark:text-white dark:placeholder:text-white/55'
										/>
									</FormControl>
									<FormMessage className='text-xs dark:text-rose-500' />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='confirmPassword'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-xs font-bold uppercase text-zinc-500 dark:text-zinc-200'>Повторите пароль</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='******'
											type='password'
											disabled={isPending}
											className='border-0 bg-zinc-300/25 text-black focus-visible:ring-0 focus-visible:ring-offset-0 dark:text-white dark:placeholder:text-white/55'
										/>
									</FormControl>
									<FormMessage className='text-xs dark:text-rose-500' />
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button variant='default' className='w-full font-bold' size='lg' type='submit' disabled={isPending}>
						{isPending ? <CircleDashedIcon className='animate-spin' /> : 'Создать аккаунт'}
					</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}
