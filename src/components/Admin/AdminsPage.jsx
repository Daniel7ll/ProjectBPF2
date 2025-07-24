import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient';
import { FaEdit, FaTrash } from 'react-icons/fa'

const AdminsPage = () => {
  const [admins, setAdmins] = useState([])
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    full_name: '',
    role: 'moderator',
    phone_number: '',
    profile_picture: ''
  })
  const [editingAdmin, setEditingAdmin] = useState(null)
  const [status, setStatus] = useState('')

  const fetchAdmins = async () => {
    const { data, error } = await supabase.from('admins').select('*')
    if (!error) setAdmins(data)
    else console.error('Fetch error:', error)
  }

  useEffect(() => {
    fetchAdmins()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const password_hash = btoa(form.password)

    if (editingAdmin) {
      const { error } = await supabase.from('admins').update({
        username: form.username,
        email: form.email,
        full_name: form.full_name,
        role: form.role,
        phone_number: form.phone_number,
        profile_picture: form.profile_picture,
        password_hash
      }).eq('admin_id', editingAdmin.admin_id)

      if (error) return setStatus('❌ Gagal update.')
      setStatus('✅ Admin berhasil diupdate!')
      setEditingAdmin(null)
    } else {
      const { error } = await supabase.from('admins').insert([{
        username: form.username,
        email: form.email,
        full_name: form.full_name,
        role: form.role,
        phone_number: form.phone_number,
        profile_picture: form.profile_picture,
        password_hash
      }])

      if (error) return setStatus('❌ Gagal tambah admin.')
      setStatus('✅ Admin berhasil ditambahkan!')
    }

    setForm({
      username: '', email: '', password: '', full_name: '',
      role: 'moderator', phone_number: '', profile_picture: ''
    })
    fetchAdmins()
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus admin ini?")) return
    const { error } = await supabase.from('admins').delete().eq('admin_id', id)
    if (error) setStatus('❌ Gagal hapus.')
    else {
      setStatus('✅ Admin berhasil dihapus.')
      fetchAdmins()
    }
  }

  const handleEdit = (admin) => {
    setEditingAdmin(admin)
    setForm({
      username: admin.username,
      email: admin.email,
      password: '',
      full_name: admin.full_name,
      role: admin.role,
      phone_number: admin.phone_number,
      profile_picture: admin.profile_picture
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
return (
  <div className="font-poppins ml-64 p-6 min-h-screen bg-[#f8faff]">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-[#1877f2] to-[#7b61ff] text-transparent bg-clip-text drop-shadow tracking-wide mb-6">
        {editingAdmin ? "Edit Admin" : "Kelola Admin"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white m-3 p-6 shadow-md rounded-2xl border border-blue-100"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="username" value={form.username} onChange={handleChange} placeholder="Username" className="border border-blue-200 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition" required />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email Address" className="border border-blue-200 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition" required />
          <input name="password" type="password" value={form.password} onChange={handleChange} placeholder={editingAdmin ? "Password Baru (opsional)" : "Password"} className="border border-blue-200 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition" required={!editingAdmin} />
          <input name="full_name" value={form.full_name} onChange={handleChange} placeholder="Full Name" className="border border-blue-200 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
          <select name="role" value={form.role} onChange={handleChange} className="border border-blue-200 p-3 rounded-xl w-full bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition">
            <option value="superadmin">Superadmin</option>
            <option value="moderator">Moderator</option>
            <option value="editor">Editor</option>
          </select>
          <input name="phone_number" value={form.phone_number} onChange={handleChange} placeholder="Phone Number" className="border border-blue-200 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
          <input name="profile_picture" value={form.profile_picture} onChange={handleChange} placeholder="Profile Picture URL (http://...)" type="url" className="border border-blue-200 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition md:col-span-2" />
        </div>

        <div className="mt-6">
          <button type="submit" className="bg-[#1877f2] hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl w-full transition duration-300 hover:shadow">
            {editingAdmin ? "Update Admin" : "Tambah Admin"}
          </button>
        </div>
      </form>

      {status && (
        <p className={`mt-4 text-center font-medium ${status.includes('Gagal') ? 'text-red-600' : 'text-green-600'}`}>
          {status}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {admins.map((admin) => (
          <div key={admin.admin_id} className="bg-white rounded-2xl p-4 shadow-md flex items-center gap-4 border border-blue-100 hover:bg-blue-50 transition">
            <img
              src={admin.profile_picture && admin.profile_picture.startsWith('http') ? admin.profile_picture : 'https://via.placeholder.com/60'}
              alt={admin.username}
              className="w-16 h-16 rounded-full object-cover border border-blue-200"
            />
            <div className="flex-1">
              <p className="font-bold text-blue-800">{admin.username} <span className="text-sm text-blue-500">({admin.role})</span></p>
              <p className="text-sm text-gray-600">{admin.email}</p>
              <p className="text-sm text-gray-500">{admin.phone_number}</p>
            </div>
            <div className="flex gap-2 text-lg">
              <button onClick={() => handleEdit(admin)} title="Edit" className="text-blue-500 hover:text-blue-700 transition">
                <FaEdit />
              </button>
              <button onClick={() => handleDelete(admin.admin_id)} title="Hapus" className="text-red-500 hover:text-red-700 transition">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

}

export default AdminsPage
