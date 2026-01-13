import {
    Settings2,
    X,
} from 'lucide-react'
import { useDocuments } from '../context'
import { Button } from '@/shared/components/ui/button'
import { Badge } from '@/shared/components/ui/badge'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/shared/components/ui/popover'
import { cn } from '../../../shared/lib/utils'

const sourceOptions = [
    { value: 'onedrive', label: 'OneDrive' },
    { value: 's3', label: 'S3' },
]

const stageOptions = [
    { value: 'parsed', label: 'Parsed' },
    { value: 'ocr_extraction', label: 'OCR Extraction' },
    { value: 'generating_embeddings', label: 'Generating Embeddings' },
    { value: 'completed', label: 'Completed' },
    { value: 'failed', label: 'Failed' },
]

const languageOptions = [
    { value: 'english', label: 'English' },
    { value: 'arabic', label: 'Arabic' },
]

const categoryOptions = [
    { value: 'invoice', label: 'Invoice' },
    { value: 'equipment_document', label: 'Equipment' },
    { value: 'user_manual', label: 'Manual' },
    { value: 'finance', label: 'Finance' },
    { value: 'other', label: 'Other' },
]

export function DocumentFilters() {
    const { filters, setFilters, resetFilters } = useDocuments()

    const activeFiltersCount = Object.values(filters).filter(Boolean).length

    const toggleFilter = (key: keyof typeof filters, value: string) => {
        const newFilters = { ...filters }
        if (newFilters[key] === value) {
            delete newFilters[key]
        } else {
            newFilters[key] = value
        }
        setFilters(newFilters)
    }

    const filterGroups = [
        { key: 'source', label: 'Source', options: sourceOptions },
        { key: 'stage', label: 'Stage', options: stageOptions },
        { key: 'language', label: 'Language', options: languageOptions },
        { key: 'category', label: 'Category', options: categoryOptions },
    ] as const

    return (
        <div className="flex flex-wrap items-center gap-3">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="h-10 gap-2 border-dashed border-2 hover:border-primary/50 hover:bg-primary/5"
                    >
                        <Settings2 className="h-4 w-4" />
                        Filters
                        {activeFiltersCount > 0 && (
                            <Badge
                                variant="secondary"
                                className="ml-1 px-1.5 py-0 text-[10px] bg-primary text-primary-foreground"
                            >
                                {activeFiltersCount}
                            </Badge>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-[400px] bg-popover p-4"
                    align="start"
                >
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h4 className="font-medium">Filter Documents</h4>
                            {activeFiltersCount > 0 && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={resetFilters}
                                    className="h-8 px-2 text-xs text-primary hover:bg-primary/10"
                                >
                                    Reset All
                                </Button>
                            )}
                        </div>

                        <div className="space-y-5">
                            {filterGroups.map((group) => (
                                <div key={group.key} className="space-y-2">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        {group.label}
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {group.options.map((opt) => {
                                            const isActive = filters[group.key] === opt.value
                                            return (
                                                <button
                                                    key={opt.value}
                                                    onClick={() => toggleFilter(group.key, opt.value)}
                                                    className={cn(
                                                        'rounded-md px-3 py-1 text-sm transition-colors',
                                                        isActive
                                                            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                                                            : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                                                    )}
                                                >
                                                    {opt.label}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </PopoverContent>
            </Popover>

            {/* Active filter pills */}
            {Object.entries(filters).map(([key, value]) => {
                if (!value) return null
                const group = filterGroups.find((g) => g.key === key)
                const option = group?.options.find((o) => o.value === value)
                return (
                    <Badge
                        key={key}
                        variant="secondary"
                        className="gap-1 border-0 bg-secondary px-2 py-1 text-secondary-foreground"
                    >
                        <span className="text-muted-foreground capitalize">{key}:</span>
                        {option?.label}
                        <button
                            onClick={() => toggleFilter(key as any, value)}
                            className="ml-1 rounded-full hover:bg-muted p-0.5"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </Badge>
                )
            })}
        </div>
    )
}
