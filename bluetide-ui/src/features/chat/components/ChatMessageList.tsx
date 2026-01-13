import { useChat } from '../context'
import { Bot, User, CheckCircle2, Search, AlertCircle } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { Badge } from '@/shared/components/ui/badge'

export function ChatMessageList() {
    const { messages } = useChat()

    return (
        <div className="flex-1 space-y-8 p-6 max-w-4xl mx-auto w-full">
            {messages.map((msg) => (
                <div
                    key={msg.id}
                    className={cn(
                        "flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500",
                        msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                    )}
                >
                    {/* Avatar */}
                    <div className={cn(
                        "h-8 w-8 rounded-lg flex items-center justify-center shrink-0 border shadow-sm",
                        msg.role === 'user' ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    )}>
                        {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>

                    {/* Content Area */}
                    <div className={cn(
                        "flex flex-col gap-2 max-w-[85%]",
                        msg.role === 'user' ? "items-end text-end" : "items-start text-start"
                    )}>
                        {/* Header info */}
                        {msg.role === 'assistant' && (
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-foreground">Enterprise AI Assistant</span>
                                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[10px] h-4">
                                    98% CONFIDENCE
                                </Badge>
                                <span className="text-[10px] text-muted-foreground/60 font-medium">10:42 AM</span>
                            </div>
                        )}

                        {/* Bubble */}
                        <div className={cn(
                            "p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                            msg.role === 'user'
                                ? "bg-primary text-primary-foreground font-medium rounded-tr-none"
                                : "bg-card border rounded-tl-none text-foreground font-medium"
                        )}>
                            {msg.content}

                            {/* Reasoning Process Card (Assistant Only) */}
                            {msg.role === 'assistant' && msg.reasoningSteps && (
                                <div className="mt-4 p-4 rounded-xl bg-accent/30 border border-primary/10 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Search className="h-3.5 w-3.5 text-primary" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Reasoning Process</span>
                                        </div>
                                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                                            <span className="text-[10px] font-bold text-primary">?</span>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {msg.reasoningSteps.map((step) => (
                                            <div key={step.id} className="flex items-center gap-3">
                                                <div className={cn(
                                                    "h-5 w-5 rounded-full flex items-center justify-center transition-colors",
                                                    step.status === 'completed' ? "bg-emerald-500/10 text-emerald-500" : "bg-primary/10 text-primary animate-pulse"
                                                )}>
                                                    {step.status === 'completed' ? <CheckCircle2 className="h-3 w-3" /> : <Search className="h-3 w-3" />}
                                                </div>
                                                <span className={cn(
                                                    "text-[11px] font-semibold",
                                                    step.status === 'completed' ? "text-foreground" : "text-muted-foreground"
                                                )}>
                                                    {step.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Conflict Alert (Mockup piece) */}
                        {msg.role === 'assistant' && (
                            <div className="mt-2 w-full p-3 rounded-lg bg-rose-500/5 border border-rose-500/10 flex gap-3">
                                <AlertCircle className="h-4 w-4 text-rose-500 shrink-0" />
                                <div>
                                    <p className="text-[11px] font-extrabold text-rose-500 uppercase tracking-wider">Conflict Alert</p>
                                    <p className="text-[11px] text-rose-500/80 font-medium">Source A (PDF) states Q4 EMEA variance as 2.0% while Source B (JSON) reports 2.4%.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}
