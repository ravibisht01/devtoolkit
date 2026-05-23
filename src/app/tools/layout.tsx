import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ToolsSidebar from '@/components/layout/ToolsSidebar'

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="flex pt-16 min-h-screen">
        <ToolsSidebar />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
      <Footer />
    </>
  )
}
