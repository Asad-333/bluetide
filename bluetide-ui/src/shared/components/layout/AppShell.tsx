import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { CommandRail } from './CommandRail'
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
        <div className="flex h-full w-full overflow-hidden">
            {/* Phase 1: Global Command Rail */}
            <CommandRail />

            {/* Main Layout Area (Offset by Rail width) */}
            <div className="flex flex-1 pl-[64px] overflow-hidden">
                {/* Phase 2: Contextual Sidebar (Context Panel) */}
                {showSidebar && <Sidebar className="hidden lg:flex" />}

                {/* Phase 3: Main Page Content */}
                <main className={cn(
                    "flex-1 overflow-auto bg-background",
                    !isFullBleed && "p-8"
                )}>
                    {children}
                </main>
            </div>
        </div>
    )
}
