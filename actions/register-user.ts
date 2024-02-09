// 'use server'

// import * as z from 'zod'
// import bcrypt from 'bcryptjs'
// import { AuthError } from 'next-auth'
// import { signIn } from '@/auth'
// import { DEFAULT_AUTH_REDIRECT } from '@/lib/constants'
// import { RegisterSchema } from '@/schemas'
// import { getUserByEmail } from '@/services/user'
// import { database } from '@/lib/database'

// export const registerUser = async (values: z.infer<typeof RegisterSchema>) => {
// 	const validateFields = RegisterSchema.safeParse(values)

// 	if (!validateFields.success) return { error: 'Вы ввели неверные данные!' }

// 	const { password, email } = validateFields.data

// 	const hashedPassword = await bcrypt.hash(password, 10)

// 	const existingUser = await getUserByEmail(email)

// 	if (existingUser) return { error: 'Пользователь с такой почтой уже существует' }

// 	// await database.profile.create({
// 	// 	data: {
// 	// 		email,
// 	// 		password: hashedPassword
// 	// 	}
// 	// })

// 	try {
// 		await signIn('credentials', {
// 			email,
// 			password,
// 			redirectTo: DEFAULT_AUTH_REDIRECT
// 		})

// 		return { success: 'Пользователь успешно создан' }
// 	} catch (error) {
// 		if (error instanceof AuthError) {
// 			switch (error.type) {
// 				case 'CredentialsSignin':
// 					return { error: 'Неверные данные!' }
// 				default:
// 					return { error: 'Что-то пошло не так!' }
// 			}
// 		}

// 		throw error
// 	}
// }
