import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import { supabase } from '../../lib/supabaseClient';

const RegisterMemberForm = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Semua field wajib diisi.');
      return;
    }

    const { data: existing } = await supabase
      .from('members')
      .select('email')
      .eq('email', email)
      .single();

    if (existing) {
      setError('Email sudah digunakan.');
      return;
    }

    const password_hash = await bcrypt.hash(password, 10);
    const { error: insertError } = await supabase.from('members').insert([
      {
        name,
        email,
        password_hash,
        role: 'user', // atau member
        created_at: new Date()
      }
    ]);

    if (insertError) {
      setError(insertError.message);
    } else {
      alert('Pendaftaran berhasil!');
      onClose();
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Daftar Member</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input className="border w-full p-2" placeholder="Nama Lengkap" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="border w-full p-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="border w-full p-2" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-green-600 text-white w-full py-2 rounded">Daftar</button>
    </form>
  );
};

export default RegisterMemberForm;
