import React from 'react';
import { Shield } from 'lucide-react';

export default function FooterSection({ onOpenAdmin, version }) {
  const theme = version?.theme || {};
  const hero = version?.hero || {};

  return (
    <footer className={`relative pt-24 pb-16 overflow-hidden transition-colors duration-300 ${theme.surfaceDarkBg || 'bg-[#11263B]'} ${theme.surfaceDarkText || 'text-[#F5F0E7]'}`}>
      
      {/* Delicate Minimalist Maritime Line Motif */}
      <div className="absolute inset-0 pointer-events-none opacity-15" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 1200 400" fill="none">
          <path d="M 0 350 C 300 200, 800 400, 1200 250" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" />
          <circle cx="800" cy="400" r="3" fill="currentColor" />
          <circle cx="1200" cy="250" r="3" fill="currentColor" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 relative text-center">
        
        {/* Emblem Accent */}
        <div className="w-12 h-12 rounded-full border border-current flex items-center justify-center mx-auto mb-8 text-xl opacity-80">
          {theme.emblem || '⚓️'}
        </div>

        {/* Emotionally Weighted Typography Quote */}
        <p className={`${theme.fontHeading || 'font-editorial'} italic text-2xl sm:text-4xl font-normal leading-relaxed max-w-3xl mx-auto mb-8 opacity-95`}>
          {hero.quote || "“Có những người không đi cùng ta đến cuối hành trình, nhưng đã giúp ta tìm thấy phương hướng.”"}
        </p>

        <p className="text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-16 opacity-75 font-light">
          Kính chúc Quý Thầy, Quý Cô luôn giữ trọn ngọn lửa tâm huyết, mãi là bến đỗ bình yên và ngọn hải đăng soi sáng cho bao thế hệ học trò tự tin vượt sóng vươn ra biển lớn.
        </p>

        {/* Colophon & Archival Notice + Admin Access */}
        <div className="border-t border-current/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs opacity-75">
          <div className="flex items-center gap-2">
            <span className={`${theme.fontHeading || 'font-editorial'} font-semibold tracking-wider`}>
              {version?.shortName || "THE CAPTAIN’S JOURNAL"}
            </span>
            <span>•</span>
            <span>Ấn bản Tri Ân 20/11</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] opacity-60 hidden md:inline">
              Dành tặng toàn thể Giảng viên & Sinh viên
            </span>

            {/* Direct Admin Link in Footer */}
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-current/50 hover:bg-white/10 transition-all cursor-pointer text-xs"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Quản Trị Admin (Mã PIN: 2011)</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
