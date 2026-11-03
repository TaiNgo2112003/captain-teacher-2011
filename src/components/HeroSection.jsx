import React from 'react';
import { Compass, Sparkles, Award, Users, HeartHandshake, ArrowRight } from 'lucide-react';

export default function HeroSection({ totalWishes }) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      
      {/* Background Decorative Glows & Nautical Grid */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Deep ocean background gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(30,64,120,0.45),rgba(7,13,24,0.95))]" />
        
        {/* Subtle compass rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-amber-500/10 rounded-full animate-pulse-glow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[950px] border border-amber-500/5 rounded-full" />
        
        {/* Ambient warm lights */}
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Campaign Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-semibold mb-8 shadow-inner">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>CHIẾN DỊCH TRI ÂN 20/11 • ĐẠI HỌC VÀ VIỆN ĐÀO TẠO</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span className="text-amber-200/90 font-mono">KEY VISUAL: CAPTAIN TEACHER</span>
        </div>

        {/* Main Heading */}
        <h1 className="font-serif-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.15] max-w-5xl mx-auto mb-6">
          Vị Thuyền Trưởng Dẫn Lối <br />
          <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent underline decoration-amber-400/40 decoration-wavy">
            Hải Trình Tri Thức
          </span>
        </h1>

        {/* Narrative Description */}
        <p className="text-slate-300 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto font-normal leading-relaxed mb-10">
          Mỗi Thầy Cô là một <strong className="text-amber-300 font-semibold">Thuyền Trưởng bản lĩnh</strong> trên con tàu học thuật. 
          Giữa đại dương kiến thức mênh mông và bao cơn sóng gió deadline, chính ngọn hải đăng từ tâm huyết của Thầy Cô đã soi sáng, 
          đưa bao thế hệ sinh viên vượt bão cập bến thành công.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#creator"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-bold text-base shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.99] transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Viết Thiệp Gửi Thầy Cô</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          
          <a
            href="#discussions"
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#0c1a2f] hover:bg-[#112440] text-slate-200 font-semibold text-base border border-slate-700 hover:border-amber-500/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Tham Gia 4 Chủ Đề Thảo Luận</span>
          </a>
        </div>

        {/* Key Visual Stats & Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-slate-800/80">
          
          <div className="p-4 rounded-2xl bg-[#0b1626]/70 border border-slate-800/80">
            <div className="flex items-center justify-center gap-2 text-amber-400 mb-1">
              <Compass className="w-5 h-5" />
              <span className="font-serif-display font-bold text-2xl text-white">100%</span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Bản lĩnh Thuyền Trưởng</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0b1626]/70 border border-slate-800/80">
            <div className="flex items-center justify-center gap-2 text-rose-400 mb-1">
              <HeartHandshake className="w-5 h-5" />
              <span className="font-serif-display font-bold text-2xl text-white">{totalWishes}</span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Thiệp tri ân đã gửi</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0b1626]/70 border border-slate-800/80">
            <div className="flex items-center justify-center gap-2 text-sky-400 mb-1">
              <Users className="w-5 h-5" />
              <span className="font-serif-display font-bold text-2xl text-white">4 Khối</span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Sinh viên & Cựu SV kết nối</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0b1626]/70 border border-slate-800/80">
            <div className="flex items-center justify-center gap-2 text-emerald-400 mb-1">
              <Award className="w-5 h-5" />
              <span className="font-serif-display font-bold text-2xl text-white">20/11</span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Ngày hội ngộ & Vinh danh</p>
          </div>

        </div>

      </div>
    </section>
  );
}
