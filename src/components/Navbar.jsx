import React, { useState, useEffect } from 'react';
import { Menu, X, Shield } from 'lucide-react';

export default function Navbar({ onOpenAdmin, totalWishesCount }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#F5F0E7]/95 backdrop-blur-md border-b border-[#D3C6B3]/60 py-3.5 shadow-[0_4px_20px_rgba(17,38,59,0.04)]' 
        : 'bg-transparent py-5 sm:py-7'
    }`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between">
          
          {/* Masthead Title */}
          <a href="#" className="flex items-center gap-3.5 group">
            {/* Minimalist Compass Rose Emblem */}
            <div className="w-9 h-9 rounded-full border border-[#B39765] flex items-center justify-center text-[#B39765] transition-transform duration-300 group-hover:rotate-45">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="1.5" />
                <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" stroke="currentColor" strokeWidth="0.8" fill="none" />
              </svg>
            </div>
            <div>
              <span className="font-editorial text-lg sm:text-xl font-semibold tracking-wide text-[#11263B] block leading-none">
                The Captain’s Journal
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#B39765] block mt-1 font-medium">
                Hải Trình Tri Ân • 20/11
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (Editorial Magazine Style) */}
          <nav className="hidden md:flex items-center gap-8 text-[13px] tracking-wide text-[#1C2A39]/80 font-medium">
            <a 
              href="#story" 
              className="hover:text-[#B39765] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-[#B39765] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Ý Nghĩa
            </a>
            <a 
              href="#studio" 
              className="hover:text-[#B39765] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-[#B39765] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Viết Bưu Thiếp
            </a>
            <a 
              href="#archive" 
              className="hover:text-[#B39765] transition-colors relative py-1 flex items-center gap-1.5 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-[#B39765] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              <span>Tường Lời Chúc</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-[#D3C6B3]/40 text-[#11263B]">
                {totalWishesCount}
              </span>
            </a>
            <a 
              href="#dialogue" 
              className="hover:text-[#B39765] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-[#B39765] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Ký Ức Giảng Đường
            </a>
          </nav>

          {/* Right Action: Editorial CTA & Admin */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#studio"
              className="px-4 py-2 rounded-full border border-[#11263B] text-[#11263B] hover:bg-[#11263B] hover:text-[#F5F0E7] text-xs tracking-wider uppercase font-semibold transition-all duration-200"
            >
              Gửi lời tri ân
            </a>

            <button
              onClick={onOpenAdmin}
              className="p-2 text-[#5C6A79] hover:text-[#11263B] transition-colors cursor-pointer"
              title="Quản trị nội dung"
              aria-label="Quản trị nội dung"
            >
              <Shield className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile hamburger menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenAdmin}
              className="text-xs px-2.5 py-1 text-[#5C6A79] hover:text-[#11263B]"
              aria-label="Admin"
            >
              <Shield className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#11263B]"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 pb-5 border-t border-[#D3C6B3]/60 space-y-3 bg-[#FAF7F2] rounded-2xl p-5 shadow-lg">
            <a 
              href="#story" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#11263B] py-1.5"
            >
              Ý Nghĩa Key Visual
            </a>
            <a 
              href="#studio" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#11263B] py-1.5"
            >
              Viết Bưu Thiếp Tri Ân
            </a>
            <a 
              href="#archive" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#11263B] py-1.5"
            >
              Tường Lời Chúc ({totalWishesCount})
            </a>
            <a 
              href="#dialogue" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#11263B] py-1.5"
            >
              Ký Ức Giảng Đường
            </a>
            <div className="pt-2 border-t border-[#D3C6B3]/40">
              <a
                href="#studio"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full py-2.5 rounded-full bg-[#11263B] text-[#F5F0E7] text-xs uppercase tracking-wider font-semibold"
              >
                Gửi lời tri ân ngay
              </a>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
