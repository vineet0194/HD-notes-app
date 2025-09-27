import { Schema, model, Types } from 'mongoose';

const noteSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Note = model('Note', noteSchema);

export default Note;