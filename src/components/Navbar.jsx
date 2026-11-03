import React, { useState, useEffect } from 'react';
import { Menu, X, Shield } from 'lucide-react';

export default function Navbar({ version, currentPage, onSelectPage, onNavigateSection, activeSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const theme = version?.theme || {};

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (onNavigateSection) {
      onNavigateSection(sectionId);
    }
  };

  return (
    <header className={`sticky top-[49px] left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? `${theme.navBg || 'bg-[#F5F0E7]/95'} backdrop-blur-md py-2.5 shadow-md` 
        : 'bg-transparent py-3.5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Masthead Logo / Brand */}
          <button 
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2.5 group cursor-pointer text-left shrink-0"
          >
            <div className="w-8 h-8 rounded-full border border-current flex items-center justify-center text-base transition-transform duration-300 group-hover:rotate-12 shrink-0">
              {theme.emblem || '⚓️'}
            </div>
            <div>
              <span className={`${theme.fontHeading || 'font-editorial'} text-sm sm:text-base font-bold tracking-tight block leading-none`}>
                {version?.shortName || "The Captain's Journal"}
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] opacity-70 block mt-0.5 font-medium">
                {version?.badge || "Hải Trình Tri Ân • 20/11"}
              </span>
            </div>
          </button>

          {/* Desktop Primary Navigation Tabs */}
          <div className="hidden xl:flex items-center gap-1 p-1 rounded-full bg-black/5 border border-current/20 text-xs">
            <button
              onClick={() => handleNavClick('hero')}
              className={`px-3 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
                currentPage !== 'admin' && (activeSection === 'hero' || !activeSection)
                  ? `${theme.btnPrimary || 'bg-black text-white'} shadow-sm`
                  : 'opacity-70 hover:opacity-100 hover:bg-black/5'
              }`}
            >
              📜 Trang Chủ
            </button>

            <button
              onClick={() => handleNavClick('studio')}
              className={`px-3 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
                activeSection === 'studio'
                  ? `${theme.btnPrimary || 'bg-black text-white'} shadow-sm`
                  : 'opacity-70 hover:opacity-100 hover:bg-black/5'
              }`}
            >
              💌 Viết Thiệp
            </button>

            <button
              onClick={() => handleNavClick('archive')}
              className={`px-3 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
                activeSection === 'archive'
                  ? `${theme.btnPrimary || 'bg-black text-white'} shadow-sm`
                  : 'opacity-70 hover:opacity-100 hover:bg-black/5'
              }`}
            >
              💬 Lời Chúc
            </button>

            <button
              onClick={() => handleNavClick('museum')}
              className={`px-3 py-1.5 rounded-full font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                activeSection === 'museum'
                  ? `${theme.btnPrimary || 'bg-black text-white'} shadow-sm`
                  : 'opacity-70 hover:opacity-100 hover:bg-black/5'
              }`}
            >
              <span>🏛️ Bảo Tàng Kỷ Vật</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-rose-500/20 text-rose-700 font-bold">Mới</span>
            </button>

            <button
              onClick={() => handleNavClick('quiz')}
              className={`px-3 py-1.5 rounded-full font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                activeSection === 'quiz'
                  ? `${theme.btnPrimary || 'bg-black text-white'} shadow-sm`
                  : 'opacity-70 hover:opacity-100 hover:bg-black/5'
              }`}
            >
              <span>🧭 La Bàn Mentor</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-700 font-bold">Hot</span>
            </button>

            <button
              onClick={() => handleNavClick('gallery3d')}
              className={`px-3 py-1.5 rounded-full font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                activeSection === 'gallery3d'
                  ? 'bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'opacity-70 hover:opacity-100 hover:bg-black/5'
              }`}
            >
              <span>✨ 3D Động Ảnh</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-gradient-to-r from-pink-500 to-cyan-400 text-white font-extrabold animate-pulse">
                3D MỚI
              </span>
            </button>
          </div>

          {/* Right Action: Admin Button or Back to Tribute */}
          <div className="hidden sm:flex items-center gap-2.5">
            {currentPage === 'admin' ? (
              <button
                onClick={() => onSelectPage('home')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 shadow-sm cursor-pointer border border-current/40 ${theme.btnPrimary || 'bg-[#11263B] text-white'}`}
              >
                <span>← Về Trang Tri Ân</span>
              </button>
            ) : (
              <button
                onClick={() => onSelectPage('admin')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 shadow-sm cursor-pointer border border-current/40 ${theme.btnPrimary || 'bg-[#11263B] text-white'}`}
                title="Mở Trang Quản Trị & Đề Xuất Kỹ Thuật (Mã PIN: 2011)"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin (PIN: 2011)</span>
              </button>
            )}
          </div>

          {/* Mobile hamburger menu triggers */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={() => onSelectPage('admin')}
              className={`flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-current/40 ${
                currentPage === 'admin' ? `${theme.btnPrimary || 'bg-black text-white'}` : 'bg-black/5'
              }`}
            >
              <Shield className="w-3 h-3" />
              <span>Admin</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-3 pt-3 pb-4 border-t border-current/20 space-y-1.5 bg-black/5 rounded-2xl p-4 shadow-lg backdrop-blur-md">
            
            <div className="text-[10px] font-mono uppercase tracking-widest opacity-60 mb-1">
              Chuyển nhanh đến khu vực:
            </div>

            <button
              onClick={() => handleNavClick('hero')}
              className="w-full text-left p-2 rounded-xl text-xs font-semibold flex items-center justify-between bg-black/5 hover:bg-black/10"
            >
              <span>📜 Trang Chủ & Key Visual</span>
              <span className="text-[10px] opacity-75">Đầu trang</span>
            </button>

            <button
              onClick={() => handleNavClick('studio')}
              className="w-full text-left p-2 rounded-xl text-xs font-semibold flex items-center justify-between bg-black/5 hover:bg-black/10"
            >
              <span>💌 Viết Thiệp Tri Ân Thầy Cô</span>
              <span className="text-[10px] opacity-75">Studio</span>
            </button>

            <button
              onClick={() => handleNavClick('archive')}
              className="w-full text-left p-2 rounded-xl text-xs font-semibold flex items-center justify-between bg-black/5 hover:bg-black/10"
            >
              <span>💬 Tường Lời Chúc & Kỷ Ức</span>
              <span className="text-[10px] opacity-75">Wish Wall</span>
            </button>

            <button
              onClick={() => handleNavClick('museum')}
              className="w-full text-left p-2 rounded-xl text-xs font-semibold flex items-center justify-between bg-black/5 hover:bg-black/10"
            >
              <span>🏛️ Bảo Tàng Kỷ Vật Giảng Đường</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-rose-500/20 text-rose-700 font-bold">Mới</span>
            </button>

            <button
              onClick={() => handleNavClick('quiz')}
              className="w-full text-left p-2 rounded-xl text-xs font-semibold flex items-center justify-between bg-black/5 hover:bg-black/10"
            >
              <span>🧭 La Bàn Thuyền Trưởng & Bằng Khen</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-700 font-bold">Hot</span>
            </button>

            <button
              onClick={() => handleNavClick('gallery3d')}
              className="w-full text-left p-2 rounded-xl text-xs font-semibold flex items-center justify-between bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 border border-cyan-400/40 text-cyan-700"
            >
              <span className="flex items-center gap-1.5 font-bold">
                <span>✨ Ký Ức 3D Động Ảnh Sắc Màu</span>
              </span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-cyan-400 text-black font-extrabold">3D MỚI</span>
            </button>

            <button
              onClick={() => { onSelectPage('admin'); setMobileMenuOpen(false); }}
              className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold flex items-center justify-between ${
                currentPage === 'admin' ? `${theme.btnPrimary || 'bg-black text-white'}` : 'bg-black/10'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                <span>Trang Quản Trị Admin</span>
              </span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-700 font-bold">PIN: 2011</span>
            </button>
          </div>
        )}

      </div>
    </header>
  );
}
