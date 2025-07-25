import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { FaEdit, FaTrash } from 'react-icons/fa'

export default function AdminForumPosts() {
  const [posts, setPosts] = useState([])
  const [formData, setFormData] = useState({
    id: '',
    author: '',
    caption: '',
    image_url: '',
    timestamp: ''
  })
  const [editingPost, setEditingPost] = useState(null)
  const [status, setStatus] = useState('')

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('forum_posts')
      .select('id, author, caption, image_url, timestamp')
      .order('timestamp', { ascending: false })

    if (error) console.error(error)
    else setPosts(data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { id, author, caption, image_url, timestamp } = formData
    if (!id || !author || !caption) return alert('ID, Author dan Caption wajib diisi.')

    if (editingPost) {
      const { error } = await supabase
        .from('forum_posts')
        .update({ author, caption, image_url, timestamp })
        .eq('id', editingPost.id)

      if (error) return setStatus('❌ Gagal update post.')
      setStatus('✅ Post berhasil diupdate.')
      setEditingPost(null)
    } else {
      const { error } = await supabase
        .from('forum_posts')
        .insert([{ id, author, caption, image_url, timestamp }])

      if (error) return setStatus('❌ Gagal tambah post.')
      setStatus('✅ Post berhasil ditambahkan.')
    }

    setFormData({ id: '', author: '', caption: '', image_url: '', timestamp: '' })
    fetchPosts()
  }

  const handleEdit = (post) => {
    setEditingPost(post)
    setFormData(post)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus post ini?')) return
    const { error } = await supabase.from('forum_posts').delete().eq('id', id)
    if (error) return setStatus('❌ Gagal hapus post.')
    setStatus('✅ Post berhasil dihapus.')
    fetchPosts()
  }

  return (
    <div className="p-6 font-sans ml-64 bg-[#f0f2f5] min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-[#1877F2] to-[#0b5ed7] text-transparent bg-clip-text drop-shadow mb-6">
          📝 {editingPost ? 'Edit Forum Post' : 'Daftar Forum Posts'}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md border border-blue-200 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="id"
            placeholder="ID"
            value={formData.id}
            onChange={handleInputChange}
            className="border border-blue-300 p-3 rounded-xl"
            disabled={!!editingPost} // disable saat edit
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleInputChange}
            className="border border-blue-300 p-3 rounded-xl"
          />
          <input
            type="text"
            name="caption"
            placeholder="Caption"
            value={formData.caption}
            onChange={handleInputChange}
            className="border border-blue-300 p-3 rounded-xl"
          />
          <input
            type="text"
            name="image_url"
            placeholder="Image URL (optional)"
            value={formData.image_url}
            onChange={handleInputChange}
            className="border border-blue-300 p-3 rounded-xl"
          />
          <input
            type="text"
            name="timestamp"
            placeholder="Timestamp (optional)"
            value={formData.timestamp}
            onChange={handleInputChange}
            className="border border-blue-300 p-3 rounded-xl"
          />
          <button
            type="submit"
            className="bg-[#1877F2] hover:bg-blue-600 text-white font-semibold px-5 py-3 rounded-xl transition duration-300 md:col-span-2"
          >
            {editingPost ? 'Update Post' : 'Tambah Post'}
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
                <th className="px-4 py-3">Author</th>
                <th className="px-4 py-3">Caption</th>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p, idx) => (
                <tr key={p.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
                  <td className="px-4 py-2 border-t">{p.id}</td>
                  <td className="px-4 py-2 border-t">{p.author}</td>
                  <td className="px-4 py-2 border-t">{p.caption}</td>
                  <td className="px-4 py-2 border-t">
                    {p.image_url && <img src={p.image_url} alt="img" className="h-12 rounded-md" />}
                  </td>
                  <td className="px-4 py-2 border-t text-sm text-gray-600">{p.timestamp}</td>
                  <td className="px-4 py-2 border-t flex gap-2">
                    <button onClick={() => handleEdit(p)} className="text-blue-600 hover:text-blue-800">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-4 py-6 text-center text-gray-500 italic">
                    Belum ada post.
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
