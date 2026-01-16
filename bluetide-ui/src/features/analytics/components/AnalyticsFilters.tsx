import { useAnalytics } from '../context'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { Label } from '@/shared/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'
import { Button } from '@/shared/components/ui/button'
import type { TimeRange } from '../types'

export function AnalyticsFilters() {
    const { filters, setFilters } = useAnalytics()

    const segments = ['All Regions', 'North America', 'EMEA / GCC', 'APAC']
    const docTypes = ['Invoices', 'Contracts', 'KYC / ID']

    return (
        <div className="space-y-8 flex flex-col h-full p-4">
            <div className="space-y-4">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 px-1">
                    Date Range
                </h3>
                <div className="space-y-3">
                    <Select
                        value={filters.timeRange}
                        onValueChange={(val) => setFilters({ timeRange: val as TimeRange })}
                    >
                        <SelectTrigger className="w-full bg-background/50 border-border/50 text-xs font-bold h-10">
                            <SelectValue placeholder="Select Range" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Last 24 Hours">Last 24 Hours</SelectItem>
                            <SelectItem value="Last 7 Days">Last 7 Days</SelectItem>
                            <SelectItem value="Last 30 Days">Last 30 Days</SelectItem>
                            <SelectItem value="Last 90 Days">Last 90 Days</SelectItem>
                        </SelectContent>
                    </Select>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="p-2.5 rounded-lg bg-card/60 border border-border/50 space-y-1">
                            <p className="text-[8px] font-bold text-muted-foreground/60 uppercase">Start</p>
                            <p className="text-[10px] font-bold text-foreground font-mono">2023-12-01</p>
                        </div>
                        <div className="p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/20 space-y-1">
                            <p className="text-[8px] font-bold text-emerald-500/60 uppercase">End</p>
                            <p className="text-[10px] font-bold text-emerald-400 font-mono">TODAY</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 px-1">
                    Global Segments
                </h3>
                <div className="space-y-1">
                    {segments.map((segment) => (
                        <button
                            key={segment}
                            onClick={() => setFilters({ segments: [segment] })}
                            className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${filters.segments.includes(segment)
                                ? "bg-primary/10 text-primary ring-1 ring-primary/20"
                                : "text-muted-foreground hover:bg-accent/40"
                                }`}
                        >
                            {segment}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 px-1">
                    Document Types
                </h3>
                <div className="space-y-3 px-1">
                    {docTypes.map((type) => (
                        <div key={type} className="flex items-center space-x-3">
                            <Checkbox
                                id={type}
                                checked={filters.docTypes.includes(type)}
                                onCheckedChange={(checked: boolean) => {
                                    const newTypes = checked
                                        ? [...filters.docTypes, type]
                                        : filters.docTypes.filter(t => t !== type)
                                    setFilters({ docTypes: newTypes })
                                }}
                                className="h-4 w-4 border-border/50"
                            />
                            <Label htmlFor={type} className="text-xs font-bold text-muted-foreground cursor-pointer">
                                {type}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="pt-4 mt-auto space-y-3">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-11 shadow-lg shadow-primary/20">
                    Apply Analytics
                </Button>
                <button
                    onClick={() => setFilters({ segments: ['All Regions'], docTypes: ['Invoices', 'Contracts'] })}
                    className="w-full text-center text-[10px] font-bold text-muted-foreground/60 hover:text-foreground transition-colors uppercase tracking-widest"
                >
                    Reset Filters
                </button>
            </div>
        </div>
    )
}
