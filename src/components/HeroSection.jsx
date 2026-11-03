import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function HeroSection({ totalWishes }) {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden bg-[#F5F0E7]">
      
      {/* Delicate Maritime Charting Elements (Vector Line Illustrations) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-35" aria-hidden="true">
        {/* Subtle grid of latitude & longitude */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#B39765_1px,transparent_1px),linear-gradient(to_bottom,#B39765_1px,transparent_1px)] bg-[size:120px_120px] opacity-15" />
        
        {/* Subtle charting arcs */}
        <svg className="absolute -right-20 top-1/4 w-[650px] h-[650px] text-[#B39765]/20 stroke-current" fill="none" viewBox="0 0 600 600">
          <circle cx="300" cy="300" r="280" strokeWidth="1" strokeDasharray="4 6" />
          <circle cx="300" cy="300" r="200" strokeWidth="0.8" />
          <circle cx="300" cy="300" r="120" strokeWidth="0.8" strokeDasharray="2 4" />
          <line x1="20" y1="300" x2="580" y2="300" strokeWidth="0.6" strokeDasharray="3 5" />
          <line x1="300" y1="20" x2="300" y2="580" strokeWidth="0.6" strokeDasharray="3 5" />
        </svg>

        {/* Charting Route Curve */}
        <svg className="absolute left-0 bottom-10 w-full h-48 text-[#B39765]/30 stroke-current" fill="none" viewBox="0 0 1200 200">
          <path d="M 0 120 Q 300 40 600 130 T 1200 70" strokeWidth="1.2" strokeDasharray="6 8" />
          <circle cx="600" cy="130" r="4" fill="#B9685C" />
          <circle cx="1200" cy="70" r="4" fill="#B39765" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
        
        {/* Journal Folio Header */}
        <div className="flex items-center justify-between border-b border-[#D3C6B3]/60 pb-4 mb-12 sm:mb-16">
          <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase font-semibold text-[#B39765]">
            <span>Kỷ Niệm 20/11</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B9685C]" />
            <span>Key Visual: Captain Teacher</span>
          </div>

          <div className="text-xs font-mono text-[#5C6A79] hidden sm:block tracking-wider">
            Coordinates: 20°11'N — 105°50'E
          </div>
        </div>

        {/* Main Editorial Hero Grid (12 Columns) */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-end">
          
          {/* Main Title & Guiding Philosophy (Col 1-8) */}
          <div className="lg:col-span-8 space-y-6">
            
            <p className="font-editorial italic text-lg sm:text-2xl text-[#B9685C] leading-relaxed max-w-2xl">
              “Có những người không đi cùng ta đến cuối hành trình, nhưng đã giúp ta tìm thấy phương hướng.”
            </p>

            <h1 className="font-editorial text-4xl sm:text-6xl lg:text-[72px] text-[#11263B] font-bold tracking-tight leading-[1.08]">
              Người Thuyền Trưởng <br />
              <span className="italic font-normal text-[#18334E]">
                định hướng hải trình tri thức.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#1C2A39]/80 font-normal leading-relaxed max-w-2xl pt-2">
              Giữa đại dương tri thức vô tận và những bước ngoặt của tuổi trẻ, sự tận tâm của Thầy Cô là chiếc la bàn kiên định giúp sinh viên tự tin tìm thấy chân trời của chính mình.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#studio"
                className="px-8 py-4 rounded-full bg-[#11263B] hover:bg-[#18334E] text-[#F5F0E7] text-sm font-semibold tracking-wider uppercase transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-3 group"
              >
                <span>Gửi lời tri ân</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#archive"
                className="px-7 py-4 rounded-full border border-[#D3C6B3] hover:border-[#11263B] bg-[#FAF7F2] text-[#11263B] text-sm font-medium transition-all duration-200 flex items-center justify-center"
              >
                Khám phá những lời chúc
              </a>
            </div>

          </div>

          {/* Side Editorial Plate / Keepsake Notice (Col 9-12) */}
          <div className="lg:col-span-4">
            <div className="p-6 sm:p-8 bg-[#FAF7F2] border border-[#D3C6B3] rounded-2xl shadow-[0_4px_24px_rgba(17,38,59,0.04)] relative">
              
              {/* Wax seal accent */}
              <div className="w-10 h-10 rounded-full bg-[#B9685C] text-[#FAF7F2] flex items-center justify-center text-sm font-editorial font-bold shadow-sm mb-4">
                20/11
              </div>

              <h2 className="font-editorial text-base font-semibold text-[#11263B] mb-2">
                Không Gian Lưu Niệm Mở
              </h2>
              <p className="text-xs text-[#5C6A79] leading-relaxed mb-6">
                Mỗi tấm bưu thiếp và dòng ký ức gửi về sẽ được lưu giữ trang trọng trong cuốn hải trình tri ân dành tặng Quý Thầy Cô.
              </p>

              <div className="pt-4 border-t border-[#D3C6B3]/60 flex items-center justify-between text-xs">
                <span className="text-[#5C6A79]">Lưu bút đã ghi:</span>
                <span className="font-mono font-bold text-[#11263B] text-sm">
                  {totalWishes} Bức thiệp
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
