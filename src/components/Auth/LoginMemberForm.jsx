import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../assets/contexts/AuthContext';

const LoginMemberForm = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { data: member, error: fetchError } = await supabase
      .from("members")
      .select("*")
      .eq("email", email)
      .single();

    if (!member || fetchError) {
      setError('Email tidak ditemukan.');
      return;
    }

    const match = await bcrypt.compare(password, member.password_hash);
    if (!match) {
      setError('Password salah.');
      return;
    }

    const userData = {
      id: member.id,
      email: member.email,
      role: member.role,
      name: member.name
    };

    localStorage.setItem('user', JSON.stringify(userData)); // ✅ simpan dengan key "user"
    setUser(userData); // Context API / AuthContext

    navigate('/');
    onClose();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Login Member</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        className="border w-full p-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border w-full p-2"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-blue-600 text-white w-full py-2 rounded">
        Login
      </button>
    </form>
  );
};

export default LoginMemberForm;
