import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient';
import { FaEdit, FaTrash } from 'react-icons/fa'

export default function MembersTable() {
  const [members, setMembers] = useState([])
  const [formData, setFormData] = useState({ name: '', email: '', role: '' })
  const [editingMember, setEditingMember] = useState(null)
  const [status, setStatus] = useState('')

  const fetchMembers = async () => {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) console.error(error)
    else setMembers(data)
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { name, email, role } = formData
    if (!name || !email || !role) return alert('Nama, Email, dan Role wajib diisi.')

    if (editingMember) {
      const { error } = await supabase.from('members').update({ name, email, role }).eq('id', editingMember.id)
      if (error) {
        console.error(error)
        return setStatus('❌ Gagal update member.')
      }
      setStatus('✅ Member berhasil diupdate.')
      setEditingMember(null)
    } else {
      const { error } = await supabase.from('members').insert([{ name, email, role }])
      if (error) {
        console.error(error)
        return setStatus('❌ Gagal tambah member.')
      }
      setStatus('✅ Member berhasil ditambahkan.')
    }

    setFormData({ name: '', email: '', role: '' })
    fetchMembers()
  }

  const handleEdit = (member) => {
    setEditingMember(member)
    setFormData({ name: member.name, email: member.email, role: member.role })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus member ini?')) return
    const { error } = await supabase.from('members').delete().eq('id', id)
    if (error) {
      console.error(error)
      return setStatus('❌ Gagal hapus member.')
    }
    setStatus('✅ Member berhasil dihapus.')
    fetchMembers()
  }

  return (
    <div className="p-6 font-sans ml-64 bg-[#f8faff] min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-[#1877f2] to-[#7b61ff] text-transparent bg-clip-text drop-shadow mb-6">
          👥 {editingMember ? 'Edit Member' : 'Daftar Member'}
        </h1>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md border border-blue-100 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Nama"
            value={formData.name}
            onChange={handleInputChange}
            className="border border-blue-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="border border-blue-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="border border-blue-200 p-3 rounded-xl md:col-span-2 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          >
            <option value="">Pilih Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
          </select>
          <button
            type="submit"
            className="bg-[#1877f2] hover:bg-blue-600 text-white font-semibold px-5 py-3 rounded-xl transition duration-300 md:col-span-2"
          >
            {editingMember ? 'Update Member' : 'Tambah Member'}
          </button>
        </form>

        {status && (
          <p className={`text-center mb-4 font-medium ${status.includes('Gagal') ? 'text-red-600' : 'text-green-600'}`}>
            {status}
          </p>
        )}

        <div className="overflow-x-auto bg-white shadow-md rounded-xl border border-blue-100">
          <table className="min-w-full table-auto">
            <thead className="bg-blue-50 text-blue-800 text-left text-sm uppercase">
              <tr>
                <th className="px-4 py-3">Nama</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Waktu Bergabung</th>
                <th className="px-4 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m, idx) => (
                <tr key={m.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
                  <td className="px-4 py-2 border-t">{m.name}</td>
                  <td className="px-4 py-2 border-t">{m.email}</td>
                  <td className="px-4 py-2 border-t capitalize">{m.role}</td>
                  <td className="px-4 py-2 border-t">{new Date(m.created_at).toLocaleString()}</td>
                  <td className="px-4 py-2 border-t flex gap-2">
                    <button onClick={() => handleEdit(m)} className="text-blue-500 hover:text-blue-700">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(m.id)} className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {members.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-4 py-6 text-center text-gray-500 italic">
                    Belum ada member.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
