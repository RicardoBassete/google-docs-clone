import { Editor } from './editor'
import { Toolbar } from './toolbar'

interface Params {
  documentId: string
}

interface Props {
  params: Promise<Params>
}

const DocumentIDPage = async (props: Props) => {
  const { documentId } = await props.params

  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <Toolbar />
      <Editor />
    </div>
  )
}

export default DocumentIDPage
