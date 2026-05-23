// ============================================================
// TOOLS REGISTRY — single source of truth
// Add a new tool here; it auto-appears everywhere.
// ============================================================

export const TOOL_CATEGORIES = {
  JSON:       'JSON',
  ENCODING:   'Encoding',
  GENERATORS: 'Generators',
  CODE:       'Code',
  CONVERTERS: 'Converters',
  TEXT:       'Text',
  IMAGES:     'Images',
  WEB:        'Web',
  SECURITY:   'Security',
} as const

export type ToolCategory = (typeof TOOL_CATEGORIES)[keyof typeof TOOL_CATEGORIES]

export interface Tool {
  id:               string
  name:             string
  slug:             string
  description:      string
  shortDescription: string
  category:         ToolCategory
  icon:             string
  iconBg:           string
  iconColor:        string
  tags:             string[]
  popular:          boolean
  trending:         boolean
  isNew:            boolean
  relatedTools:     string[]
}

export const TOOLS: Tool[] = [
  {
    id: 'json-formatter', name: 'JSON Formatter', slug: '/tools/json-formatter',
    description: 'Beautify, minify, and validate JSON with syntax highlighting, tree view, and error detection.',
    shortDescription: 'Format & validate JSON',
    category: TOOL_CATEGORIES.JSON,
    icon: '{ }', iconBg: 'from-blue-500/20 to-cyan-500/20', iconColor: 'text-cyan-400',
    tags: ['json','format','beautify','validate','minify'], popular: true, trending: true, isNew: false,
    relatedTools: ['json-validator','base64','diff-checker'],
  },
  {
    id: 'json-validator', name: 'JSON Validator', slug: '/tools/json-validator',
    description: 'Validate JSON syntax and structure with detailed error messages and line numbers.',
    shortDescription: 'Validate JSON syntax',
    category: TOOL_CATEGORIES.JSON,
    icon: '✓{}', iconBg: 'from-green-500/20 to-emerald-500/20', iconColor: 'text-emerald-400',
    tags: ['json','validate','lint','check'], popular: true, trending: false, isNew: false,
    relatedTools: ['json-formatter','base64'],
  },
  {
    id: 'regex-tester', name: 'Regex Tester', slug: '/tools/regex-tester',
    description: 'Test regular expressions with live match highlighting, flags support, and group extraction.',
    shortDescription: 'Test & debug regex',
    category: TOOL_CATEGORIES.TEXT,
    icon: '.*', iconBg: 'from-purple-500/20 to-violet-500/20', iconColor: 'text-violet-400',
    tags: ['regex','regexp','pattern','match','test'], popular: true, trending: true, isNew: false,
    relatedTools: ['diff-checker','markdown-previewer'],
  },
  {
    id: 'base64', name: 'Base64 Encoder/Decoder', slug: '/tools/base64',
    description: 'Encode text to Base64 or decode Base64 strings with full Unicode support.',
    shortDescription: 'Encode & decode Base64',
    category: TOOL_CATEGORIES.ENCODING,
    icon: 'B64', iconBg: 'from-orange-500/20 to-amber-500/20', iconColor: 'text-amber-400',
    tags: ['base64','encode','decode','string'], popular: true, trending: false, isNew: false,
    relatedTools: ['url-encoder','jwt-decoder'],
  },
  {
    id: 'jwt-decoder', name: 'JWT Decoder', slug: '/tools/jwt-decoder',
    description: 'Decode and inspect JWT tokens — header, payload, signature, and expiry status.',
    shortDescription: 'Decode JWT tokens',
    category: TOOL_CATEGORIES.SECURITY,
    icon: 'JWT', iconBg: 'from-rose-500/20 to-pink-500/20', iconColor: 'text-pink-400',
    tags: ['jwt','token','decode','auth','security'], popular: true, trending: true, isNew: false,
    relatedTools: ['base64','uuid-generator'],
  },
  {
    id: 'uuid-generator', name: 'UUID Generator', slug: '/tools/uuid-generator',
    description: 'Generate cryptographically secure UUIDs (v1 & v4) in bulk.',
    shortDescription: 'Generate UUIDs instantly',
    category: TOOL_CATEGORIES.GENERATORS,
    icon: 'UUID', iconBg: 'from-teal-500/20 to-cyan-500/20', iconColor: 'text-teal-400',
    tags: ['uuid','guid','generate','unique','id'], popular: true, trending: false, isNew: false,
    relatedTools: ['password-generator','timestamp-converter'],
  },
  {
    id: 'password-generator', name: 'Password Generator', slug: '/tools/password-generator',
    description: 'Generate strong, secure passwords using the Web Crypto API with custom character sets.',
    shortDescription: 'Generate secure passwords',
    category: TOOL_CATEGORIES.SECURITY,
    icon: '🔐', iconBg: 'from-yellow-500/20 to-amber-500/20', iconColor: 'text-yellow-400',
    tags: ['password','security','generate','random','strong'], popular: true, trending: false, isNew: false,
    relatedTools: ['uuid-generator','jwt-decoder'],
  },
  {
    id: 'timestamp-converter', name: 'Timestamp Converter', slug: '/tools/timestamp-converter',
    description: 'Convert Unix timestamps to readable dates and vice versa with a live clock.',
    shortDescription: 'Convert Unix timestamps',
    category: TOOL_CATEGORIES.CONVERTERS,
    icon: '⏱', iconBg: 'from-sky-500/20 to-blue-500/20', iconColor: 'text-sky-400',
    tags: ['timestamp','unix','epoch','date','time','convert'], popular: false, trending: false, isNew: false,
    relatedTools: ['uuid-generator','url-encoder'],
  },
  {
    id: 'url-encoder', name: 'URL Encoder/Decoder', slug: '/tools/url-encoder',
    description: 'Encode or decode URL components and query strings instantly.',
    shortDescription: 'Encode & decode URLs',
    category: TOOL_CATEGORIES.ENCODING,
    icon: 'URL', iconBg: 'from-indigo-500/20 to-blue-500/20', iconColor: 'text-indigo-400',
    tags: ['url','encode','decode','uri','query'], popular: false, trending: false, isNew: false,
    relatedTools: ['base64','html-previewer'],
  },
  {
    id: 'qr-generator', name: 'QR Code Generator', slug: '/tools/qr-generator',
    description: 'Generate custom QR codes for URLs, text, or any data. Download as PNG.',
    shortDescription: 'Generate QR codes',
    category: TOOL_CATEGORIES.GENERATORS,
    icon: '▦', iconBg: 'from-slate-500/20 to-gray-500/20', iconColor: 'text-slate-300',
    tags: ['qr','qrcode','generate','barcode'], popular: true, trending: true, isNew: false,
    relatedTools: ['url-encoder','uuid-generator'],
  },
  {
    id: 'color-picker', name: 'Color Picker', slug: '/tools/color-picker',
    description: 'Pick colors and convert between HEX, RGB, and HSL. Generate shade palettes.',
    shortDescription: 'Pick & convert colors',
    category: TOOL_CATEGORIES.WEB,
    icon: '🎨', iconBg: 'from-pink-500/20 to-rose-500/20', iconColor: 'text-pink-400',
    tags: ['color','hex','rgb','hsl','palette','picker'], popular: true, trending: false, isNew: false,
    relatedTools: ['css-minifier','html-previewer'],
  },
  {
    id: 'html-previewer', name: 'HTML Previewer', slug: '/tools/html-previewer',
    description: 'Write HTML/CSS/JS and see a live sandboxed preview instantly.',
    shortDescription: 'Preview HTML live',
    category: TOOL_CATEGORIES.WEB,
    icon: '</>', iconBg: 'from-orange-500/20 to-red-500/20', iconColor: 'text-orange-400',
    tags: ['html','preview','css','javascript','live'], popular: false, trending: false, isNew: false,
    relatedTools: ['css-minifier','markdown-previewer'],
  },
  {
    id: 'css-minifier', name: 'CSS Minifier', slug: '/tools/css-minifier',
    description: 'Minify CSS to remove comments and whitespace, reducing file size.',
    shortDescription: 'Minify CSS files',
    category: TOOL_CATEGORIES.CODE,
    icon: 'CSS', iconBg: 'from-blue-500/20 to-indigo-500/20', iconColor: 'text-blue-400',
    tags: ['css','minify','compress','optimize'], popular: false, trending: false, isNew: false,
    relatedTools: ['html-previewer','js-beautifier'],
  },
  {
    id: 'js-beautifier', name: 'JavaScript Beautifier', slug: '/tools/js-beautifier',
    description: 'Beautify and format minified or messy JavaScript code with Monaco Editor.',
    shortDescription: 'Beautify JavaScript code',
    category: TOOL_CATEGORIES.CODE,
    icon: 'JS', iconBg: 'from-yellow-500/20 to-amber-500/20', iconColor: 'text-yellow-400',
    tags: ['javascript','js','format','beautify','prettier'], popular: false, trending: true, isNew: false,
    relatedTools: ['css-minifier','json-formatter'],
  },
  {
    id: 'markdown-previewer', name: 'Markdown Previewer', slug: '/tools/markdown-previewer',
    description: 'Write Markdown and see a live rendered preview side by side.',
    shortDescription: 'Preview Markdown live',
    category: TOOL_CATEGORIES.TEXT,
    icon: 'MD', iconBg: 'from-slate-500/20 to-zinc-500/20', iconColor: 'text-slate-300',
    tags: ['markdown','preview','md','render'], popular: true, trending: false, isNew: false,
    relatedTools: ['html-previewer','diff-checker'],
  },
  {
    id: 'diff-checker', name: 'Diff Checker', slug: '/tools/diff-checker',
    description: 'Compare two texts side by side with line-by-line difference highlighting.',
    shortDescription: 'Compare text differences',
    category: TOOL_CATEGORIES.TEXT,
    icon: '±', iconBg: 'from-emerald-500/20 to-green-500/20', iconColor: 'text-emerald-400',
    tags: ['diff','compare','text','difference'], popular: false, trending: false, isNew: false,
    relatedTools: ['markdown-previewer','json-formatter'],
  },
  {
    id: 'sql-formatter', name: 'SQL Formatter', slug: '/tools/sql-formatter',
    description: 'Format and beautify SQL queries for better readability via server-side processing.',
    shortDescription: 'Format SQL queries',
    category: TOOL_CATEGORIES.CODE,
    icon: 'SQL', iconBg: 'from-cyan-500/20 to-teal-500/20', iconColor: 'text-cyan-400',
    tags: ['sql','format','query','database','beautify'], popular: false, trending: false, isNew: true,
    relatedTools: ['json-formatter','js-beautifier'],
  },
  {
    id: 'image-compressor', name: 'Image Compressor', slug: '/tools/image-compressor',
    description: 'Compress JPG, PNG, and WebP images server-side with Sharp, without visible quality loss.',
    shortDescription: 'Compress images online',
    category: TOOL_CATEGORIES.IMAGES,
    icon: '🗜', iconBg: 'from-violet-500/20 to-purple-500/20', iconColor: 'text-violet-400',
    tags: ['image','compress','png','jpg','webp','optimize'], popular: true, trending: true, isNew: false,
    relatedTools: ['image-converter','qr-generator'],
  },
  {
    id: 'image-converter', name: 'Image Converter', slug: '/tools/image-converter',
    description: 'Convert images between PNG, JPG, WebP, AVIF formats with server-side Sharp processing.',
    shortDescription: 'Convert image formats',
    category: TOOL_CATEGORIES.IMAGES,
    icon: '↔', iconBg: 'from-fuchsia-500/20 to-pink-500/20', iconColor: 'text-fuchsia-400',
    tags: ['image','convert','png','jpg','webp','format'], popular: false, trending: true, isNew: true,
    relatedTools: ['image-compressor','qr-generator'],
  },
]

// ── Helpers ──────────────────────────────────────────────────
export const getToolById     = (id: string)    => TOOLS.find(t => t.id === id)
export const getToolBySlug   = (slug: string)  => TOOLS.find(t => t.slug === slug || t.slug === `/${slug}`)
export const getPopularTools = (limit = 8)     => TOOLS.filter(t => t.popular).slice(0, limit)
export const getTrendingTools= (limit = 6)     => TOOLS.filter(t => t.trending).slice(0, limit)
export const getNewTools     = (limit = 4)     => TOOLS.filter(t => t.isNew).slice(0, limit)
export const getToolsByCategory = (cat: ToolCategory) => TOOLS.filter(t => t.category === cat)
export const searchTools     = (q: string)     => {
  const lower = q.toLowerCase()
  return TOOLS.filter(t =>
    t.name.toLowerCase().includes(lower) ||
    t.description.toLowerCase().includes(lower) ||
    t.tags.some(tag => tag.includes(lower))
  )
}
export const getRelatedTools = (id: string, limit = 4) => {
  const tool = getToolById(id)
  if (!tool) return []
  return tool.relatedTools.map(rid => getToolById(rid)).filter(Boolean).slice(0, limit) as Tool[]
}
