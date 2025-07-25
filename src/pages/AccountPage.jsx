import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../assets/contexts/AuthContext';

const AccountPage = () => {

  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    avatar_url: '',
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [canChangePassword, setCanChangePassword] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('members')
      .select('name, email, avatar_url')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Error fetching profile:', error.message);
    } else {
      setProfile(data);
    }
    setLoading(false);
  };

  const uploadAvatar = async () => {
    if (!avatarFile) return profile.avatar_url;

    const fileExt = avatarFile.name.split('.').pop();
    const fileName = `${user.id}_${Date.now()}.${fileExt}`;
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(fileName, avatarFile, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      console.error('Avatar upload failed:', error.message);
      return profile.avatar_url;
    }

    const { data: publicUrl } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);

    return publicUrl.publicUrl;
  };

  const updateProfile = async () => {
    setLoading(true);
    const avatar_url = await uploadAvatar();

    const { error } = await supabase
      .from('members')
      .update({ name: profile.name, avatar_url })
      .eq('id', user.id);

    if (error) {
      alert('Error updating profile: ' + error.message);
    } else {
      alert('Profile updated!');
    }
    setLoading(false);
  };

  const verifyOldPassword = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: profile.email,
      password: oldPassword,
    });

    if (!error) {
      setCanChangePassword(true);
    } else {
      alert("Password lama salah.");
      setCanChangePassword(false);
    }
  };

  const updatePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Password baru dan konfirmasi tidak cocok.");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      alert("Gagal memperbarui password: " + error.message);
    } else {
      alert("Password berhasil diperbarui.");
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setCanChangePassword(false);
    }
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;

  return (
    <div className="relative min-h-screen py-20 bg-gradient-to-br from-blue-100 via-white to-blue-00 overflow-hidden">

      {/* Isi Form */}
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-2xl rounded-2xl mt-10 mb-10">
        {/* Avatar & Info */}
        <div className="flex items-center space-x-6 mb-8">
          <img
            src={profile.avatar_url || 'https://via.placeholder.com/100'}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-4 border-blue-300 shadow-md object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
            <p className="text-gray-500">{profile.email}</p>
          </div>
        </div>

        {/* Update Profile Form */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Avatar (Upload Image)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatarFile(e.target.files[0])}
              className="w-full text-gray-600"
            />
          </div>
          <button
            onClick={updateProfile}
            className="text-white text-sm font-semibold py-3 px-6 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-900 hover:from-blue-950 hover:to-blue-500 transition duration-300"
          >
            Save Profile
          </button>
        </div>

        {/* Change Password */}
        <div className="mt-12 border-t pt-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Change Password</h3>

          {!canChangePassword ? (
            <>
              <label className="block text-sm font-medium text-gray-700 mb-1">Old Password</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg shadow-sm mb-4 focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
              <button
                onClick={verifyOldPassword}
                className="text-white text-sm font-semibold py-3 px-6 rounded-2xl bg-gradient-to-r from-gray-700 to-gray-700 hover:from-gray-800 hover:to-black transition duration-300"
              >
                Verify Old Password
              </button>
            </>
          ) : (
            <div className="space-y-6 bg-white p-8 rounded-2xl shadow-xl mb-20">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>
              <button
                onClick={updatePassword}
                className="text-white text-sm font-semibold py-3 px-6 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 transition duration-300"
              >
                Update Password
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
