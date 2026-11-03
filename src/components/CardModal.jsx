import React, { useState } from 'react';
import { CARD_TEMPLATES } from '../data/initialData';
import { X, Heart, Copy, Check } from 'lucide-react';

export default function CardModal({ card, onClose, onLike }) {
  const [copied, setCopied] = useState(false);

  if (!card) return null;

  const tmpl = CARD_TEMPLATES.find(t => t.id === card.template) || CARD_TEMPLATES[0];

  const handleCopy = () => {
    const text = `💌 Bưu thiếp 20/11 gửi ${card.toTeacher} (${card.faculty}):\n“${card.message}”\n— Từ: ${card.fromStudent} (${card.studentClass})\n#TheCaptainsJournal #2011`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#11263B]/80 backdrop-blur-sm animate-fadeIn">
      
      {/* Background click to dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl z-10">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#11263B] text-[#F5F0E7] hover:bg-[#18334E] flex items-center justify-center shadow-lg z-20 cursor-pointer border border-[#D3C6B3]/40"
          aria-label="Đóng"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Postcard Body */}
        <div className={`rounded-2xl p-8 sm:p-10 select-none shadow-2xl relative overflow-hidden ${tmpl.bgClass} ${tmpl.borderStyle}`}>
          
          <div className="grid sm:grid-cols-12 gap-8">
            
            {/* Left: Message & Signature (Col 1-7) */}
            <div className="sm:col-span-7 flex flex-col justify-between border-b sm:border-b-0 sm:border-r border-current/15 pb-6 sm:pb-0 sm:pr-7">
              <div>
                <div className="flex items-center gap-2 border-b border-current/10 pb-2 mb-4">
                  <span className="text-[10px] uppercase font-mono tracking-widest opacity-60">
                    The Captain’s Journal
                  </span>
                  <span className="text-[9px] font-mono opacity-40">• Tribute Edition</span>
                </div>

                <p className="font-editorial text-base sm:text-lg leading-relaxed italic opacity-95 whitespace-pre-line mb-6">
                  “{card.message}”
                </p>
              </div>

              <div className="pt-4 border-t border-current/15">
                <div className="text-[9px] uppercase tracking-wider opacity-60">
                  Người gửi:
                </div>
                <div className="font-handwriting text-2xl sm:text-3xl text-current font-bold mt-0.5">
                  {card.fromStudent}
                </div>
                <div className="text-[11px] opacity-75">
                  {card.studentClass}
                </div>
              </div>
            </div>

            {/* Right: Recipient & Stamps & Photo (Col 8-12) */}
            <div className="sm:col-span-5 flex flex-col justify-between space-y-4">
              
              {/* Postage stamp */}
              <div className="flex items-start justify-end gap-2">
                <div className="hidden sm:flex flex-col gap-1 justify-center opacity-40 pt-1">
                  <div className="w-12 h-[1px] bg-current" />
                  <div className="w-16 h-[1px] bg-current" />
                  <div className="w-14 h-[1px] bg-current" />
                </div>
                <div className="w-14 h-16 rounded border-2 border-dashed border-current/40 flex flex-col items-center justify-between p-1.5 text-center shrink-0">
                  <span className="text-[8px] uppercase tracking-widest font-mono opacity-70">VN POST</span>
                  <span className="text-lg">⚓️</span>
                  <span className="text-[7px] font-bold tracking-tighter opacity-80">20/11</span>
                </div>
              </div>

              {/* Photo */}
              {card.image && (
                <div className="rounded-lg overflow-hidden border border-current/20 shadow-sm max-h-40 bg-black/5">
                  <img
                    src={card.image}
                    alt="Kỷ niệm"
                    className="w-full h-36 object-cover"
                  />
                </div>
              )}

              {/* Recipient Lines */}
              <div className="space-y-3 pt-2">
                <div className="border-b border-current/25 pb-1">
                  <div className="text-[9px] uppercase tracking-wider opacity-60">
                    Kính gửi:
                  </div>
                  <div className="font-editorial font-bold text-base sm:text-lg">
                    {card.toTeacher}
                  </div>
                </div>

                <div className="border-b border-current/25 pb-1">
                  <div className="text-[9px] uppercase tracking-wider opacity-60">
                    Bộ môn / Viện:
                  </div>
                  <div className="text-xs italic opacity-85">
                    {card.faculty}
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Stickers */}
          {card.stickers && card.stickers.map((stk, idx) => (
            <div
              key={idx}
              style={{ top: `${stk.y}%`, left: `${stk.x}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            >
              <div className="flex items-center gap-1 bg-[#FAF7F2]/90 backdrop-blur-sm text-[#11263B] px-2 py-0.5 rounded border border-[#B39765]/60 text-xs shadow-md">
                <span>{stk.icon}</span>
                <span className="text-[9px] font-mono tracking-tight font-medium">{stk.label}</span>
              </div>
            </div>
          ))}

        </div>

        {/* Modal Action Bar */}
        <div className="mt-3 flex items-center justify-between bg-[#F5F0E7] border border-[#D3C6B3] p-3 rounded-xl text-xs">
          <button
            onClick={() => onLike(card.id)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[#11263B] hover:text-[#B9685C] transition-colors cursor-pointer"
          >
            <Heart className="w-4 h-4" />
            <span>Trân trọng ({card.likes})</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#11263B] text-[#F5F0E7] hover:bg-[#18334E] cursor-pointer transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#B39765]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Đã sao chép' : 'Sao chép nội dung'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
