import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
  username: String,
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: String,
});

const user = mongoose.model("user", userSchema);

export default user;