import { useEffect, useState } from "react";
import { Button, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { deleteNote, loadNotes } from "../../api/notesApi";
import { Note as NoteModel } from "../../models/note";
import AddNoteDailog from "../AddEditNoteDailog";
import Note from "../note/Note";
import './notesPageLoggedInView.css';

function NotesPageLoggedInView() {
    
    const [notes, setNotes] = useState<NoteModel[]>([]);
    const [showAddDailog, setShowAddDailog] = useState(false);
    const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);
    const [notesLoading, setNotesLoading] = useState(true);
    const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);
    
    useEffect(() => {
        loadNotes()
            .then((data) => {
                setNotesLoading(true);
                setShowAddDailog(false);
                setNotes(data);
            })
            .catch((error) => {
                console.log(error);
                setShowNotesLoadingError(true);
            })
            .finally(() => {
                setNotesLoading(false);
            });
    }, []);

    const delNote = (note: NoteModel) => {
        deleteNote(note._id)
            .then(() => {
                setNotes(
                    notes.filter(
                        (existingNote) => existingNote._id !== note._id
                    )
                );
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const noteGrid = (
        <Row xs={1} md={2} xl={3} className="g-4 notesGrid">
            {notes.map((note) => {
                return (
                    <Note
                        onNoteClicked={(note) => setNoteToEdit(note)}
                        note={note}
                        key={note._id}
                        onDeleteNoteClicked={delNote}
                    />
                );
            })}
        </Row>
    );
    return (
        <>
            <div className="text-center">
                <Button
                    className={`mb-4`}
                    onClick={() => setShowAddDailog(true)}
                >
                    <FaPlus />
                    Add new Note
                </Button>
            </div>
            {notesLoading && <Spinner animation="border" variant="primary" />}
            {showNotesLoadingError && (
                <p>Something went wrong. Please refresh the page</p>
            )}
            {!notesLoading && !showNotesLoadingError && (
                <>
                    {notes.length > 0 ? (
                        noteGrid
                    ) : (
                        <p>You don't have any notes yet</p>
                    )}
                </>
            )}

            {showAddDailog && (
                <AddNoteDailog
                    onDismiss={() => setShowAddDailog(false)}
                    onNoteSaved={(newNote) => {
                        setNotes([...notes, newNote]);
                        setShowAddDailog(false);
                    }}
                />
            )}
            {noteToEdit && (
                <AddNoteDailog
                    noteToEdit={noteToEdit}
                    onDismiss={() => setNoteToEdit(null)}
                    onNoteSaved={(updatedNote) => {
                        setNotes(
                            notes.map((existingNote) =>
                                existingNote._id === updatedNote._id
                                    ? updatedNote
                                    : existingNote
                            )
                        );
                        setNoteToEdit(null);
                    }}
                />
            )}
        </>
    )
}

export default NotesPageLoggedInView