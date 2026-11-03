import React, { useState, useEffect } from 'react';
import { Compass, ShieldCheck, Heart, Sparkles, Clock, Menu, X } from 'lucide-react';

export default function Navbar({ onOpenAdmin, totalWishesCount }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Target: 20/11 of current year
    const targetDate = new Date('2026-11-20T00:00:00');
    
    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#070d18]/90 backdrop-blur-md border-b border-amber-500/20 py-3 shadow-2xl' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#091322] rounded-[10px] flex items-center justify-center">
                <span className="text-xl">⚓️</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif-display font-bold text-lg sm:text-xl tracking-wider text-amber-400">
                  CAPTAIN TEACHER
                </span>
                <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded font-semibold">
                  20/11
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block tracking-wide">
                Hải Trình Tri Ân Người Thuyền Trưởng
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a href="#keyvisual" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-amber-400" />
              Ý Nghĩa KV
            </a>
            <a href="#creator" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Viết Thiệp
            </a>
            <a href="#wishes" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-400" />
              Tường Tri Ân
              <span className="ml-1 px-1.5 py-0.5 text-[10px] bg-rose-500/20 text-rose-300 rounded-full font-semibold">
                {totalWishesCount}
              </span>
            </a>
            <a href="#discussions" className="hover:text-amber-400 transition-colors">
              Chủ Đề Thảo Luận
            </a>
          </nav>

          {/* Right Actions: Countdown & Admin Button */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Live countdown pill */}
            <div className="flex items-center gap-2 bg-[#0d1c31]/80 border border-amber-500/30 rounded-full px-3.5 py-1.5 text-xs text-amber-200">
              <Clock className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
              <span>Đến 20/11:</span>
              <span className="font-mono font-bold text-amber-300">
                {timeLeft.days}n {timeLeft.hours}g {timeLeft.minutes}p {timeLeft.seconds}s
              </span>
            </div>

            {/* Admin entry button */}
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 border border-slate-700 hover:border-amber-500/40 transition-all cursor-pointer"
              title="Mở Bảng Điều Khiển Quản Trị & Đề Xuất Báo Giá"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Demo</span>
            </button>
          </div>

          {/* Mobile hamburger menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenAdmin}
              className="text-xs px-2.5 py-1 rounded bg-slate-800 border border-amber-500/40 text-amber-300"
            >
              Admin
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 pt-2 border-t border-slate-800 space-y-3 bg-[#081220] rounded-2xl px-4 shadow-xl">
            <div className="py-2 text-xs text-amber-300/90 flex items-center justify-between border-b border-slate-800">
              <span>Đếm ngược ngày 20/11:</span>
              <span className="font-mono font-bold">{timeLeft.days} ngày {timeLeft.hours}h {timeLeft.minutes}m</span>
            </div>
            <a 
              href="#keyvisual" 
              onClick={() => setMobileMenuOpen(false)} 
              className="block py-2 text-slate-200 hover:text-amber-400 font-medium"
            >
              ⚓️ Ý Nghĩa Key Visual
            </a>
            <a 
              href="#creator" 
              onClick={() => setMobileMenuOpen(false)} 
              className="block py-2 text-slate-200 hover:text-amber-400 font-medium"
            >
              ✍️ Viết Thiệp & Dán Sticker
            </a>
            <a 
              href="#wishes" 
              onClick={() => setMobileMenuOpen(false)} 
              className="block py-2 text-slate-200 hover:text-amber-400 font-medium"
            >
              💌 Tường Tri Ân ({totalWishesCount})
            </a>
            <a 
              href="#discussions" 
              onClick={() => setMobileMenuOpen(false)} 
              className="block py-2 text-slate-200 hover:text-amber-400 font-medium"
            >
              💬 Diễn Đàn Sinh Viên - Giảng Viên
            </a>
          </div>
        )}

      </div>
    </header>
  );
}
