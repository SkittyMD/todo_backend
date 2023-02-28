export default interface ITask {
    [id: string]: {
        title: string
        descriprion: string
        status: string
        dateCreate: string
        dateDeadline: string
        headings: string[]
    }
}