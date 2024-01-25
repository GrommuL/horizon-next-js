import { CheckCircledIcon } from '@radix-ui/react-icons'

type FormSuccessProps = {
	message?: string
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
	if (!message) {
		return null
	}

	return (
		<div className='flex items-center justify-center gap-x-2 rounded-md bg-green-500/15 p-3 text-sm text-green-700 dark:bg-emerald-500/15 dark:text-emerald-500'>
			<CheckCircledIcon className='h-4 w-4' />
			<p>{message}</p>
		</div>
	)
}
