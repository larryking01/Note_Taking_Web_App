import { Routes } from '@angular/router';
import { routeGuardGuard } from './guards/route-guard-guard';
import { CreateNote } from './components/create-note/create-note';
import { DisplayNotes } from './components/display-notes/display-notes';
import { EditNote } from './components/edit-note/edit-note';
import { ArchivedNotes } from './components/archived-notes/archived-notes';
import { NotFound } from './components/not-found/not-found';
import { NoteDetails } from './components/note-details/note-details';
import { SignIn } from './components/sign-in/sign-in';
import { SignUp } from './components/sign-up/sign-up';
import { LandingPage } from './components/landing-page/landing-page';



export const routes: Routes = [
    {
        path: '',
        component: LandingPage,
        title: 'Welcome'

    },
    {
        path: 'view-notes',
        component: DisplayNotes,
        title: 'All Notes',
        canActivate: [ routeGuardGuard ]
    },
    {
        path: 'notes/:id',
        component: NoteDetails,
        title: 'Note Details',
        canActivate: [ routeGuardGuard ]
    },
    {
        path: 'edit-note/:id',
        component: EditNote,
        title: 'Edit Note',
        canActivate: [ routeGuardGuard ]
    },
    {
        path: 'archived',
        component: ArchivedNotes,
        title: 'Archived Notes',
        canActivate: [ routeGuardGuard ]
    },
    {
        path: 'create',
        component: CreateNote,
        title: 'Create New Note',
        canActivate: [ routeGuardGuard ]
    },
    {
        path: 'sign-in',
        component: SignIn,
        title: 'Sign In'
    },
    {
        path: 'sign-up',
        component: SignUp,
        title: 'Sign Up'
    },
    {
        path: '**',
        component: NotFound,
        title: 'Not Found'
    }
];
