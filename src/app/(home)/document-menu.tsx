import { ExternalLinkIcon, MoreVertical, TrashIcon } from 'lucide-react'
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { RemoveDialog } from '@/components/remove-dialog'
import { Id } from '@db/_generated/dataModel'

interface DocumentMenuProps {
  documentId: Id<'documents'>
  title: string
  onNewTab: (id: string) => void
}

export const DocumentMenu = (props: DocumentMenuProps) => {
  const { documentId, title, onNewTab } = props

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} size={'icon'} className="rounded-full">
          <MoreVertical className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <RemoveDialog documentId={documentId}>
          {/*Prevents the remove document dialog from closing immediately after opening*/}
          <DropdownMenuItem onSelect={e => e.preventDefault()} onClick={e => e.stopPropagation()}>
            <TrashIcon className="size-4 mr-2" /> Remove
          </DropdownMenuItem>
        </RemoveDialog>
        <DropdownMenuItem onClick={() => onNewTab(documentId)}>
          <ExternalLinkIcon className="size-4 mr-2" />
          Open in a new tab
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
