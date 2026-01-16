export interface DashboardStats {
    totalIntelligenceBase: {
        value: number
        growth: number
        label: string
    }
    activePipelines: {
        total: number
        running: number
        processingRate: string
    }
    computeSavings: {
        value: number
        label: string
        reduction: string
    }
}

export interface AIInsight {
    id: string
    type: 'pattern' | 'anomaly'
    title: string
    timestamp: string
    pipeline: string
    content: string
    status: string
    actions: string[]
}

export interface SystemHealth {
    connectors: Array<{
        name: string
        status: 'active' | 'idle' | 'failed'
    }>
    vectorDbLatency: number
}

export interface FrequentQuery {
    id: string
    label: string
    subtext: string
}

export interface DashboardData {
    stats: DashboardStats
    recentAIInsights: AIInsight[]
    systemHealth: SystemHealth
    frequentQueries: FrequentQuery[]
}

// Dummy constant to ensure this is treated as a module with runtime exports if needed
export const DASHBOARD_SCHEMA_VERSION = "1.0.0";
