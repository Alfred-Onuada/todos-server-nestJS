import mongoose from "mongoose";

export const TodoSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['done', 'ongoing', 'open']
  } 
}, { timestamps: true, _id: false })