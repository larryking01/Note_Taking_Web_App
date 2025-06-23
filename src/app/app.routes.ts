import { Routes } from '@angular/router';
import { CreateNote } from './components/create-note/create-note';
import { DisplayNotes } from './components/display-notes/display-notes';
import { EditNote } from './components/edit-note/edit-note';
import { ArchivedNotes } from './components/archived-notes/archived-notes';
import { NotFound } from './components/not-found/not-found';
import { NoteDetails } from './components/note-details/note-details';


export const routes: Routes = [
    {
        path: '',
        component: DisplayNotes,
        title: 'All Notes'
    },
    {
        path: 'notes/:id',
        component: NoteDetails,
        title: 'Note Details'
    },
    {
        path: 'edit-note/:id',
        component: EditNote,
        title: 'Edit Note'
    },
    {
        path: 'archived',
        component: ArchivedNotes,
        title: 'Archived Notes'
    },
    {
        path: 'create',
        component: CreateNote,
        title: 'Create New Note'
    },
    {
        path: '**',
        component: NotFound,
        title: 'Not Found'
    }
];
