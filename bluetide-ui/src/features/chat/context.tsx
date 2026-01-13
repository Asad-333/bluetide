import { createContext, useContext, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import type { ChatMessage, ChatSession } from './types'

interface ChatContextValue {
    messages: ChatMessage[]
    sessions: ChatSession[]
    activeSessionId: string | null
    isSidebarOpen: boolean
    isRetrievalPanelOpen: boolean
    isTyping: boolean

    // Actions
    sendMessage: (content: string) => void
    setSidebarOpen: (open: boolean) => void
    setRetrievalPanelOpen: (open: boolean) => void
    setActiveSession: (id: string | null) => void
    createNewSession: () => void
}

const ChatContext = createContext<ChatContextValue | null>(null)

export function useChat() {
    const context = useContext(ChatContext)
    if (!context) {
        throw new Error('useChat must be used within a ChatProvider')
    }
    return context
}

export function ChatProvider({ children }: { children: ReactNode }) {
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [sessions, setSessions] = useState<ChatSession[]>([
        { id: '1', title: 'Q4 Revenue Audit', lastModified: new Date(), status: 'completed' },
        { id: '2', title: 'Vendor Contracts (AR)', lastModified: new Date(), status: 'completed' },
        { id: '3', title: 'GDPR Compliance Check', lastModified: new Date(), status: 'completed' },
    ])
    const [activeSessionId, setActiveSessionId] = useState<string | null>(null)
    const [isSidebarOpen, setSidebarOpen] = useState(true)
    const [isRetrievalPanelOpen, setRetrievalPanelOpen] = useState(false)
    const [isTyping, setIsTyping] = useState(false)

    const createNewSession = useCallback(() => {
        const id = Math.random().toString(36).substring(7)
        setSessions(prev => [
            { id, title: 'New Analysis', lastModified: new Date(), status: 'running' },
            ...prev
        ])
        setActiveSessionId(id)
        setMessages([])
    }, [])

    const simulateAIResponse = useCallback(() => {
        setIsTyping(true)

        // Mock a sophisticated AI response with reasoning
        setTimeout(() => {
            const botMsg: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "Based on the Q4 performance data, revenue showed a balanced growth across most regions, with North America leading at a 12.4% increase. However, the EMEA region reported a slight deviation due to currency fluctuations visible in the consolidated report.",
                timestamp: new Date(),
                reasoningSteps: [
                    { id: 'r1', label: 'Thinking...', status: 'completed' },
                    { id: 'r2', label: 'Searching Vector DB (Found 4 sources)...', status: 'completed' },
                    { id: 'r3', label: 'Reading Documents...', status: 'running' }
                ],
                citations: [
                    { id: '1', name: 'Q4_Consolidated.pdf', source: 'sharepoint', confidence: 98, access_verified: true },
                    { id: '2', name: 'Log_Dec14_AWS.json', source: 's3', confidence: 92, access_verified: true }
                ]
            }
            setMessages(prev => [...prev, botMsg])
            setIsTyping(false)
        }, 2000)
    }, [])

    const sendMessage = useCallback((content: string) => {
        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            content,
            timestamp: new Date()
        }
        setMessages(prev => [...prev, userMsg])

        simulateAIResponse()
    }, [simulateAIResponse])

    return (
        <ChatContext.Provider
            value={{
                messages,
                sessions,
                activeSessionId,
                isSidebarOpen,
                isRetrievalPanelOpen,
                isTyping,
                sendMessage,
                setSidebarOpen,
                setRetrievalPanelOpen,
                setActiveSession: setActiveSessionId,
                createNewSession
            }}
        >
            {children}
        </ChatContext.Provider>
    )
}
