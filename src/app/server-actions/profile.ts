"use server";

import { createClient } from "@/lib/supabase/supabaseServer";

// Profile schema
import type Profile from "@/lib/types/profile";

// Create new profile

export const getProfile = async () => {
  const supabase = await createClient();

  // Retrieve user ID
  const { data: user } = await supabase.auth.getUser();
  if (user.user && user.user.id) {
    const user_id = user.user.id;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user_id)
      .single();

    if (error) throw error;

    return data;
  }
};

export const createProfile = async (profile: Profile) => {
  const supabase = await createClient();

  // Retrieve user ID
  const { data: user } = await supabase.auth.getUser();
  if (user.user && user.user.id) {
    const user_id = user.user.id;

    const { error } = await supabase
      .from("profiles")
      .insert([{ id: user_id, ...profile }]);
    if (error) throw error;
  }
};

export const updateProfile = async (profile: Profile) => {
  const supabase = await createClient();

  // Retrieve user ID
  const { data: user } = await supabase.auth.getUser();
  if (user.user && user.user.id) {
    const user_id = user.user.id;

    const { error } = await supabase
      .from("profiles")
      .update({ id: user_id, ...profile });
    if (error) throw error;
  }
};
