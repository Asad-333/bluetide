import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/utils'

interface HeroProps {
    title: string
    subtitle?: string
    icon?: ReactNode
    action?: ReactNode
    className?: string
    variant?: 'default' | 'minimal' | 'card'
}

export function Hero({ title, subtitle, icon, action, className, variant = 'minimal' }: HeroProps) {
    if (variant === 'minimal') {
        return (
            <div className={cn('flex flex-col gap-4 md:flex-row md:items-center md:justify-between py-2', className)}>
                <div className="flex items-center gap-4">
                    {icon && (
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            {icon}
                        </div>
                    )}
                    <div className="space-y-0.5">
                        <h1 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="text-sm text-muted-foreground">
                                {subtitle}
                            </p>
                        )}
                    </div>
                </div>
                {action && (
                    <div className="flex items-center gap-3">
                        {action}
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className={cn(
            'relative overflow-hidden p-8 shadow-sm transition-all',
            variant === 'card' ? 'rounded-xl border bg-card' : 'bg-transparent',
            className
        )}>
            {/* Background pattern - only for card variant or if explicitly requested */}
            {variant === 'card' && (
                <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-primary/5 blur-3xl opacity-50" />
            )}

            <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                    {icon && (
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            {icon}
                        </div>
                    )}
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="text-sm text-muted-foreground md:text-base">
                                {subtitle}
                            </p>
                        )}
                    </div>
                </div>
                {action && (
                    <div className="flex items-center gap-3">
                        {action}
                    </div>
                )}
            </div>
        </div>
    )
}
