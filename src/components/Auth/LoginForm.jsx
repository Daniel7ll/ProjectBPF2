import React, { useState } from 'react';
import { handleLogin } from '../../utils/authHandlers';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../assets/contexts/AuthContext';

const LoginForm = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuth(); // dari AuthContext

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email dan password wajib diisi.');
      return;
    }

    const { data, error } = await handleLogin({ email, password });

    if (error) {
      setError(error.message);
    } else {
      // Simpan ke localStorage
      localStorage.setItem('user', JSON.stringify(data));

      // Update context
      setUser(data);

      // Redirect berdasarkan role
      if (data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/'); // bisa diubah ke /member kalau kamu punya dashboard member
      }

      onClose(); // Tutup modal login
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Login Admin</h2>
      {error && <p className="text-red-500">{error}</p>}
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
      <button
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        type="submit"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
