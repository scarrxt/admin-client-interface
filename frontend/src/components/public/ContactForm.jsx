import { useState } from 'react'
import { api } from '../../api/client'

const initialState = {
  name: '',
  email: '',
  message: '',
}

const ContactForm = () => {
  const [form, setForm] = useState(initialState)
  const [status, setStatus] = useState({ type: '', text: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus({ type: '', text: '' })

    try {
      await api.post('/public/messages', form)
      setStatus({ type: 'success', text: 'Message sent successfully.' })
      setForm(initialState)
    } catch (error) {
      const message = error.response?.data?.message || 'Unable to send message right now.'
      setStatus({ type: 'error', text: message })
    }
  }

  return (
    <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-2xl font-semibold text-slate-900">Contact</h2>
      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <input
          className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm outline-none focus:border-slate-500"
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm outline-none focus:border-slate-500"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          className="h-28 w-full rounded-lg border border-slate-300 bg-white p-3 text-sm outline-none focus:border-slate-500"
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          Send Message
        </button>
      </form>
      {status.text && (
        <p className={`mt-3 text-sm ${status.type === 'success' ? 'text-emerald-600' : 'text-rose-600'}`}>
          {status.text}
        </p>
      )}
    </section>
  )
}

export default ContactForm
