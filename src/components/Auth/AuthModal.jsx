// src/components/Auth/AuthModal.jsx
import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthModal = ({ isOpen, onClose, mode = 'login' }) => {
  const [currentMode, setCurrentMode] = useState(mode);

  useEffect(() => {
    setCurrentMode(mode);
  }, [mode]);

  if (!isOpen) return null;

  return (
    // Backdrop dengan efek blur (opsional, tapi terlihat bagus)
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* MODIFIKASI:
        - Ukuran modal diubah dari max-w-md menjadi max-w-lg
        - Padding diubah dari p-6 menjadi p-8 untuk ruang lebih
        - Ditambahkan shadow-xl dan border untuk membuatnya lebih menonjol
      */}
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        
        {/* Kontainer untuk konten dengan jarak vertikal yang konsisten */}
        <div className="mt-4 space-y-6">
          {currentMode === 'login' ? (
            <>
              {/* MODIFIKASI: Ditambahkan bagian judul yang jelas */}
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900">Admin Login</h2>
                <p className="mt-2 text-sm text-gray-600">Selamat datang kembali, silakan masuk.</p>
              </div>
              <LoginForm onClose={onClose} />
              {/* Link untuk daftar sengaja dihilangkan sesuai permintaan (karena fokus ke login admin) */}
            </>
          ) : (
            <>
              {/* Judul untuk form registrasi */}
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900">Buat Akun Baru</h2>
                <p className="mt-2 text-sm text-gray-600">Isi data di bawah untuk mendaftar.</p>
              </div>
              <RegisterForm onClose={onClose} />
              <p className="text-sm text-center mt-4">
                Sudah punya akun?{' '}
                <button
                  className="font-semibold text-blue-600 hover:text-blue-500"
                  onClick={() => setCurrentMode('login')}
                >
                  Login di sini
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal; 