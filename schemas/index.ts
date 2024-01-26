import * as z from 'zod'

export const LoginSchema = z.object({
	email: z
		.string()
		.min(1, {
			message: 'Почта обязательна для заполнения'
		})
		.email({
			message: 'Неверный адрес электронной почты'
		}),
	password: z.string().min(1, {
		message: 'Пароль обязателен для заполнения'
	})
})

export const RegisterSchema = z
	.object({
		email: z
			.string()
			.min(1, {
				message: 'Почта обязательна для заполнения'
			})
			.email({
				message: 'Неверный адрес электронной почты'
			}),
		password: z
			.string()
			.min(6, {
				message: 'Пароль должен состоять минимум из 6 символов'
			})
			.max(20)
			.refine((value) => !/\s/.test(value), 'Пароль не должен содержать пробелы'),
		confirmPassword: z.string().min(6, { message: 'Пароль должен состоять минимум из 6 символов' })
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Пароль не совпадает',
		path: ['confirmPassword']
	})

export const ServerSchema = z.object({
	name: z.string().min(1, {
		message: 'Название сервера обязательно для заполнения'
	}),
	imageUrl: z.string().min(1, {
		message: 'Изображение сервера обязательно для заполнения'
	})
})
