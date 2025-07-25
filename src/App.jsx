  import React, { Suspense } from 'react';
import './assets/tailwind.css';
import { Routes, Route } from "react-router-dom";

// Import AuthProvider
import { AuthProvider } from './assets/contexts/AuthContext'; // Pastikan path ini benar

// Import Layouts
import GuestLayout from './layouts/GuestLayout';
import ForumLayout from './layouts/ForumLayout';
import AdminLayout from './layouts/AdminLayout';

// Import Components
import AdminsPage from './components/Admin/AdminsPage';
import MembersTable from './components/Admin/MembersTable';
import ProtectedRoute from './assets/contexts/ProtectedRoute'; // Pastikan path ini benar

// Lazy load pages
const Guest = React.lazy(() => import("./pages/Guest"));
const Forum = React.lazy(() => import("./pages/ForumPage"));
const AdminDashboard = React.lazy(() => import("./pages/Admin/AdminDasboard"));
const AdminDiskusi = React.lazy(() => import("./pages/Admin/AdminDiskusi"));
const NewsManager = React.lazy(() => import("./components/Admin/NewsManager")); 

import AccountLayout from './layouts/AccountLayout'; 
const AccountPage = React.lazy(() => import("./pages/AccountPage"));

function App() {
  // Anda tidak perlu lagi mengambil user dari localStorage di sini.
  // Logika ini sekarang harusnya ada di dalam AuthProvider.

  return (
    // 1. Bungkus semua Routes dengan AuthProvider
    <AuthProvider>
      <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
        <Routes>

          {/* 🧑‍💼 Guest routes */}
          <Route element={<GuestLayout />}>
            <Route path="/guest" element={<Guest />} />
          </Route>

          {/* 🌐 Forum Routes */}
          <Route element={<ForumLayout />}>
            <Route path="/" element={<Forum />} />
          
          </Route>
          
          <Route element={<AccountLayout />}>
            <Route path="/account" element={<AccountPage />} />
          </Route>

          {/* 🔒 Protected Admin Routes */}
          {/* 2. Hapus prop `user={user}`. ProtectedRoute akan mengambilnya dari context. */}
          <Route
            element={
              <ProtectedRoute expectedRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/diskusi" element={<AdminDiskusi />} />
            <Route path="/admins" element={<AdminsPage />} />
            <Route path="/member" element={<MembersTable />} />
            <Route path="/news" element={<NewsManager />} />
          </Route>

        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;