import express from 'express'
import Bio from '../models/Bio.js'
import Message from '../models/Message.js'
import Project from '../models/Project.js'

const router = express.Router()

router.get('/bio', async (req, res) => {
  const bio = await Bio.findOne().sort({ createdAt: -1 })
  return res.json({
    content:
      bio?.content ||
      'I build modern web applications with a focus on clear UX and reliable architecture.',
  })
})

router.get('/projects', async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 })
  return res.json(projects)
})

router.post('/messages', async (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required.' })
  }

  const createdMessage = await Message.create({
    name,
    email,
    message,
  })

  return res.status(201).json(createdMessage)
})

export default router
