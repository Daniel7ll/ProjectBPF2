import React from 'react';
import DiscussionRow from './DiscussionRow';
import { discussions } from '../../data/forumData';

const DiscussionList = ({ onDiscussionClick }) => {
  return (
    <div className="w-full lg:w-4/4 bg-white rounded-lg shadow-md p-4 overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
        <h2 className="text-xl font-semibold text-gray-800">Judul Diskusi</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Urutkan :</span>
          <div className="relative">
            <select className="appearance-none bg-blue-100 text-blue-800 px-3 py-1 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>TERBARU</option>
              <option>TERPOPULER</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-blue-800">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
      </div>

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
            {discussions.map((discussion) => (
              <DiscussionRow
                key={discussion.id}
                discussion={discussion}
                onDiscussionClick={onDiscussionClick}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DiscussionList;
