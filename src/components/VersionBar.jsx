import React, { useState } from 'react';
import { VERSIONS } from '../data/versionsConfig';
import { Palette, Check, ChevronDown, ChevronUp } from 'lucide-react';

export default function VersionBar({ activeVersionId, onSelectVersion }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const activeVersion = VERSIONS.find(v => v.id === activeVersionId) || VERSIONS[0];

  return (
    <div className="sticky top-0 z-[60] bg-[#0A131F] text-[#F5F0E7] border-b border-[#B39765]/40 shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2.5">
        
        {/* Top Header Row of the Bar */}
        <div className="flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-[#B39765] text-[#0A131F] flex items-center justify-center font-bold text-xs">
              <Palette className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F5F0E7]">
                  5 Phiên Bản Thiết Kế (Design Concepts):
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#182C44] text-[#B39765] font-semibold hidden sm:inline-block">
                  Đang xem: {activeVersion.name}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-[#A0AEC0] hidden md:inline">
              Bấm chọn bên dưới để chuyển toàn bộ phong cách & font màu:
            </span>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-[#B39765] hover:text-[#F5F0E7] flex items-center gap-1 font-medium cursor-pointer p-1"
              title="Ẩn / Hiện thanh chọn phong cách"
            >
              <span className="text-[11px]">{isExpanded ? 'Thu gọn' : 'Đổi bản thiết kế'}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

        </div>

        {/* 5 Selectable Version Cards Row (Expandable) */}
        {isExpanded && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-2.5 pt-2.5 border-t border-white/10">
            {VERSIONS.map((v) => {
              const isActive = v.id === activeVersionId;
              return (
                <button
                  key={v.id}
                  onClick={() => onSelectVersion(v.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                    isActive
                      ? 'bg-[#182C44] border-[#B39765] shadow-[0_0_15px_rgba(179,151,101,0.25)] ring-1 ring-[#B39765]'
                      : 'bg-[#0E1B2C] border-white/10 hover:border-white/25 hover:bg-[#13243A]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">{v.theme.emblem}</span>
                      {isActive && (
                        <span className="w-4 h-4 rounded-full bg-[#B39765] text-[#0A131F] flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      )}
                    </div>
                    <div className="font-bold text-xs text-white truncate">
                      {v.shortName}
                    </div>
                    <div className="text-[10px] text-[#A0AEC0] line-clamp-1 mt-0.5">
                      {v.badge}
                    </div>
                  </div>

                  {/* Swatches dots */}
                  <div className="flex items-center gap-1 mt-2 pt-1.5 border-t border-white/10">
                    {v.swatches.map((color, i) => (
                      <span
                        key={i}
                        style={{ backgroundColor: color }}
                        className="w-2.5 h-2.5 rounded-full border border-black/30"
                      />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
