import { useAnalytics } from '../context'
import { Card, CardContent } from '@/shared/components/ui/card'
import { TrendingUp, TrendingDown, Target, Zap, Clock, ShieldCheck } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

export function MetricsGrid() {
    const { data } = useAnalytics()
    if (!data) return null

    const icons = {
        'AVG ACCURACY': <ShieldCheck className="h-5 w-5 text-blue-400" />,
        'TOTAL TOKENS': <Zap className="h-5 w-5 text-purple-400" />,
        'PROCESSING TIME': <Clock className="h-5 w-5 text-emerald-400" />,
        'SUCCESS RATE': <Target className="h-5 w-5 text-orange-400" />
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.metrics.map((metric) => (
                <Card key={metric.label} className="bg-card/40 border-border/50 backdrop-blur-sm relative overflow-hidden group">
                    <CardContent className="p-5">
                        <div className="flex justify-between items-start mb-4">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                                {metric.label}
                            </p>
                            <div className="p-1.5 rounded-lg bg-background/50 border border-border/50">
                                {icons[metric.label as keyof typeof icons]}
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <h2 className="text-2xl font-bold tracking-tight">
                                {metric.value}{metric.unit}
                            </h2>
                            <div className={cn(
                                "flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                                metric.trend === 'up' ? "bg-emerald-500/10 text-emerald-400" :
                                    metric.trend === 'down' ? "bg-rose-500/10 text-rose-400" :
                                        "bg-muted text-muted-foreground"
                            )}>
                                {metric.trend === 'up' && <TrendingUp className="h-3 w-3" />}
                                {metric.trend === 'down' && <TrendingDown className="h-3 w-3" />}
                                {metric.change}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
