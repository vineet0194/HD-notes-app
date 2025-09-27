import { Router } from 'express';
import auth from '../middleware/auth.middleware';
import { getNotes, createNote, deleteNote } from '../controllers/note.controller';

const router = Router();

// All these routes are protected by the auth middleware
router.get('/', auth, getNotes);
router.post('/', auth, createNote);
router.delete('/:id', auth, deleteNote);

export default router;