import mongoose from 'mongoose';

const snippetSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, minlength: 3, trim: true },
    language: { type: String, default: '' },
    code: { type: String, required: true },
    tags: [{ type: String }]
  },
  { timestamps: true }
);

const Snippet = mongoose.model('Snippet', snippetSchema);
export default Snippet;