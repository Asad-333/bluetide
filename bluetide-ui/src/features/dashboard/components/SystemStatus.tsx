import * as React from "react"
import type { SystemHealth, FrequentQuery } from "../types"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Progress } from "@/shared/components/ui/progress"
import { Cloud, Share2, Database, Sparkles, ChevronRight, Activity } from "lucide-react"
import { cn } from "@/shared/lib/utils"

interface SystemStatusProps {
    health: SystemHealth
    queries: FrequentQuery[]
}

export const SystemStatus = ({ health, queries }: SystemStatusProps) => {
    return (
        <div className="space-y-8">
            {/* System Health */}
            <Card className="bg-card/40 border-border/50 backdrop-blur-sm">
                <CardHeader className="pb-4">
                    <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                        <Activity className="h-4 w-4 text-primary" />
                        System Health
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        {health.connectors.map((connector) => (
                            <div key={connector.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-1.5 rounded-md bg-muted/50">
                                        {connector.name.includes('S3') ? <Cloud className="h-4 w-4 text-blue-400" /> :
                                            connector.name.includes('SharePoint') ? <Share2 className="h-4 w-4 text-orange-400" /> :
                                                <Database className="h-4 w-4 text-slate-400" />}
                                    </div>
                                    <span className="text-sm font-medium">{connector.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={cn(
                                        "text-[10px] font-bold uppercase",
                                        connector.status === 'active' ? "text-emerald-400" : "text-muted-foreground"
                                    )}>
                                        {connector.status}
                                    </span>
                                    <div className={cn(
                                        "h-1.5 w-1.5 rounded-full",
                                        connector.status === 'active' ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-muted-foreground/30"
                                    )} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-4 border-t border-border/30 space-y-3">
                        <div className="flex justify-between text-[10px] font-mono uppercase tracking-tight text-muted-foreground">
                            <span>Vector DB Latency</span>
                            <span className="text-emerald-400">{health.vectorDbLatency}ms</span>
                        </div>
                        <Progress value={health.vectorDbLatency * 2} className="h-1.5 bg-emerald-500/10" />
                    </div>
                </CardContent>
            </Card>

            {/* Frequent Queries */}
            <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 px-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Frequent Queries
                </h3>
                <div className="space-y-3">
                    {queries.map((query) => (
                        <button
                            key={query.id}
                            className="w-full flex items-center justify-between p-4 rounded-xl bg-card/40 border border-border/50 hover:border-primary/30 transition-all group text-left"
                        >
                            <div>
                                <p className="text-sm font-semibold mb-0.5">{query.label}</p>
                                <p className="text-[11px] text-muted-foreground italic">"{query.subtext}"</p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
