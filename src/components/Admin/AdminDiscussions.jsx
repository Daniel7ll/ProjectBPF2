import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function AdminDiscussions() {
  const [discussions, setDiscussions] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    date: '',
    views: '',
    category_color: '',
    member_name: '',
    member_avatar: '',
    title: '',
    content: '',
    category_name: ''
  });
  const [editingDiscussion, setEditingDiscussion] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  const fetchDiscussions = async () => {
    const { data, error } = await supabase
      .from('discussions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error('Fetch Error:', error);
    else setDiscussions(data);
  };

  useEffect(() => {
    fetchDiscussions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      id, date, views, category_color,
      member_name, member_avatar, title,
      content, category_name
    } = formData;

    if (!id || !title || !member_name) {
      return alert('ID, Judul, dan Nama Member wajib diisi.');
    }

    const payload = {
      date: date || null,
      views: views ? Number(views) : 0,
      category_color,
      member_name,
      member_avatar,
      title,
      content,
      category_name
    };

    if (editingDiscussion) {
      const { error } = await supabase
        .from('discussions')
        .update({ ...payload, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) {
        console.error('Update Error:', error);
        return setStatusMessage('❌ Gagal update diskusi.');
      }

      setStatusMessage('✅ Diskusi berhasil diupdate.');
      setEditingDiscussion(null);
    } else {
      const { error } = await supabase
        .from('discussions')
        .insert([{ id, ...payload }]);

      if (error) {
        console.error('Insert Error:', error);
        return setStatusMessage('❌ Gagal tambah diskusi.');
      }

      setStatusMessage('✅ Diskusi berhasil ditambahkan.');
    }

    setFormData({
      id: '',
      date: '',
      views: '',
      category_color: '',
      member_name: '',
      member_avatar: '',
      title: '',
      content: '',
      category_name: ''
    });
    fetchDiscussions();
  };

  const handleEdit = (d) => {
    setEditingDiscussion(d);
    setFormData({
      id: d.id || '',
      date: d.date || '',
      views: d.views || '',
      category_color: d.category_color || '',
      member_name: d.member_name || '',
      member_avatar: d.member_avatar || '',
      title: d.title || '',
      content: d.content || '',
      category_name: d.category_name || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus diskusi ini?')) return;
    const { error } = await supabase.from('discussions').delete().eq('id', id);
    if (error) {
      console.error('Delete Error:', error);
      return setStatusMessage('❌ Gagal hapus diskusi.');
    }
    setStatusMessage('✅ Diskusi berhasil dihapus.');
    fetchDiscussions();
  };

  return (
    <div className="p-6 font-sans ml-64 bg-[#f0f2f5] min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center mb-6">
          💬 {editingDiscussion ? 'Edit Diskusi' : 'Tambah Diskusi'}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md border border-blue-200 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {Object.keys(formData).map((key) => (
            <input
              key={key}
              type={key === 'views' ? 'number' : 'text'}
              name={key}
              placeholder={key.replace('_', ' ').toUpperCase()}
              value={formData[key] || ''}
              onChange={handleInputChange}
              className="border border-blue-300 p-3 rounded-xl"
              disabled={key === 'id' && !!editingDiscussion}
            />
          ))}
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-5 py-3 rounded-xl transition duration-300 md:col-span-2"
          >
            {editingDiscussion ? 'Update Diskusi' : 'Tambah Diskusi'}
          </button>
        </form>

        {statusMessage && (
          <p className={`text-center mb-4 font-medium ${statusMessage.includes('Gagal') ? 'text-red-600' : 'text-green-600'}`}>
            {statusMessage}
          </p>
        )}

        <div className="overflow-x-auto bg-white shadow-md rounded-xl border border-blue-100">
          <table className="min-w-full table-auto">
            <thead className="bg-blue-50 text-blue-800 text-left text-sm uppercase">
              <tr>
                {Object.keys(formData).map((k) => (
                  <th key={k} className="px-4 py-3">{k.toUpperCase()}</th>
                ))}
                <th className="px-4 py-3">AKSI</th>
              </tr>
            </thead>
            <tbody>
              {discussions.map((d, idx) => (
                <tr key={d.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
                  {Object.keys(formData).map((k) => (
                    <td key={k} className="px-4 py-2 border-t text-sm">{d[k]}</td>
                  ))}
                  <td className="px-4 py-2 border-t flex gap-2">
                    <button onClick={() => handleEdit(d)} className="text-blue-600 hover:text-blue-800">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(d.id)} className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {discussions.length === 0 && (
                <tr>
                  <td colSpan={Object.keys(formData).length + 1} className="px-4 py-6 text-center text-gray-500 italic">
                    Belum ada diskusi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
