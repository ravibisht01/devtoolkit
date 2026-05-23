import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface Item { label: string; href?: string }
interface Props { items: Item[] }

export default function Breadcrumb({ items }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm">
      <Link href="/" className="text-slate-500 hover:text-white transition-colors">
        <Home className="w-3.5 h-3.5" />
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          {item.href && i < items.length - 1
            ? <Link href={item.href} className="text-slate-500 hover:text-white transition-colors">{item.label}</Link>
            : <span className="text-slate-300">{item.label}</span>
          }
        </span>
      ))}
    </nav>
  )
}
