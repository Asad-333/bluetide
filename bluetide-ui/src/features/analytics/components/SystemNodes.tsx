import { useAnalytics } from '../context'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Settings } from 'lucide-react'
import { Progress } from '@/shared/components/ui/progress'

export function SystemNodes() {
    const { data } = useAnalytics()
    if (!data) return null

    return (
        <div className="grid grid-cols-1 gap-4 h-full">
            {/* Node Distribution */}
            <Card className="bg-card/40 border-border/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Node Distribution</CardTitle>
                    <Settings className="h-4 w-4 text-muted-foreground/40" />
                </CardHeader>
                <CardContent className="flex items-center gap-8 py-4">
                    <div className="relative h-28 w-28">
                        <svg className="h-full w-full" viewBox="0 0 100 100">
                            <circle
                                cx="50" cy="50" r="40"
                                fill="transparent" stroke="currentColor"
                                strokeWidth="8" className="text-muted/10"
                            />
                            <circle
                                cx="50" cy="50" r="40"
                                fill="transparent" stroke="currentColor"
                                strokeWidth="8" strokeDasharray="176 251"
                                className="text-emerald-500" strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-2xl font-bold">12</span>
                            <span className="text-[8px] font-bold uppercase text-muted-foreground">Active Nodes</span>
                        </div>
                    </div>
                    <div className="space-y-3">
                        {data.nodes.map((node) => (
                            <div key={node.label} className="flex items-center gap-3">
                                <div className={`h-2 w-2 rounded-full ${node.color === 'emerald' ? 'bg-emerald-500' : 'bg-cyan-500'}`} />
                                <div className="space-y-0.5">
                                    <p className="text-[10px] font-bold text-foreground">{node.label} ({node.value}%)</p>
                                    <p className="text-[9px] text-muted-foreground">Processing 1.2M tokens/s</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Latency Breakdown */}
            <Card className="bg-card/40 border-border/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Latency Breakdown</CardTitle>
                    <span className="text-[9px] font-bold text-emerald-400">Target &lt; 250ms</span>
                </CardHeader>
                <CardContent className="space-y-5">
                    {data.latency.map((metric) => (
                        <div key={metric.label} className="space-y-1.5">
                            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tight">
                                <span className="text-muted-foreground">{metric.label}</span>
                                <span>{metric.value}ms</span>
                            </div>
                            <Progress value={(metric.value / metric.target) * 100} className="h-1.5 bg-muted/20" />
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}
