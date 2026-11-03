import React from 'react';
import { Shield } from 'lucide-react';

export default function FooterSection({ onOpenAdmin }) {
  return (
    <footer className="relative bg-[#11263B] text-[#F5F0E7] pt-24 pb-16 overflow-hidden">
      
      {/* Delicate Minimalist Maritime Line Motif */}
      <div className="absolute inset-0 pointer-events-none opacity-15" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 1200 400" fill="none">
          <path d="M 0 350 C 300 200, 800 400, 1200 250" stroke="#B39765" strokeWidth="1" strokeDasharray="4 6" />
          <circle cx="800" cy="400" r="3" fill="#B39765" />
          <circle cx="1200" cy="250" r="3" fill="#B9685C" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 relative text-center">
        
        {/* Subtle Compass Rose Accent */}
        <div className="w-12 h-12 rounded-full border border-[#B39765]/40 flex items-center justify-center mx-auto mb-8 text-[#B39765]">
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="1.5" />
            <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" stroke="currentColor" strokeWidth="0.8" fill="none" />
          </svg>
        </div>

        {/* Emotionally Weighted Typography Quote */}
        <p className="font-editorial italic text-2xl sm:text-4xl text-[#FAF7F2] font-normal leading-relaxed max-w-3xl mx-auto mb-8">
          “Có những người không đi cùng ta đến cuối hành trình, <br className="hidden sm:inline" />
          nhưng đã giúp ta tìm thấy phương hướng.”
        </p>

        <p className="text-sm sm:text-base text-[#D3C6B3] max-w-2xl mx-auto leading-relaxed mb-16 font-light">
          Kính chúc Quý Thầy, Quý Cô luôn giữ trọn ngọn lửa tâm huyết, mãi là bến đỗ bình yên và ngọn hải đăng soi sáng cho bao thế hệ học trò tự tin vượt sóng vươn ra biển lớn.
        </p>

        {/* Colophon & Archival Notice + Admin Access */}
        <div className="border-t border-[#B39765]/25 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D3C6B3]/75">
          <div className="flex items-center gap-2">
            <span className="font-editorial text-[#FAF7F2] font-semibold tracking-wider">
              THE CAPTAIN’S JOURNAL
            </span>
            <span>•</span>
            <span>Ấn bản Tri Ân 20/11</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-[#D3C6B3]/60 hidden md:inline">
              Dành tặng toàn thể Giảng viên & Sinh viên
            </span>

            {/* Direct Admin Link in Footer */}
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#B39765]/50 text-[#B39765] hover:text-[#FAF7F2] hover:bg-[#B39765]/20 transition-all cursor-pointer text-xs"
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
