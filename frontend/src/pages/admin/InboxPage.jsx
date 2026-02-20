import { useEffect, useState } from 'react'
import { api } from '../../api/client'

const InboxPage = () => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const response = await api.get('/admin/messages')
        setMessages(response.data)
      } catch {
        setMessages([])
      }
    }

    loadMessages()
  }, [])

  return (
    <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-lg font-semibold text-slate-900">Inbox</h2>

      {messages.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">No messages yet.</p>
      ) : (
        <div className="mt-4 space-y-3">
          {messages.map((message) => (
            <article key={message._id} className="rounded-lg border border-slate-200 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-medium text-slate-900">{message.name}</h3>
                <span className="text-xs text-slate-500">
                  {new Date(message.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-600">{message.email}</p>
              <p className="mt-3 text-sm text-slate-700">{message.message}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default InboxPage
