interface Params {
  documentId: string
}

interface Props {
  params: Promise<Params>
}

const DocumentIDPage = async (props: Props) => {
  const { documentId } = await props.params
  return <div>Document ID: {documentId}</div>
}

export default DocumentIDPage
