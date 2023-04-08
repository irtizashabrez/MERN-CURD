import React from 'react'
import { Card } from 'react-bootstrap'
import { Note as NoteModel} from '../../models/note'
import { formatDate } from '../../utils/formatDate'
import { MdDelete } from 'react-icons/md'
import './Note.css'

interface NoteProps {
    note: NoteModel,
    onDeleteNoteClicked: (note: NoteModel) => void,
    onNoteClicked: (note: NoteModel) => void,
}
 
const Note = ({ note, onDeleteNoteClicked, onNoteClicked }: NoteProps) => {

    const {
        title,
        text,
        createdAt,
        updatedAt,
    } = note;

    let createdUpdatedNote: string;
    if(updatedAt > createdAt) {
        createdUpdatedNote = 'Updated: ' + formatDate(updatedAt);
    } else {
        createdUpdatedNote = 'Created: ' + formatDate(createdAt);
    }
  return (
    <div>
        <Card className='note noteCard' onClick={() => onNoteClicked(note)}>
            <Card.Body className='noteBody'>
                <Card.Title className='flexCenter'>
                    {title}
                    <MdDelete className='text-muted ms-auto' onClick={(e) => {
                        onDeleteNoteClicked(note);
                        e.stopPropagation();
                    }}/>
                </Card.Title>
                <Card.Text className='noteText'>
                    {text}
                </Card.Text>
                
            </Card.Body>
            <Card.Footer className='text-muted'>
                    {createdUpdatedNote}
            </Card.Footer>
        </Card>
    </div>
  )
}

export default Note