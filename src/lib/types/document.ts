export default interface Document {
    id?: string;
    notebook_id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at?: string;
}