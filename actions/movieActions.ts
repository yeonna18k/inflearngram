"use server";

import { createServerSupabaseAdminClient } from "utils/supabase/server";

function handleError(error) {
  if (error) {
    console.error("Upload Error: ", error);
    throw error;
  }
}

export async function searchMovies({ search, page, pageSize }) {
  const supabase = await createServerSupabaseAdminClient();

  const { data, count, error } = await supabase
    .from("movie")
    .select("*")
    .like("title", `%${search}%`)
    .range((page - 1) * pageSize, page * pageSize - 1);

  const hasNextPage = count > page * pageSize;
  if (error) {
    console.error(error);
    return {
      data: [],
      count: 0,
      page: null,
      pageSize: null,
      error,
    };
  }

  return { data, page, pageSize, hasNextPage };
}

export async function getMovies(id) {
  const supabase = await createServerSupabaseAdminClient();

  const { data, error } = await supabase
    .from("movie")
    .select("*")
    .eq("id", id)
    .maybeSingle(); // null이어도 오류가 나지 않음

  handleError(error);

  return data;
}
