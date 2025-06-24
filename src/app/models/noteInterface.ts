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
    tags: string,
    isArchived: boolean,
    createdAt: string
    
}