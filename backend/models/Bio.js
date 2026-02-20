import mongoose from 'mongoose'

const bioSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
      default: 'I build modern web applications with a focus on clear UX and reliable architecture.',
    },
  },
  { timestamps: true },
)

const Bio = mongoose.model('Bio', bioSchema)

export default Bio
