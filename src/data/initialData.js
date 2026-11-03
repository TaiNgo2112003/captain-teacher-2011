// Editorial Mock Data for "The Captain's Journal — 20/11"

export const CARD_TEMPLATES = [
  {
    id: 'vintage-postcard',
    name: 'Bưu Thiếp Viễn Dương',
    tagline: 'Giấy bông cổ điển • Khung viền chỉ',
    bgClass: 'bg-[#FAF7F2] text-[#1C2A39] border-[#D3C6B3]',
    accentColor: '#B39765',
    borderStyle: 'border border-[#D3C6B3] shadow-[0_8px_30px_rgba(17,38,59,0.06)]',
    badge: 'Postcard No. 01'
  },
  {
    id: 'royal-logbook',
    name: 'Sổ Hải Trình Thuyền Trưởng',
    tagline: 'Deep Navy • Nét khắc mạ vàng',
    bgClass: 'bg-[#11263B] text-[#F5F0E7] border-[#B39765]/40',
    accentColor: '#B39765',
    borderStyle: 'border border-[#B39765]/40 shadow-[0_12px_40px_rgba(17,38,59,0.2)]',
    badge: 'The Captain’s Log'
  },
  {
    id: 'academic-letterpress',
    name: 'Bản In Khắc Giảng Đường',
    tagline: 'Cotton Cream • Dấu niêm phong đất nung',
    bgClass: 'bg-[#F5F0E7] text-[#1C2A39] border-[#B9685C]/30',
    accentColor: '#B9685C',
    borderStyle: 'border border-[#B9685C]/30 shadow-[0_8px_30px_rgba(185,104,92,0.08)]',
    badge: 'Letterpress Edition'
  },
  {
    id: 'lighthouse-minimal',
    name: 'Ngọn Hải Đăng Tối Giản',
    tagline: 'Thanh lịch • Typography thuần khiết',
    bgClass: 'bg-[#18334E] text-[#FAF7F2] border-[#D3C6B3]/30',
    accentColor: '#D3C6B3',
    borderStyle: 'border border-[#D3C6B3]/30 shadow-[0_10px_35px_rgba(17,38,59,0.15)]',
    badge: 'Lighthouse Series'
  }
];

export const AVAILABLE_STICKERS = [
  { id: 'seal-captain', label: 'Dấu mộc Thuyền Trưởng', icon: '⚓️', type: 'seal' },
  { id: 'stamp-compass', label: 'Tem Kim Chỉ Nam', icon: '🧭', type: 'stamp' },
  { id: 'stamp-lighthouse', label: 'Tem Hải Đăng Soi Sáng', icon: '🏮', type: 'stamp' },
  { id: 'seal-wax-red', label: 'Dấu sáp Niêm Phong', icon: '📜', type: 'seal' },
  { id: 'stamp-quill', label: 'Nét Bút Tri Ân', icon: '✒️', type: 'stamp' },
  { id: 'stamp-postage', label: 'Dấu Bưu Chính 20/11', icon: '✉️', type: 'postmark' }
];

export const DEFAULT_CARDS = [
  {
    id: 'card-1',
    template: 'royal-logbook',
    toTeacher: 'TS. Nguyễn Văn Minh',
    faculty: 'Khoa Công Nghệ Thông Tin',
    fromStudent: 'Lê Hoàng Nam',
    studentClass: 'K65 - Khoa học Máy tính',
    message: 'Kính gửi Thầy, người đã không chỉ dạy chúng em những dòng lệnh chuẩn xác mà còn dạy cách kiên nhẫn trước mọi bài toán khó của cuộc đời. Cảm ơn Thầy vì luôn là ngọn hải đăng vững chãi trong suốt những năm tháng chập chững vào nghề.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=700&q=80',
    stickers: [
      { id: 's1', type: 'seal', icon: '⚓️', x: 82, y: 16, label: 'Dấu mộc Thuyền Trưởng' },
      { id: 's2', type: 'stamp', icon: '🧭', x: 18, y: 80, label: 'Kim Chỉ Nam' }
    ],
    likes: 54,
    status: 'approved',
    createdAt: '2026-11-02T14:30:00Z',
    isPinned: true
  },
  {
    id: 'card-2',
    template: 'vintage-postcard',
    toTeacher: 'ThS. Trần Thị Mai Lan',
    faculty: 'Viện Kinh Tế & Quản Trị',
    fromStudent: 'Nguyễn Thảo My',
    studentClass: 'K66 - Marketing',
    message: 'Gửi Cô kính mến. Có những người không đi cùng ta đến cuối hành trình, nhưng đã giúp ta tìm thấy phương hướng. Những lời động viên mộc mạc của Cô trong buổi hướng dẫn đề tài ngày ấy vẫn theo em trên từng ngã rẽ sự nghiệp.',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=700&q=80',
    stickers: [
      { id: 's3', type: 'seal', icon: '📜', x: 84, y: 82, label: 'Dấu sáp Niêm Phong' }
    ],
    likes: 42,
    status: 'approved',
    createdAt: '2026-11-02T16:45:00Z',
    isPinned: false
  },
  {
    id: 'card-3',
    template: 'academic-letterpress',
    toTeacher: 'PGS.TS. Phạm Quốc Hùng',
    faculty: 'Khoa Điện tử - Viễn thông',
    fromStudent: 'Tập thể Lớp ĐTVT 02',
    studentClass: 'Khóa 2023 - 2027',
    message: 'Thưa Thầy, giảng đường đại học mênh mông nhưng sự tận tâm của Thầy đã biến nơi đây thành mái nhà ấm áp. Chúng em xin kính chúc Thầy luôn dồi dào sức khỏe và mãi giữ trọn ngọn lửa nhiệt huyết với các thế hệ học trò.',
    image: null,
    stickers: [
      { id: 's4', type: 'stamp', icon: '🏮', x: 80, y: 20, label: 'Tem Hải Đăng Soi Sáng' }
    ],
    likes: 68,
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
    message: 'Bốn năm trước em từng rụt rè không dám nói một câu tiếng Anh trọn vẹn. Chính niềm tin vô điều kiện của Cô đã chắp cánh cho em bước ra thế giới. 20/11 này dù ở phương xa, lòng em vẫn luôn hướng về người Thuyền Trưởng thầm lặng.',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=700&q=80',
    stickers: [
      { id: 's5', type: 'stamp', icon: '✒️', x: 78, y: 76, label: 'Nét Bút Tri Ân' }
    ],
    likes: 37,
    status: 'approved',
    createdAt: '2026-11-03T09:20:00Z',
    isPinned: false
  }
];

export const DISCUSSION_TOPICS = [
  {
    id: 'topic-1',
    title: 'Một bài học bạn vẫn mang theo đến hôm nay?',
    description: 'Không nhất thiết là công thức hay định lý học thuật. Đó có thể là một câu nói bâng quơ, một thái độ sống hay cách Thầy Cô đối diện với thử thách.',
    comments: [
      {
        id: 'c1',
        author: 'Trần Văn Đức',
        badge: 'K65 - Khoa học Máy tính',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        content: 'Thầy Hùng từng nói: "Người kỹ sư giỏi không phải là người không bao giờ mắc lỗi, mà là người có đủ dũng khí nhận trách nhiệm và bình tĩnh khắc phục hậu quả." Mỗi khi công việc gặp sự cố lớn, câu nói ấy luôn giữ cho em sự tỉnh táo.',
        images: ['https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=500&q=80'],
        likes: 26,
        createdAt: '02/11/2026',
        status: 'approved'
      },
      {
        id: 'c2',
        author: 'Nguyễn Thành Đạt',
        badge: 'Cựu sinh viên K63',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
        content: 'Bài học lớn nhất của em ở giảng đường là: "Đừng vội phán xét một ý tưởng ngây ngô". Cô Lan luôn lắng nghe những bài thuyết trình sơ sài nhất của sinh viên với sự trân trọng tuyệt đối.',
        images: [],
        likes: 18,
        createdAt: '02/11/2026',
        status: 'approved'
      }
    ]
  },
  {
    id: 'topic-2',
    title: 'Có điều gì bạn chưa kịp nói với thầy cô?',
    description: 'Có những lời cảm ơn ngượng ngùng, hay một lời xin lỗi muộn màng từng bị giấu kín khi còn ngồi trên ghế nhà trường.',
    comments: [
      {
        id: 'c3',
        author: 'Một cựu sinh viên giấu tên',
        badge: 'Khóa 2019 - 2023',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        content: 'Năm cuối, gia đình em xảy ra biến cố lớn. Nếu không có Cô trưởng khoa âm thầm tìm học bổng và bảo lưu hạn nộp học phí, em đã phải bỏ học giữa chừng. Ngày nhận bằng tốt nghiệp em đã khóc rất nhiều nhưng không đủ can đảm đến ôm Cô một lần.',
        images: [],
        likes: 84,
        createdAt: '03/11/2026',
        status: 'approved'
      }
    ]
  },
  {
    id: 'topic-3',
    title: 'Khoảnh khắc nào ở giảng đường khiến bạn nhớ mãi?',
    description: 'Một buổi chiều muộn thảo luận đề tài, ánh nắng rọi qua cửa sổ phòng lab, hay nụ cười hiền từ của Thầy khi cả lớp vượt qua kỳ thi cam go.',
    comments: [
      {
        id: 'c4',
        author: 'Bùi Gia Huy',
        badge: 'K66 - Kỹ thuật Xây dựng',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        content: 'Đêm trước ngày bảo vệ đồ án tốt nghiệp, trời mưa như trút nước. Thầy vẫn đội áo mưa mang vào phòng thực hành cho tụi em mấy ổ bánh mì kẹp và dặn: "Cố lên các chàng trai, ngày mai các em sẽ trở thành kỹ sư thực thụ".',
        images: [
          'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=500&q=80'
        ],
        likes: 49,
        createdAt: '03/11/2026',
        status: 'approved'
      }
    ]
  },
  {
    id: 'topic-4',
    title: 'Ai là người đã giúp bạn tự tin chọn hướng đi của mình?',
    description: 'Thời điểm ta hoang mang nhất trước ngưỡng cửa tương lai, người Thuyền Trưởng nào đã chỉ cho ta thấy bầu trời sao định hướng?',
    comments: [
      {
        id: 'c5',
        author: 'Lê Quỳnh Anh',
        badge: 'K67 - Thiết kế Đồ họa',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        content: 'Khi cả gia đình muốn em thi công chức, chỉ có Cô chủ nhiệm nhận ra đam mê hội họa của em. Cô đã dành suốt 2 tiếng để nói chuyện cùng bố mẹ em. Hôm nay em đã là một Art Director, tất cả bắt đầu từ buổi chiều định mệnh đó.',
        images: [],
        likes: 62,
        createdAt: '03/11/2026',
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
    category: 'Tri ân sâu sắc',
    text: '“Có những người không đi cùng ta đến cuối hành trình, nhưng đã giúp ta tìm thấy phương hướng.” Kính chúc Thầy/Cô luôn an yên và giữ trọn ngọn lửa tâm huyết dẫn đường cho bao thế hệ học trò.'
  },
  {
    category: 'Giản dị & Ấm áp',
    text: 'Cảm ơn Thầy Cô vì sự kiên nhẫn vô hạn trước những lần chúng em vấp ngã. 20/11 kính chúc Thầy Cô thật nhiều sức khỏe, bình an và niềm vui trong từng trang giáo án.'
  },
  {
    category: 'Cựu sinh viên phương xa',
    text: 'Dù đã rời xa giảng đường nhiều năm, bài học và tấm lòng của Thầy Cô vẫn là chiếc la bàn soi sáng mọi bước đi của em. Em xin gửi lời tri ân chân thành nhất từ nơi xa.'
  }
];

export const PROPOSAL_DATA = {
  pricing: {
    basePackage: '18.000.000 VNĐ',
    baseIncludes: [
      'Digital Tribute Landing Page Responsive chuẩn Key Visual Captain Teacher (Desktop & Mobile)',
      'Digital Postcard Studio: chọn mẫu bưu thiếp, đính kèm ảnh, viết lời chúc và lưu trữ thời gian thực',
      'Diễn đàn 4 chủ đề ký ức (Văn bản + Tải lên 1-3 ảnh/bình luận)',
      'Bảng điều khiển kiểm duyệt nội dung (Ẩn/duyệt bài, chống spam, lọc từ nhạy cảm)',
      'Đã bao gồm 100% chi phí Hosting & CDN Cloudflare chịu tải 200.000 lượt truy cập',
      'Bàn giao 100% source code, tài liệu và hướng dẫn sử dụng',
      'Trực kỹ thuật và đồng hành xuyên suốt sự kiện (đến hết 22/11)'
    ],
    optionalPackage: '4.500.000 VNĐ',
    optionalName: 'Mô-đun Dấu Mộc & Tem Bưu Chính Kéo Thả (Interact & Export Postcard)',
    optionalIncludes: [
      'Gắn dấu mộc sáp và tem bưu chính kéo thả linh hoạt trên thiệp',
      'Xuất ảnh thiệp chất lượng cao để sinh viên lưu giữ hoặc chia sẻ'
    ],
    totalCombo: '21.500.000 VNĐ (Ưu đãi trọn gói cả 2 phần)'
  },
  infrastructure: {
    trafficCapacity: '200.000 - 500.000 lượt truy cập',
    stack: 'React 19 / Vite Static + Cloudflare Edge CDN + Edge Caching + Local/Serverless Archive',
    burstProtection: 'Bộ nhớ đệm 99% tài nguyên tĩnh tại 300+ Edge locations, Edge Rate-limiting bảo vệ máy chủ',
    hostingCost: '0 VNĐ phát sinh thêm cho khách hàng (Đã trọn gói trong báo giá)'
  },
  timeline: {
    demoDate: '04/11 (Sớm hơn deadline yêu cầu 05/11)',
    finalDelivery: '09/11 (Sớm hơn deadline yêu cầu 10/11)',
    warranty: 'Đồng hành hỗ trợ đến hết ngày 22/11'
  },
  portfolio: [
    {
      name: 'Chiến dịch Tri Ân "Dấu Chân Tri Thức"',
      traffic: '120.000 visits',
      features: 'Gửi lưu bút tương tác, upload ảnh kỷ yếu nhóm, kiểm duyệt bài tự động.'
    },
    {
      name: 'Landing Page Hackathon Sinh Viên Toàn Quốc',
      traffic: '250.000 visits',
      features: 'Hệ thống bình chọn và tường vinh danh thời gian thực, chống spam IP.'
    },
    {
      name: 'Website Kỷ Niệm 30 Năm Thành Lập Trường',
      traffic: '180.000 visits',
      features: 'Bản đồ số kỷ niệm, gửi lời chúc tương tác, bảo tàng ảnh trực tuyến.'
    }
  ],
  teamInfo: 'Đội ngũ 2 kỹ sư chuyên trách (Senior Frontend Lead + DevOps), tập trung toàn thời gian cho dự án.',
  paymentSchedule: [
    'Đợt 1: Cọc 30% khi ký hợp đồng và thống nhất Key Visual',
    'Đợt 2: 40% sau khi nghiệm thu bản Demo (04/11 - 05/11)',
    'Đợt 3: 30% còn lại sau khi bàn giao 100% source code và kết thúc sự kiện 22/11'
  ]
};
