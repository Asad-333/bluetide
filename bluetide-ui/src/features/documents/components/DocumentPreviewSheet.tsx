import {
    Sheet,
    SheetContent,
    SheetTitle,
} from '@/shared/components/ui/sheet'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/shared/components/ui/tabs'
import { useDocuments } from '../context'
import {
    FileText,
    Download,
    ExternalLink,
    TrendingUp,
    Database,
    History as HistoryIcon,
    Layout,
} from 'lucide-react'
import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'

export function DocumentPreviewSheet() {
    const { selectedDocument, isPreviewOpen, setIsPreviewOpen } = useDocuments()

    if (!selectedDocument) return null

    return (
        <Sheet open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
            <SheetContent side="right" className="w-full sm:max-w-xl p-0 border-l border-border bg-background flex flex-col gap-0 overflow-hidden">
                {/* Custom Header Area */}
                <div className="p-6 pb-4 space-y-4">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                            <div className="h-12 w-12 rounded-xl bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
                                <FileText className="h-6 w-6 text-rose-500" />
                            </div>
                            <div className="space-y-1">
                                <SheetTitle className="text-xl font-bold truncate max-w-[300px]">
                                    {selectedDocument.name}
                                </SheetTitle>
                                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                                    ID: {selectedDocument.uid}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 pr-8">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                <ExternalLink className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl border bg-card/50 space-y-1.5 transition-all hover:bg-card">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">
                                Confidence
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-2xl font-bold text-emerald-500">
                                    {selectedDocument.confidencePercentage ?? 0}%
                                </span>
                                <TrendingUp className="h-4 w-4 text-emerald-500/70" />
                            </div>
                        </div>
                        <div className="p-4 rounded-xl border bg-card/50 space-y-1.5 transition-all hover:bg-card">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">
                                File Size
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-2xl font-bold text-foreground">
                                    4.2 MB
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <Tabs defaultValue="overview" className="flex-1 flex flex-col overflow-hidden">
                    <div className="px-6 border-b">
                        <TabsList className="h-12 bg-transparent gap-6 p-0">
                            <TabsTrigger
                                value="overview"
                                className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 text-sm font-medium transition-all"
                            >
                                Overview
                            </TabsTrigger>
                            <TabsTrigger
                                value="data"
                                className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 text-sm font-medium transition-all"
                            >
                                Extracted Data
                            </TabsTrigger>
                            <TabsTrigger
                                value="history"
                                className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 text-sm font-medium transition-all"
                            >
                                History
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <div className="flex-1 overflow-y-auto bg-muted/30">
                        <TabsContent value="overview" className="m-0 p-6 space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                        <Layout className="h-3.5 w-3.5" />
                                        Document Preview
                                    </h3>
                                    <Badge variant="outline" className="text-[10px] bg-background">Page 1 of 12</Badge>
                                </div>

                                <div className="aspect-[3/4] rounded-lg border-2 border-dashed border-border/60 bg-background/50 flex flex-col items-center justify-center gap-4 text-center p-8">
                                    {selectedDocument.name.toLowerCase().includes('animal farm') ? (
                                        <div className="space-y-4 w-full">
                                            <div className="h-8 w-2/3 bg-muted rounded animate-pulse" />
                                            <div className="space-y-2">
                                                <div className="h-4 w-full bg-muted/60 rounded" />
                                                <div className="h-4 w-full bg-muted/60 rounded" />
                                                <div className="h-4 w-3/4 bg-muted/60 rounded" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 pt-4">
                                                <div className="aspect-video bg-muted/40 rounded" />
                                                <div className="aspect-video bg-muted/40 rounded" />
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-4 italic">
                                                Demo Preview: Rendering Animal Farm.pdf
                                            </p>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                                                <FileText className="h-6 w-6 text-muted-foreground" />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium">No Visual Preview Available</p>
                                                <p className="text-xs text-muted-foreground">The preview for this document type is being generated.</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="data" className="m-0 p-6">
                            <div className="space-y-4">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                    <Database className="h-3.5 w-3.5" />
                                    Detected Entities
                                </h3>
                                <div className="rounded-lg border bg-background overflow-hidden">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="bg-muted/50 border-b">
                                                <th className="text-left px-4 py-2 font-medium">Field</th>
                                                <th className="text-left px-4 py-2 font-medium">Value</th>
                                                <th className="text-right px-4 py-2 font-medium">Confidence</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                            <tr>
                                                <td className="px-4 py-2 text-muted-foreground">Invoice No</td>
                                                <td className="px-4 py-2 font-mono">INV-2023-001</td>
                                                <td className="px-4 py-2 text-right text-emerald-500">99%</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-2 text-muted-foreground">Date</td>
                                                <td className="px-4 py-2 font-mono">Oct 12, 2023</td>
                                                <td className="px-4 py-2 text-right text-emerald-500">98%</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-2 text-muted-foreground">Vendor</td>
                                                <td className="px-4 py-2 font-mono">Manor Farm</td>
                                                <td className="px-4 py-2 text-right text-amber-500">82%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="history" className="m-0 p-6">
                            <div className="space-y-6">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                    <HistoryIcon className="h-3.5 w-3.5" />
                                    Audit Log
                                </h3>
                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex gap-4">
                                            <div className="flex flex-col items-center gap-1">
                                                <div className="h-2 w-2 rounded-full bg-primary" />
                                                <div className="w-px flex-1 bg-border" />
                                            </div>
                                            <div className="pb-4">
                                                <p className="text-sm font-medium">Document {i === 1 ? 'Imported' : i === 2 ? 'Parsed' : 'Indexed'}</p>
                                                <p className="text-xs text-muted-foreground">Oct {10 + i}, 2023 - 09:4{i} AM</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>
            </SheetContent>
        </Sheet>
    )
}
