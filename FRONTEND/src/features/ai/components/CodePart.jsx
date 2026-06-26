import { useEffect, useState } from 'react'
import Editor from '@monaco-editor/react'
import Preview from '../../code/pages/Preview'
import { useSelector } from 'react-redux'
import useCompo from '../../code/hooks/useCompo'
import Header from './Header'
import PromptInput from './PromptInput'

const CodePart = ({ cid }) => {

  const [isCodePreview, setIsCodePreview] = useState(false)
  const code = useSelector(state => state.component.code)
  const { handleSetCode, handleDownloadCode } = useCompo()

  useEffect(() => {
  if (!cid) {
    handleSetCode("")
  }
  }, [cid])
  

  return (
    <div className=' codepart  flex flex-col border-l border-slate-800'>

      <Header props={{ cid, code, isCodePreview, setIsCodePreview, handleDownloadCode }} />

      <div style={{ scrollBehavior: "smooth" }} className='flex-1 overflow-hidden'>
        {isCodePreview ? <Preview code={code} /> : <Editor
          language={"javascript"}
          value={code}
          onChange={handleSetCode}
          theme='hc-black'
          options={{
            minimap: { enabled: false },
            fontSize: 16,
            fontFamily: " monospace",
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 12, bottom: 12 },
            tabSize: 2,
            wordWrap: 'on',
            bracketPairColorization: { enabled: true },
          }} />}
      </div>

      <PromptInput/>

    </div>
  )
}

export default CodePart