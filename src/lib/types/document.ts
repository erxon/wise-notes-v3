export default interface Document {
    id?: string;
    notebookId: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt?: string;
}