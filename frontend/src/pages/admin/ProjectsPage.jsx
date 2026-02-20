import { useEffect, useState } from 'react'
import { api } from '../../api/client'

const initialForm = {
  projectName: '',
  title: '',
  description: '',
  imageUrl: '',
}

const ProjectsPage = () => {
  const [projects, setProjects] = useState([])
  const [form, setForm] = useState(initialForm)
  const [editingId, setEditingId] = useState('')
  const [status, setStatus] = useState('')

  const loadProjects = async () => {
    const response = await api.get('/admin/projects')
    setProjects(response.data)
  }

  useEffect(() => {
    loadProjects()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setForm(initialForm)
    setEditingId('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('')

    try {
      if (editingId) {
        await api.put(`/admin/projects/${editingId}`, form)
        setStatus('Project updated.')
      } else {
        await api.post('/admin/projects', form)
        setStatus('Project added.')
      }

      resetForm()
      await loadProjects()
    } catch (error) {
      setStatus(error.response?.data?.message || 'Unable to save project.')
    }
  }

  const handleEdit = (project) => {
    setEditingId(project._id)
    setForm({
      projectName: project.projectName,
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl,
    })
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/projects/${id}`)
      setStatus('Project deleted.')
      if (editingId === id) {
        resetForm()
      }
      await loadProjects()
    } catch (error) {
      setStatus(error.response?.data?.message || 'Unable to delete project.')
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200 lg:col-span-2">
        <h2 className="text-lg font-semibold text-slate-900">{editingId ? 'Edit Project' : 'Add Project'}</h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <input
            name="projectName"
            value={form.projectName}
            onChange={handleChange}
            placeholder="Project Name"
            className="w-full rounded-lg border border-slate-300 p-3 text-sm outline-none focus:border-slate-600"
            required
          />
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full rounded-lg border border-slate-300 p-3 text-sm outline-none focus:border-slate-600"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="h-28 w-full rounded-lg border border-slate-300 p-3 text-sm outline-none focus:border-slate-600"
            required
          />
          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full rounded-lg border border-slate-300 p-3 text-sm outline-none focus:border-slate-600"
            required
          />

          <div className="flex gap-2">
            <button type="submit" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700">
              {editingId ? 'Update' : 'Add'}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="rounded-lg border border-slate-300 px-4 py-2 text-sm">
                Cancel
              </button>
            )}
          </div>
        </form>
        {status && <p className="mt-3 text-sm text-slate-600">{status}</p>}
      </section>

      <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200 lg:col-span-3">
        <h2 className="text-lg font-semibold text-slate-900">View Projects</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="px-2 py-2">Project Name</th>
                <th className="px-2 py-2">Title</th>
                <th className="px-2 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id} className="border-b border-slate-100">
                  <td className="px-2 py-3">{project.projectName}</td>
                  <td className="px-2 py-3">{project.title}</td>
                  <td className="px-2 py-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(project)}
                        className="rounded-md border border-slate-300 px-3 py-1 text-xs"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(project._id)}
                        className="rounded-md border border-rose-200 bg-rose-50 px-3 py-1 text-xs text-rose-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {projects.length === 0 && <p className="pt-3 text-sm text-slate-500">No projects available.</p>}
        </div>
      </section>
    </div>
  )
}

export default ProjectsPage
