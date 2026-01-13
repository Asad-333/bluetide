import { DocumentProvider } from './context'
import { DocumentTable } from './components/DocumentTable'
import { DocumentFilters } from './components/DocumentFilters'
import { DocumentPreviewSheet } from './components/DocumentPreviewSheet'

export const Document = {
    Root: DocumentProvider,
    Table: DocumentTable,
    Filters: DocumentFilters,
    Preview: DocumentPreviewSheet,
}
