import { createFileRoute } from '@tanstack/react-router'
import { Document } from '@/features/documents'
import { Hero } from '@/shared/components/layout/Hero'
import { Files } from 'lucide-react'

export const Route = createFileRoute('/documents/')({
  component: DocumentsPage,
})

function DocumentsPage() {
  return (
    <Document.Root>
      <div className="space-y-6 max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* 1. Page Header */}
        <Hero
          variant="minimal"
          title="Document Library"
          subtitle="Manage and process your document sources with high-precision IDP factory."
          icon={<Files className="h-6 w-6" />}
        />

        {/* 2. Action Toolbar */}
        <div className="flex items-center justify-between py-2 border-y border-border/40 bg-card/30 px-4 rounded-lg">
          <div className="flex items-center gap-4">
            <Document.Filters />
            <div className="h-4 w-px bg-border" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
              Ready for analysis
            </span>
          </div>
          {/* Add more toolbar actions here if needed */}
        </div>

        {/* 3. Main Content: Logic Layer */}
        <div className="grid grid-cols-1 gap-6">
          <main className="w-full">
            <Document.Table />
          </main>
        </div>

        {/* 4. Overlays & Modals */}
        <Document.Preview />
      </div>
    </Document.Root>
  )
}
