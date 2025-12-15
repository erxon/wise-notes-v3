"use server";

import { createClient } from "@/lib/supabase/supabaseServer";

export const updatePassword = async (
  newPassword: string,
  currentPassword: string
) => {
  const supabase = await createClient();

  // Retrieve user's email
  const { data: user } = await supabase.auth.getUser();

  if (user.user && user.user.email) {
    // check current password
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.user.email,
      password: currentPassword,
    });

    if (signInError) throw signInError;
  }

  // Update password
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) throw error;
};
