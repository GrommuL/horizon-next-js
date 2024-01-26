import { currentUser } from '@/services/user'
import { createUploadthing, type FileRouter } from 'uploadthing/next'

const f = createUploadthing()

const handleAuth = async () => {
	const user = await currentUser()

	if (!user?.id) throw new Error('Вы не авторизованны')

	return { userId: user.id }
}

export const ourFileRouter = {
	serverImage: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
		.middleware(() => handleAuth())
		.onUploadComplete(() => {}),
	messageFile: f(['image', 'pdf'])
		.middleware(() => handleAuth())
		.onUploadComplete(() => {})
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
