export const forumPosts = [
  // Postingan sebelumnya ...
  {
    id: "post-video-2",
    type: "video",
    channel: {
      name: "Fun Clips",
      link: "#",
      icon: (
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm-1 11.93A6.001 6.001 0 0110 4a6.001 6.001 0 011 11.93V10H9v3.93z" clipRule="evenodd" />
        </svg>
      )
    },
    author: "FunnyUser",
    timestamp: "Hari ini 08:45",
    caption: "Anak kecil ini jago banget jogetnya",
    media: {
      thumbnail: "https://via.placeholder.com/800x450?text=Dance+Video",
      overlayTitle: "Bikin semua orang ikut joget!",
      hashtag: "#LucuBanget",
      description: "Tonton sampai akhir, gaya jogetnya bikin ngakak!"
    },
    interactions: {
      upvotes: 14,
      downvotes: 2,
      views: 812,
      comments: 7,
      shares: 5
    },
    lastReply: {
      time: "Hari ini 10:05",
      from: "jogeterz"
    }
  },
  {
    id: "post-image-2",
    type: "image",
    channel: {
      name: "Daily Life",
      link: "#",
      icon: (
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm-3 9a3 3 0 106 0 3 3 0 00-6 0z" clipRule="evenodd" />
        </svg>
      )
    },
    author: "citysnap",
    timestamp: "Hari ini 07:15",
    caption: "Sarapan sederhana di pinggir jalan",
    media: {
      imageUrl: "https://via.placeholder.com/800x450?text=Street+Breakfast"
    },
    interactions: {
      upvotes: 33,
      downvotes: 1,
      views: 912,
      comments: 18,
      shares: 3
    },
    lastReply: {
      time: "Hari ini 08:00",
      from: "foodiee"
    }
  },
  {
    id: "post-poll-1",
    type: "poll",
    channel: {
      name: "Polling Warga",
      link: "#",
      icon: (
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h4v-2H4V5h12v10h-3v2h4a1 1 0 001-1V4a1 1 0 00-1-1H3z" clipRule="evenodd" />
        </svg>
      )
    },
    author: "SurveyAdmin",
    timestamp: "2 hari lalu 13:00",
    caption: "Menurut kalian, mana yang lebih penting?",
    media: {
      question: "Pilih prioritas utama kamu saat ini!",
      options: [
        { option: "Karier", votes: 42 },
        { option: "Keluarga", votes: 51 },
        { option: "Kesehatan", votes: 36 },
        { option: "Liburan", votes: 21 }
      ]
    },
    interactions: {
      upvotes: 10,
      downvotes: 0,
      views: 203,
      comments: 11,
      shares: 1
    },
    lastReply: {
      time: "Kemarin 21:10",
      from: "lifebalancer"
    }
  }
];
