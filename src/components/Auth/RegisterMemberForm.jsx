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
<<<<<<< HEAD
        role: 'user',
=======
        role: 'user', // atau member
>>>>>>> 8f4c6301e7dbbfe3a70a5c3cf5250e9a5515120e
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
<<<<<<< HEAD
    <form onSubmit={onSubmit} className="space-y-5">
      {error && (
        <p className="text-sm text-red-400 bg-red-50 px-3 py-2 rounded border border-red-200">
          {error}
        </p>
      )}
      <input
        className="w-full px-4 py-3 bg-white/20 text-white placeholder-white/70 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
        placeholder="Nama Lengkap"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="w-full px-4 py-3 bg-white/20 text-white placeholder-white/70 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full px-4 py-3 bg-white/20 text-white placeholder-white/70 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
      >
        Daftar Member
      </button>
=======
    <form onSubmit={onSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Daftar Member</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input className="border w-full p-2" placeholder="Nama Lengkap" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="border w-full p-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="border w-full p-2" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-green-600 text-white w-full py-2 rounded">Daftar</button>
>>>>>>> 8f4c6301e7dbbfe3a70a5c3cf5250e9a5515120e
    </form>
  );
};

export default RegisterMemberForm;
