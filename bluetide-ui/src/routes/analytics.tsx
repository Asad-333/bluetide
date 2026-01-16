import { createFileRoute } from '@tanstack/react-router'
import { Analytics } from '@/features/analytics'
import { Hero } from '@/shared/components/layout/Hero'
import { BarChart3 } from 'lucide-react'

export const Route = createFileRoute('/analytics')({
    component: AnalyticsPage,
})

function AnalyticsPage() {
    return (
        <div className="space-y-8 max-w-[1400px] mx-auto p-6 overflow-x-hidden">
            <Hero
                variant="minimal"
                title="Intelligence Analytics"
                subtitle="Performance monitoring and cross-lingual extraction metrics"
                icon={<BarChart3 className="h-6 w-6" />}
            />

            <Analytics.Metrics />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Analytics.Accuracy />
                    <Analytics.Intelligence />
                </div>
                <div className="space-y-8">
                    <Analytics.Nodes />
                </div>
            </div>

            <Analytics.Stream />

            {/* Bottom Spacer */}
            <div className="h-12" />
        </div>
    )
}
