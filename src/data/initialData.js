// Mock data and persistent storage helpers for Captain Teacher 20/11

export const DEFAULT_CARDS = [
  {
    id: 'card-1',
    template: 'royal-captain',
    toTeacher: 'TS. Nguyễn Văn Minh',
    faculty: 'Khoa Công Nghệ Thông Tin',
    fromStudent: 'Lê Hoàng Nam',
    studentClass: 'K65 - Khoa học Máy tính',
    message: 'Kính chúc Thầy Thuyền Trưởng luôn dồi dào sức khỏe và giữ vững tay lái! Cảm ơn Thầy đã thức trắng cùng nhóm em những đêm fix bug đồ án tốt nghiệp. Nhờ ngọn hải đăng của Thầy mà chúng em đã cập bến an toàn!',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80',
    stickers: [
      { id: 's1', type: 'anchor', x: 80, y: 15, label: 'Thuyền Trưởng 5⭐️' },
      { id: 's2', type: 'star', x: 20, y: 75, label: 'Idol Toàn Năng' }
    ],
    likes: 48,
    status: 'approved',
    createdAt: '2026-11-02T14:30:00Z',
    isPinned: true
  },
  {
    id: 'card-2',
    template: 'vintage-parchment',
    toTeacher: 'ThS. Trần Thị Mai Lan',
    faculty: 'Viện Kinh Tế & Quản Trị',
    fromStudent: 'Nguyễn Thảo My & Nhóm 4',
    studentClass: 'K66 - Marketing',
    message: 'Gửi người Cô kính yêu, "Vị thuyền trưởng" dịu dàng nhưng vô cùng nghiêm khắc của môn Kinh tế lượng! Cảm ơn Cô vì những lời động viên đúng lúc đã kéo chúng em khỏi những lần muốn bỏ cuộc. Chúc Cô 20/11 ngập tràn niềm vui!',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    stickers: [
      { id: 's3', type: 'rose', x: 85, y: 80, label: 'Hoa Tri Ân' },
      { id: 's4', type: 'compass', x: 15, y: 20, label: 'Kim Chỉ Nam' }
    ],
    likes: 35,
    status: 'approved',
    createdAt: '2026-11-02T16:45:00Z',
    isPinned: false
  },
  {
    id: 'card-3',
    template: 'navy-chalkboard',
    toTeacher: 'PGS.TS. Phạm Quốc Hùng',
    faculty: 'Khoa Điện tử - Viễn thông',
    fromStudent: 'Tập thể Lớp ĐTVT 02',
    studentClass: 'Khóa 2023 - 2027',
    message: 'Thầy ơi, Thầy bảo "Lập trình nhúng như lái tàu vượt tâm bão, sai một bit là chìm cả tàu". Tụi em giờ đã thấm thía câu nói đó rồi! Nhân ngày 20/11, chúc Thầy luôn tràn đầy nhiệt huyết để dẫn dắt các thế hệ thủy thủ tiếp theo!',
    image: null,
    stickers: [
      { id: 's5', type: 'lifebuoy', x: 82, y: 25, label: 'Phao Cứu Sinh' }
    ],
    likes: 62,
    status: 'approved',
    createdAt: '2026-11-03T08:15:00Z',
    isPinned: true
  },
  {
    id: 'card-4',
    template: 'lighthouse-minimal',
    toTeacher: 'Cô Đỗ Thu Hà',
    faculty: 'Bộ môn Ngoại ngữ',
    fromStudent: 'Đặng Tuấn Kiệt',
    studentClass: 'Cựu sinh viên Khóa 62',
    message: 'Đã 3 năm rời giảng đường đại học nhưng em vẫn nhớ góc bàn làm việc ngập tràn sách của Cô. Cảm ơn Cô đã trao cho em tấm vé thông hành tự tin bước ra biển lớn quốc tế. Kính chúc Cô luôn an yên và hạnh phúc!',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80',
    stickers: [
      { id: 's6', type: 'certificate', x: 75, y: 75, label: 'Top 1 Tận Tâm' }
    ],
    likes: 29,
    status: 'approved',
    createdAt: '2026-11-03T09:20:00Z',
    isPinned: false
  }
];

export const DISCUSSION_TOPICS = [
  {
    id: 'topic-1',
    title: '⚓️ "Chiếc phao cứu sinh" – Kỷ niệm qua môn thần kỳ nhờ Thầy/Cô?',
    description: 'Có bao giờ bạn đứng trước nguy cơ "học lại" nhưng chính sự kiên nhẫn, chỉ bảo tận tình của Thầy Cô đã giúp bạn lội ngược dòng ngoạn mục?',
    repliesCount: 14,
    comments: [
      {
        id: 'c1',
        author: 'Trần Văn Đức',
        badge: 'K65 - CNTT',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        content: 'Năm 2 em suýt tạch môn Kiến trúc máy tính. Đêm trước hôm bảo vệ đồ án, Thầy Hùng vẫn ngồi lại phòng lab đến 10h tối để hướng dẫn nhóm debug chip. Lúc nhận điểm B+ cả nhóm ôm nhau khóc luôn!',
        images: ['https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80'],
        likes: 19,
        createdAt: 'Hôm qua lúc 19:30',
        status: 'approved'
      },
      {
        id: 'c2',
        author: 'Hoàng Yến Nhi',
        badge: 'K66 - Ngoại thương',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        content: 'Cô Mai Lan từng bảo em: "Em không kém, chỉ là em chưa tìm đúng phương pháp thôi". Một câu nói ấy làm em vực dậy toàn bộ học kỳ đó.',
        images: [],
        likes: 12,
        createdAt: '3 giờ trước',
        status: 'approved'
      }
    ]
  },
  {
    id: 'topic-2',
    title: '🧭 "Kim chỉ nam" – Câu nói bất hủ của Giảng viên làm bạn nhớ mãi?',
    description: 'Những lời răn dạy thâm thúy, hài hước nhưng đầy triết lý trên giảng đường đại học mà bạn mang theo suốt hành trang lập nghiệp.',
    repliesCount: 28,
    comments: [
      {
        id: 'c3',
        author: 'Nguyễn Thành Đạt',
        badge: 'Cựu SV K63',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
        content: '"Lập trình viên giỏi không phải người viết nhiều code nhất, mà là người biết khi nào không nên viết thêm dòng nào". Đi làm 4 năm mới thấy Thầy nói quá chí lý!',
        images: [],
        likes: 31,
        createdAt: 'Hôm nay lúc 07:15',
        status: 'approved'
      },
      {
        id: 'c4',
        author: 'Lê Quỳnh Anh',
        badge: 'K67 - Thiết kế Đồ họa',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        content: 'Thầy Dũng bộ môn Typography: "Thiết kế cẩu thả là một tội ác với đôi mắt người nhìn". Từ đó mỗi lần căn lề em đều nín thở check từng pixel haha!',
        images: [],
        likes: 24,
        createdAt: '1 giờ trước',
        status: 'approved'
      }
    ]
  },
  {
    id: 'topic-3',
    title: '📸 "Góc ảnh Thuyền Trưởng" – Khoe khoảnh khắc đáng yêu cùng Thầy Cô!',
    description: 'Nơi chia sẻ những bức ảnh selfie rạng rỡ sau buổi bảo vệ, ảnh chụp lén Thầy say sưa giảng bài hay những khoảnh khắc đời thường giản dị.',
    repliesCount: 19,
    comments: [
      {
        id: 'c5',
        author: 'Bùi Gia Huy',
        badge: 'K65 - Khoa Xây Dựng',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        content: 'Bức ảnh chụp cùng Thầy cố vấn học tập ngày bế giảng. Thầy nhìn nghiêm nghị trên lớp thế thôi chứ đi liên hoan cùng sinh viên là hát karaoke nhiệt tình nhất khoa!',
        images: [
          'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80',
          'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80'
        ],
        likes: 45,
        createdAt: '2 giờ trước',
        status: 'approved'
      }
    ]
  },
  {
    id: 'topic-4',
    title: '💌 "Hải trình giấu kín" – Lời tri ân chưa từng dám nói trước mặt Giảng viên',
    description: 'Có những lời cảm ơn ngượng ngùng chưa thể cất tiếng khi còn ngồi trên ghế nhà trường. Hôm nay hãy gửi trọn vào đây nhé!',
    repliesCount: 22,
    comments: [
      {
        id: 'c6',
        author: 'Một thủy thủ K64 giấu tên',
        badge: 'Cựu sinh viên',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        content: 'Kính gửi Cô trưởng bộ môn, năm đó em hoàn cảnh khó khăn định bảo lưu nghỉ học. Cô đã âm thầm trích tiền học bổng cá nhân hỗ trợ em đóng học phí. Đến nay em đã trở thành kỹ sư trưởng, em mãi không quên ơn Cô!',
        images: [],
        likes: 78,
        createdAt: 'Hôm qua lúc 21:00',
        status: 'approved'
      }
    ]
  }
];

export const SENSITIVE_WORDS = [
  'lừa đảo', 'scam', 'chửi thề', 'xúc phạm', 'bậy bạ', 'đồi trụy', 'phản cảm', 'spam', 'quảng cáo'
];

export const PROMPT_WISH_SUGGESTIONS = [
  {
    category: 'Trang trọng & Sâu sắc',
    text: 'Nhân ngày Nhà giáo Việt Nam 20/11, em xin kính chúc Thầy/Cô dồi dào sức khỏe, tràn đầy nhiệt huyết để tiếp tục là ngọn hải đăng soi sáng con đường tri thức cho bao thế hệ sinh viên!'
  },
  {
    category: 'Hài hước & Gần gũi',
    text: 'Chúc Vị Thuyền Trưởng siêu cấp của chúng em một mùa 20/11 bão like, KPI đồ án luôn 100%, và bớt "gọi tên ngẫu nhiên" đầu giờ giúp tụi em với ạ!'
  },
  {
    category: 'Cựu sinh viên hoài niệm',
    text: 'Dù đã rời xa mái trường thân yêu, hải trình của em hôm nay vẫn luôn mang theo những bài học quý giá của Thầy/Cô. Kính chúc Thầy/Cô mãi an yên và tự hào về đàn chim đã tung cánh!'
  }
];

export const CARD_TEMPLATES = [
  {
    id: 'royal-captain',
    name: 'Hải Trình Hoàng Kim',
    tagline: 'Sang trọng • Quyền uy',
    bgClass: 'bg-gradient-to-br from-[#0b192c] via-[#102a45] to-[#1e3e62] border-amber-400/40 text-amber-50',
    accentColor: '#f59e0b',
    borderStyle: 'border-2 border-amber-400/50 shadow-[0_0_30px_rgba(245,158,11,0.15)]',
    badge: '⚓️ Captain Special'
  },
  {
    id: 'vintage-parchment',
    name: 'Sổ Nhật Ký Viễn Dương',
    tagline: 'Cổ điển • Ấm áp',
    bgClass: 'bg-gradient-to-br from-[#fbf8f0] via-[#f7f2e4] to-[#ede3cf] text-stone-900 border-amber-900/30',
    accentColor: '#78350f',
    borderStyle: 'border-2 border-stone-400/60 shadow-[0_10px_25px_rgba(120,53,15,0.1)]',
    badge: '📜 Vintage Seal'
  },
  {
    id: 'navy-chalkboard',
    name: 'Bảng Đen Giảng Đường',
    tagline: 'Mộc mạc • Hoài niệm',
    bgClass: 'bg-gradient-to-br from-[#0c1821] via-[#1b2a32] to-[#263c47] text-emerald-50 border-emerald-500/30',
    accentColor: '#10b981',
    borderStyle: 'border-2 border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.12)]',
    badge: '🧑‍🏫 Giảng Đường'
  },
  {
    id: 'lighthouse-minimal',
    name: 'Ngọn Hải Đăng Rạng Rỡ',
    tagline: 'Hiện đại • Thanh lịch',
    bgClass: 'bg-gradient-to-br from-[#081b33] via-[#0d284d] to-[#143d73] text-sky-100 border-sky-400/40',
    accentColor: '#38bdf8',
    borderStyle: 'border-2 border-sky-400/40 shadow-[0_0_30px_rgba(56,189,248,0.15)]',
    badge: '🏮 Ngọn Hải Đăng'
  }
];

export const AVAILABLE_STICKERS = [
  { id: 'anchor', label: '⚓️ Thuyền Trưởng', icon: '⚓️' },
  { id: 'compass', label: '🧭 Kim Chỉ Nam', icon: '🧭' },
  { id: 'star', label: '⭐️ Idol Giảng Đường', icon: '⭐️' },
  { id: 'lifebuoy', label: '🛟 Phao Cứu Sinh', icon: '🛟' },
  { id: 'certificate', label: '📜 Điểm 10 Tuyệt Đối', icon: '📜' },
  { id: 'rose', label: '🌹 Hoa Tri Ân', icon: '🌹' },
  { id: 'coffee', label: '☕️ Trực Đêm Fix Bug', icon: '☕️' },
  { id: 'ship', label: '🚢 Vượt Sóng Gió', icon: '🚢' }
];

export const PROPOSAL_DATA = {
  pricing: {
    basePackage: '18.000.000 VNĐ',
    baseIncludes: [
      'Frontend Landing Page Responsive chuẩn Key Visual Captain Teacher (Desktop & Mobile)',
      'Hệ thống viết thiệp chọn mẫu, kèm ảnh, upload lời chúc lên Wall thời gian thực',
      '3-5 Topic thảo luận chuyên đề (Text + Upload 1-3 ảnh/bình luận)',
      'Trang Admin quản trị (Duyệt/ẩn bài, chống spam, bộ lọc từ nhạy cảm)',
      'Miễn phí 100% chi phí Hosting & CDN Cloudflare chịu tải 200k lượt truy cập',
      'Bàn giao 100% source code, tài liệu hướng dẫn và video training admin',
      'Bảo hành & trực kỹ thuật 24/7 xuyên suốt sự kiện (đến hết 22/11)'
    ],
    optionalPackage: '4.500.000 VNĐ',
    optionalName: 'Mô-đun Sticker Kéo Thả Tương Tác & Xuất Thiệp Ảnh HD (HTML5 Canvas/Interact)',
    optionalIncludes: [
      'Kéo thả, xoay và điều chỉnh kích thước Sticker trực quan trên mặt thiệp',
      'Tự động render và cho phép sinh viên tải ảnh thiệp chất lượng cao chia sẻ Facebook/Instagram'
    ],
    totalCombo: '21.500.000 VNĐ (Ưu đãi trọn gói cả 2 phần)'
  },
  infrastructure: {
    trafficCapacity: '200.000 - 500.000 lượt truy cập',
    stack: 'React 19 / Next.js Static Export + Cloudflare Pages Edge CDN + Supabase / Cloudflare D1 (Serverless Database) + Cloudinary Image CDN',
    burstProtection: 'Cloudflare Caching 99% static assets, Edge Rate-limiting 30 req/min chống DDOS, Redis/KV queue cho lượt gửi thiệp cao điểm',
    hostingCost: '0 VNĐ phát sinh thêm cho khách hàng (Đã bao gồm trọn gói trong báo giá)'
  },
  timeline: {
    demoDate: '04/11 (Sớm hơn deadline yêu cầu 05/11)',
    finalDelivery: '09/11 (Sớm hơn deadline yêu cầu 10/11)',
    warranty: 'Đồng hành hỗ trợ đến hết ngày 22/11'
  },
  portfolio: [
    {
      name: 'Chiến dịch Tri Ân Mùa Tốt Nghiệp "Dấu Chân Tri Thức"',
      traffic: '120.000 visits',
      features: 'Gửi lời nhắn lưu bút, upload ảnh kỷ yếu nhóm, duyệt bài kiểm duyệt tự động.'
    },
    {
      name: 'Landing Page Sự Kiện Hackathon Sinh Viên Toàn Quốc',
      traffic: '250.000 visits',
      features: 'Hệ thống bình chọn ảnh thời gian thực, chống spam IP và bot voting.'
    },
    {
      name: 'Trang Kỷ Niệm 30 Năm Thành Lập Trường Đại Học',
      traffic: '180.000 visits',
      features: 'Bản đồ số kỷ niệm, gửi lời chúc tương tác, thư viện ảnh đa phương tiện.'
    }
  ],
  teamInfo: 'Đội ngũ 2 kỹ sư chuyên nghiệp (1 Senior Frontend Lead + 1 DevOps/Backend), tập trung 100% thời gian cho dự án này, không bị trùng lịch.',
  paymentSchedule: [
    'Đợt 1: Cọc 30% khi ký hợp đồng và thống nhất Key Visual',
    'Đợt 2: 40% sau khi nghiệm thu bản Demo (04/11 - 05/11)',
    'Đợt 3: 30% còn lại sau khi bàn giao 100% source code và kết thúc sự kiện 22/11'
  ]
};
