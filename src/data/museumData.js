// Initial data and mock exhibits for "Bảo Tàng Kỷ Vật Giảng Đường"

export const INITIAL_KEEPSAKES = [
  {
    id: 'keep-1',
    title: 'Cuốn Sổ Tay Giáo Án Viết Tay Bút Mực Cửu Long',
    era: '1990s',
    eraLabel: 'Thập niên 90',
    relatedTeacher: 'GS. Đặng Đình Hưng',
    department: 'Khoa Toán - Cơ - Tin học',
    donor: 'Cựu sinh viên Khóa 1994',
    year: '1996',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
    story: 'Trang giấy pơ-lu-a đã ố vàng theo năm tháng nhưng từng nét chữ mực xanh Cửu Long của Thầy vẫn thẳng tắp như tính cách liêm chính của Thầy. Thầy viết tay từng bài giảng giải tích phức tạp, vẽ từng đồ thị không cần thước kẻ. Mỗi giờ lên lớp là một buổi hòa nhạc của tư duy logic.',
    quote: '“Một chữ viết cẩu thả là một sự thất lễ với tri thức.”',
    likes: 128
  },
  {
    id: 'keep-2',
    title: 'Bản Đồ Án Tốt Nghiệp Gạch Đỏ Chi Chít Lúc 2h Sáng',
    era: '2000s',
    eraLabel: 'Giai đoạn 2000 - 2010',
    relatedTeacher: 'PGS.TS. Lê Bá Thịnh',
    department: 'Khoa Kiến Trúc & Quy Hoạch',
    donor: 'KTS. Hoàng Tuấn Minh (K48)',
    year: '2006',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    story: 'Đêm trước ngày bảo vệ, phương án kết cấu của nhóm em bị lỗi nghiêm trọng. Thầy không mắng mà ngồi lại phòng thực hành tới 3 giờ sáng, dùng bút chì đỏ gạch từng đường chịu lực và ghi chú bên lề: “Sửa lại mảng này, em có tiềm năng hơn thế này nhiều”. Câu nói đó đã cứu cả sự nghiệp của em.',
    quote: '“Kiến trúc sư vẽ sai một nét, người ở gánh hậu quả cả đời.”',
    likes: 215
  },
  {
    id: 'keep-3',
    title: 'Hộp Phấn Gãy & Chiếc Bông Lau Bảng Mòn Vẹt 30 Năm',
    era: '1990s',
    eraLabel: 'Thập niên 90',
    relatedTeacher: 'NGND. Nguyễn Thị Bích Liên',
    department: 'Khoa Ngữ Văn',
    donor: 'Tập thể Cựu Sinh viên Sư Phạm',
    year: '1999',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
    story: 'Chiếc khăn lau bảng bằng vải dạ sờn rách cùng mẩu phấn gãy cụt ngủn được Cô giữ lại trong một hộp thiếc nhỏ. Ngày Cô nghỉ hưu, Cô tặng lại cho lớp và dặn: “Bụi phấn trắng có thể làm bạc mái đầu, nhưng tâm hồn người thầy thì luôn xanh mãi cùng tuổi trẻ các em”.',
    quote: '“Nghề dạy học là nghề gieo hạt giống của niềm tin.”',
    likes: 184
  },
  {
    id: 'keep-4',
    title: 'Chiếc USB 128MB Chứa Mã Nguồn Đồ Án Đầu Tiên',
    era: '2010s',
    eraLabel: 'Thời kỳ 2011 - 2020',
    relatedTeacher: 'ThS. Vũ Hoàng Nam',
    department: 'Viện CNTT & Viễn Thông',
    donor: 'Nguyễn Việt Anh (K55)',
    year: '2012',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80',
    story: 'Chiếc USB Transcend vỏ xanh dung lượng vỏn vẹn 128MB Thầy tặng khi em đạt giải Ba Sinh viên Nghiên cứu Khoa học. Bên trong vẫn còn file mã nguồn C++ Thầy tự tay viết các hàm mẫu và dặn dò: “Code là thơ của dân kỹ thuật, viết sao cho người khác đọc vào thấy sáng rõ”.',
    quote: '“Hãy viết code như thể người bảo trì sau này là một người bạn thân.”',
    likes: 97
  },
  {
    id: 'keep-5',
    title: 'Tấm Áo Mùa Hè Xanh Bạc Màu Có Chữ Ký Của Cô Bí Thư',
    era: '2010s',
    eraLabel: 'Thời kỳ 2011 - 2020',
    relatedTeacher: 'Cô Trần Thùy Dung',
    department: 'Đoàn Thanh Niên - Hội Sinh Viên',
    donor: 'Chiến sĩ Mùa Hè Xanh 2015',
    year: '2015',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
    story: 'Chiếc áo xanh tình nguyện bạc màu vì nắng gió Tây Nguyên. Cô Dung khi ấy là Giảng viên trẻ phụ trách đội hình, cùng ăn cơm nắm, cùng sinh viên lội bùn đào đường dân sinh. Đêm lửa trại bế mạc, Cô ký sau lưng áo từng đứa: “Đi để trưởng thành, về để phụng sự”.',
    quote: '“Người thuyền trưởng giỏi không sợ bão giông, chỉ sợ thủy thủ thiếu lý tưởng.”',
    likes: 142
  },
  {
    id: 'keep-6',
    title: 'Bức Ảnh Chụp Lén Thầy Ngủ Gật Bên Chồng Khóa Luận',
    era: 'recent',
    eraLabel: 'Thời đại số (2021 - nay)',
    relatedTeacher: 'TS. Phan Thanh Tùng',
    department: 'Khoa Kinh Tế Đối Ngoại',
    donor: 'Sinh viên Khóa 63',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    story: 'Khoảnh khắc chụp vội qua khe cửa kính văn phòng khoa lúc 11h30 trưa: Thầy Tùng tựa đầu vào mép bàn chợp mắt 15 phút, bên cạnh là xấp khóa luận tốt nghiệp dày cộm với chiếc kính lão gác trên xấp bài. Một bức ảnh không dàn dựng nhưng chạm vào trái tim của mọi sinh viên trong viện.',
    quote: '“Sự nghiêm khắc nơi bục giảng được đánh đổi bằng những giấc ngủ muộn của Thầy.”',
    likes: 310
  }
];
