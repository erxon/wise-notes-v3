"use server";

import { createClient } from "@/lib/supabase/supabaseServer";
import { getAuthenticatedUrl } from "./s3";

export interface Notebook {
  id?: string;
  name: string;
  description?: string;
  cover_image_key?: string;
}

export async function getNotebooks() {
  const supabase = await createClient();

  const { data: user, error: userError } = await supabase.auth.getUser();
  if (userError) return { data: [], error: userError };

  const user_id = user.user.id;

  const { data, error } = await supabase
    .from("notebooks")
    .select("*")
    .eq("user_id", user_id)
    .order("created_at", { ascending: false });

  if (error) return { data: [], error: error };

  return { data: data, error: null };
}

export async function getNotebookImage(notebookId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("notebooks")
    .select("cover_image_key")
    .eq("id", notebookId)
    .single();

  if (error) return { data: null, error: error };
  if (!data.cover_image_key) return { data: null, error: null };

  const image = await getAuthenticatedUrl(data.cover_image_key);

  return { data: image, error: null };
}

export async function createNotebook(notebook: Notebook) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("notebooks")
    .insert({
      name: notebook.name,
      description: notebook.description,
      cover_image_key: notebook.cover_image_key,
    })
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

export async function deleteNotebook(notebookId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("notebooks")
    .delete()
    .eq("id", notebookId);

  return { error };
}

export async function updateNotebook(notebookId: string, notebook: Notebook) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("notebooks")
    .update({
      name: notebook.name,
      description: notebook.description,
      cover_image_key: notebook.cover_image_key,
      updated_at: new Date().toISOString(),
    })
    .eq("id", notebookId)
    .select("*")
    .single();

  if (error) throw error;
  return data;
}
