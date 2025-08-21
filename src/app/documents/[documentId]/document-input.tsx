import React, { useRef, useState } from 'react'
import { useStatus } from '@liveblocks/react'
import { BsCloudCheck, BsCloudSlash } from 'react-icons/bs'
import { useMutation } from 'convex/react'
import { toast } from 'sonner'

import { useDebounce } from '@/hooks/use-debounce'
import { Id } from '@db/_generated/dataModel'
import { api } from '@db/_generated/api'
import { LoaderIcon } from 'lucide-react'

interface Props {
  id: Id<'documents'>
  title: string
}

export const DocumentInput = ({ id, title }: Props) => {
  const status = useStatus()

  const [value, setValue] = useState(title)
  const [isPending, setIsPending] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const mutate = useMutation(api.documents.updateById)

  const debounceUpdate = useDebounce((newValue: string) => {
    if (newValue === value) return

    setIsPending(true)
    mutate({ id, title: newValue })
      .then(() => toast.success('Document updated'))
      .catch(() => toast.error('Something went wrong'))
      .finally(() => setIsPending(false))
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    debounceUpdate(newValue)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsPending(true)
    mutate({ id, title: value })
      .then(() => {
        toast.success('Document updated')
        setIsEditing(false)
      })
      .catch(() => toast.error('Something went wrong'))
      .finally(() => setIsPending(false))
  }

  const showLoader =
    isPending || status === 'connecting' || status === 'reconnecting'
  const showError = status === 'disconnected'

  return (
    <div className="flex items-center gap-2">
      {isEditing ? (
        <form className="relative w-fit max-w-[50ch]" onSubmit={handleSubmit}>
          <span className="invisible whitespace-pre px-1.5 text-lg">
            {value || ' '}
          </span>
          <input
            className="absolute inset-0 text-lg text-black px-1.5 bg-transparent truncate"
            type="text"
            ref={inputRef}
            value={value}
            onBlur={() => setIsEditing(false)}
            onChange={onChange}
          />
        </form>
      ) : (
        <span
          className="text-lg px-1.5 cursor-pointer truncate"
          onClick={() => {
            setIsEditing(true)
            setTimeout(() => {
              inputRef.current?.focus()
            }, 0)
          }}
        >
          {value}
        </span>
      )}
      {!showError && !showLoader && <BsCloudCheck className="size-4" />}
      {showLoader && (
        <LoaderIcon className="size-4 animate-spin text-muted-foreground" />
      )}
      {showError && <BsCloudSlash className="size-4" />}
    </div>
  )
}
