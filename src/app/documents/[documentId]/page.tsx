import { Editor } from './editor'

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
      <Editor />
    </div>
  )
}

export default DocumentIDPage
