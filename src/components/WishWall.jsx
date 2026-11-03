import React, { useState } from 'react';
import { CARD_TEMPLATES } from '../data/initialData';
import { Heart, Search, Filter, Share2, Eye, Pin, Sparkles, MessageCircle } from 'lucide-react';

export default function WishWall({ cards, onLikeCard, onSelectCard }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'most-liked', 'has-image'

  // Filter & Search logic
  const filteredCards = cards.filter((card) => {
    // Only approved cards
    if (card.status !== 'approved') return false;

    // Search query matches teacher, student, faculty or message
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      !q || 
      card.toTeacher?.toLowerCase().includes(q) ||
      card.fromStudent?.toLowerCase().includes(q) ||
      card.faculty?.toLowerCase().includes(q) ||
      card.message?.toLowerCase().includes(q);

    if (!matchesSearch) return false;

    if (filterType === 'has-image') return !!card.image;
    if (filterType === 'most-liked') return card.likes >= 20;

    return true;
  }).sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    if (filterType === 'most-liked') return b.likes - a.likes;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <section id="wishes" className="py-24 relative bg-[#091424] border-t border-slate-800">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <Heart className="w-3.5 h-3.5 fill-rose-500/30" />
            <span>Tường Lời Chúc Tri Ân</span>
          </div>
          <h2 className="font-serif-display font-bold text-3xl sm:text-4xl text-white mb-4">
            Bến Đỗ Tình Cảm <span className="text-amber-400">Sinh Viên & Giảng Viên</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Nơi lưu giữ hàng ngàn bức thiệp, lời nhắn nhủ chân thành từ khắp các khoa phòng gửi đến những Vị Thuyền Trưởng thầm lặng.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 bg-[#070e1b] p-4 rounded-2xl border border-slate-800 shadow-xl">
          
          {/* Search box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm theo tên Thầy Cô, Khoa, Sinh viên..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0b1626] border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                filterType === 'all'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-[#0b1626] text-slate-300 hover:text-white border border-slate-700'
              }`}
            >
              Tất Cả ({cards.filter(c => c.status === 'approved').length})
            </button>

            <button
              onClick={() => setFilterType('most-liked')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                filterType === 'most-liked'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-[#0b1626] text-slate-300 hover:text-white border border-slate-700'
              }`}
            >
              ❤️ Yêu Thích Nhất
            </button>

            <button
              onClick={() => setFilterType('has-image')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                filterType === 'has-image'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-[#0b1626] text-slate-300 hover:text-white border border-slate-700'
              }`}
            >
              📸 Kèm Ảnh Kỷ Niệm
            </button>
          </div>

        </div>

        {/* Cards Grid */}
        {filteredCards.length === 0 ? (
          <div className="text-center py-16 bg-[#070e1b] rounded-3xl border border-dashed border-slate-800">
            <div className="text-4xl mb-3">⚓️</div>
            <h3 className="text-lg font-bold text-white mb-1">Chưa tìm thấy thiệp phù hợp</h3>
            <p className="text-xs text-slate-400 mb-4">Hãy thử tìm kiếm với từ khóa khác hoặc viết ngay một tấm thiệp mới!</p>
            <a
              href="#creator"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Viết thiệp đầu tiên</span>
            </a>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCards.map((card) => {
              const tmpl = CARD_TEMPLATES.find(t => t.id === card.template) || CARD_TEMPLATES[0];

              return (
                <div
                  key={card.id}
                  className={`group relative rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 ${tmpl.bgClass} ${tmpl.borderStyle}`}
                >
                  
                  {/* Top Bar: Pinned Badge & Template Tag */}
                  <div>
                    <div className="flex items-center justify-between border-b border-current/15 pb-3 mb-4">
                      <div className="flex items-center gap-2">
                        {card.isPinned && (
                          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full shadow-sm">
                            <Pin className="w-3 h-3 fill-current" />
                            Ghim Nổi Bật
                          </span>
                        )}
                        <span className="text-[11px] font-semibold opacity-75">
                          {tmpl.name}
                        </span>
                      </div>

                      {/* Card Stickers Badges */}
                      {card.stickers && card.stickers.length > 0 && (
                        <div className="flex -space-x-1">
                          {card.stickers.slice(0, 3).map((stk, i) => (
                            <span 
                              key={i} 
                              className="w-6 h-6 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-xs shadow-md"
                              title={stk.label}
                            >
                              {stk.icon}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Teacher Recipient */}
                    <div className="mb-3">
                      <div className="text-[10px] uppercase font-bold tracking-wider opacity-65">
                        Kính gửi:
                      </div>
                      <h3 className="font-serif-display font-bold text-lg sm:text-xl tracking-tight line-clamp-1">
                        {card.toTeacher}
                      </h3>
                      <div className="text-xs opacity-75 truncate">
                        {card.faculty}
                      </div>
                    </div>

                    {/* Attached Photo Thumbnail */}
                    {card.image && (
                      <div 
                        onClick={() => onSelectCard(card)}
                        className="mb-3 rounded-xl overflow-hidden max-h-44 border border-current/20 cursor-pointer group-hover:opacity-95 transition-opacity"
                      >
                        <img
                          src={card.image}
                          alt="Ảnh kỷ niệm"
                          className="w-full h-36 object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    {/* Message Body */}
                    <p className="text-sm leading-relaxed italic opacity-90 line-clamp-4 mb-4 whitespace-pre-line font-normal">
                      "{card.message}"
                    </p>
                  </div>

                  {/* Card Bottom / Signature & Actions */}
                  <div className="border-t border-current/15 pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-[10px] uppercase opacity-70 font-semibold">
                          Người gửi:
                        </div>
                        <div className="font-handwriting font-bold text-xl leading-tight">
                          {card.fromStudent}
                        </div>
                        <div className="text-[10px] opacity-75">
                          {card.studentClass}
                        </div>
                      </div>

                      {/* Detail modal button */}
                      <button
                        onClick={() => onSelectCard(card)}
                        className="p-2 rounded-xl bg-black/25 hover:bg-black/40 border border-current/20 text-current transition-colors cursor-pointer"
                        title="Xem thiệp phóng to"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Likes & Interactions */}
                    <div className="flex items-center justify-between pt-2 border-t border-current/10 text-xs">
                      <button
                        type="button"
                        onClick={() => onLikeCard(card.id)}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/25 hover:bg-rose-500/20 text-current hover:text-rose-400 transition-colors cursor-pointer"
                      >
                        <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                        <span className="font-bold">{card.likes}</span>
                        <span className="text-[10px] opacity-70">yêu thích</span>
                      </button>

                      <span className="text-[10px] opacity-60">
                        {new Date(card.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
