'use client'

import { useMutation } from 'convex/react'
import React, { useState } from 'react'
import { toast } from 'sonner'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { api } from '@db/_generated/api'
import { Id } from '@db/_generated/dataModel'

interface RemoveDialogProps {
  documentId: Id<'documents'>
  children: React.ReactNode
  callback?: () => void
}

export const RemoveDialog = (props: RemoveDialogProps) => {
  const { documentId, children } = props

  const remove = useMutation(api.documents.removeById)
  const [isRemoving, setIsRemoving] = useState(false)

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent onClick={e => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            document.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={e => e.stopPropagation()}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isRemoving}
            onClick={e => {
              e.stopPropagation()
              setIsRemoving(true)
              if (props.callback) {
                props.callback()
              }
              remove({ id: documentId })
                .catch(() => toast.error('Something went wrong'))
                .then(() => toast.success('Document removed'))
                .finally(() => setIsRemoving(false))
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
