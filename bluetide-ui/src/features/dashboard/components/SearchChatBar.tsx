import * as React from "react"
import { useNavigate } from "@tanstack/react-router"
import { Search, Send, Command } from "lucide-react"

export const SearchChatBar = () => {
    const [query, setQuery] = React.useState("")
    const navigate = useNavigate()

    const handleSearch = (e?: React.FormEvent) => {
        e?.preventDefault()
        if (query.trim()) {
            // Redirect to chat with the query as a state or param
            navigate({
                to: "/chat",
                search: { q: query.trim() }
            })
        }
    }

    return (
        <form
            onSubmit={handleSearch}
            className="relative flex items-center gap-3 p-2 pl-4 pr-2 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl shadow-2xl focus-within:border-primary/50 transition-all group lg:min-w-[600px]"
        >
            <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />

            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the Intelligence Base or ask a question..."
                className="flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground/50 py-2"
            />

            <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-muted-foreground">
                    <Command className="h-3 w-3" />
                    <span>K</span>
                </div>

                <button
                    type="submit"
                    disabled={!query.trim()}
                    className="p-2 rounded-xl bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                >
                    <Send className="h-5 w-5" />
                </button>
            </div>
        </form>
    )
}
