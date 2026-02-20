import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../api/client'
import BioSection from '../../components/public/BioSection'
import ProjectsGrid from '../../components/public/ProjectsGrid'
import ContactForm from '../../components/public/ContactForm'

const HomePage = () => {
  const [bio, setBio] = useState('')
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const loadData = async () => {
      try {
        const [bioRes, projectsRes] = await Promise.all([
          api.get('/public/bio'),
          api.get('/public/projects'),
        ])

        setBio(bioRes.data?.content || '')
        setProjects(projectsRes.data || [])
      } catch {
        setBio('Unable to load bio right now.')
      }
    }

    loadData()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
          <h1 className="text-xl font-semibold">Portfolio</h1>
          <Link to="/admin/login" className="rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-100">
            Admin Login
          </Link>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-8 md:px-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <BioSection bio={bio} />
          <ProjectsGrid projects={projects} />
        </div>
        <ContactForm />
      </main>
    </div>
  )
}

export default HomePage
