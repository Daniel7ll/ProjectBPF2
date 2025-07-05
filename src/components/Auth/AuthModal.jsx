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
    <div className="fixed inset-0 bg-white/40 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-3 text-gray-500 text-xl">&times;</button>
        <div className="mt-4">
          {currentMode === 'login' ? (
            <>
              <LoginForm onClose={onClose} />
              <p className="text-sm mt-4">
                Belum punya akun?{' '}
                <button
                  className="text-blue-600 underline"
                  onClick={() => setCurrentMode('register')}
                >
                  Daftar
                </button>
              </p>
            </>
          ) : (
            <>
              <RegisterForm onClose={onClose} />
              <p className="text-sm mt-4">
                Sudah punya akun?{' '}
                <button
                  className="text-blue-600 underline"
                  onClick={() => setCurrentMode('login')}
                >
                  Login
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
