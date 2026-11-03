import React from 'react';
import { Anchor, Heart, Award, Sparkles } from 'lucide-react';

export default function FooterSection() {
  return (
    <footer className="relative bg-[#050a13] text-slate-400 border-t border-slate-800 pt-20 pb-12 overflow-hidden">
      
      {/* Decorative ambient lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-28 bg-amber-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heartfelt 20/11 Message Box */}
        <div className="text-center max-w-4xl mx-auto mb-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#0b1626] to-[#070e1a] border border-amber-500/20 shadow-2xl relative">
          
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 mb-6 border border-amber-500/30 text-2xl shadow-inner">
            ⚓️
          </div>

          <h3 className="font-serif-display font-extrabold text-2xl sm:text-4xl text-white mb-4 leading-tight">
            Kính Chúc Quý Thầy Cô <br />
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              Ngày Nhà Giáo Việt Nam 20/11 Ngập Tràn Hạnh Phúc
            </span>
          </h3>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl mx-auto">
            "Có một nghề bụi phấn bám đầy tay, người ta bảo là nghề trong sạch nhất. Có một nghề không trồng cây vào đất, nhưng lại nở cho đời những đóa hoa thơm."
          </p>

          <p className="text-xs sm:text-sm text-slate-400 max-w-3xl mx-auto leading-relaxed border-t border-slate-800 pt-6">
            Ban Tổ Chức xin trân trọng gửi lời cảm ơn sâu sắc nhất đến toàn thể Quý Thầy, Quý Cô - những Vị Thuyền Trưởng tài ba, tận tụy luôn cống hiến hết mình vì sự nghiệp ươm mầm tri thức cho tương lai đất nước.
          </p>

        </div>

        {/* Brand & Footer Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-slate-800/80 pt-8 text-xs">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
              ⚓️
            </div>
            <div>
              <span className="font-serif-display font-bold text-white tracking-wider block">
                CAPTAIN TEACHER 20/11
              </span>
              <span className="text-[11px] text-slate-500">
                Chiến dịch tri ân sinh viên & giảng viên
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
            <a href="#keyvisual" className="hover:text-amber-400 transition-colors">Ý Nghĩa KV</a>
            <a href="#creator" className="hover:text-amber-400 transition-colors">Viết Thiệp</a>
            <a href="#wishes" className="hover:text-amber-400 transition-colors">Tường Lời Chúc</a>
            <a href="#discussions" className="hover:text-amber-400 transition-colors">Chủ Đề Thảo Luận</a>
          </div>

          <div className="text-slate-500 text-center md:text-right">
            <span>© 2026 Captain Teacher Campaign. Được xây dựng với</span>{' '}
            <Heart className="w-3.5 h-3.5 inline text-rose-500 fill-current" />{' '}
            <span>dành tặng Thầy Cô.</span>
          </div>

        </div>

      </div>
    </footer>
  );
}
