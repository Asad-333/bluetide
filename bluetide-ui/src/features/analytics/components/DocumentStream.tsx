import { useAnalytics } from '../context'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { cn } from '@/shared/lib/utils'

export function DocumentStream() {
    const { data } = useAnalytics()
    if (!data) return null

    return (
        <Card className="bg-card/40 border-border/50 backdrop-blur-sm relative">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-base font-bold">Granular Document Stream</CardTitle>
                <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Streaming Live</span>
                </div>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto pb-2">
                    <table className="w-full min-w-[850px] border-collapse">
                        <thead>
                            <tr className="border-b border-border/40 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-left">
                                <th className="py-3 px-4 whitespace-nowrap w-[120px]">Timestamp</th>
                                <th className="py-3 px-4 w-[150px]">Doc ID</th>
                                <th className="py-3 px-4 w-[100px]">Type</th>
                                <th className="py-3 px-4 w-[120px]">Language</th>
                                <th className="py-3 px-4 w-[200px]">Confidence</th>
                                <th className="py-3 px-4 whitespace-nowrap w-[100px]">Latency</th>
                                <th className="py-3 px-4 text-right w-[100px]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/20">
                            {data.stream.map((item) => (
                                <tr key={item.id} className="group hover:bg-muted/30 transition-colors">
                                    <td className="py-4 px-4 text-[11px] font-mono text-muted-foreground/80">{item.timestamp}</td>
                                    <td className="py-4 px-4 text-[11px] font-bold tracking-wider whitespace-nowrap">{item.docId}</td>
                                    <td className="py-4 px-4 text-[11px] font-medium text-muted-foreground">{item.type}</td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-2">
                                            <div className={cn(
                                                "h-1.5 w-1.5 rounded-full",
                                                item.language === 'EN' ? "bg-emerald-500" :
                                                    item.language === 'AR' ? "bg-blue-500" : "bg-purple-500"
                                            )} />
                                            <span className="text-[11px] font-bold">{item.language}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-1 w-16 rounded-full bg-muted/20 overflow-hidden">
                                                <div
                                                    className={cn(
                                                        "h-full rounded-full",
                                                        item.confidence > 95 ? "bg-emerald-500" :
                                                            item.confidence > 90 ? "bg-emerald-500/60" : "bg-blue-500"
                                                    )}
                                                    style={{ width: `${item.confidence}%` }}
                                                />
                                            </div>
                                            <span className="text-[11px] font-bold">{item.confidence}%</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 text-[11px] font-bold">{item.latency}ms</td>
                                    <td className="py-4 px-4 text-right">
                                        <button className="text-[10px] font-black uppercase text-blue-400 hover:text-blue-300 transition-colors">
                                            View JSON
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    )
}
