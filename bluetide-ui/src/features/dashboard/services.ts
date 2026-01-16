import { useQuery } from '@tanstack/react-query'
import type { DashboardData } from './types'

export const useDashboardData = () => {
    return useQuery<DashboardData>({
        queryKey: ['dashboard-data'],
        queryFn: async () => {
            const response = await fetch('/data/dashboard-mock.json')
            if (!response.ok) {
                throw new Error('Failed to fetch dashboard data')
            }
            return response.json()
        },
    })
}
