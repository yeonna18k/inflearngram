"use server";

import { createServerSupabaseAdminClient } from "utils/supabase/server";

export async function getAllUsers() {
  const supabase = await createServerSupabaseAdminClient(); // admin API를 가져와야 접근이 가능함

  const { data, error } = await supabase.auth.admin.listUsers();

  if (error) {
    return [];
  }
  return data.users;
}

export async function getUserById(userId) {
  const supabase = await createServerSupabaseAdminClient();

  const { data, error } = await supabase.auth.admin.getUserById(userId);

  if (error) {
    return null;
  }

  return data.user;
}
