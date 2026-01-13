import type { ReactNode } from 'react'
import { useRouterState } from '@tanstack/react-router'
import {
    FileText,
    FolderOpen,
    Upload,
    Settings,
    Search,
    LayoutDashboard,
} from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { Chat } from '@/features/chat'

interface SidebarItem {
    label: string
    icon: ReactNode
    href?: string
}

const documentsSidebarItems: SidebarItem[] = [
    { label: 'All Documents', icon: <FolderOpen className="h-4 w-4" /> },
    { label: 'Upload', icon: <Upload className="h-4 w-4" /> },
    { label: 'Processing Queue', icon: <FileText className="h-4 w-4" /> },
    { label: 'Search', icon: <Search className="h-4 w-4" /> },
]

const defaultSidebarItems: SidebarItem[] = [
    { label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
    { label: 'Settings', icon: <Settings className="h-4 w-4" /> },
]

function getSidebarItems(pathname: string): SidebarItem[] {
    if (pathname.startsWith('/documents')) {
        return documentsSidebarItems
    }
    return defaultSidebarItems
}

interface SidebarProps {
    className?: string
}

export function Sidebar({ className }: SidebarProps) {
    const routerState = useRouterState()
    const pathname = routerState.location.pathname
    const items = getSidebarItems(pathname)
    const isChat = pathname.startsWith('/chat')

    return (
        <aside
            className={cn(
                'flex flex-col border-e bg-card transition-all duration-300 ps-2 py-6 overflow-hidden',
                isChat ? 'w-80' : 'w-64',
                className
            )}
        >
            {isChat ? (
                <div className="flex-1 px-2 overflow-hidden">
                    <Chat.SidebarContent />
                </div>
            ) : (
                <nav className="flex-1 space-y-1 px-2">
                    {items.map((item) => (
                        <button
                            key={item.label}
                            className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground active:scale-[0.98]"
                        >
                            <span className="text-muted-foreground transition-colors group-hover:text-primary">
                                {item.icon}
                            </span>
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>
            )}

            <div className="mt-auto px-4 py-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <p className="text-xs font-bold uppercase tracking-wider text-primary/70">System Status</p>
                    <div className="mt-2 flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[11px] font-medium text-foreground/80">All services operational</span>
                    </div>
                </div>
            </div>
        </aside>
    )
}
