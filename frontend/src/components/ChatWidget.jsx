import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { aiChatApi } from '../api/client'
import { useAuth } from '../hooks/useAuth'

async function sendAiQuery(token, query) {
  const data = await aiChatApi.chat(query, token)
  return data.response
}

export default function ChatWidget() {
  const { token } = useAuth()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])

  const sendMutation = useMutation({
    mutationFn: (query) => sendAiQuery(token, query),
    onSuccess: (response) => {
      setMessages((prev) => [...prev, { role: 'assistant', content: response }])
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, something went wrong.' },
      ])
    },
  })

  const handleSend = () => {
    const text = input.trim()
    if (!text || sendMutation.isPending) return
    setMessages((prev) => [...prev, { role: 'user', content: text }])
    setInput('')
    sendMutation.mutate(text)
  }

  if (!token) return null

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-enterprise-blue text-white shadow-lg hover:bg-enterprise-blue-light flex items-center justify-center z-50"
        aria-label="Toggle AI chat"
      >
        {open ? '✕' : '💬'}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 w-[380px] max-h-[480px] flex flex-col rounded-lg shadow-xl border border-enterprise-blue/20 bg-white z-50">
          <div className="p-3 rounded-t-lg bg-enterprise-blue text-white font-semibold">
            E&amp;E AI Assistant
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 min-h-[200px]">
            {messages.length === 0 && (
              <p className="text-slate-500 text-sm">Ask about our services and courses.</p>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm p-2 rounded-lg ${
                  m.role === 'user'
                    ? 'ml-8 bg-enterprise-blue text-white'
                    : 'mr-8 bg-slate-100 text-slate-800'
                }`}
              >
                {m.content}
              </div>
            ))}
            {sendMutation.isPending && (
              <p className="text-slate-500 text-sm">Thinking...</p>
            )}
          </div>
          <div className="p-2 border-t flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your question..."
              className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-enterprise-blue outline-none"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={sendMutation.isPending || !input.trim()}
              className="px-4 py-2 rounded-lg bg-enterprise-blue text-white disabled:opacity-50 hover:bg-enterprise-blue-light"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  )
}
