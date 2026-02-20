import bcrypt from 'bcryptjs'
import Admin from '../models/Admin.js'

const ensureDefaultAdmin = async () => {
  const email = (process.env.ADMIN_EMAIL || 'admin@example.com').toLowerCase()
  const existing = await Admin.findOne({ email })

  if (existing) {
    return
  }

  const password = process.env.ADMIN_PASSWORD || 'Admin@123'
  const hashedPassword = await bcrypt.hash(password, 10)

  await Admin.create({
    username: process.env.ADMIN_USERNAME || 'Admin',
    email,
    password: hashedPassword,
    profileImage: process.env.ADMIN_PROFILE_IMAGE || '',
  })

  console.log(`Default admin created: ${email}`)
}

export default ensureDefaultAdmin
