import { AnalyticsProvider } from './context'
import { MetricsGrid } from './components/MetricsGrid'
import { AccuracyChart } from './components/AccuracyChart'
import { SystemNodes } from './components/SystemNodes'
import { IntelligenceGrid } from './components/IntelligenceGrid'
import { DocumentStream } from './components/DocumentStream'
import { AnalyticsFilters } from './components/AnalyticsFilters'

export const Analytics = {
    Root: AnalyticsProvider,
    Metrics: MetricsGrid,
    Accuracy: AccuracyChart,
    Nodes: SystemNodes,
    Intelligence: IntelligenceGrid,
    Stream: DocumentStream,
    Sidebar: AnalyticsFilters,
}
