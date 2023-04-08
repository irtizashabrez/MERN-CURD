import express from 'express';
import *  as NotesController from '../controllers/notes';

const routes = express.Router();

routes.get('/', NotesController.getNotes);
routes.get('/:noteId', NotesController.getNote);
routes.post('/', NotesController.createNote);
routes.patch('/:noteId', NotesController.updateNote);
routes.delete('/:noteId', NotesController.deleteNote);

export default routes;