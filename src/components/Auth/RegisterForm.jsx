import React, { useState } from 'react';
import { handleRegister } from '../../utils/authHandlers';

const RegisterForm = ({ onClose }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState(''); // 🔹 Tambahan
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name || !username || !email || !password) {
      setError('Semua field wajib diisi.');
      return;
    }

    const { error } = await handleRegister({ name, username, email, password });

    if (error) {
      setError(error.message);
    } else {
      alert('Pendaftaran berhasil! Silakan login.');
      onClose();
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Daftar</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        className="border rounded w-full p-2"
        placeholder="Nama Lengkap"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border rounded w-full p-2"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="border rounded w-full p-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border rounded w-full p-2"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700" type="submit">
        Daftar
      </button>
    </form>
  );
};

export default RegisterForm;