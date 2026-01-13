import { useChat } from '../context'
import { X, FileText, ShieldCheck, ExternalLink, Activity } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Badge } from '@/shared/components/ui/badge'
import { cn } from '@/shared/lib/utils'

export function ChatRetrievalPanel() {
    const { isRetrievalPanelOpen, setRetrievalPanelOpen } = useChat()

    if (!isRetrievalPanelOpen) return null

    const mockSources = [
        { id: '1', name: 'Q4_Consolidated.pdf', source: 'SharePoint', quality: '98%', status: 'Verified' },
        { id: '2', name: 'Log_Dec14_AWS.json', source: 'AWS S3', quality: '92%', status: 'Verified' },
        { id: '3', name: 'Security_Policy.docx', source: 'SharePoint', quality: '85%', status: 'Restricted' },
    ]

    return (
        <aside className="w-80 border-s bg-card flex flex-col h-[calc(100vh-64px)] overflow-hidden animate-in slide-in-from-right duration-300">
            <div className="p-4 border-b flex items-center justify-between bg-muted/20">
                <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-primary" />
                    <h2 className="text-sm font-bold">Retrieval Panel</h2>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground"
                    onClick={() => setRetrievalPanelOpen(false)}
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
                {/* Semantic Search Status */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Semantic Search</span>
                        <span className="text-[10px] font-bold text-primary">0.34s</span>
                    </div>
                    <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-primary animate-pulse" />
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-emerald-500 font-bold">
                        <ShieldCheck className="h-3 w-3" />
                        Retrieval complete. 3 sources found.
                    </div>
                </div>

                {/* Top Sources */}
                <div className="space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Top Sources</h3>
                    <div className="space-y-3">
                        {mockSources.map((source) => (
                            <div
                                key={source.id}
                                className="group p-3 rounded-xl border bg-accent/20 hover:bg-accent/40 hover:border-primary/20 transition-all cursor-pointer"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="h-8 w-8 rounded-lg bg-card flex items-center justify-center border group-hover:bg-primary/5 transition-colors">
                                        <FileText className="h-4 w-4 text-rose-500" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold truncate group-hover:text-primary transition-colors">{source.name}</p>
                                        <p className="text-[10px] text-muted-foreground font-medium">{source.source} • Finance / Reports</p>
                                    </div>
                                </div>
                                <div className="mt-3 flex items-center justify-between">
                                    <Badge
                                        variant="outline"
                                        className={cn(
                                            "text-[9px] h-4 font-black uppercase tracking-tighter",
                                            source.status === 'Verified' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-muted text-muted-foreground/60"
                                        )}
                                    >
                                        {source.status === 'Verified' ? <ShieldCheck className="h-2.5 w-2.5 me-1" /> : null}
                                        Access {source.status}
                                    </Badge>
                                    <span className="text-[10px] font-bold text-primary">{source.quality} Match</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Filtering Context */}
                <div className="space-y-3 pt-4 border-t">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Filtering Context</h3>
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-[9px] font-bold bg-background">Date: Last 30 Days</Badge>
                        <Badge variant="outline" className="text-[9px] font-bold bg-background">Type: PDF, JSON</Badge>
                        <Badge variant="outline" className="text-[9px] font-bold bg-background">Source: Internal</Badge>
                    </div>
                </div>
            </div>

            <div className="p-4 border-t bg-muted/5">
                <Button variant="outline" className="w-full text-[11px] font-bold uppercase tracking-widest gap-2 bg-background">
                    <ExternalLink className="h-3.5 w-3.5" />
                    Open File Explorer
                </Button>
            </div>
        </aside>
    )
}
