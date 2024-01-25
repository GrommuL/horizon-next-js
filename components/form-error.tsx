import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

type FormErrorProps = {
	message?: string
}

export const FormError = ({ message }: FormErrorProps) => {
	if (!message) {
		return null
	}

	return (
		<div className='flex items-center justify-center gap-x-2 rounded-md bg-destructive/25 p-3 text-sm text-destructive dark:bg-red-500/15 dark:text-red-600'>
			<ExclamationTriangleIcon className='h-4 w-4' />
			<p>{message}</p>
		</div>
	)
}
