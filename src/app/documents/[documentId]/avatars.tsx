'use client'

import { ClientSideSuspense } from '@liveblocks/react'
import { useOthers, useSelf } from '@liveblocks/react/suspense'
import { Separator } from '@/components/ui/separator'

/* eslint-disable @next/next/no-img-element */
const AVATAR_SIZE = 36

interface AvatarProps {
  src: string
  name: string
}

export const Avatars = () => {
  return (
    <ClientSideSuspense fallback={null}>
      <AvatarStack />
    </ClientSideSuspense>
  )
}

const AvatarStack = () => {
  const users = useOthers()
  const currentUser = useSelf()

  if (users.length === 0) return null

  return (
    <>
      <div className="flex items-center">
        {currentUser && (
          <div className="relative ml-2">
            <Avatar src={currentUser.info.avatar} name="You" />
          </div>
        )}

        <div className="flex">
          {users.map(user => {
            return (
              <Avatar
                key={user.connectionId}
                name={user.info.name}
                src={user.info.avatar}
              />
            )
          })}
        </div>
      </div>
      <Separator orientation="vertical" className="h-6" />
    </>
  )
}

const Avatar = (props: AvatarProps) => {
  const { src, name } = props

  return (
    <div
      style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
      className="group -ml-2 flex shrink-0 place-content-center relative border-4 border-white rounded-full bg-gray-400"
    >
      <div className="opacity-0 group-hover:opacity-100 absolute top-full py-1 px-2 text-white text-xs rounded-lg mt-2.5 z-10 bg-black whitespace-nowrap transition-opacity">
        {name}
      </div>
      <img src={src} alt={name} className="size-full rounded-full" />
    </div>
  )
}
