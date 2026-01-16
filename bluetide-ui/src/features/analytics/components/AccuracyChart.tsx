import { useAnalytics } from '../context'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Maximize2 } from 'lucide-react'

export function AccuracyChart() {
    const { data } = useAnalytics()
    if (!data) return null

    return (
        <Card className="bg-card/40 border-border/50 backdrop-blur-sm h-full relative">
            <CardHeader className="flex flex-row items-center justify-between pb-8">
                <div className="space-y-1">
                    <CardTitle className="text-base font-bold">Advanced Accuracy Attribution</CardTitle>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Comparative analysis by language and document complexity</p>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">English</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">Arabic</span>
                    </div>
                    <Maximize2 className="h-4 w-4 text-muted-foreground/40 cursor-pointer hover:text-foreground transition-colors" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-end justify-between h-[240px] px-4 gap-8">
                    {data.accuracy.map((phase) => (
                        <div key={phase.phase} className="flex-1 flex flex-col items-center gap-4">
                            <div className="flex gap-2 w-full max-w-[80px] h-full items-end justify-center">
                                <div
                                    className="w-full bg-gradient-to-t from-emerald-500/20 to-emerald-400 rounded-t-sm transition-all duration-500 hover:brightness-110"
                                    style={{ height: `${phase.english}%` }}
                                />
                                <div
                                    className="w-full bg-gradient-to-t from-blue-500/20 to-blue-400 rounded-t-sm transition-all duration-500 hover:brightness-110"
                                    style={{ height: `${phase.arabic}%` }}
                                />
                            </div>
                            <span className="text-[9px] font-bold text-muted-foreground/60 text-center uppercase tracking-tighter">
                                {phase.phase}
                            </span>
                        </div>
                    ))}
                </div>
                {/* Visual grid lines */}
                <div className="absolute inset-x-6 top-[100px] bottom-[110px] border-y border-border/10 pointer-events-none" />
                <div className="absolute inset-x-6 top-[150px] bottom-[160px] border-y border-border/10 pointer-events-none" />
            </CardContent>
        </Card>
    )
}
