"use server";

import { createClient } from "@/lib/supabase/supabaseServer";

export interface Document {
  id?: string;
  notebookId: number;
  title: string;
  content: string;
  createdAt?: Date;
}

export async function updateDocument(document: Document) {
  const supabase = await createClient();

  if (!document.id) {
    // Create a new document
    const { data, error } = await supabase
      .from("document")
      .insert({
        notebookId: Number(document.notebookId),
        title: document.title,
        content: document.content,
      })
      .select("*")
      .single();
    if (error) throw error;
    return data;
  }
  // Update existing document
  const { data, error } = await supabase
    .from("document")
    .update({
      notebookId: Number(document.notebookId),
      title: document.title,
      content: document.content,
    })
    .eq("id", document.id)
    .select("*")
    .single();

  if (error) throw error;
  return data;
}
