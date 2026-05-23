'use client'
import { useState, Suspense, lazy } from 'react'
import toast from 'react-hot-toast'
import ToolToolbar from '@/components/common/ToolToolbar'
const MonacoEditor = lazy(() => import('@monaco-editor/react'))

const SAMPLE = `function greet(name){return "Hello "+name+"!";}const result=greet("DevToolkit");console.log(result);const obj={a:1,b:2,c:{d:3,e:4}};`

function beautifyJs(code: string): string {
  let out = '', indent = 0
  const INC = ['{','[','('], DEC = ['}',']',')']
  for (let i = 0; i < code.length; i++) {
    const c = code[i]
    if (DEC.includes(c)) { indent = Math.max(0, indent - 1); out += '\n' + '  '.repeat(indent) }
    out += c
    if (INC.includes(c)) { indent++; out += '\n' + '  '.repeat(indent) }
    else if (c === ';') { out += '\n' + '  '.repeat(indent) }
    else if (c === ',') { out += ' ' }
  }
  return out.trim()
}

export default function JsBeautifierTool() {
  const [input,  setInput]  = useState(SAMPLE)
  const [output, setOutput] = useState('')

  const beautify = () => {
    setOutput(beautifyJs(input))
    toast.success('JavaScript beautified!')
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid md:grid-cols-2 gap-4">
        {[
          { label: 'Input',  value: input,  onChange: (v: string) => setInput(v),  readOnly: false },
          { label: 'Output', value: output, onChange: (_: string) => {},            readOnly: true  },
        ].map(({ label, value, onChange, readOnly }) => (
          <div key={label} className="card overflow-hidden">
            <div className="px-4 py-2.5 border-b border-surface-border flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</span>
              {label === 'Output' && output && (
                <ToolToolbar copyValue={output} downloadContent={output} downloadFileName="script.js" downloadMime="text/javascript" />
              )}
            </div>
            <Suspense fallback={<div className="h-64 flex items-center justify-center text-slate-500 text-sm">Loading…</div>}>
              <MonacoEditor
                height="300px" language="javascript" theme="vs-dark" value={value}
                onChange={v => onChange(v ?? '')}
                options={{ fontSize: 13, minimap: { enabled: false }, readOnly, wordWrap: 'on', scrollBeyondLastLine: false }}
              />
            </Suspense>
          </div>
        ))}
      </div>
      <button onClick={beautify} className="btn-primary w-fit">✨ Beautify JavaScript</button>
    </div>
  )
}
