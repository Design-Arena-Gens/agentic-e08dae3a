'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }],
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          role: 'system',
          content: 'Sorry, I encountered an error. Please try again.',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestion = (text: string) => {
    setInput(text)
  }

  return (
    <div className="container">
      <div className="header">
        <h1>🤖 AI Agent</h1>
        <p>Your intelligent assistant powered by AI</p>
      </div>

      <div className="chat-container">
        <div className="messages">
          {messages.length === 0 ? (
            <div className="empty-state">
              <h2>👋 Hello! I'm your AI Agent</h2>
              <p>I can help you with various tasks. Try asking me something!</p>
              <div className="suggestions">
                <div className="suggestion" onClick={() => handleSuggestion('What can you help me with?')}>
                  <div className="suggestion-title">💡 Capabilities</div>
                  <div className="suggestion-text">Learn what I can do</div>
                </div>
                <div className="suggestion" onClick={() => handleSuggestion('Write a short story about a robot')}>
                  <div className="suggestion-title">✍️ Creative Writing</div>
                  <div className="suggestion-text">Generate creative content</div>
                </div>
                <div className="suggestion" onClick={() => handleSuggestion('Explain quantum computing simply')}>
                  <div className="suggestion-title">🔬 Explanations</div>
                  <div className="suggestion-text">Understand complex topics</div>
                </div>
                <div className="suggestion" onClick={() => handleSuggestion('Help me brainstorm app ideas')}>
                  <div className="suggestion-title">💭 Brainstorming</div>
                  <div className="suggestion-text">Generate ideas together</div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.role}`}>
                  {message.content}
                </div>
              ))}
              {isLoading && (
                <div className="message assistant">
                  <span className="loading"></span>
                  <span className="loading" style={{ marginLeft: '8px' }}></span>
                  <span className="loading" style={{ marginLeft: '8px' }}></span>
                </div>
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-container">
          <form onSubmit={handleSubmit} className="input-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
              className="input-field"
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || !input.trim()} className="send-button">
              {isLoading ? 'Thinking...' : 'Send'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
