// src/components/Auth/MemberAuthModal.jsx
import React, { useState, useEffect } from 'react';
import MemberLoginForm from './LoginMemberForm';
import MemberRegisterForm from './RegisterMemberForm';

const MemberAuthModal = ({ isOpen, onClose, mode = 'login' }) => {
  const [currentMode, setCurrentMode] = useState(mode);

  useEffect(() => {
    setCurrentMode(mode);
  }, [mode]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/40 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 text-xl font-bold"
        >
          &times;
        </button>

        {currentMode === 'login' ? (
          <>
            <MemberLoginForm onClose={onClose} />
            <p className="text-sm mt-4 text-center">
              Belum punya akun?{' '}
              <button
                className="text-blue-600 underline"
                onClick={() => setCurrentMode('register')}
              >
                Daftar Member
              </button>
            </p>
          </>
        ) : (
          <>
            <MemberRegisterForm onClose={onClose} />
            <p className="text-sm mt-4 text-center">
              Sudah punya akun?{' '}
              <button
                className="text-blue-600 underline"
                onClick={() => setCurrentMode('login')}
              >
                Login Member
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default MemberAuthModal;
