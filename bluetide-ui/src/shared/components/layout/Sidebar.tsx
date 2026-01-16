import { useRouterState } from '@tanstack/react-router'
import { cn } from '@/shared/lib/utils'
import { Chat } from '@/features/chat'
import { Analytics } from '@/features/analytics'
import {
    FolderOpen,
    Upload,
    FileText,
    Search,
    ChevronLeft
} from 'lucide-react'
import { Link } from '@tanstack/react-router'

interface SidebarProps {
    className?: string
}

export function Sidebar({ className }: SidebarProps) {
    const routerState = useRouterState()
    const pathname = routerState.location.pathname
    const isChat = pathname.startsWith('/chat')
    const isAnalytics = pathname.startsWith('/analytics')
    const isDocuments = pathname.startsWith('/documents')

    return (
        <aside
            className={cn(
                'flex flex-col border-e bg-card/30 backdrop-blur-xl transition-all duration-300 py-6 overflow-hidden',
                (isChat || isAnalytics) ? 'w-80' : 'w-64',
                className
            )}
        >
            {/* Feature Label / Context Header */}
            <div className="px-6 mb-8 flex items-center justify-between">
                <h2 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                    {isChat ? 'Intelligence Chat' : isAnalytics ? 'Data Insights' : isDocuments ? 'Document Manager' : 'Workbench'}
                </h2>
                <button className="h-5 w-5 flex items-center justify-center rounded-md hover:bg-accent text-muted-foreground/40 hover:text-foreground transition-colors">
                    <ChevronLeft className="h-3 w-3" />
                </button>
            </div>

            <div className="flex-1 px-3 overflow-y-auto custom-scrollbar">
                {isChat ? (
                    <Chat.SidebarContent />
                ) : isAnalytics ? (
                    <Analytics.Sidebar />
                ) : isDocuments ? (
                    <nav className="space-y-1">
                        {[
                            { label: 'All Documents', icon: FolderOpen, to: '/documents' },
                            { label: 'Upload New', icon: Upload, to: '/documents/upload' },
                            { label: 'System Queue', icon: FileText, to: '/documents/queue' },
                            { label: 'Global Search', icon: Search, to: '/documents/search' },
                        ].map((item) => (
                            <Link
                                key={item.label}
                                to={item.to}
                                className="group flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-bold transition-all hover:bg-accent active:scale-[0.98] [&.active]:bg-primary/10 [&.active]:text-primary"
                            >
                                <item.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary group-[.active]:text-primary" />
                                <span className="text-muted-foreground group-hover:text-foreground group-[.active]:text-primary">{item.label}</span>
                            </Link>
                        ))}
                    </nav>
                ) : (
                    <div className="px-3">
                        <div className="rounded-xl border border-border/50 bg-accent/30 p-4">
                            <p className="text-[11px] font-bold text-muted-foreground leading-relaxed">
                                Select a workspace from the command rail to begin.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Contextual Utility */}
            <div className="mt-auto px-4 pt-4 border-t border-border/40">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <div className="flex items-center justify-between mb-1">
                        <p className="text-[9px] font-black uppercase tracking-widest text-primary/70">Operational</p>
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    </div>
                    <p className="text-[10px] font-medium text-foreground/60 leading-tight">
                        Node Cluster 04 responding at 24ms.
                    </p>
                </div>
            </div>
        </aside>
    )
}
