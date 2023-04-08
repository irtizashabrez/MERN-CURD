import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Note } from '../models/note';
import { useForm } from 'react-hook-form';
import { NoteInput, createNote, updatedNote } from '../api/notesApi';
import TextInputField from './form/TextInputField';

interface AddEditNoteDailogProps {
    noteToEdit?: Note,
    onDismiss: () => void,
    onNoteSaved: (note: Note) => void,
    // this is if we click outside it will close the dailog
};

const AddEditNoteDailog = ({ noteToEdit, onDismiss, onNoteSaved }: AddEditNoteDailogProps) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NoteInput>({
        defaultValues: {
            title: noteToEdit?.title || '',
            text: noteToEdit?.text || '',
        }
    });

    const onSubmit = async (input: NoteInput) => {
        try {
            let noteResponse: Note;
            if (noteToEdit) {
                noteResponse = await updatedNote(noteToEdit._id, input);
            } else {
                noteResponse = await createNote(input);
            }

            onNoteSaved(noteResponse);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {noteToEdit ? "Edit Note" : "Add note"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id='addEditNoteForm' onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField 
                        name='title'
                        label='Title'
                        type='text'
                        placeholder='Title'
                        register={register}
                        registerOptions= {{required: 'Required'}}
                        error = {errors.title}
                    />
                    <TextInputField 
                        name='text'
                        label='Tetx'
                        as='textarea'
                        placeholder='text'
                        rows={5}
                        register={register}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button type='submit' form='addEditNoteForm' disabled={isSubmitting}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddEditNoteDailog