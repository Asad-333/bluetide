import { useAnalytics } from '../context'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Download } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'

export function IntelligenceGrid() {
    const { data } = useAnalytics()
    if (!data) return null

    return (
        <Card className="bg-card/40 border-border/50 backdrop-blur-sm h-full relative">
            <CardHeader className="flex flex-row items-center justify-between pb-8">
                <div className="space-y-1">
                    <CardTitle className="text-base font-bold">Cross-Lingual Intelligence Grid</CardTitle>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Drill-down: Extraction success rates by schema type</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                            <span className="text-[9px] font-bold text-muted-foreground uppercase">Confidence</span>
                            <div className="flex h-1.5 w-24 rounded-full overflow-hidden bg-muted/20">
                                <div className="flex-1 bg-blue-600/40" />
                                <div className="flex-1 bg-blue-500" />
                                <div className="flex-1 bg-emerald-500" />
                            </div>
                        </div>
                    </div>
                    <Button variant="outline" size="sm" className="h-8 gap-2 border-border/50 font-bold text-[10px] uppercase">
                        <Download className="h-3.5 w-3.5" />
                        CSV Export
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto pb-4">
                    <table className="w-full min-w-[800px] border-separate border-spacing-x-2 border-spacing-y-0">
                        <thead>
                            <tr>
                                <th className="pb-4 pt-0 pe-4"></th>
                                {data.intelligence[0].languages.map((lang) => (
                                    <th key={lang.code} className="pb-4 pt-0 px-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider text-center">
                                        {lang.label} ({lang.code})
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="space-y-2">
                            {data.intelligence.map((item) => (
                                <tr key={item.schema} className="group">
                                    <td className="py-2 pe-4 text-[11px] font-bold text-muted-foreground/80 uppercase tracking-widest text-end whitespace-nowrap">
                                        {item.schema}
                                    </td>
                                    {item.languages.map((lang) => (
                                        <td key={lang.code} className="p-1 min-w-[120px]">
                                            <div className={cn(
                                                "h-12 flex items-center justify-center rounded-lg border border-white/5 transition-all group-hover:scale-[1.02]",
                                                lang.value > 95 ? "bg-emerald-500/80 text-white shadow-[inset_0_0_20px_rgba(16,185,129,0.3)]" :
                                                    lang.value > 85 ? "bg-emerald-600/40 text-emerald-100" :
                                                        "bg-blue-600/40 text-blue-100"
                                            )}>
                                                <span className="text-sm font-black">{lang.value}%</span>
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    )
}
