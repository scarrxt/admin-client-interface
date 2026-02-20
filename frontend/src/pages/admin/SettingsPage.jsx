import { useEffect, useState } from 'react'
import { api } from '../../api/client'

const SettingsPage = () => {
  const [profile, setProfile] = useState({ username: '', email: '', profileImage: '' })
  const [bio, setBio] = useState('')
  const [password, setPassword] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [resetPassword, setResetPassword] = useState({ newPassword: '', confirmPassword: '' })
  const [message, setMessage] = useState('')

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const [adminRes, bioRes] = await Promise.all([api.get('/admin/me'), api.get('/public/bio')])
        setProfile({
          username: adminRes.data.username,
          email: adminRes.data.email,
          profileImage: adminRes.data.profileImage || '',
        })
        setBio(bioRes.data.content || '')
      } catch {
        setMessage('Unable to load settings.')
      }
    }

    loadSettings()
  }, [])

  const updateProfile = async (event) => {
    event.preventDefault()
    setMessage('')
    try {
      await api.put('/admin/profile', profile)
      await api.put('/admin/bio', { content: bio })
      setMessage('Profile settings updated.')
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to update profile settings.')
    }
  }

  const changePassword = async (event) => {
    event.preventDefault()
    setMessage('')
    try {
      await api.put('/admin/password', password)
      setPassword({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setMessage('Password changed successfully.')
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to change password.')
    }
  }

  const resetCurrentPassword = async (event) => {
    event.preventDefault()
    setMessage('')
    try {
      await api.put('/admin/password/reset', resetPassword)
      setResetPassword({ newPassword: '', confirmPassword: '' })
      setMessage('Password reset completed.')
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to reset password.')
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-lg font-semibold text-slate-900">Admin Settings</h2>
        <form onSubmit={updateProfile} className="mt-4 grid gap-4 md:grid-cols-2">
          <input
            className="rounded-lg border border-slate-300 p-3 text-sm outline-none focus:border-slate-600"
            value={profile.username}
            onChange={(event) => setProfile((prev) => ({ ...prev, username: event.target.value }))}
            placeholder="Username"
            required
          />
          <input
            className="rounded-lg border border-slate-300 p-3 text-sm outline-none focus:border-slate-600"
            type="email"
            value={profile.email}
            onChange={(event) => setProfile((prev) => ({ ...prev, email: event.target.value }))}
            placeholder="Email"
            required
          />
          <input
            className="rounded-lg border border-slate-300 p-3 text-sm outline-none focus:border-slate-600 md:col-span-2"
            value={profile.profileImage}
            onChange={(event) => setProfile((prev) => ({ ...prev, profileImage: event.target.value }))}
            placeholder="Profile Image URL"
          />
          <textarea
            className="h-28 rounded-lg border border-slate-300 p-3 text-sm outline-none focus:border-slate-600 md:col-span-2"
            value={bio}
            onChange={(event) => setBio(event.target.value)}
            placeholder="About Me Bio"
            required
          />
          <button className="w-fit rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700" type="submit">
            Save Profile
          </button>
        </form>
      </section>

      <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <h3 className="text-lg font-semibold text-slate-900">Change Password</h3>
        <form onSubmit={changePassword} className="mt-4 grid gap-3 md:grid-cols-3">
          <input
            type="password"
            className="rounded-lg border border-slate-300 p-3 text-sm outline-none focus:border-slate-600"
            placeholder="Current Password"
            value={password.currentPassword}
            onChange={(event) => setPassword((prev) => ({ ...prev, currentPassword: event.target.value }))}
            required
          />
          <input
            type="password"
            className="rounded-lg border border-slate-300 p-3 text-sm outline-none focus:border-slate-600"
            placeholder="New Password"
            value={password.newPassword}
            onChange={(event) => setPassword((prev) => ({ ...prev, newPassword: event.target.value }))}
            required
          />
          <input
            type="password"
            className="rounded-lg border border-slate-300 p-3 text-sm outline-none focus:border-slate-600"
            placeholder="Confirm New Password"
            value={password.confirmPassword}
            onChange={(event) => setPassword((prev) => ({ ...prev, confirmPassword: event.target.value }))}
            required
          />
          <button className="w-fit rounded-lg border border-slate-300 px-4 py-2 text-sm" type="submit">
            Change Password
          </button>
        </form>
      </section>

      <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <h3 className="text-lg font-semibold text-slate-900">Reset Password</h3>
        <form onSubmit={resetCurrentPassword} className="mt-4 grid gap-3 md:grid-cols-2">
          <input
            type="password"
            className="rounded-lg border border-slate-300 p-3 text-sm outline-none focus:border-slate-600"
            placeholder="New Password"
            value={resetPassword.newPassword}
            onChange={(event) => setResetPassword((prev) => ({ ...prev, newPassword: event.target.value }))}
            required
          />
          <input
            type="password"
            className="rounded-lg border border-slate-300 p-3 text-sm outline-none focus:border-slate-600"
            placeholder="Confirm New Password"
            value={resetPassword.confirmPassword}
            onChange={(event) => setResetPassword((prev) => ({ ...prev, confirmPassword: event.target.value }))}
            required
          />
          <button className="w-fit rounded-lg border border-slate-300 px-4 py-2 text-sm" type="submit">
            Reset Password
          </button>
        </form>
        {message && <p className="mt-4 text-sm text-slate-600">{message}</p>}
      </section>
    </div>
  )
}

export default SettingsPage
