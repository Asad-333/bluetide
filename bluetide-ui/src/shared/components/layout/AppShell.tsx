import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { cn } from '@/shared/lib/utils'
import { useRouterState } from '@tanstack/react-router'

interface AppShellProps {
    children: ReactNode
    showSidebar?: boolean
    fullBleed?: boolean
}

export function AppShell({ children, showSidebar = true, fullBleed }: AppShellProps) {
    const routerState = useRouterState()
    const pathname = routerState.location.pathname
    const isFullBleed = fullBleed ?? pathname.startsWith('/chat')

    return (
        <div className="flex flex-1 overflow-hidden">
            {showSidebar && <Sidebar className="hidden lg:flex" />}
            <main className={cn(
                "flex-1 overflow-auto",
                !isFullBleed && "p-6"
            )}>
                {children}
            </main>
        </div>
    )
}
