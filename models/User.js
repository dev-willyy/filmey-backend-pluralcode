import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
    unique: true,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
