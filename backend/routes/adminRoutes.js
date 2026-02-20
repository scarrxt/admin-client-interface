import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import auth from '../middleware/auth.js'
import Admin from '../models/Admin.js'
import Bio from '../models/Bio.js'
import Message from '../models/Message.js'
import Project from '../models/Project.js'

const router = express.Router()

const createToken = (adminId) => {
  return jwt.sign({ id: adminId }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' })
  }

  const admin = await Admin.findOne({ email: email.toLowerCase() })

  if (!admin) {
    return res.status(401).json({ message: 'Invalid credentials.' })
  }

  const isMatch = await bcrypt.compare(password, admin.password)

  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials.' })
  }

  const token = createToken(admin._id)

  return res.json({
    token,
    admin: {
      id: admin._id,
      username: admin.username,
      email: admin.email,
      profileImage: admin.profileImage,
    },
  })
})

router.use(auth)

router.get('/me', async (req, res) => {
  const admin = await Admin.findById(req.adminId).select('-password')

  if (!admin) {
    return res.status(404).json({ message: 'Admin not found.' })
  }

  return res.json(admin)
})

router.put('/profile', async (req, res) => {
  const { username, email, profileImage } = req.body

  if (!username || !email) {
    return res.status(400).json({ message: 'Username and email are required.' })
  }

  const duplicate = await Admin.findOne({
    email: email.toLowerCase(),
    _id: { $ne: req.adminId },
  })

  if (duplicate) {
    return res.status(400).json({ message: 'Email already in use.' })
  }

  const admin = await Admin.findByIdAndUpdate(
    req.adminId,
    {
      username,
      email: email.toLowerCase(),
      profileImage: profileImage || '',
    },
    { new: true },
  ).select('-password')

  return res.json(admin)
})

router.put('/bio', async (req, res) => {
  const { content } = req.body

  if (!content) {
    return res.status(400).json({ message: 'Bio content is required.' })
  }

  const existing = await Bio.findOne().sort({ createdAt: -1 })

  if (existing) {
    existing.content = content
    await existing.save()
    return res.json(existing)
  }

  const created = await Bio.create({ content })
  return res.json(created)
})

router.put('/password', async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body

  if (!currentPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({ message: 'All password fields are required.' })
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: 'Password confirmation does not match.' })
  }

  const admin = await Admin.findById(req.adminId)

  if (!admin) {
    return res.status(404).json({ message: 'Admin not found.' })
  }

  const isMatch = await bcrypt.compare(currentPassword, admin.password)

  if (!isMatch) {
    return res.status(400).json({ message: 'Current password is incorrect.' })
  }

  admin.password = await bcrypt.hash(newPassword, 10)
  await admin.save()

  return res.json({ message: 'Password changed successfully.' })
})

router.put('/password/reset', async (req, res) => {
  const { newPassword, confirmPassword } = req.body

  if (!newPassword || !confirmPassword) {
    return res.status(400).json({ message: 'Both reset fields are required.' })
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: 'Password confirmation does not match.' })
  }

  const admin = await Admin.findById(req.adminId)

  if (!admin) {
    return res.status(404).json({ message: 'Admin not found.' })
  }

  admin.password = await bcrypt.hash(newPassword, 10)
  await admin.save()

  return res.json({ message: 'Password reset successfully.' })
})

router.get('/projects', async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 })
  return res.json(projects)
})

router.post('/projects', async (req, res) => {
  const { projectName, title, description, imageUrl } = req.body

  if (!projectName || !title || !description || !imageUrl) {
    return res.status(400).json({ message: 'All project fields are required.' })
  }

  const project = await Project.create({ projectName, title, description, imageUrl })
  return res.status(201).json(project)
})

router.put('/projects/:id', async (req, res) => {
  const { projectName, title, description, imageUrl } = req.body

  const project = await Project.findByIdAndUpdate(
    req.params.id,
    { projectName, title, description, imageUrl },
    { new: true },
  )

  if (!project) {
    return res.status(404).json({ message: 'Project not found.' })
  }

  return res.json(project)
})

router.delete('/projects/:id', async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id)

  if (!project) {
    return res.status(404).json({ message: 'Project not found.' })
  }

  return res.json({ message: 'Project deleted.' })
})

router.get('/messages', async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 })
  return res.json(messages)
})

export default router
