import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Header } from '@/shared/components/layout/Header'
import { AppShell } from '@/shared/components/layout/AppShell'
import { ThemeProvider } from '@/shared/components/theme-provider'
import { DocumentProvider } from '@/features/documents/context'
import { ChatProvider } from '@/features/chat/context'
import { AnalyticsProvider } from '@/features/analytics/context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <DocumentProvider>
          <ChatProvider>
            <AnalyticsProvider>
              <div className="flex h-screen w-screen flex-col font-sans antialiased overflow-hidden bg-background">
                <AppShell>
                  <Outlet />
                </AppShell>
              </div>
            </AnalyticsProvider>
          </ChatProvider>
        </DocumentProvider>
      </ThemeProvider>
    </QueryClientProvider>
  ),
})
