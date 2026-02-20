import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, setAuthToken } from '../../api/client'

const LoginPage = () => {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setCredentials((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    try {
      const response = await api.post('/admin/login', credentials)
      setAuthToken(response.data.token)
      navigate('/admin', { replace: true })
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Invalid login credentials.')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
      >
        <h1 className="text-2xl font-semibold text-slate-900">Admin Login</h1>
        <p className="mt-1 text-sm text-slate-500">Sign in to manage portfolio content.</p>

        <div className="mt-6 space-y-4">
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full rounded-lg border border-slate-300 p-3 text-sm outline-none focus:border-slate-600"
            required
          />
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full rounded-lg border border-slate-300 p-3 text-sm outline-none focus:border-slate-600"
            required
          />
        </div>

        <button type="submit" className="mt-5 w-full rounded-lg bg-slate-900 p-3 text-sm font-medium text-white hover:bg-slate-700">
          Sign In
        </button>

        {error && <p className="mt-3 text-sm text-rose-600">{error}</p>}
      </form>
    </div>
  )
}

export default LoginPage
