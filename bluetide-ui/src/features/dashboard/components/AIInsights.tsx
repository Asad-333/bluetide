import * as React from "react"
import type { AIInsight } from "../types"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { FileText, BarChart3, Clock, Share2 } from "lucide-react"
import { cn } from "@/shared/lib/utils"

interface AIInsightsProps {
    insights: AIInsight[]
}

export const AIInsights = ({ insights }: AIInsightsProps) => {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Share2 className="h-5 w-5 text-primary" />
                    Recent AI Insights
                </h3>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 text-xs uppercase tracking-widest font-bold">
                    View Analysis Hub
                </Button>
            </div>

            <div className="space-y-4">
                {insights.map((insight) => (
                    <Card key={insight.id} className="bg-card/40 border-border/50 backdrop-blur-sm group hover:border-primary/30 transition-colors">
                        <CardContent className="p-6">
                            <div className="flex gap-4">
                                <div className={cn(
                                    "mt-1 p-2 rounded-lg shrink-0",
                                    insight.type === 'pattern' ? "bg-blue-500/10 text-blue-400" : "bg-purple-500/10 text-purple-400"
                                )}>
                                    {insight.type === 'pattern' ? <FileText className="h-5 w-5" /> : <BarChart3 className="h-5 w-5" />}
                                </div>

                                <div className="flex-1 space-y-4">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h4 className="font-semibold text-base leading-none mb-1.5">{insight.title}</h4>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {insight.timestamp}</span>
                                                <span>•</span>
                                                <span>Pipeline: {insight.pipeline}</span>
                                            </div>
                                        </div>
                                        <Badge variant="outline" className={cn(
                                            "text-[10px] h-5 font-bold tracking-wider",
                                            insight.status === 'HIGH CONFIDENCE' ? "border-emerald-500/40 text-emerald-400 bg-emerald-500/5" : "border-blue-500/40 text-blue-400 bg-blue-500/5"
                                        )}>
                                            {insight.status}
                                        </Badge>
                                    </div>

                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {insight.content}
                                    </p>

                                    <div className="flex gap-3">
                                        {insight.actions.map((action) => (
                                            <Button
                                                key={action}
                                                size="sm"
                                                variant={action.toLowerCase().includes('review') || action.toLowerCase().includes('dive') ? "default" : "secondary"}
                                                className="h-8 text-xs font-semibold px-4"
                                            >
                                                {action}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
