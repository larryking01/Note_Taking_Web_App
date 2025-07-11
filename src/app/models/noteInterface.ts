export enum noteTag {
    personal = 'Personal',
    career = 'Career',
    work = 'Work'
}



export interface NoteInterface {
    id: string,
    user: string,
    title: string,
    content: string,
    tag: noteTag,
    isArchived: boolean,
    createdAt: string
    
}