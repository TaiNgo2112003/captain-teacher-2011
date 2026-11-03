// Questions & Archetypes for "La Bàn Thuyền Trưởng - Trắc Nghiệm Phong Cách Mentor & Bằng Vinh Danh"

export const QUIZ_ARCHETYPES = {
  compass: {
    id: 'compass',
    title: 'Thuyền Trưởng Kim Chỉ Nam',
    englishTitle: 'The Visionary Navigator',
    emblem: '🧭',
    tagline: 'Tầm nhìn chiến lược • Gợi mở tư duy phản biện',
    description: 'Người Thầy không trao cho bạn đáp án có sẵn, mà dạy bạn cách đặt câu hỏi đúng. Thầy luôn nhìn thấy trước những vì sao định hướng ngay cả khi biển học mịt mùng sương gió.',
    quote: '“Đừng hỏi tôi con đường nào dễ nhất; hãy hỏi tôi con đường nào đưa bạn vươn xa nhất.”',
    certificateTitle: 'BẰNG VINH DANH THUYỀN TRƯỞNG KIM CHỈ NAM',
    certificateCitation: 'Ghi nhận và tri ân công đức Vị Thuyền Trưởng đã khai phóng nhãn quan, định hình tư duy logic và truyền cảm hứng tự do học thuật cho bao thế hệ học trò.',
    badgeClass: 'border-amber-500 bg-amber-500/10 text-amber-300'
  },
  anchor: {
    id: 'anchor',
    title: 'Thuyền Trưởng Mỏ Neo Kiên Cường',
    englishTitle: 'The Steadfast Anchor',
    emblem: '⚓️',
    tagline: 'Điểm tựa bao dung • Kiên nhẫn vô tận',
    description: 'Người Thầy trầm tĩnh và giàu lòng trắc ẩn. Mỗi khi bạn hoang mang, thất bại trong đồ án hay muốn bỏ cuộc trước áp lực cuộc sống, Thầy luôn là chiếc mỏ neo vững chãi giữ cho con thuyền bạn không bị sóng xô chìm nghỉm.',
    quote: '“Một lần thi lại hay đồ án hỏng không định nghĩa cuộc đời em. Đứng dậy làm lại, Thầy vẫn luôn ở đây.”',
    certificateTitle: 'BẰNG VINH DANH THUYỀN TRƯỞNG MỎ NEO VỮNG CHÃI',
    certificateCitation: 'Tôn vinh tấm lòng bao dung và sự kiên định của Vị Thuyền Trưởng luôn là bến đỗ bình yên, dìu dắt bao thủy thủ vượt qua những cơn bão đầu đời.',
    badgeClass: 'border-sky-500 bg-sky-500/10 text-sky-300'
  },
  storm: {
    id: 'storm',
    title: 'Thuyền Trưởng Vượt Bão Táp',
    englishTitle: 'The Iron Stormbreaker',
    emblem: '🛟',
    tagline: 'Kỷ luật thép • Khắt khe để xuất chúng',
    description: 'Người Thầy khét tiếng nghiêm cẩn trên giảng đường. Deadline dí sát, yêu cầu chuẩn mực khoa học từng milimet. Nhưng chính sự tôi luyện khắc nghiệt đó đã rèn giũa bạn thành những chuyên gia bản lĩnh nhất khi bước ra thương trường.',
    quote: '“Ở phòng lab của tôi không có chữ ‘tạm được’; ngoài đại dương, sai một li là đánh đổi bằng an nguy của cả con tàu.”',
    certificateTitle: 'BẰNG VINH DANH THUYỀN TRƯỞNG VƯỢT BÃO TÁP',
    certificateCitation: 'Kính cẩn tri ân ngọn lửa kỷ luật và sự khắt khe cao quý của Vị Thuyền Trưởng đã tôi luyện nên những thủy thủ ưu tú, can trường nơi đầu sóng ngọn gió.',
    badgeClass: 'border-rose-500 bg-rose-500/10 text-rose-300'
  },
  navigator: {
    id: 'navigator',
    title: 'Thuyền Trưởng Hoa Tiêu Đồng Hành',
    englishTitle: 'The Companion Mentor',
    emblem: '☕️',
    tagline: 'Kề vai sát cánh • Gần gũi và thấu hiểu',
    description: 'Người Thầy không giữ khoảng cách bục giảng. Thầy thức đêm cùng nhóm bạn fix bug, sẵn sàng ngồi uống trà đá vỉa hè để lắng nghe những tâm tư tuổi trẻ, truyền lửa nghề bằng chính sự bình dị và nhiệt huyết.',
    quote: '“Cứ làm đi, vướng đâu cùng nhau gỡ. Uống ngụm cà phê rồi chiến tiếp!”',
    certificateTitle: 'BẰNG VINH DANH THUYỀN TRƯỞNG HOA TIÊU ĐỒNG HÀNH',
    certificateCitation: 'Trân trọng tôn vinh Vị Thuyền Trưởng mộc mạc và chân thành, người luôn kề vai sát cánh cùng học trò trên từng dặm hải trình trưởng thành.',
    badgeClass: 'border-emerald-500 bg-emerald-500/10 text-emerald-300'
  }
};

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'Khi bạn nộp một bài tiểu luận hoặc đồ án còn nhiều sơ hở, phản ứng quen thuộc nhất của Thầy/Cô là:',
    options: [
      {
        text: 'Chỉ ra một câu hỏi cốt lõi làm bạn giật mình nhận ra mình đang tư duy sai hướng từ đầu.',
        archetype: 'compass'
      },
      {
        text: 'Kiên nhẫn ngồi lại giải thích cặn kẽ từng chỗ và động viên: "Không sao, lần đầu làm ai cũng bỡ ngỡ".',
        archetype: 'anchor'
      },
      {
        text: 'Gạch đỏ thẳng tay, yêu cầu làm lại toàn bộ với tiêu chuẩn cao nhất: "Làm cẩu thả thế này thì đừng nộp!".',
        archetype: 'storm'
      },
      {
        text: 'Kéo ghế ngồi cạnh: "Chỗ này khó đúng không? Mở file ra đây, để tôi chỉ cho mẹo này nhanh hơn".',
        archetype: 'navigator'
      }
    ]
  },
  {
    id: 2,
    question: 'Không khí trong phòng học hay phòng lab của Thầy/Cô thường mang lại cảm giác gì?',
    options: [
      {
        text: 'Tranh luận nảy lửa, nhiều ý tưởng mới mẻ được gợi mở, ai cũng muốn đào sâu hơn.',
        archetype: 'compass'
      },
      {
        text: 'Ấm áp, an tâm, như thể có một điểm tựa vững chãi không bao giờ phán xét bạn.',
        archetype: 'anchor'
      },
      {
        text: 'Tập trung cao độ, kỷ luật thép, ai cũng nín thở chạy đua với deadline.',
        archetype: 'storm'
      },
      {
        text: 'Nhiều tiếng cười, tiếng gõ phím rôm rả, thỉnh thoảng còn có bánh ngọt hay ly trà Thầy mang đến.',
        archetype: 'navigator'
      }
    ]
  },
  {
    id: 3,
    question: 'Câu nói nào dưới đây nghe "quen tai" nhất khi bạn nhớ về Thầy/Cô?',
    options: [
      {
        text: '“Đừng học vẹt công thức; hãy hiểu tại sao người ta phát minh ra nó.”',
        archetype: 'compass'
      },
      {
        text: '“Cứ cố gắng hết sức mình, kết quả thế nào Thầy Cô vẫn luôn tự hào về các em.”',
        archetype: 'anchor'
      },
      {
        text: '“Ngoài đời người ta không cho em cơ hội làm lại đâu, phải chuẩn xác từng chút một!”',
        archetype: 'storm'
      },
      {
        text: '“Nghề này thức đêm là bình thường, quan trọng là phải giữ đam mê và sức khỏe nhé!”',
        archetype: 'navigator'
      }
    ]
  },
  {
    id: 4,
    question: 'Khi bạn gặp một khủng hoảng cá nhân (áp lực học tập, mông lung định hướng nghề nghiệp), Thầy/Cô đã:',
    options: [
      {
        text: 'Giúp bạn vẽ lại bức tranh tổng thể 5 năm tới và đặt câu hỏi: "Em thực sự muốn trở thành ai?".',
        archetype: 'compass'
      },
      {
        text: 'Lặng lẽ lắng nghe suốt hàng giờ đồng hồ, cho bạn một lời khuyên ấm lòng và xoa dịu nỗi bất an.',
        archetype: 'anchor'
      },
      {
        text: 'Giao cho bạn một thử thách thực tế khó khăn để bạn tự chứng minh năng lực và vượt qua nỗi sợ.',
        archetype: 'storm'
      },
      {
        text: 'Rủ bạn đi ăn một bữa cơm, chia sẻ những câu chuyện thất bại ngày xưa của chính Thầy khi bằng tuổi bạn.',
        archetype: 'navigator'
      }
    ]
  },
  {
    id: 5,
    question: 'Nếu ví hành trình đại học là một chuyến viễn dương, Thầy/Cô đã đóng vai trò là:',
    options: [
      {
        text: 'Chiếc la bàn quang học chỉ lối đến những bến bờ chưa ai từng khai phá.',
        archetype: 'compass'
      },
      {
        text: 'Mỏ neo vững chắc giữ cho con tàu bạn an toàn giữa cuồng phong bão táp.',
        archetype: 'anchor'
      },
      {
        text: 'Những cơn gió ngược thử thách sức bền của cánh buồm và độ vững của bánh lái.',
        archetype: 'storm'
      },
      {
        text: 'Người hoa tiêu cùng chia sẻ từng ca trực đêm và giữ ấm ngọn lửa nhiệt huyết.',
        archetype: 'navigator'
      }
    ]
  }
];
