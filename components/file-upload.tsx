'use client'

import Image from 'next/image'
import { UploadDropzone } from '@/lib/uploadthing'
import { X } from 'lucide-react'

type FileUploadProps = {
	onChange: (url?: string) => void
	value: string
	endpoint: 'messageFile' | 'serverImage'
}

export const FileUpload = ({ endpoint, value, onChange }: FileUploadProps) => {
	const fileType = value?.split('.').pop()

	if (value && fileType !== 'pdf') {
		return (
			<div className='relative h-20 w-20 '>
				<Image fill src={value} alt='Upload' className='rounded-full bg-zinc-300 object-cover object-center dark:bg-zinc-300/35' sizes='100%' />
				<button
					className='absolute right-0 top-0 flex items-center justify-center rounded-full bg-rose-500 p-1 text-white shadow-sm hover:bg-rose-600'
					type='button'
					onClick={() => onChange('')}
				>
					<X className='h-4 w-4' />
				</button>
			</div>
		)
	}
	return (
		<UploadDropzone
			className='ut-allowed-content:dark:text-zinc-500 ut-label:dark:text-zinc-300 ut-label:dark:hover:text-zinc-400'
			endpoint={endpoint}
			onClientUploadComplete={(response) => onChange(response?.[0].url)}
			onUploadError={(error: Error) => console.log(error)}
		/>
	)
}
