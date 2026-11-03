import React, { useState } from 'react';
import { CARD_TEMPLATES } from '../data/initialData';
import { Heart, Search, Eye, Pin, ArrowDown } from 'lucide-react';

export default function WishWall({ cards, onLikeCard, onSelectCard, version }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [visibleCount, setVisibleCount] = useState(6);

  const theme = version?.theme || {};

  const filteredCards = cards.filter((card) => {
    if (card.status !== 'approved') return false;

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      !q || 
      card.toTeacher?.toLowerCase().includes(q) ||
      card.fromStudent?.toLowerCase().includes(q) ||
      card.faculty?.toLowerCase().includes(q) ||
      card.message?.toLowerCase().includes(q);

    if (!matchesSearch) return false;

    if (filterType === 'has-image') return !!card.image;
    if (filterType === 'most-liked') return card.likes >= 15;

    return true;
  }).sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    if (filterType === 'most-liked') return b.likes - a.likes;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const displayedCards = filteredCards.slice(0, visibleCount);

  return (
    <section id="archive" className={`py-24 sm:py-32 transition-colors duration-300 ${theme.pageBg || 'bg-[#F5F0E7]'}`}>
      
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="text-xs uppercase tracking-[0.25em] font-semibold mb-3 opacity-80">
            Hải Trình Tri Ân
          </div>
          <h2 className={`${theme.fontHeading || 'font-editorial'} text-3xl sm:text-5xl font-bold tracking-tight mb-4`}>
            Tường Lời Chúc & Kỷ Vật
          </h2>
          <p className="text-sm sm:text-base opacity-75 leading-relaxed">
            Những lá thư và bưu thiếp gửi về từ khắp các giảng đường, kết nối bao thế hệ thủy thủ với người Thuyền Trưởng năm xưa.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 border-y ${theme.borderSubtle || 'border-current/20'} py-4`}>
          
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 opacity-50 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm theo tên Thầy Cô, Khoa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-full bg-black/5 border border-current/20 text-xs focus:outline-none focus:border-current"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 text-xs">
            <button
              onClick={() => { setFilterType('all'); setVisibleCount(6); }}
              className={`px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
                filterType === 'all'
                  ? `${theme.btnPrimary || 'bg-black text-white'} font-semibold`
                  : 'opacity-70 hover:opacity-100 bg-transparent'
              }`}
            >
              Tất Cả ({cards.filter(c => c.status === 'approved').length})
            </button>

            <button
              onClick={() => { setFilterType('has-image'); setVisibleCount(6); }}
              className={`px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
                filterType === 'has-image'
                  ? `${theme.btnPrimary || 'bg-black text-white'} font-semibold`
                  : 'opacity-70 hover:opacity-100 bg-transparent'
              }`}
            >
              Có Ảnh Kỷ Niệm
            </button>

            <button
              onClick={() => { setFilterType('most-liked'); setVisibleCount(6); }}
              className={`px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
                filterType === 'most-liked'
                  ? `${theme.btnPrimary || 'bg-black text-white'} font-semibold`
                  : 'opacity-70 hover:opacity-100 bg-transparent'
              }`}
            >
              Được Trân Trọng
            </button>
          </div>

        </div>

        {/* Postcard Archive Grid */}
        {displayedCards.length === 0 ? (
          <div className={`text-center py-20 rounded-2xl border border-dashed border-current/30 max-w-xl mx-auto ${theme.surfaceBg || 'bg-white'}`}>
            <div className="text-3xl mb-3">{theme.emblem || '⚓️'}</div>
            <h3 className={`${theme.fontHeading || 'font-editorial'} text-base font-semibold mb-1`}>
              Chưa tìm thấy bưu thiếp phù hợp
            </h3>
            <p className="text-xs opacity-70 mb-5 max-w-sm mx-auto">
              Hãy thử tìm kiếm với từ khóa khác hoặc là người đầu tiên gửi bưu thiếp đến Thầy Cô của bạn!
            </p>
            <a
              href="#studio"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider ${theme.btnPrimary || 'bg-black text-white'}`}
            >
              Viết bưu thiếp ngay
            </a>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {displayedCards.map((card) => {
              const tmpl = CARD_TEMPLATES.find(t => t.id === card.template) || CARD_TEMPLATES[0];

              return (
                <article
                  key={card.id}
                  className={`rounded-2xl p-6 sm:p-7 transition-all duration-200 flex flex-col justify-between hover:shadow-lg ${tmpl.bgClass} ${tmpl.borderStyle}`}
                >
                  
                  <div>
                    <div className="flex items-center justify-between border-b border-current/15 pb-3 mb-4 text-xs">
                      <div className="flex items-center gap-2">
                        {card.isPinned && (
                          <span className="flex items-center gap-1 text-[9px] uppercase tracking-wider font-bold bg-[#B9685C] text-[#FAF7F2] px-2 py-0.5 rounded-full">
                            <Pin className="w-2.5 h-2.5 fill-current" />
                            Ghim Nổi Bật
                          </span>
                        )}
                        <span className="text-[10px] font-mono tracking-widest opacity-60 uppercase">
                          {tmpl.badge}
                        </span>
                      </div>

                      {card.stickers && card.stickers.length > 0 && (
                        <div className="flex items-center -space-x-1 opacity-80">
                          {card.stickers.slice(0, 3).map((stk, i) => (
                            <span 
                              key={i} 
                              className="w-5 h-5 rounded-full bg-current/10 flex items-center justify-center text-[10px]"
                              title={stk.label}
                            >
                              {stk.icon}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <div className="text-[9px] uppercase tracking-wider opacity-60">
                        Kính gửi:
                      </div>
                      <h3 className={`${theme.fontHeading || 'font-editorial'} font-bold text-lg text-current tracking-tight line-clamp-1`}>
                        {card.toTeacher}
                      </h3>
                      <div className="text-xs opacity-75 truncate">
                        {card.faculty}
                      </div>
                    </div>

                    {card.image && (
                      <div 
                        onClick={() => onSelectCard(card)}
                        className="mb-4 rounded-lg overflow-hidden border border-current/20 cursor-pointer group/img max-h-48"
                      >
                        <img
                          src={card.image}
                          alt="Ảnh kỷ vật"
                          className="w-full h-36 object-cover group-hover/img:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    <p className={`${theme.fontHeading || 'font-editorial'} text-sm leading-relaxed italic opacity-95 line-clamp-4 mb-4 whitespace-pre-line`}>
                      “{card.message}”
                    </p>
                  </div>

                  <div className="border-t border-current/15 pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-[9px] uppercase tracking-wider opacity-60">
                          Người gửi:
                        </div>
                        <div className="font-handwriting text-xl text-current font-bold leading-tight">
                          {card.fromStudent}
                        </div>
                        <div className="text-[10px] opacity-75">
                          {card.studentClass}
                        </div>
                      </div>

                      <button
                        onClick={() => onSelectCard(card)}
                        className="p-2 rounded-full border border-current/25 hover:bg-current/10 transition-colors cursor-pointer"
                        title="Xem bưu thiếp đầy đủ"
                        aria-label="Xem bưu thiếp đầy đủ"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-current/10 text-xs">
                      <button
                        type="button"
                        onClick={() => onLikeCard(card.id)}
                        className="flex items-center gap-1.5 text-current hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <Heart className="w-3.5 h-3.5 fill-current/20" />
                        <span className="font-mono text-xs">{card.likes}</span>
                      </button>

                      <span className="text-[10px] opacity-50 font-mono">
                        {new Date(card.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>

                  </div>

                </article>
              );
            })}
          </div>
        )}

        {filteredCards.length > visibleCount && (
          <div className="text-center mt-12">
            <button
              onClick={() => setVisibleCount(prev => prev + 6)}
              className={`px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer inline-flex items-center gap-2 ${theme.btnSecondary || 'border border-current'}`}
            >
              <span>Xem thêm những bức thiệp khác</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
