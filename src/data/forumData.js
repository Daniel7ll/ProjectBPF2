// src/data/forumData.js

export const discussions = [
  {
    id: 1,
    title: "Memasarkan Produk Makanan Di Internet",
    date: "12-Dec-2019 17:17:00",
    category: { name: "INTERNET MARKETING", color: "red" }, // Menambahkan properti warna
    member: { name: "Muhammad Irsyad", avatar: "https://via.placeholder.com/30?text=MI" },
    views: 7,
    comments: 0,
  },
  {
    id: 2,
    title: "IOS VS Android, Bagus mana?",
    date: "12-Dec-2019 17:10:55",
    category: { name: "ANDROID & IOS DEVELOPER", color: "pink" },
    member: { name: "Ferdian Syah", avatar: "https://via.placeholder.com/30?text=FS" },
    views: 3,
    comments: 1,
  },
  {
    id: 3,
    title: "Font Terbaru Dari Google",
    date: "12-Dec-2019 17:09:39",
    category: { name: "DESIGNER", color: "orange" },
    member: { name: "Fatimah", avatar: "https://via.placeholder.com/30?text=F" },
    views: 6,
    comments: 3,
  },
  {
    id: 4,
    title: "Cara Terbaru Mendaftar Google Adsense",
    date: "12-Dec-2019 17:06:22",
    category: { name: "INTERNET MARKETING", color: "red" },
    member: { name: "Samsul Bahri", avatar: "https://via.placeholder.com/30?text=SB" },
    views: 7,
    comments: 1,
  },
  // Tambahkan data diskusi lainnya jika diperlukan
];

export const categories = [
  { name: "TIDAK BERKATEGORI", color: "gray" },
  { name: "INTERNET MARKETING", color: "red" },
  { name: "PEMROGRAMAN WEB", color: "blue" },
  { name: "DESIGNER", color: "orange" },
  { name: "ANDROID & IOS DEVELOPER", color: "pink" },
  { name: "SOSIAL MEDIA", color: "purple" },
  { name: "HACKING", color: "green" },
];

export const popularDiscussions = [
  { id: 1, title: "Software Terbaik Untuk Membuat Aplikasi Android" },
  // Tambahkan diskusi terpopuler lainnya jika diperlukan
];