import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function HeroSection({ totalWishes, version }) {
  const theme = version?.theme || {};
  const hero = version?.hero || {};

  return (
    <section className={`relative pt-20 pb-20 md:pt-28 md:pb-32 overflow-hidden transition-colors duration-300 ${theme.pageBg || 'bg-[#F5F0E7]'}`}>
      
      {/* Decorative Line Illustrations customized by active version */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30" aria-hidden="true">
        {version?.id === 'blueprint' ? (
          <svg className="absolute right-0 top-1/4 w-[700px] h-[700px] text-[#38BDF8]/40 stroke-current" fill="none" viewBox="0 0 600 600">
            <circle cx="300" cy="300" r="260" strokeWidth="1.5" strokeDasharray="3 5" />
            <circle cx="300" cy="300" r="180" strokeWidth="1" />
            <rect x="120" y="120" width="360" height="360" strokeWidth="1" strokeDasharray="6 6" />
            <line x1="0" y1="300" x2="600" y2="300" strokeWidth="1" />
            <line x1="300" y1="0" x2="300" y2="600" strokeWidth="1" />
          </svg>
        ) : version?.id === 'heritage' ? (
          <div className="absolute inset-8 border-2 border-[#C5A869]/20 rounded-3xl pointer-events-none" />
        ) : version?.id === 'dawn' ? (
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-tr from-[#D97757]/15 to-[#D4A373]/15 blur-3xl pointer-events-none" />
        ) : version?.id === 'modern' ? (
          <div className="absolute right-10 top-20 text-[180px] font-bold font-syne opacity-5 select-none text-[#0047BB]">
            20/11
          </div>
        ) : (
          <svg className="absolute -right-20 top-1/4 w-[650px] h-[650px] text-[#B39765]/30 stroke-current" fill="none" viewBox="0 0 600 600">
            <circle cx="300" cy="300" r="280" strokeWidth="1" strokeDasharray="4 6" />
            <circle cx="300" cy="300" r="200" strokeWidth="0.8" />
            <line x1="20" y1="300" x2="580" y2="300" strokeWidth="0.6" strokeDasharray="3 5" />
            <line x1="300" y1="20" x2="300" y2="580" strokeWidth="0.6" strokeDasharray="3 5" />
          </svg>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
        
        {/* Folio / Metadata Bar */}
        <div className={`flex items-center justify-between border-b ${theme.borderSubtle || 'border-current/20'} pb-3.5 mb-10 sm:mb-14 text-xs font-mono uppercase tracking-[0.2em]`}>
          <div className="flex items-center gap-3">
            <span className="font-bold">{hero.tag || "CHIẾN DỊCH TRI ÂN 20/11"}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
            <span className="opacity-80">{version?.name}</span>
          </div>

          <div className="hidden sm:block opacity-60">
            {hero.coordinates || "COORDINATES: 20°11'N"}
          </div>
        </div>

        {/* 12-Column Hero Layout */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-end">
          
          {/* Main Title & Guiding Philosophy (Col 1-8) */}
          <div className="lg:col-span-8 space-y-6">
            
            <p className={`italic text-lg sm:text-2xl leading-relaxed max-w-2xl opacity-90 ${theme.fontHeading || 'font-editorial'}`}>
              {hero.quote}
            </p>

            <h1 className={`${theme.fontHeading || 'font-editorial'} text-4xl sm:text-6xl lg:text-[70px] font-bold tracking-tight leading-[1.08]`}>
              {hero.headline}
            </h1>

            <p className="text-base sm:text-lg opacity-85 font-normal leading-relaxed max-w-2xl pt-1">
              {hero.description}
            </p>

            {/* CTAs */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#studio"
                className={`px-8 py-4 rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-3 group ${theme.btnPrimary || 'bg-black text-white'}`}
              >
                <span>{hero.ctaPrimary || "Gửi lời tri ân"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#archive"
                className={`px-7 py-4 rounded-full text-sm font-medium transition-all duration-200 flex items-center justify-center ${theme.btnSecondary || 'border border-current'}`}
              >
                {hero.ctaSecondary || "Khám phá những lời chúc"}
              </a>
            </div>

          </div>

          {/* Keepsake Card (Col 9-12) */}
          <div className="lg:col-span-4">
            <div className={`p-6 sm:p-7 rounded-2xl relative ${theme.cardStyle || 'border bg-white shadow'}`}>
              
              <div className="w-10 h-10 rounded-full border border-current flex items-center justify-center text-lg mb-4">
                {theme.emblem || '⚓️'}
              </div>

              <h2 className={`${theme.fontHeading || 'font-editorial'} text-base font-semibold mb-2`}>
                Sổ Lưu Niệm Sự Kiện 20/11
              </h2>
              <p className="text-xs opacity-75 leading-relaxed mb-6">
                Toàn bộ bưu thiếp và lời tri ân của sinh viên sẽ được bảo lưu vĩnh viễn trong cuốn hải trình tri ân gửi tặng Thầy Cô.
              </p>

              <div className="pt-3 border-t border-current/20 flex items-center justify-between text-xs">
                <span className="opacity-70">Lưu bút đã gửi:</span>
                <span className="font-mono font-bold text-sm">
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
