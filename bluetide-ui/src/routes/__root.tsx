import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Header } from '@/shared/components/layout/Header'
import { AppShell } from '@/shared/components/layout/AppShell'
import { ThemeProvider } from '@/shared/components/theme-provider'
import { DocumentProvider } from '@/features/documents/context'
import { ChatProvider } from '@/features/chat/context'

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <DocumentProvider>
        <ChatProvider>
          <div className="flex min-h-screen flex-col font-sans antialiased">
            <Header />
            <AppShell>
              <Outlet />
            </AppShell>
          </div>
        </ChatProvider>
      </DocumentProvider>
    </ThemeProvider>
  ),
})
