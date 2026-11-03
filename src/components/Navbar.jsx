import React, { useState, useEffect } from 'react';
import { Menu, X, Shield } from 'lucide-react';

export default function Navbar({ onOpenAdmin, version, currentPage, onSelectPage }) {
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

  return (
    <header className={`sticky top-[49px] left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? `${theme.navBg || 'bg-[#F5F0E7]/95'} backdrop-blur-md py-3 shadow-md` 
        : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between">
          
          {/* Masthead Logo / Brand */}
          <button 
            onClick={() => onSelectPage('home')}
            className="flex items-center gap-3 group cursor-pointer text-left"
          >
            <div className="w-9 h-9 rounded-full border border-current flex items-center justify-center text-lg transition-transform duration-300 group-hover:rotate-12 shrink-0">
              {theme.emblem || '⚓️'}
            </div>
            <div>
              <span className={`${theme.fontHeading || 'font-editorial'} text-base sm:text-lg font-bold tracking-tight block leading-none`}>
                {version?.shortName || "The Captain's Journal"}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] opacity-70 block mt-1 font-medium">
                {version?.badge || "Hải Trình Tri Ân • 20/11"}
              </span>
            </div>
          </button>

          {/* Desktop Primary Page Tabs (Trang Chủ, Bảo Tàng Kỷ Vật, La Bàn Mentor) */}
          <div className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-black/5 border border-current/20 text-xs">
            <button
              onClick={() => onSelectPage('home')}
              className={`px-3.5 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
                currentPage === 'home'
                  ? `${theme.btnPrimary || 'bg-black text-white'} shadow-sm`
                  : 'opacity-70 hover:opacity-100 hover:bg-black/5'
              }`}
            >
              📜 Trang Chủ
            </button>

            <button
              onClick={() => onSelectPage('museum')}
              className={`px-3.5 py-1.5 rounded-full font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentPage === 'museum'
                  ? `${theme.btnPrimary || 'bg-black text-white'} shadow-sm`
                  : 'opacity-70 hover:opacity-100 hover:bg-black/5'
              }`}
            >
              <span>🏛️ Bảo Tàng Kỷ Vật</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-rose-500/20 text-rose-700 font-bold">Mới</span>
            </button>

            <button
              onClick={() => onSelectPage('quiz')}
              className={`px-3.5 py-1.5 rounded-full font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentPage === 'quiz'
                  ? `${theme.btnPrimary || 'bg-black text-white'} shadow-sm`
                  : 'opacity-70 hover:opacity-100 hover:bg-black/5'
              }`}
            >
              <span>🧭 La Bàn Mentor</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-700 font-bold">Hot</span>
            </button>
          </div>

          {/* Right Action: Admin Button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenAdmin}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-200 shadow-sm cursor-pointer border border-current/40 ${theme.btnPrimary || 'bg-[#11263B] text-white'}`}
              title="Mở Bảng Điều Khiển Quản Trị & Báo Giá (Mã PIN: 2011)"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin (PIN: 2011)</span>
            </button>
          </div>

          {/* Mobile hamburger menu triggers */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1.5 rounded-full border border-current/40 bg-black/5"
            >
              <Shield className="w-3 h-3" />
              <span>Admin</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 pb-4 border-t border-current/20 space-y-2 bg-black/5 rounded-2xl p-4 shadow-lg backdrop-blur-md">
            
            <div className="text-[10px] font-mono uppercase tracking-widest opacity-60 mb-1">
              Chọn Trang Trải Nghiệm:
            </div>

            <button
              onClick={() => { onSelectPage('home'); setMobileMenuOpen(false); }}
              className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold flex items-center justify-between ${
                currentPage === 'home' ? `${theme.btnPrimary || 'bg-black text-white'}` : 'bg-black/5'
              }`}
            >
              <span>📜 Trang Chủ (Nhật Ký Hải Trình)</span>
              <span className="text-[10px] opacity-75">Tribute</span>
            </button>

            <button
              onClick={() => { onSelectPage('museum'); setMobileMenuOpen(false); }}
              className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold flex items-center justify-between ${
                currentPage === 'museum' ? `${theme.btnPrimary || 'bg-black text-white'}` : 'bg-black/5'
              }`}
            >
              <span>🏛️ Bảo Tàng Kỷ Vật Giảng Đường</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-rose-500/20 text-rose-700 font-bold">Mới</span>
            </button>

            <button
              onClick={() => { onSelectPage('quiz'); setMobileMenuOpen(false); }}
              className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold flex items-center justify-between ${
                currentPage === 'quiz' ? `${theme.btnPrimary || 'bg-black text-white'}` : 'bg-black/5'
              }`}
            >
              <span>🧭 La Bàn Thuyền Trưởng & Bằng Khen</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-700 font-bold">Hot</span>
            </button>

            <div className="pt-2 border-t border-current/20">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className={`w-full py-2.5 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 ${theme.btnPrimary || 'bg-black text-white'}`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Bảng Điều Khiển Admin (Mã PIN: 2011)</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
