import { useEffect, useState } from 'react'
import { api } from '../../api/client'

const OverviewPage = () => {
  const [stats, setStats] = useState({ projects: 0, messages: 0 })

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [projectsRes, messagesRes] = await Promise.all([
          api.get('/admin/projects'),
          api.get('/admin/messages'),
        ])

        setStats({
          projects: projectsRes.data.length,
          messages: messagesRes.data.length,
        })
      } catch {
        setStats({ projects: 0, messages: 0 })
      }
    }

    loadStats()
  }, [])

  return (
    <section className="grid gap-4 sm:grid-cols-2">
      <article className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-sm font-medium text-slate-500">Total Projects</h2>
        <p className="mt-2 text-3xl font-semibold text-slate-900">{stats.projects}</p>
      </article>
      <article className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-sm font-medium text-slate-500">Inbox Messages</h2>
        <p className="mt-2 text-3xl font-semibold text-slate-900">{stats.messages}</p>
      </article>
    </section>
  )
}

export default OverviewPage
