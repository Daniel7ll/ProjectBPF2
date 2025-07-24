<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import logo from '../../assets/PCR-connect.png';
import campusBg from '../../assets/rpc.jpg';
=======
// src/components/Auth/AuthModal.jsx
import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
>>>>>>> 8f4c6301e7dbbfe3a70a5c3cf5250e9a5515120e

const AuthModal = ({ isOpen, onClose, mode = 'login' }) => {
  const [currentMode, setCurrentMode] = useState(mode);

  useEffect(() => {
    setCurrentMode(mode);
  }, [mode]);

  if (!isOpen) return null;

  return (
<<<<<<< HEAD
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cover bg-center animate-fadeIn"
      style={{
        backgroundImage: `linear-gradient(rgba(173,216,230,0.6), rgba(173,216,230,0.6)), url(${campusBg})`,
      }}
    >
      {/* Blur efek dekoratif */}
      <div className="absolute w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-20 -top-20 -left-20"></div>
      <div className="absolute w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20 bottom-0 right-0"></div>

      {/* Modal utama */}
      <div
        className="relative w-full max-w-lg rounded-2xl p-8 shadow-2xl animate-slideUp z-10"
        style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(255,255,255,0.3)',
        }}
      >
        {/* Logo */}
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
          <div className="w-28 h-28 rounded-full bg-white/90 shadow-md flex items-center justify-center border border-gray-300">
            <img src={logo} alt="Forum Logo" className="w-20 h-20 object-contain" />
          </div>
        </div>

        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl"
        >
          &times;
        </button>

        {/* Konten */}
        <div className="mt-16 space-y-6 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              {currentMode === 'login' ? 'Masuk ke Forum' : 'Buat Akun Baru'}
            </h2>
            <p className="mt-2 text-sm text-white/80">
              {currentMode === 'login'
                ? 'Login untuk mulai berdiskusi.'
                : 'Daftar untuk bergabung di forum.'}
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white/10 backdrop-blur-md shadow-md border border-white/30 space-y-4">
            {currentMode === 'login' ? (
              <LoginForm onClose={onClose} />
            ) : (
              <RegisterForm onClose={onClose} />
            )}
          </div>

          {currentMode === 'register' && (
            <p className="text-sm text-center text-white/80">
              Sudah punya akun?{' '}
              <button
                className="font-semibold text-white hover:text-blue-200 transition"
                onClick={() => setCurrentMode('login')}
              >
                Login di sini
              </button>
            </p>
          )}
        </div>
      </div>

      {/* Animasi */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease forwards;
        }
        .animate-slideUp {
          animation: slideUp 0.5s ease-out forwards;
        }
      `}</style>
=======
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
>>>>>>> 8f4c6301e7dbbfe3a70a5c3cf5250e9a5515120e
    </div>
  );
};

<<<<<<< HEAD
export default AuthModal;
=======
export default AuthModal; 
>>>>>>> 8f4c6301e7dbbfe3a70a5c3cf5250e9a5515120e
