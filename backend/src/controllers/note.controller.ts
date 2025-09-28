import { Response } from 'express';
import Note from '../models/note.model';

import { AuthRequest } from '../middleware/auth.middleware';

export const getNotes = async (req: AuthRequest, res: Response) => {
  try {
    const notes = await Note.find({ user: req.user!.id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err: any) {
    res.status(500).send('Server Error');
  }
};

export const createNote = async (req: AuthRequest, res: Response) => {
  try {
    const { content } = req.body;
    const newNote = new Note({
      content,
      user: req.user!.id,
    });
    const note = await newNote.save();
    res.json(note);
  } catch (err: any) {
    res.status(500).send('Server Error');
  }
};

export const deleteNote = async (req: AuthRequest, res: Response) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ msg: 'Note not found' });
    }
    if (note.user.toString() !== req.user!.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    await note.deleteOne();
    res.json({ msg: 'Note removed' });
  } catch (err: any) {
    res.status(500).send('Server Error');
  }
};