import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: false,
    unique: true,
    trim: true,
    sparse: true,
  },
  password: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
