import { SiGoogledocs } from 'react-icons/si'
import { format } from 'date-fns'
import { TableCell, TableRow } from '@/components/ui/table'
import { Doc } from '@db/_generated/dataModel'
import { Building2Icon, CircleUserIcon } from 'lucide-react'
import { DocumentMenu } from './document-menu'
import { useRouter } from 'next/navigation'

interface DocumentRowProps {
  document: Doc<'documents'>
}

export const DocumentRow = (props: DocumentRowProps) => {
  const { document } = props
  const router = useRouter()

  return (
    <TableRow
      className="cursor-pointer"
      onClick={() => router.push(`/documents/${document._id}`)}
    >
      <TableCell className="w-[50px]">
        <SiGoogledocs className="size-6 fill-blue-500" />
      </TableCell>
      <TableCell className="font-medium md:w-[45%]">{document.title}</TableCell>
      <TableCell className="text-muted-foreground hidden md:flex items-center gap-2">
        {document.organizationId ? (
          <Building2Icon className="size-4" />
        ) : (
          <CircleUserIcon className="size-4" />
        )}
        {document.organizationId ? 'Organization' : 'Personal'}
      </TableCell>
      <TableCell className="text-muted-foreground hidden md:table-cell">
        {format(new Date(document._creationTime), 'MMM dd, yyyy')}
      </TableCell>
      <TableCell className="flex justify-end">
        <DocumentMenu
          documentId={document._id}
          title={document.title}
          onNewTab={() => window.open(`/documents/${document._id}`, '_blank')}
        />
      </TableCell>
    </TableRow>
  )
}
