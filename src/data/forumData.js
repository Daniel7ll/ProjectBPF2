const originalDiscussions = [
  {
    id: 1,
    title: "Memasarkan Produk Makanan Di Internet",
    date: "12-Dec-2019 17:17:00",
    category: { name: "INTERNET MARKETING", color: "red" },
    member: { name: "Muhammad Irsyad", avatar: "https://via.placeholder.com/30?text=MI" },
    views: 7,
    content: "Pemasaran produk makanan secara online memiliki potensi besar. Dengan strategi yang tepat, mulai dari media sosial, SEO, hingga platform e-commerce, bisnis kuliner dapat menjangkau audiens yang lebih luas. Penting untuk fokus pada kualitas foto, deskripsi produk yang menarik, dan interaksi dengan pelanggan. Jangan lupakan juga tentang logistik pengiriman yang efisien. Ini adalah contoh konten yang lebih panjang untuk ditampilkan di modal pop-up diskusi Anda. Anda bisa mengganti teks ini dengan isi diskusi yang sebenarnya.",
    commentList: [
      {
        id: 1,
        author: "Arif",
        avatar: "https://via.placeholder.com/30?text=A",
        content: "Saya setuju, promosi online sangat penting.",
        date: "13-Dec-2019 09:00"
      },
      {
        id: 2,
        author: "Nina",
        avatar: "https://via.placeholder.com/30?text=N",
        content: "Gimana caranya bikin konten menarik ya?",
        date: "13-Dec-2019 09:15"
      }
    ]
  },
  {
    id: 2,
    title: "IOS VS Android, Bagus mana?",
    date: "12-Dec-2019 17:10:55",
    category: { name: "ANDROID & IOS DEVELOPER", color: "pink" },
    member: { name: "Ferdian Syah", avatar: "https://via.placeholder.com/30?text=FS" },
    views: 3,
    content: "Perdebatan abadi antara pengguna iOS dan Android seringkali berpusat pada ekosistem, kustomisasi, dan keamanan. iOS dikenal dengan kesederhanaan dan integrasi hardware-software yang kuat, sementara Android menawarkan fleksibilitas kustomisasi yang tak tertandingi dan pilihan perangkat yang lebih luas. Pilihan terbaik seringkali bergantung pada preferensi pribadi dan kebutuhan pengguna. Mari kita bahas lebih lanjut mengenai kelebihan dan kekurangan masing-masing platform.",
    commentList: [
      {
        id: 1,
        author: "Bayu",
        avatar: "https://via.placeholder.com/30?text=B",
        content: "Saya lebih suka Android karena fleksibel.",
        date: "13-Dec-2019 08:45"
      }
    ]
  },
  {
    id: 3,
    title: "Font Terbaru Dari Google",
    date: "12-Dec-2019 17:09:39",
    category: { name: "DESIGNER", color: "orange" },
    member: { name: "Fatimah", avatar: "https://via.placeholder.com/30?text=F" },
    views: 6,
    content: "Google Fonts terus memperbarui koleksinya dengan pilihan font yang beragam dan gratis. Font terbaru seringkali menawarkan estetika modern, dukungan multibahasa yang lebih baik, dan performa web yang dioptimalkan. Memilih font yang tepat adalah kunci untuk menciptakan pengalaman membaca yang menyenangkan dan meningkatkan identitas visual sebuah situs web atau aplikasi. Ada banyak pilihan menarik yang bisa dicoba!",
    commentList: [
      { id: 1, author: "Rani", avatar: "https://via.placeholder.com/30?text=R", content: "Aku suka font Inter!", date: "13-Dec-2019 11:00" },
      { id: 2, author: "Dian", avatar: "https://via.placeholder.com/30?text=D", content: "Font yang ringan itu penting untuk web.", date: "13-Dec-2019 11:10" },
      { id: 3, author: "Gilang", avatar: "https://via.placeholder.com/30?text=G", content: "Kapan Google update lagi ya?", date: "13-Dec-2019 11:25" }
    ]
  },
  {
    id: 4,
    title: "Cara Terbaru Mendaftar Google Adsense",
    date: "12-Dec-2019 17:06:22",
    category: { name: "INTERNET MARKETING", color: "red" },
    member: { name: "Samsul Bahri", avatar: "https://via.placeholder.com/30?text=SB" },
    views: 7,
    content: "Mendaftar Google AdSense adalah cara populer untuk memonetisasi konten online. Proses pendaftarannya melibatkan beberapa langkah, termasuk verifikasi situs web, peninjauan konten, dan pengaturan pembayaran. Penting untuk memastikan situs Anda mematuhi kebijakan program AdSense agar proses persetujuan berjalan lancar dan Anda dapat mulai menampilkan iklan. Pastikan semua persyaratan terpenuhi agar tidak ada kendala.",
    commentList: [
      { id: 1, author: "Tia", avatar: "https://via.placeholder.com/30?text=T", content: "Aku baru coba daftar, semoga disetujui!", date: "13-Dec-2019 12:00" }
    ]
  },
  {
    id: 5,
    title: "Strategi SEO Terbaik untuk Bisnis Online",
    date: "10-Dec-2019 10:00:00",
    category: { name: "INTERNET MARKETING", color: "red" },
    member: { name: "Anisa Putri", avatar: "https://via.placeholder.com/30?text=AP" },
    views: 12,
    content: "SEO (Search Engine Optimization) adalah kunci sukses bisnis online. Strategi terbaik melibatkan riset keyword mendalam, optimasi on-page (konten, meta deskripsi), pembangunan backlink berkualitas, dan peningkatan kecepatan situs. Memantau performa dan terus beradaptasi dengan algoritma mesin pencari adalah esensial untuk visibilitas jangka panjang. Persaingan di dunia digital semakin ketat, jadi SEO adalah investasi penting.",
    commentList: [
      { id: 1, author: "Raka", avatar: "https://via.placeholder.com/30?text=R", content: "Backlink berkualitas susah dicari!", date: "13-Dec-2019 13:00" },
      { id: 2, author: "Yuni", avatar: "https://via.placeholder.com/30?text=Y", content: "Aku pakai tools SEO gratisan dulu.", date: "13-Dec-2019 13:15" },
      { id: 3, author: "Hendra", avatar: "https://via.placeholder.com/30?text=H", content: "Keyword long tail works better sekarang.", date: "13-Dec-2019 13:30" },
      { id: 4, author: "Vina", avatar: "https://via.placeholder.com/30?text=V", content: "Google update terus, jadi harus rutin evaluasi.", date: "13-Dec-2019 13:45" },
      { id: 5, author: "Andre", avatar: "https://via.placeholder.com/30?text=A", content: "Bener banget, SEO itu maraton bukan sprint.", date: "13-Dec-2019 14:00" }
    ]
  },
  {
    id: 6,
    title: "Membangun Aplikasi Web dengan React Hooks",
    date: "09-Dec-2019 14:20:00",
    category: { name: "PEMROGRAMAN WEB", color: "blue" },
    member: { name: "Budi Santoso", avatar: "https://via.placeholder.com/30?text=BS" },
    views: 8,
    content: "React Hooks telah merevolusi cara kita membangun komponen fungsional di React, memungkinkan penggunaan state dan lifecycle method tanpa menulis class. Hooks seperti useState, useEffect, dan useContext menyederhanakan logika komponen, membuatnya lebih mudah untuk dibaca dan diuji. Mempelajari Hooks adalah langkah penting bagi setiap pengembang React untuk menulis kode yang lebih bersih dan efisien.",
    commentList: [
      { id: 1, author: "Dika", avatar: "https://via.placeholder.com/30?text=D", content: "Aku baru belajar useEffect, menarik banget!", date: "13-Dec-2019 15:00" },
      { id: 2, author: "Lina", avatar: "https://via.placeholder.com/30?text=L", content: "useContext bikin state global gampang.", date: "13-Dec-2019 15:20" }
    ]
  }
];

export const discussions = originalDiscussions.map(d => ({
  ...d,
  comments: d.commentList ? d.commentList.length : 0
}));

export const categories = [
  { name: "TIDAK BERKATEGORI", color: "gray" },
  { name: "INTERNET MARKETING", color: "red" },
  { name: "PEMROGRAMAN WEB", color: "blue" },
  { name: "DESIGNER", color: "orange" },
  { name: "ANDROID & IOS DEVELOPER", color: "pink" },
  { name: "SOSIAL MEDIA", color: "purple" },
  { name: "HACKING", color: "green" }
];

export const popularDiscussions = [
  { id: 1, title: "Software Terbaik Untuk Membuat Aplikasi Android" },
  { id: 2, title: "Tips & Trik Menggunakan Tailwind CSS" },
  { id: 3, title: "Pentingnya UI/UX dalam Pengembangan Aplikasi" }
];
