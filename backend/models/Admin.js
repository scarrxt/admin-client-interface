import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { timestamps: true },
)

const Admin = mongoose.model('Admin', adminSchema)

export default Admin
