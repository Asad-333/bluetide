import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { Document as DocumentType } from '@/shared/types/document'
import { generateMockDocuments } from '@/shared/types/document'

interface DocumentFilters {
    source?: string
    stage?: string
    language?: string
    category?: string
}

interface DocumentContextValue {
    documents: DocumentType[]
    filters: DocumentFilters
    setFilters: (filters: DocumentFilters) => void
    resetFilters: () => void
    pagination: {
        pageIndex: number
        pageSize: number
    }
    setPagination: (pagination: { pageIndex: number; pageSize: number }) => void
    selectedDocument: DocumentType | null
    setSelectedDocument: (doc: DocumentType | null) => void
    isPreviewOpen: boolean
    setIsPreviewOpen: (open: boolean) => void
}

const DocumentContext = createContext<DocumentContextValue | null>(null)

export function useDocuments() {
    const context = useContext(DocumentContext)
    if (!context) {
        throw new Error('useDocuments must be used within a DocumentProvider')
    }
    return context
}

interface DocumentProviderProps {
    children: ReactNode
}

export function DocumentProvider({ children }: DocumentProviderProps) {
    const [documents] = useState<DocumentType[]>(() => generateMockDocuments(47))
    const [filters, setFilters] = useState<DocumentFilters>({})
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })
    const [selectedDocument, setSelectedDocument] = useState<DocumentType | null>(null)
    const [isPreviewOpen, setIsPreviewOpen] = useState(false)

    const resetFilters = () => setFilters({})

    return (
        <DocumentContext.Provider
            value={{
                documents,
                filters,
                setFilters,
                resetFilters,
                pagination,
                setPagination,
                selectedDocument,
                setSelectedDocument,
                isPreviewOpen,
                setIsPreviewOpen,
            }}
        >
            {children}
        </DocumentContext.Provider>
    )
}
