# Architecture Guide: Bluetide

This document defines the architectural standards for the Bluetide frontend. It merges a Feature-Driven Philosophy with the specific needs of an Intelligent Document Processing (IDP) factory.

🌊 Architectural Philosophy
1. **Domain-Centricity**: Code is grouped by business purpose (e.g., chat, processing) rather than technical type.
2. **Provider-Slot Pattern**: Features use a Root Provider to manage "Smart" logic (API/Context) and Slots to render "Dumb" UI.
3. **Semantic Theme Standardization**: The UI uses 100% semantic theme variables (e.g., `bg-background`, `text-muted-foreground`, `border-border`). **Hardcoded hex or slate/gray colors are strictly prohibited.**
4. **Linguistic Fluidity**: The UI is script-agnostic. Every component must support RTL (Arabic/Urdu) and LTR (English/Hindi) layouts natively using logical properties (`ps`, `pe`, `border-e`).

📂 Directory Structure
```
src/
├── features/               # Self-contained business domains
│   ├── chat/               # Conversational interface & Language matching
│   ├── documents/          # Library management & SharePoint/S3 syncing
│   └── processing/         # Pipeline status, OCR confidence, & logs
├── shared/                 # Foundation (Atomic Design)
│   ├── components/         # ui/ (Shadcn), layout/ (Hero, Sidebar, Header)
│   ├── hooks/              # use-direction, use-media-query, use-theme
│   ├── lib/                # cn helper, formatters, utils
│   └── types/              # Global schemas (Document, User, Language)
├── routes/                 # TanStack Router definitions
└── styles.css              # Global theme variables & Tailwind @layers
```

🏗️ Core Patterns

1. The Provider-Slot Implementation
Each feature directory follows this structure to ensure state is decoupled from the layout.

```typescript
// features/documents/index.ts
export const Document = {
  Root: DocumentProvider,     // Context & Data fetching
  Table: DocumentTable,       // Data Display
  Filters: DocumentFilters,   // Search & Refinement
};
```

2. Standardized Feature Layout (Hero-Toolbar split)
Every feature page must implement a 3-tier hierarchy for clarity and focus:

```typescript
<Document.Root>
  <div className="space-y-6">
    {/* Tier 1. Minimal Hero: Page Context */}
    <Shared.Hero 
      variant="minimal"
      title="Document Library" 
      subtitle="Managed sources from SharePoint and AWS S3"
      icon={<Files />}
    />

    {/* Tier 2. Action Toolbar: Interaction Layer */}
    <div className="flex items-center justify-between border-y border-border/40 bg-card/30 px-4 py-2 rounded-lg">
       <Document.Filters />
       {/* Other contextual actions */}
    </div>

    {/* Tier 3. Body Content: Data Layer */}
    <div className="grid grid-cols-1 gap-6">
       <Document.Table />
    </div>
  </div>
</Document.Root>
```

🎨 Aesthetic Standards
- **Vibrant but Muted**: Use 400-level shades for text and 10-15% opacity backgrounds for indicators (e.g., `bg-emerald-500/15 text-emerald-400`).
- **Standardized Code Elements**: Fingerprints and UIDs should use `<code>` tags with `font-mono`, `text-[10px]`, and `ring-1 ring-border/50`.
- **Destructive Highlighting**: Failed tasks or errors should use a subtle `bg-destructive/5` tint.

🌍 Multilingual (RTL/LTR) Standards
- **Logical Properties**: Always use `ps-*`, `pe-*`, `ms-*`, `me-*`, and `border-e/s` instead of Left/Right variants.
- **Direction Awareness**: The layout automatically handles grid and flex alignment through logical properties.

⚡ Server State & Processing
- **TanStack Query**: Used for all GET requests (Document list, Chat history).
- **Processing States**: For active OCR/Indexing tasks, use animated indicators (e.g., `animate-pulse` or `animate-spin`) with "running" status logic.

🛠️ AI Rules of Engagement
- **Zero Prop-Drilling**: Deep components must consume from the feature's Context.
- **Purely Semantic**: Never use hardcoded colors in Tailwind classes. Use the theme tokens.
- **Type Safety**: Every feature must have a defined `types/` schema that matches backend payloads.
