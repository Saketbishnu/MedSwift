import React, { useEffect, useRef, useState } from 'react'

const initialMessages = [
  {
    id: 1,
    sender: 'bot',
    text: 'Hi! I am the ShopZy assistant. Ask me anything about Products, orders, or support and I will do my best to help.'
  }
]

const CHAT_ENDPOINT = 'http://127.0.0.1:8012/chat'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState(initialMessages)
  const [inputValue, setInputValue] = useState('')
  const [isReplying, setIsReplying] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isOpen, isReplying])

  const handleSendMessage = async (event) => {
    event.preventDefault()

    const trimmedMessage = inputValue.trim()

    if (!trimmedMessage || isReplying) {
      return
    }

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: trimmedMessage
    }

    setMessages((currentMessages) => [...currentMessages, userMessage])
    setInputValue('')
    setIsReplying(true)

    try {
      const response = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: trimmedMessage })
      })

      if (!response.ok) {
        throw new Error('Backend request failed')
      }

      const data = await response.json()

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: data.response || 'Sorry, I could not understand that response.'
        }
      ])
    } catch {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: 'Sorry, I am having trouble reaching the Shopzy AI service right now. Please try again in a moment.'
        }
      ])
    } finally {
      setIsReplying(false)
    }
  }

  return (
    <div className='fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6'>
      {isOpen && (
        <div className='mb-3 flex h-[26rem] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-[0_18px_45px_rgba(148,163,184,0.25)]'>
          <div className='flex items-center justify-between bg-sky-500 px-4 py-3 text-white'>
            <div>
              <p className='text-sm font-semibold'>ShopZy Assistant</p>
              <p className='text-xs text-sky-100'>Quick help, now in preview</p>
            </div>
            <button
              type='button'
              onClick={() => setIsOpen(false)}
              className='rounded-full px-2 py-1 text-lg leading-none transition hover:bg-white/10'
              aria-label='Close chatbot'
            >
              ×
            </button>
          </div>

          <div className='flex-1 space-y-3 overflow-y-auto bg-slate-50 px-4 py-4'>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-6 shadow-sm ${
                    message.sender === 'user'
                      ? 'rounded-br-md bg-sky-500 text-white'
                      : 'rounded-bl-md bg-white text-gray-700'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {isReplying && (
              <div className='flex justify-start'>
                <div className='rounded-2xl rounded-bl-md bg-white px-4 py-2 text-sm text-gray-500 shadow-sm'>
                  Typing...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className='border-t border-slate-200 bg-white p-3'>
            <div className='flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 focus-within:border-sky-400'>
              <input
                type='text'
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder='Type your message...'
                className='flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400'
                aria-label='Chat message'
              />
              <button
                type='submit'
                className='rounded-full bg-sky-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:bg-sky-300'
                disabled={!inputValue.trim() || isReplying}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        type='button'
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className='ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-sky-500 text-2xl text-white shadow-[0_14px_30px_rgba(14,165,233,0.35)] transition hover:bg-sky-600'
        aria-label={isOpen ? 'Close chatbot' : 'Open chatbot'}
      >
        {isOpen ? '×' : 'AI'}
      </button>
    </div>
  )
}

export default Chatbot
