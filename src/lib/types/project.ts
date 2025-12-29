export default interface Project {
  id: number;
  name: string;
  description?: string;
  user_id: string;
  created_at: string;
}

export interface ProjectDocument {
  id: number;
  project_id: number;
  document_id: number;
  added_at: string;
}
