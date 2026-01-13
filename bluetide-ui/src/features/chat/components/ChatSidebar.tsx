import { useChat } from '../context'
import { Button } from '@/shared/components/ui/button'
import { Plus, MessageSquare, Shield, Settings, Database } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

export function ChatSidebarContent() {
    const { sessions, activeSessionId, setActiveSession, createNewSession } = useChat()

    return (
        <div className="space-y-4 flex flex-col h-full p-4">
            {/* New Analysis Button */}
            <Button
                onClick={createNewSession}
                className="w-full h-12 gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
            >
                <Plus className="h-5 w-5" />
                New Analysis
            </Button>

            <div className="space-y-6 flex-1 overflow-y-auto custom-scrollbar pt-4">
                {/* Recent Inquiries */}
                <div className="space-y-3">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 px-2">
                        Recent Inquiries
                    </h3>
                    <div className="space-y-1">
                        {sessions.map((session) => (
                            <button
                                key={session.id}
                                onClick={() => setActiveSession(session.id)}
                                className={cn(
                                    "w-full flex flex-col items-start gap-1 p-3 rounded-xl transition-all group",
                                    activeSessionId === session.id
                                        ? "bg-primary/10 ring-1 ring-primary/20"
                                        : "hover:bg-accent/40"
                                )}
                            >
                                <div className="flex items-center gap-2 w-full">
                                    <div className={cn(
                                        "h-7 w-7 rounded-lg flex items-center justify-center transition-colors",
                                        activeSessionId === session.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
                                    )}>
                                        <MessageSquare className="h-3.5 w-3.5" />
                                    </div>
                                    <span className={cn(
                                        "flex-1 text-sm font-semibold truncate text-start",
                                        activeSessionId === session.id ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                                    )}>
                                        {session.title}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 ps-9">
                                    <span className="text-[10px] text-emerald-500 font-medium">Completed</span>
                                    <span className="text-[10px] text-muted-foreground/60">• 2h ago</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Quick Access / Tags */}
                <div className="space-y-3">
                    <div className="flex flex-col gap-1">
                        <button className="flex items-center gap-3 w-full p-2.5 rounded-lg text-muted-foreground hover:bg-accent/40 transition-all group">
                            <Database className="h-4 w-4 transition-colors group-hover:text-primary" />
                            <span className="text-sm font-medium">Vector DB Connected</span>
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 ms-auto shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        </button>
                        <button className="flex items-center gap-3 w-full p-2.5 rounded-lg text-muted-foreground hover:bg-accent/40 transition-all group">
                            <Shield className="h-4 w-4 transition-colors group-hover:text-primary" />
                            <span className="text-sm font-medium">Verified Sources Only</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-4 border-t flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-[11px] font-medium text-muted-foreground">System Ready</span>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                    <Settings className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
