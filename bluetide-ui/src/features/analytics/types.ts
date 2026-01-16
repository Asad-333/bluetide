export interface MetricCard {
    label: string
    value: string
    change: string
    trend: 'up' | 'down' | 'stable'
    unit?: string
}

export interface AccuracyData {
    phase: string
    english: number
    arabic: number
}

export interface NodeDistribution {
    label: string
    value: number
    color: string
}

export interface LatencyMetric {
    label: string
    value: number
    target: number
}

export interface IntelligenceGridItem {
    schema: string
    languages: {
        code: string
        label: string
        value: number
    }[]
}

export interface StreamItem {
    id: string
    timestamp: string
    docId: string
    type: string
    language: string
    confidence: number
    latency: number
}

export interface AnalyticsData {
    metrics: MetricCard[]
    accuracy: AccuracyData[]
    nodes: NodeDistribution[]
    latency: LatencyMetric[]
    intelligence: IntelligenceGridItem[]
    stream: StreamItem[]
}

export type TimeRange = 'Last 24 Hours' | 'Last 7 Days' | 'Last 30 Days' | 'Last 90 Days'

export interface AnalyticsFilters {
    timeRange: TimeRange
    segments: string[]
    docTypes: string[]
}

export const ANALYTICS_SCHEMA_VERSION = "1.0.0";
