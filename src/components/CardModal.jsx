import React from 'react';
import { CARD_TEMPLATES } from '../data/initialData';
import { X, Heart, Share2, Download, Copy, Check } from 'lucide-react';

export default function CardModal({ card, onClose, onLike }) {
  const [copied, setCopied] = React.useState(false);

  if (!card) return null;

  const tmpl = CARD_TEMPLATES.find(t => t.id === card.template) || CARD_TEMPLATES[0];

  const handleCopy = () => {
    const text = `💌 Lời chúc 20/11 gửi ${card.toTeacher} (${card.faculty}):\n"${card.message}"\n- Từ: ${card.fromStudent} (${card.studentClass})\n#CaptainTeacher2011`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      
      {/* Background click to dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl z-10 animate-scaleUp">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-slate-900 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center shadow-xl z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Card Display */}
        <div className={`rounded-3xl p-8 sm:p-10 select-none shadow-2xl relative overflow-hidden ${tmpl.bgClass} ${tmpl.borderStyle}`}>
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-current/15 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-black/20 backdrop-blur-sm border border-current/20 flex items-center justify-center text-2xl shadow-inner">
                ⚓️
              </div>
              <div>
                <span className="text-[11px] uppercase font-bold tracking-widest opacity-70 block">
                  Hải Trình Tri Ân 20/11
                </span>
                <span className="text-sm font-serif-display font-bold">
                  CAPTAIN TEACHER 2026
                </span>
              </div>
            </div>

            <span className="text-xs px-3 py-1 rounded-full bg-black/25 backdrop-blur-sm border border-current/20 font-semibold">
              {tmpl.name}
            </span>
          </div>

          {/* Recipient */}
          <div className="mb-6">
            <span className="text-xs uppercase font-bold tracking-wider opacity-70 block">
              Kính gửi Vị Thuyền Trưởng:
            </span>
            <h2 className="font-serif-display font-bold text-2xl sm:text-3xl mt-1 tracking-tight">
              {card.toTeacher}
            </h2>
            <p className="text-sm opacity-80 italic mt-0.5">
              {card.faculty}
            </p>
          </div>

          {/* Photo if present */}
          {card.image && (
            <div className="mb-6 rounded-2xl overflow-hidden border border-current/20 shadow-lg max-h-60 bg-black/10">
              <img
                src={card.image}
                alt="Kỷ niệm"
                className="w-full h-56 object-cover"
              />
            </div>
          )}

          {/* Full Message */}
          <div className="mb-8">
            <p className="text-base sm:text-lg leading-relaxed italic opacity-95 whitespace-pre-line font-normal">
              "{card.message}"
            </p>
          </div>

          {/* Signature & Seal */}
          <div className="border-t border-current/15 pt-5 flex items-end justify-between">
            <div>
              <div className="text-[11px] uppercase opacity-70 font-semibold">
                Thủy thủ kính chúc:
              </div>
              <div className="font-handwriting font-bold text-3xl tracking-wide mt-1">
                {card.fromStudent}
              </div>
              <div className="text-xs opacity-80 mt-0.5">
                {card.studentClass}
              </div>
            </div>

            <div className="w-16 h-16 rounded-full border-2 border-dashed border-current/40 flex flex-col items-center justify-center rotate-6 text-[10px] font-bold text-center uppercase tracking-tighter opacity-80">
              <span>★ 20/11 ★</span>
              <span className="text-[9px] font-mono">SEALED</span>
            </div>
          </div>

          {/* Stickers */}
          {card.stickers && card.stickers.map((stk, idx) => (
            <div
              key={idx}
              style={{ top: `${stk.y}%`, left: `${stk.x}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            >
              <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-xs shadow-xl">
                <span>{stk.icon}</span>
                <span className="text-[10px] text-white font-semibold">{stk.label}</span>
              </div>
            </div>
          ))}

        </div>

        {/* Modal Action Footer */}
        <div className="mt-4 flex items-center justify-between bg-[#0b1626] border border-slate-800 p-3 rounded-2xl">
          <button
            onClick={() => onLike(card.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#081220] hover:bg-rose-500/20 text-rose-300 border border-slate-700 hover:border-rose-500/40 text-xs font-semibold cursor-pointer transition-colors"
          >
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>Thả tim ({card.likes})</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 cursor-pointer transition-colors"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Đã sao chép!' : 'Sao chép nội dung'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
