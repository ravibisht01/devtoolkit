'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'
import ToolToolbar from '@/components/common/ToolToolbar'

function hexToRgb(hex:string){const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);return{r,g,b}}
function rgbToHsl(r:number,g:number,b:number){r/=255;g/=255;b/=255;const max=Math.max(r,g,b),min=Math.min(r,g,b);let h=0,s=0,l=(max+min)/2;if(max!==min){const d=max-min;s=l>0.5?d/(2-max-min):d/(max+min);switch(max){case r:h=(g-b)/d+(g<b?6:0);break;case g:h=(b-r)/d+2;break;case b:h=(r-g)/d+4}h/=6}return{h:Math.round(h*360),s:Math.round(s*100),l:Math.round(l*100)}}

export default function ColorPickerTool() {
  const [hex,setHex]=useState('#0ea5e9')
  const rgb=hexToRgb(hex); const hsl=rgbToHsl(rgb.r,rgb.g,rgb.b)
  const shades=[10,20,30,40,50,60,70,80,90].map(l=>`hsl(${hsl.h},${hsl.s}%,${l}%)`)
  const formats=[{label:'HEX',value:hex},{label:'RGB',value:`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`},{label:'HSL',value:`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`},{label:'CSS var',value:`--color-primary: ${hex};`}]

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card p-6 flex flex-col gap-6">
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-3">Pick a Color</label>
          <div className="flex items-center gap-4">
            <input type="color" value={hex} onChange={e=>setHex(e.target.value)} className="w-20 h-20 rounded-xl border border-surface-border cursor-pointer bg-transparent"/>
            <div className="w-32 h-20 rounded-xl border border-surface-border" style={{background:hex}}/>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {formats.map(({label,value})=>(
            <div key={label} className="flex items-center gap-3 bg-surface rounded-lg px-3 py-2">
              <span className="text-xs text-slate-500 w-14">{label}</span>
              <code className="flex-1 text-xs font-mono text-white">{value}</code>
              <ToolToolbar copyValue={value}/>
            </div>
          ))}
        </div>
      </div>
      <div className="card p-6">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-3">Shades</label>
        <div className="grid grid-cols-3 gap-2">
          {shades.map((color,i)=>(
            <button key={i} onClick={()=>{navigator.clipboard.writeText(color);toast.success('Copied!')}}
              className="h-12 rounded-lg border border-white/5 transition-all hover:scale-105" style={{background:color}} title={color}/>
          ))}
        </div>
        <p className="text-xs text-slate-600 mt-3">Click a shade to copy</p>
      </div>
    </div>
  )
}
