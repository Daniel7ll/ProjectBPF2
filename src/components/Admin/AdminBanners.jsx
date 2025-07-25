import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { FaEdit, FaTrash } from 'react-icons/fa'

export default function AdminBanners() {
  const [banners, setBanners] = useState([])
  const [formData, setFormData] = useState({ image_url: '', alt_text: '' })
  const [editingBanner, setEditingBanner] = useState(null)
  const [status, setStatus] = useState('')

  const fetchBanners = async () => {
    const { data, error } = await supabase
      .from('banners')
      .select('id, image_url, alt_text, created_at') // ✅ include created_at
      .order('id', { ascending: false })

    if (error) console.error(error)
    else setBanners(data)
  }

  useEffect(() => {
    fetchBanners()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

const handleSubmit = async (e) => {
  e.preventDefault()
  const { image_url, alt_text } = formData
  if (!image_url || !alt_text) return alert('Image URL dan Alt Text wajib diisi.')

  if (editingBanner) {
    const { error } = await supabase
      .from('banners')
      .update({ image_url, alt_text })
      .eq('id', editingBanner.id)

    if (error) {
      console.error(error)
      return setStatus('❌ Gagal update banner.')
    }

    setStatus('✅ Banner berhasil diupdate.')
    setEditingBanner(null)
  } else {
    const { error } = await supabase
      .from('banners')
      .insert([
        {
          image_url,
          alt_text,
          created_at: new Date().toISOString(), // 🆕 tambahkan created_at
        },
      ])

    if (error) {
      console.error(error)
      return setStatus('❌ Gagal tambah banner.')
    }

    setStatus('✅ Banner berhasil ditambahkan.')
  }

  setFormData({ image_url: '', alt_text: '' })
  fetchBanners()
}

const handleEdit = (banner) => {
  setEditingBanner(banner)
  setFormData({ image_url: banner.image_url, alt_text: banner.alt_text })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleDelete = async (id) => {
  if (!window.confirm('Yakin ingin menghapus banner ini?')) return
  const { error } = await supabase.from('banners').delete().eq('id', id)
  if (error) {
    console.error(error)
    return setStatus('❌ Gagal hapus banner.')
  }
  setStatus('✅ Banner berhasil dihapus.')
  fetchBanners()
}


  return (
    <div className="p-6 font-sans ml-64 bg-[#f0f2f5] min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-[#1877F2] to-[#0b5ed7] text-transparent bg-clip-text drop-shadow mb-6">
          🖼️ {editingBanner ? 'Edit Banner' : 'Daftar Banner'}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md border border-blue-200 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="image_url"
            placeholder="Image URL"
            value={formData.image_url}
            onChange={handleInputChange}
            className="border border-blue-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <input
            type="text"
            name="alt_text"
            placeholder="Alt Text"
            value={formData.alt_text}
            onChange={handleInputChange}
            className="border border-blue-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <button
            type="submit"
            className="bg-[#1877F2] hover:bg-blue-600 text-white font-semibold px-5 py-3 rounded-xl transition duration-300 md:col-span-2"
          >
            {editingBanner ? 'Update Banner' : 'Tambah Banner'}
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
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Alt Text</th>
                <th className="px-4 py-3">Created At</th> {/* ✅ new column */}
                <th className="px-4 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {banners.map((b, idx) => (
                <tr key={b.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
                  <td className="px-4 py-2 border-t">{b.id}</td>
                  <td className="px-4 py-2 border-t">
                    <img src={b.image_url} alt={b.alt_text} className="h-16 rounded-md" />
                  </td>
                  <td className="px-4 py-2 border-t">{b.alt_text}</td>
                  <td className="px-4 py-2 border-t text-sm text-gray-600">
                    {new Date(b.created_at).toLocaleString('id-ID')}
                  </td>
                  <td className="px-4 py-2 border-t flex gap-2">
                    <button onClick={() => handleEdit(b)} className="text-blue-600 hover:text-blue-800">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(b.id)} className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {banners.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-4 py-6 text-center text-gray-500 italic">
                    Belum ada banner.
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
