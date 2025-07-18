'use client'

import { ReactNode } from 'react'
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense
} from '@liveblocks/react/suspense'
import { useParams } from 'next/navigation'

export function Room({ children }: { children: ReactNode }) {
  const params = useParams()

  return (
    <LiveblocksProvider
      publicApiKey={
        'pk_dev_0iLFc9PqGrlzez6V9lvfI6mkd5wc2TlF7AmfcZOQpP4H53ROJo0xJKEwuPoy7svf'
      }
    >
      <RoomProvider id={params.documentId as string}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  )
}
