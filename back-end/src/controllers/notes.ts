import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import NoteModel from "../models/note";
 
export const getNotes: RequestHandler = async (req, res, next) => {
    try {
        // throw createHttpError(429, "Invalid note id trying bullshit");
        const notes = await NoteModel.find().exec();
        res.status(200).json(notes);
    } catch (error) {
        next(error)
    }
    
};

export const getNote: RequestHandler = async (req, res, next) => {
    const noteId = req.params.noteId;

    try {
        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError(404, "Invalid note id");
        }

        const note = await NoteModel.findById(noteId).exec();
        
        if(!note) {
            throw createHttpError(404, "Note not found");
        }
        res.status(200).json(note);         
    } catch (error) {
        next(error);
    }
};

// this for typescript
interface CreateNoteBody {
    // we put ? on the requird filed because we dont know if the get the filed or not
    // so to just to be safe we manage that in the function
    title?: string,
    // this ? is params is optional
    text?: string,
}

export const createNote: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;

    try {
        if(!title) {
            throw createHttpError(400, "Note must have a title !")
        }
        const newNote = await NoteModel.create({
            title: title,
            text: text,
        });
        res.status(201).json(newNote);
    } catch (error) {
        next(error);
    }
};

interface UpdateNoteParems {
    noteId: string,
}

interface UpdateNoteBody {
    title?: string,
    text?: string,
}

export const updateNote: RequestHandler<UpdateNoteParems, unknown, UpdateNoteBody, unknown> = async (req, res, next) => {
    
    const noteId = req.params.noteId;
    const newTitle = req.body.title;
    const newText = req.body.text;
    try {
        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError(400, "Invalid note id");
        }
        if(!newTitle) {
            throw createHttpError(400, "You can't update the note without title!");
        }

        const note = await NoteModel.findById(noteId).exec();

        if(!note) {
            throw createHttpError(404, "Note not found");
        }

        note.title = newTitle;
        note.text = newText;
        // now we save the changes and we store the changes in a veriable so that we dont
        // have to fetch the data again in react
        const updatedNote = await note.save();

        res.status(200).json(updatedNote);

    } catch (error) {
        next(error);
    }
};

export const deleteNote: RequestHandler = async (req, res, next) => {
    
    const noteId: string = req.params.noteId;

    try {
        if(!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note id");
        }
        // const note = await NoteModel.findById(noteId).exec();
        const note = await NoteModel.findByIdAndDelete(noteId).exec();

        if(!note) {
            throw createHttpError(404, "Note not found");
        }

        res.sendStatus(204);
        
    } catch (error) {
        next(error)
    }
}