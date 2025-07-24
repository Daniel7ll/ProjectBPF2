// src/utils/authHandlers.js
import { supabase } from '../lib/supabaseClient';
import bcrypt from 'bcryptjs';

/**
 * REGISTER ADMIN
 * @param {Object} param0 - Data input
 * @param {string} param0.email - Email admin
 * @param {string} param0.password - Password admin
 * @param {string} param0.name - Nama lengkap admin
 * @param {string} param0.username - Username admin (dibutuhkan oleh tabel)
 */
export const handleRegister = async ({ email, password, name, username }) => {
  try {
    // Cek apakah email atau username sudah terdaftar
    const { data: existingEmail } = await supabase
      .from('admins')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (existingEmail) {
      return { error: { message: 'Email sudah digunakan.' } };
    }

    const { data: existingUsername } = await supabase
      .from('admins')
      .select('id')
      .eq('username', username)
      .maybeSingle();

    if (existingUsername) {
      return { error: { message: 'Username sudah digunakan.' } };
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // Insert ke tabel admins
    const { error: insertError } = await supabase.from('admins').insert([
      {
        email,
        username,
        password_hash,
        full_name: name,
        role: 'admin',
        created_at: new Date()
      }
    ]);

    if (insertError) return { error: insertError };

    return { success: true };
  } catch (err) {
    return { error: { message: err.message || 'Terjadi kesalahan saat register.' } };
  }
};

/**
 * LOGIN ADMIN
 * @param {Object} param0 - Data login
 * @param {string} param0.email - Email
 * @param {string} param0.password - Password
 */
export const handleLogin = async ({ email, password }) => {
  try {
    // Ambil admin berdasarkan email
    const { data: admin, error } = await supabase
      .from('admins')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !admin) {
      return { error: { message: 'Email tidak ditemukan.' } };
    }

    // Cek password
    const valid = await bcrypt.compare(password, admin.password_hash);
    if (!valid) {
      return { error: { message: 'Password salah.' } };
    }

    // ✅ Sukses
    return { data: admin };
  } catch (err) {
    return { error: { message: err.message || 'Terjadi kesalahan login.' } };
  }
};
