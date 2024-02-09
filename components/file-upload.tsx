'use client'

import Image from 'next/image'
import { FileIcon, X } from 'lucide-react'
import { UploadDropzone } from '@/lib/uploadthing'

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

	if (value && fileType === 'pdf') {
		return (
			<div className='relative mt-2 flex items-center rounded-md bg-background/10 p-2'>
				<FileIcon className='h-10 w-10 fill-indigo-200 stroke-indigo-400' />
				<a href={value} target='_blank' rel='noopener noreferrer' className='ml-2 text-sm text-indigo-500 hover:underline dark:text-indigo-400'>
					{value}
				</a>
				<button onClick={() => onChange('')} className='absolute -right-2 -top-2 rounded-full bg-rose-500 p-1 text-white shadow-sm' type='button'>
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
