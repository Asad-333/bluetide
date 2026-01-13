import { useChat } from '../context'
import { ChatStartView } from './ChatStartView'
import { ChatMessageList } from './ChatMessageList'
import { ChatInput } from './ChatInput'
import { Button } from '@/shared/components/ui/button'
import { Share2, PanelRightClose, PanelRightOpen } from 'lucide-react'

export function ChatView() {
    const { messages, activeSessionId, isRetrievalPanelOpen, setRetrievalPanelOpen } = useChat()

    return (
        <main className="flex-1 flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
            {/* Context Header */}
            {activeSessionId && (
                <div className="h-14 border-b bg-background/50 backdrop-blur-md flex items-center justify-between px-6 z-10">
                    <div className="flex flex-col">
                        <h2 className="text-sm font-bold truncate">Q4 Performance & Audit</h2>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Active sources:</span>
                            <span className="text-[10px] text-primary font-bold">SharePoint, AWS S3</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8 gap-2 border-primary/20 hover:bg-primary/5">
                            <Share2 className="h-3.5 w-3.5" />
                            Share
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground"
                            onClick={() => setRetrievalPanelOpen(!isRetrievalPanelOpen)}
                        >
                            {isRetrievalPanelOpen ? <PanelRightClose className="h-4 w-4" /> : <PanelRightOpen className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>
            )}

            <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
                {messages.length === 0 ? (
                    <ChatStartView />
                ) : (
                    <ChatMessageList />
                )}
            </div>

            <div className="p-4 md:p-6 bg-gradient-to-t from-background via-background to-transparent">
                <ChatInput />
                <p className="text-[10px] text-center text-muted-foreground/50 mt-3 font-medium">
                    AI responses are generated in real-time. Please verify critical information using the provided source chips.
                </p>
            </div>
        </main>
    )
}
