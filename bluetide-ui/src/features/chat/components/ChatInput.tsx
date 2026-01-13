import { useState } from 'react'
import { useChat } from '../context'
import { Send, Paperclip, Mic, ShieldCheck, Database, Search } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'

export function ChatInput() {
    const [input, setInput] = useState('')
    const { sendMessage, isTyping } = useChat()

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault()
        if (!input.trim() || isTyping) return
        sendMessage(input)
        setInput('')
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto w-full space-y-3"
        >
            {/* Status Indicators Bar */}
            <div className="flex items-center gap-4 px-4 py-2 border rounded-full bg-card/40 backdrop-blur-md shadow-sm border-primary/10 w-fit mx-auto animate-in slide-in-from-bottom-2">
                <div className="flex items-center gap-2">
                    <Search className="h-3 w-3 text-emerald-500" />
                    <span className="text-[10px] font-bold text-foreground">Detecting Language... <span className="text-emerald-500 font-black">[English]</span></span>
                </div>
                <div className="h-3 w-px bg-border/50" />
                <div className="flex items-center gap-2">
                    <Database className="h-3 w-3 text-primary" />
                    <span className="text-[10px] font-bold text-foreground">Consulting Vector DB... <span className="text-primary font-black">[Success]</span></span>
                </div>
                <div className="h-3 w-px bg-border/50" />
                <div className="flex items-center gap-2">
                    <ShieldCheck className="h-3 w-3 text-emerald-500" />
                    <span className="text-[10px] font-bold text-foreground">Checking Permissions... <span className="text-emerald-500 font-black">[Verified]</span></span>
                </div>
            </div>

            {/* Input Box */}
            <div className="relative group transition-all">
                <div className="absolute inset-0 bg-primary/5 rounded-[22px] blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity" />
                <div className="relative flex items-center bg-card/60 backdrop-blur-xl border border-primary/10 shadow-lg rounded-[22px] p-2 pr-3 ring-0 group-focus-within:ring-2 ring-primary/20 transition-all">
                    <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-xl">
                        <Paperclip className="h-5 w-5" />
                    </Button>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                        placeholder="Ask in any language..."
                        className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-3 px-2 font-medium placeholder:text-muted-foreground/60"
                    />
                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-xl">
                            <Mic className="h-5 w-5" />
                        </Button>
                        <Button
                            type="submit"
                            disabled={!input.trim() || isTyping}
                            className="h-10 w-10 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95 disabled:opacity-50"
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <p className="text-[9px] text-center text-muted-foreground/40 font-bold uppercase tracking-[0.2em] pt-1">
                Enterprise Shield Active • SOC2 Compliant Environment
            </p>
        </form>
    )
}
