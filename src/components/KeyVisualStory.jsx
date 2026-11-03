import React from 'react';
import { Anchor, Compass, BookOpen, Sparkles, Calendar, Target, Flag } from 'lucide-react';

export default function KeyVisualStory() {
  return (
    <section id="keyvisual" className="py-20 relative bg-[#091424] border-y border-amber-500/10">
      
      {/* Background ambient pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <Anchor className="w-3.5 h-3.5" />
            <span>Ý Nghĩa Key Visual</span>
          </div>
          <h2 className="font-serif-display font-bold text-3xl sm:text-4xl text-white mb-4">
            Tại Sao Lại Là <span className="text-amber-400">"Captain Teacher"</span>?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Hình tượng "Người lái đò" truyền thống nay được làm mới trong diện mạo hiện đại của một <strong className="text-amber-300 font-semibold">Vị Thuyền Trưởng</strong> thời đại số: can trường, thông tuệ và luôn sát cánh cùng các thủy thủ sinh viên vượt qua biển lớn.
          </p>
        </div>

        {/* 3 Pillars of Key Visual */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          
          {/* Pillar 1 */}
          <div className="relative group p-8 rounded-2xl bg-gradient-to-b from-[#0f2038] to-[#0a1626] border border-amber-500/20 hover:border-amber-400/50 transition-all shadow-xl hover:-translate-y-1">
            <div className="w-14 h-14 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center mb-6 text-2xl border border-amber-500/30">
              ⚓️
            </div>
            <h3 className="font-serif-display font-bold text-xl text-white mb-3">
              Mỏ Neo Vững Chãi
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Tượng trưng cho sự kiên định và tấm lòng bao dung của Thầy Cô. Dẫu đại dương học thuật có cuồng nộ hay sóng gió deadline bủa vây, Thầy Cô luôn là điểm tựa tinh thần vững chắc nhất cho sinh viên.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="relative group p-8 rounded-2xl bg-gradient-to-b from-[#0f2038] to-[#0a1626] border border-amber-500/20 hover:border-amber-400/50 transition-all shadow-xl hover:-translate-y-1">
            <div className="w-14 h-14 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center mb-6 text-2xl border border-sky-500/30">
              🧭
            </div>
            <h3 className="font-serif-display font-bold text-xl text-white mb-3">
              Kim Chỉ Nam Tri Thức
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Không đơn thuần dạy lý thuyết, mỗi lời giảng và định hướng nghiên cứu của Giảng viên là chiếc la bàn định hình tư duy logic, nhân cách sống và đạo đức nghề nghiệp trọn đời.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="relative group p-8 rounded-2xl bg-gradient-to-b from-[#0f2038] to-[#0a1626] border border-amber-500/20 hover:border-amber-400/50 transition-all shadow-xl hover:-translate-y-1">
            <div className="w-14 h-14 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center mb-6 text-2xl border border-emerald-500/30">
              🏮
            </div>
            <h3 className="font-serif-display font-bold text-xl text-white mb-3">
              Ngọn Hải Đăng Dẫn Lối
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Ánh sáng từ phòng thí nghiệm hay những giờ giải đáp tận tâm của Thầy Cô là nguồn năng lượng xua tan bóng tối bỡ ngỡ của tân sinh viên, tiếp bước cho khát vọng vươn ra biển lớn.
            </p>
          </div>

        </div>

        {/* Event Timeline & Logistics Box */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0d1d33] via-[#112440] to-[#0d1d33] border border-amber-500/30 p-8 sm:p-10 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            
            <div className="space-y-4 max-w-xl">
              <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold">
                <Flag className="w-4 h-4" />
                <span>THÔNG TIN CHI TIẾT SỰ KIỆN 20/11</span>
              </div>
              <h3 className="font-serif-display font-bold text-2xl sm:text-3xl text-white">
                Hải Trình Tri Ân "Captain Teacher" 2026
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Chuỗi hoạt động tương tác online & offline kết nối hàng chục ngàn sinh viên, cựu sinh viên với quý thầy cô giáo. Hãy gửi gắm những lời tri ân chân thành nhất trước ngày bế mạc sự kiện.
              </p>
            </div>

            {/* Quick Milestones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto">
              
              <div className="flex items-start gap-3 bg-[#081220]/80 p-4 rounded-xl border border-slate-700/60">
                <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-amber-300 uppercase">Thời Gian Diễn Ra</h4>
                  <p className="text-sm font-bold text-white">01/11 - 22/11/2026</p>
                  <p className="text-[11px] text-slate-400">Mở cổng gửi thiệp 24/7</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#081220]/80 p-4 rounded-xl border border-slate-700/60">
                <div className="p-2 rounded-lg bg-sky-500/20 text-sky-400">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-sky-300 uppercase">Đối Tượng Tham Gia</h4>
                  <p className="text-sm font-bold text-white">Sinh viên & Cựu SV</p>
                  <p className="text-[11px] text-slate-400">Tất cả các khoa viện</p>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
