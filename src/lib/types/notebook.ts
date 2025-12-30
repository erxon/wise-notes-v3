export default interface Notebook {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
  cover_image_key?: string;
}
