import React from 'react';

export default function KeyVisualStory({ version }) {
  const theme = version?.theme || {};
  const story = version?.story || {};

  return (
    <section id="story" className={`py-24 sm:py-32 relative overflow-hidden transition-colors duration-300 ${theme.surfaceDarkBg || 'bg-[#11263B]'} ${theme.surfaceDarkText || 'text-[#F5F0E7]'}`}>
      
      {/* Decorative metadata */}
      <div className="absolute inset-0 pointer-events-none opacity-10" aria-hidden="true">
        <div className="absolute top-12 left-10 text-[9px] font-mono tracking-[0.3em] uppercase">
          ARCHIVE REFERENCE // {version?.id?.toUpperCase()}
        </div>
        <div className="absolute right-10 bottom-12 text-[9px] font-mono tracking-[0.3em] uppercase">
          CAPTAIN TEACHER 2026 // KEY VISUAL DIMENSION
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
        
        {/* Editorial Subtitle */}
        <div className="text-xs uppercase tracking-[0.25em] font-semibold mb-6 opacity-80">
          {story.tag || "VỀ Ý NGHĨA KEY VISUAL"}
        </div>

        {/* Asymmetrical Editorial Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Main Story Essay (Col 1-7) */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className={`${theme.fontHeading || 'font-editorial'} text-3xl sm:text-5xl font-bold tracking-tight leading-tight`}>
              {story.title}
            </h2>

            <div className="space-y-5 text-sm sm:text-base leading-relaxed opacity-85 font-light pt-2">
              <p>{story.p1}</p>
              <p>{story.p2}</p>

              <p className="border-l-2 border-current pl-5 italic text-sm sm:text-base my-6 opacity-95">
                {story.quote}
              </p>
            </div>
          </div>

          {/* Right Column: 3 Anchors of Growth (Col 8-12) */}
          <div className="lg:col-span-5 space-y-5 lg:pt-4">
            
            <div className={`p-6 sm:p-7 rounded-2xl border ${theme.borderSubtle || 'border-white/20'} ${theme.surfaceAccentBg || 'bg-black/20'} space-y-2`}>
              <div className="text-[10px] font-mono tracking-widest uppercase opacity-75">
                01 / Định Hướng
              </div>
              <h3 className={`${theme.fontHeading || 'font-editorial'} text-lg font-semibold`}>
                Không áp đặt lối mòn, chỉ gợi mở chân trời
              </h3>
              <p className="text-xs opacity-80 leading-relaxed">
                Người giảng viên thấu hiểu rằng mỗi sinh viên là một con tàu mang sứ mệnh riêng, cần được tự mình khám phá hải trình đích thực.
              </p>
            </div>

            <div className={`p-6 sm:p-7 rounded-2xl border ${theme.borderSubtle || 'border-white/20'} ${theme.surfaceAccentBg || 'bg-black/20'} space-y-2`}>
              <div className="text-[10px] font-mono tracking-widest uppercase opacity-75">
                02 / Trưởng Thành
              </div>
              <h3 className={`${theme.fontHeading || 'font-editorial'} text-lg font-semibold`}>
                Vượt qua những cơn bão đầu đời
              </h3>
              <p className="text-xs opacity-80 leading-relaxed">
                Những đêm dài thức trắng cùng đồ án, những lời sửa sai nghiêm cẩn nhưng bao dung chính là thao trường tôi luyện bản lĩnh thủy thủ.
              </p>
            </div>

            <div className={`p-6 sm:p-7 rounded-2xl border ${theme.borderSubtle || 'border-white/20'} ${theme.surfaceAccentBg || 'bg-black/20'} space-y-2`}>
              <div className="text-[10px] font-mono tracking-widest uppercase opacity-75">
                03 / Tri Ân
              </div>
              <h3 className={`${theme.fontHeading || 'font-editorial'} text-lg font-semibold`}>
                Dấu mốc dừng chân gửi lời cảm ơn
              </h3>
              <p className="text-xs opacity-80 leading-relaxed">
                Dù bạn đang là sinh viên trên giảng đường hay đã là người kỹ sư, doanh nhân ngoài biển lớn, 20/11 luôn là ngày nhớ về người thuyền trưởng cũ.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
