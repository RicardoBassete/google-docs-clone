import { auth } from '@clerk/nextjs/server'
import { preloadQuery } from 'convex/nextjs'

import { Id } from '@db/_generated/dataModel'
import { Document } from './document'
import { api } from '@db/_generated/api'

interface Props {
  params: Promise<{ documentId: Id<'documents'> }>
}

const DocumentIDPage = async (props: Props) => {
  const { documentId } = await props.params

  const { getToken } = await auth()
  const token = (await getToken({ template: 'convex' })) ?? undefined

  if (!token) {
    throw new Error('Unauthorized')
  }

  const preloadedDocument = await preloadQuery(
    api.documents.getById,
    { id: documentId },
    { token }
  )

  if (!preloadedDocument) {
    throw new Error('Document not found')
  }

  return <Document preloadedDocument={preloadedDocument} />
}

export default DocumentIDPage
