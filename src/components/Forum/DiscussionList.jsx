import React, { useState, useEffect } from 'react';
import DiscussionRow from './DiscussionRow';
import { supabase } from '../../lib/supabaseClient';

const DiscussionList = ({ onDiscussionClick }) => {
  const [discussions, setDiscussions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fetch data dari Supabase
useEffect(() => {
  const fetchDiscussions = async () => {
    const { data, error } = await supabase
      .from('discussions')
      .select(`
        id,
        title,
        content,
        date,
        views,
        category_name,
        category_color,
        member_name,
        member_avatar,
        comments:comments(id)
      `)
      .order('date', { ascending: false });

    if (error) {
      console.error('Gagal mengambil data diskusi:', error.message);
    } else {
      const formatted = data.map((d) => ({
        ...d,
        category: { name: d.category_name, color: d.category_color },
        member: { name: d.member_name, avatar: d.member_avatar },
        comments: d.comments?.length || 0,
      }));
      setDiscussions(formatted);
    }
  };

  fetchDiscussions();
}, []);


  // Filter berdasar pencarian
  const filteredDiscussions = discussions.filter((d) =>
    d.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.content?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full lg:w-4/4 bg-white rounded-lg shadow-md p-4 overflow-hidden">
      {/* Search & Dropdown */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <div className="relative w-full md:w-auto">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-between w-full md:w-48 hover:bg-blue-700 transition-colors"
          >
            KATEGORI DISKUSI
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-full md:w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Semua Kategori</a>
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Internet Marketing</a>
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Pemrograman Web</a>
            </div>
          )}
        </div>

        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Cari diskusi di sini..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Judul dan Urutan */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
        <h2 className="text-xl font-semibold text-gray-800">Judul Diskusi</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Urutkan :</span>
          <div className="relative">
            <select
              className="appearance-none bg-blue-100 text-blue-800 px-3 py-1 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => {
                const value = e.target.value;
                const sorted = [...discussions].sort((a, b) => {
                  if (value === 'TERPOPULER') return b.views - a.views;
                  return new Date(b.date) - new Date(a.date);
                });
                setDiscussions(sorted);
              }}
            >
              <option value="TERBARU">TERBARU</option>
              <option value="TERPOPULER">TERPOPULER</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-blue-800">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/5">
                Judul Diskusi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kategori
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Member
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                👁️
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                💬
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDiscussions.map((discussion) => (
              <DiscussionRow
                key={discussion.id}
                discussion={discussion}
                onDiscussionClick={onDiscussionClick}
              />
            ))}
            {filteredDiscussions.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-gray-500 py-6">
                  Tidak ada diskusi ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DiscussionList;
