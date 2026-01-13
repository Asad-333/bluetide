import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
        Bluetide
      </h1>
      <p className="mt-6 text-lg leading-8 text-slate-400 max-w-2xl">
        Intelligent Document Processing Factory. Multilingual, Incremental, and Vector-enabled.
      </p>
    </div>
  )
}
