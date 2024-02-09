import { redirect, useRouter } from 'next/navigation'
import { ChannelType } from '@prisma/client'

import { database } from '@/lib/database'
import { currentProfile } from '@/services/profile'
import { REDIRECT_TO_LOGIN } from '@/lib/constants'
import { ChatHeader } from '@/components/chat/chat-header'
import { ChatInput } from '@/components/chat/chat-input'
import { ChatMessages } from '@/components/chat/chat-messages'
import { MediaRoom } from '@/components/media-room'

interface ChannelIdPageProps {
	params: {
		serverId: string
		channelId: string
	}
}

const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {
	const profile = await currentProfile()

	if (!profile) {
		return redirect(REDIRECT_TO_LOGIN)
	}

	const channel = await database.channel.findUnique({
		where: {
			id: params.channelId
		}
	})

	const member = await database.member.findFirst({
		where: {
			serverId: params.serverId,
			profileId: profile.id
		}
	})

	if (!channel || !member) {
		redirect('/')
	}

	return (
		<div className='flex h-full flex-col bg-white dark:bg-[#313338]'>
			<ChatHeader name={channel.name} serverId={channel.serverId} type='channel' />
			{channel.type === ChannelType.TEXT && (
				<>
					<ChatMessages
						member={member}
						name={channel.name}
						chatId={channel.id}
						type='channel'
						apiUrl='/api/messages'
						socketUrl='/api/socket/messages'
						socketQuery={{
							channelId: channel.id,
							serverId: channel.serverId
						}}
						paramKey='channelId'
						paramValue={channel.id}
					/>
					<ChatInput
						name={channel.name}
						type='channel'
						apiUrl='/api/socket/messages'
						query={{
							channelId: channel.id,
							serverId: channel.serverId
						}}
					/>
				</>
			)}
			{channel.type === ChannelType.AUDIO && <MediaRoom chatId={channel.id} video={false} audio={true} />}
			{channel.type === ChannelType.VIDEO && <MediaRoom chatId={channel.id} video={true} audio={true} />}
		</div>
	)
}

export default ChannelIdPage
