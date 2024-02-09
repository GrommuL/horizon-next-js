'use server'

import * as z from 'zod'
import { AuthError } from 'next-auth'
import { signIn } from '@/auth'
import { LoginSchema } from '@/schemas'
import { DEFAULT_AUTH_REDIRECT } from '@/lib/constants'
import { getUserByEmail } from '@/services/user'

export const loginUser = async (values: z.infer<typeof LoginSchema>) => {
	const validateFields = LoginSchema.safeParse(values)

	if (!validateFields.success) return { error: 'Неправильный логин или пароль' }

	const { email, password } = validateFields.data

	const existingUser = await getUserByEmail(email)

	if (!existingUser || !existingUser.email) {
		return { error: 'Пользователь с такой почтой не существует!' }
	}

	try {
		await signIn('credentials', {
			email,
			password,
			redirectTo: DEFAULT_AUTH_REDIRECT
		})

		return { success: 'Вы успешно вошли в аккаунт!' }
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return { error: 'Неправильный логин или пароль' }
				default:
					return { error: 'Что-то пошло не так!' }
			}
		}

		throw error
	}
}
