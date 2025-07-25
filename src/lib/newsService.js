// src/lib/newsService.js
import { supabase } from './supabaseClient';

// CREATE
export const createNews = async ({ title, summary, image }) => {
  const { data, error } = await supabase
    .from('news')
    .insert([{ title, summary, image }]);
  if (error) throw error;
  return data;
};

// READ
export const getAllNews = async () => {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

// UPDATE
export const updateNews = async (id, { title, summary, image }) => {
  const { data, error } = await supabase
    .from('news')
    .update({ title, summary, image })
    .eq('id', id);
  if (error) throw error;
  return data;
};

// DELETE
export const deleteNews = async (id) => {
  const { data, error } = await supabase
    .from('news')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return data;
};
