"use server";

import { createClient } from "@/lib/supabase/supabaseServer";

export interface Notebook {
  id?: string;
  name: string;
  description?: string;
}

export async function getNotebooks() {
  const supabase = await createClient();

  const { data: user, error: userError } = await supabase.auth.getUser();
  if (userError) return { data: [], error: userError };

  const user_id = user.user.id;

  const { data, error } = await supabase
    .from("notebook")
    .select("*")
    .eq("user_id", user_id)
    .order("createdAt", { ascending: false });

  if (error) return { data: [], error: error };

  return { data: data, error: null };
}

export async function createNotebook(notebook: Notebook) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("notebook")
    .insert({
      name: notebook.name,
      description: notebook.description,
    })
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

export async function deleteNotebook(notebookId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("notebook")
    .delete()
    .eq("id", notebookId);

  if (error) throw error;
}

export async function updateNotebook(notebookId: string, notebook: Notebook) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("notebook")
    .update({
      name: notebook.name,
      description: notebook.description,
      updatedAt: new Date().toISOString(),
    })
    .eq("id", notebookId)
    .select("*")
    .single();

  if (error) throw error;
  return data;
}
