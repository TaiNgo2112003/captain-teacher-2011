import React, { useState, useEffect } from 'react';
import { Menu, X, Shield } from 'lucide-react';

export default function Navbar({ onOpenAdmin, totalWishesCount, version }) {
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
        : 'bg-transparent py-4 sm:py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between">
          
          {/* Masthead Title */}
          <a href="#" className="flex items-center gap-3.5 group">
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
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-[13px] tracking-wide opacity-80 font-medium">
            <a href="#story" className="hover:opacity-100 transition-opacity">
              Ý Nghĩa
            </a>
            <a href="#studio" className="hover:opacity-100 transition-opacity">
              Viết Bưu Thiếp
            </a>
            <a href="#archive" className="hover:opacity-100 transition-opacity flex items-center gap-1.5">
              <span>Tường Lời Chúc</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-current/10">
                {totalWishesCount}
              </span>
            </a>
            <a href="#dialogue" className="hover:opacity-100 transition-opacity">
              Ký Ức Giảng Đường
            </a>
          </nav>

          {/* Right Action: Primary CTA & Prominent Admin Button */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#studio"
              className={`px-4 py-2 rounded-full text-xs tracking-wider uppercase font-semibold transition-all duration-200 border border-current hover:bg-current hover:text-black shadow-sm`}
            >
              Gửi lời tri ân
            </a>

            {/* Admin Button */}
            <button
              onClick={onOpenAdmin}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-200 shadow-sm cursor-pointer border border-current/40 ${theme.btnPrimary || 'bg-[#11263B] text-white'}`}
              title="Mở Bảng Điều Khiển Quản Trị & Báo Giá (Mã PIN: 2011)"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin (PIN: 2011)</span>
            </button>
          </div>

          {/* Mobile menu triggers */}
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
          <div className="md:hidden mt-3 pt-3 pb-4 border-t border-current/20 space-y-2.5 bg-black/5 rounded-2xl p-4 shadow-lg backdrop-blur-md">
            <a 
              href="#story" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium py-1"
            >
              Ý Nghĩa Key Visual
            </a>
            <a 
              href="#studio" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium py-1"
            >
              Viết Bưu Thiếp Tri Ân
            </a>
            <a 
              href="#archive" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium py-1"
            >
              Tường Lời Chúc ({totalWishesCount})
            </a>
            <a 
              href="#dialogue" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium py-1"
            >
              Ký Ức Giảng Đường
            </a>
            <div className="pt-2 border-t border-current/20 space-y-2">
              <a
                href="#studio"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full py-2.5 rounded-full border border-current font-semibold text-xs uppercase"
              >
                Gửi lời tri ân ngay
              </a>
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
