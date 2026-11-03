import React from 'react';

export default function KeyVisualStory() {
  return (
    <section id="story" className="py-24 sm:py-32 bg-[#11263B] text-[#F5F0E7] relative overflow-hidden">
      
      {/* Delicate background celestial & nautical coordinates */}
      <div className="absolute inset-0 pointer-events-none opacity-10" aria-hidden="true">
        <div className="absolute top-12 left-10 text-[9px] font-mono tracking-[0.3em] uppercase">
          NAV. RECORD // CHAPTER 01 — THE STEERING HAND
        </div>
        <div className="absolute right-10 bottom-12 text-[9px] font-mono tracking-[0.3em] uppercase">
          LAT 20°11' — COMPASS OF WISDOM
        </div>
        {/* Subtle circular compass geometry */}
        <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-96 h-96 border border-[#B39765] rounded-full opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
        
        {/* Editorial Subtitle */}
        <div className="text-xs uppercase tracking-[0.25em] text-[#B39765] font-semibold mb-6">
          Về Ý Nghĩa Key Visual
        </div>

        {/* Asymmetrical Editorial Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Main Story Essay (Col 1-7) */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#FAF7F2] leading-tight">
              Người trao cho ta chiếc la bàn, <br />
              <span className="font-normal italic text-[#D3C6B3]">
                để ta tự dong buồm ra khơi.
              </span>
            </h2>

            <div className="space-y-5 text-sm sm:text-base text-[#D3C6B3] leading-relaxed font-light pt-2">
              <p>
                Từ xưa, ta quen gọi người thầy là <em className="text-[#FAF7F2] not-italic font-normal">“người lái đò”</em> thầm lặng đưa khách qua sông. Nhưng ở giảng đường đại học hôm nay, mối gắn kết ấy mang một tinh thần mới mẻ và can trường hơn: hình tượng <strong className="text-[#FAF7F2] font-semibold">Vị Thuyền Trưởng (Captain Teacher)</strong>.
              </p>
              
              <p>
                Thầy Cô không chỉ đưa ta qua một khúc sông êm đềm, mà đứng cùng ta trước biển lớn học thuật đầy bão táp. Điều quý giá nhất người Thầy trao không phải là một chiếc thuyền định sẵn đường đi, mà là chiếc la bàn tri thức, lòng tự trọng nghề nghiệp và dũng khí tự cầm lái cuộc đời mình.
              </p>

              <p className="border-l border-[#B39765] pl-5 italic text-[#FAF7F2]/90 text-sm sm:text-base my-6">
                “Thầy Cô ở lại bến cảng, nhìn những cánh buồm sinh viên nối đuôi nhau ra khơi. Ngày 20/11 là khoảnh khắc ta ngoảnh lại, nghiêng mình trước người đã thắp sáng ngọn hải đăng đầu tiên.”
              </p>
            </div>
          </div>

          {/* Right Column: 3 Anchors of Growth (Col 8-12) */}
          <div className="lg:col-span-5 space-y-6 lg:pt-4">
            
            <div className="p-6 sm:p-7 rounded-2xl bg-[#18334E]/60 border border-[#B39765]/30 space-y-3">
              <div className="text-[11px] font-mono tracking-widest text-[#B39765] uppercase">
                01 / Định Hướng
              </div>
              <h3 className="font-editorial text-lg font-semibold text-[#FAF7F2]">
                Không áp đặt lối mòn, chỉ gợi mở chân trời
              </h3>
              <p className="text-xs text-[#D3C6B3] leading-relaxed">
                Người giảng viên thấu hiểu rằng mỗi sinh viên là một con tàu mang sứ mệnh riêng, cần được tôn trọng cá tính để tìm thấy hải trình đích thực.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-[#18334E]/60 border border-[#B39765]/30 space-y-3">
              <div className="text-[11px] font-mono tracking-widest text-[#B39765] uppercase">
                02 / Trưởng Thành
              </div>
              <h3 className="font-editorial text-lg font-semibold text-[#FAF7F2]">
                Vượt qua những cơn bão đầu đời
              </h3>
              <p className="text-xs text-[#D3C6B3] leading-relaxed">
                Những đêm dài thức trắng cùng đồ án, những lời sửa sai nghiêm khắc nhưng đầy bao dung chính là thao trường tôi luyện bản lĩnh thủy thủ.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-[#18334E]/60 border border-[#B39765]/30 space-y-3">
              <div className="text-[11px] font-mono tracking-widest text-[#B39765] uppercase">
                03 / Tri Ân
              </div>
              <h3 className="font-editorial text-lg font-semibold text-[#FAF7F2]">
                Dấu mốc dừng chân gửi lời cảm ơn
              </h3>
              <p className="text-xs text-[#D3C6B3] leading-relaxed">
                Dù bạn đang là sinh viên trên giảng đường hay đã là người kỹ sư, doanh nhân ngoài biển lớn, 20/11 luôn là ngày nhớ về người thuyền trưởng cũ.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
