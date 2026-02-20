import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { api, setAuthToken } from '../../api/client'

const navItems = [
  { to: '/admin', label: 'Overview', end: true },
  { to: '/admin/projects', label: 'Projects' },
  { to: '/admin/inbox', label: 'Inbox' },
  { to: '/admin/settings', label: 'Settings' },
]

const AdminLayout = () => {
  const [admin, setAdmin] = useState(null)
  const [openProfile, setOpenProfile] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const loadAdmin = async () => {
      try {
        const response = await api.get('/admin/me')
        setAdmin(response.data)
      } catch {
        setAuthToken(null)
        navigate('/admin/login', { replace: true })
      }
    }

    loadAdmin()
  }, [navigate])

  const handleLogout = () => {
    setAuthToken(null)
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex max-w-7xl gap-6 p-4 md:p-6">
        <aside className="hidden w-64 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200 md:block">
          <h1 className="mb-6 text-lg font-semibold">Admin Dashboard</h1>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2 text-sm ${isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="flex-1">
          <header className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <div className="md:hidden">
              <select
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                value={location.pathname}
                onChange={(event) => navigate(event.target.value)}
              >
                {navItems.map((item) => (
                  <option key={item.to} value={item.to}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative ml-auto">
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                onClick={() => setOpenProfile((prev) => !prev)}
              >
                <img
                  src={admin?.profileImage || 'https://placehold.co/100x100?text=A'}
                  alt="Profile"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span>{admin?.username || 'Admin'}</span>
              </button>

              {openProfile && (
                <div className="absolute right-0 z-20 mt-2 w-48 rounded-lg border border-slate-200 bg-white p-2 shadow">
                  <button
                    type="button"
                    className="w-full rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100"
                    onClick={() => {
                      navigate('/admin/settings')
                      setOpenProfile(false)
                    }}
                  >
                    Profile Settings
                  </button>
                  <button
                    type="button"
                    className="mt-1 w-full rounded-md px-3 py-2 text-left text-sm text-rose-600 hover:bg-rose-50"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </header>

          <Outlet context={{ admin, refreshAdmin: setAdmin }} />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
