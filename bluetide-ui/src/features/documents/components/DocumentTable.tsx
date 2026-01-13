import type { ColumnDef } from '@tanstack/react-table'
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    useReactTable,
} from '@tanstack/react-table'
import {
    FileText,
    FileImage,
    File,
    AlertCircle,
    Cloud,
    HardDrive,
} from 'lucide-react'
import { useDocuments } from '../context'
import type { Document as DocumentType } from '@/shared/types/document'
import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/shared/components/ui/table'
import { cn } from '../../../shared/lib/utils'

function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date)
}

function getDocumentIcon(type: DocumentType['type']) {
    switch (type) {
        case 'pdf':
            return <FileText className="h-5 w-5 text-rose-400" />
        case 'docx':
            return <FileText className="h-5 w-5 text-sky-400" />
        case 'image':
            return <FileImage className="h-5 w-5 text-emerald-400" />
        default:
            return <File className="h-5 w-5 text-slate-400" />
    }
}

const columns: ColumnDef<DocumentType>[] = [
    {
        accessorKey: 'name',
        header: 'Documents',
        cell: ({ row }) => {
            const doc = row.original
            const { setSelectedDocument, setIsPreviewOpen } = useDocuments()

            const handleOpenPreview = () => {
                setSelectedDocument(doc)
                setIsPreviewOpen(true)
            }

            return (
                <div
                    className="flex items-center gap-3 group cursor-pointer"
                    onClick={handleOpenPreview}
                >
                    <div className="transition-transform group-hover:scale-110">
                        {doc.currentStage === 'failed' ? (
                            <AlertCircle className="h-5 w-5 text-rose-400/80" />
                        ) : (
                            getDocumentIcon(doc.type)
                        )}
                    </div>
                    <div>
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {doc.name}
                        </p>
                        <p className="text-[11px] text-muted-foreground">{formatBytes(doc.size)}</p>
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: 'source',
        header: 'Source',
        cell: ({ row }) => {
            const source = row.original.source
            const isOneDrive = source === 'onedrive'
            return (
                <Badge
                    variant="outline"
                    className={cn(
                        'gap-1.5 border-0 font-medium uppercase tracking-wider text-[10px] px-2 py-0.5',
                        isOneDrive
                            ? 'bg-sky-500/10 text-sky-400'
                            : 'bg-amber-500/10 text-amber-400'
                    )}
                >
                    {isOneDrive ? (
                        <Cloud className="h-3 w-3" />
                    ) : (
                        <HardDrive className="h-3 w-3" />
                    )}
                    {isOneDrive ? 'OneDrive' : 'S3'}
                </Badge>
            )
        },
    },
    {
        accessorKey: 'currentStage',
        header: 'Current Stage',
        cell: ({ row }) => {
            const stage = row.original.currentStage
            const stageColors: Record<string, string> = {
                parsed: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
                ocr_extraction: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
                generating_embeddings: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
                completed: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
                failed: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
            }
            const stageLabels: Record<string, string> = {
                parsed: 'Parsed',
                ocr_extraction: 'OCR Extraction',
                generating_embeddings: 'Embeddings',
                completed: 'Completed',
                failed: 'Failed',
            }
            return (
                <Badge variant="outline" className={cn('font-medium border-0 px-2 py-0.5', stageColors[stage])}>
                    {stageLabels[stage]}
                </Badge>
            )
        },
    },
    {
        accessorKey: 'confidenceStatus',
        header: 'Confidence',
        cell: ({ row }) => {
            const doc = row.original
            const status = doc.confidenceStatus
            if (status === 'running') {
                return (
                    <div className="flex items-center gap-2 text-sky-400 text-xs animate-pulse">
                        <div className="h-1.5 w-1.5 rounded-full bg-current" />
                        Running
                    </div>
                )
            }
            if (status === 'chunking') {
                return <span className="text-slate-500 text-xs">Chunking</span>
            }
            const percentage = doc.confidencePercentage ?? 0
            const color =
                percentage >= 90
                    ? 'text-emerald-400/90'
                    : percentage >= 70
                        ? 'text-amber-400/90'
                        : 'text-rose-400/90'
            return <span className={cn('font-mono font-medium', color)}>{percentage}%</span>
        },
    },
    {
        accessorKey: 'uploadedAt',
        header: 'Timestamp',
        cell: ({ row }) => {
            const doc = row.original
            return (
                <div className="text-sm">
                    <p className="font-medium text-foreground/90">{formatDate(doc.uploadedAt)}</p>
                    <p className="text-[11px] text-muted-foreground/70 tracking-tight">
                        Modified: {formatDate(doc.lastModifiedAt)}
                    </p>
                </div>
            )
        },
    },
    {
        accessorKey: 'language',
        header: 'Language',
        cell: ({ row }) => {
            const lang = row.original.language
            return (
                <span className="font-medium text-muted-foreground capitalize">
                    {lang === 'arabic' ? 'عربي' : 'English'}
                </span>
            )
        },
    },
    {
        accessorKey: 'category',
        header: 'Category',
        cell: ({ row }) => {
            const category = row.original.category
            const labels: Record<string, string> = {
                invoice: 'Invoice',
                equipment_document: 'Equipment',
                user_manual: 'Manual',
                finance: 'Finance',
                other: 'Other',
            }
            return (
                <Badge variant="secondary" className="bg-secondary/50 font-medium text-muted-foreground">
                    {labels[category]}
                </Badge>
            )
        },
    },
    {
        accessorKey: 'fingerprint',
        header: 'Identification',
        cell: ({ row }) => {
            const doc = row.original
            return (
                <div className="space-y-1.5 pe-4">
                    <div className="flex items-center gap-2">
                        <code className="rounded bg-muted px-2 py-0.5 text-[10px] font-mono font-bold tracking-tight text-foreground/80 shadow-sm ring-1 ring-border/50">
                            {doc.fingerprint}
                        </code>
                    </div>
                    <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60">
                        UID-{doc.uid.slice(0, 8)}
                    </p>
                </div>
            )
        },
    },
]

export function DocumentTable() {
    const { documents, pagination, setPagination } = useDocuments()

    const table = useReactTable({
        data: documents,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            pagination,
        },
        onPaginationChange: (updater) => {
            const newPagination =
                typeof updater === 'function' ? updater(pagination) : updater
            setPagination(newPagination)
        },
    })

    const pageCount = table.getPageCount()
    const { pageIndex, pageSize } = pagination
    const totalRows = documents.length
    const startRow = pageIndex * pageSize + 1
    const endRow = Math.min((pageIndex + 1) * pageSize, totalRows)

    return (
        <div className="space-y-4">
            <div className="rounded-lg border bg-card/50">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="border-border hover:bg-transparent">
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="text-muted-foreground font-semibold px-4 h-12">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    className={cn(
                                        'border-border hover:bg-muted/50 transition-colors',
                                        row.original.currentStage === 'failed' && 'bg-destructive/5 hover:bg-destructive/10'
                                    )}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center text-slate-500"
                                >
                                    No documents found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-2">
                <div className="text-sm text-slate-500">
                    Showing {startRow}-{endRow} of {totalRows} documents
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="h-8 transition-all hover:bg-accent"
                    >
                        Previous
                    </Button>
                    <div className="flex items-center justify-center min-w-[100px] text-sm font-medium">
                        Page {pageIndex + 1} of {pageCount}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="h-8 transition-all hover:bg-accent"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
