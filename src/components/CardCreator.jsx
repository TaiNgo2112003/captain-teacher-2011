import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  CARD_TEMPLATES, 
  AVAILABLE_STICKERS, 
  PROMPT_WISH_SUGGESTIONS 
} from '../data/initialData';
import { 
  Sparkles, 
  Send, 
  Upload, 
  Trash2, 
  Image as ImageIcon, 
  Smile, 
  HelpCircle, 
  Move,
  CheckCircle2,
  Compass
} from 'lucide-react';

export default function CardCreator({ onAddCard }) {
  const [selectedTemplate, setSelectedTemplate] = useState(CARD_TEMPLATES[0].id);
  const [toTeacher, setToTeacher] = useState('');
  const [faculty, setFaculty] = useState('');
  const [fromStudent, setFromStudent] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [placedStickers, setPlacedStickers] = useState([
    { id: 'init-1', icon: '⚓️', label: 'Thuyền Trưởng', x: 80, y: 15 }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPromptPicker, setShowPromptPicker] = useState(false);

  const fileInputRef = useRef(null);
  const cardCanvasRef = useRef(null);

  // Active template metadata
  const currentTemplate = CARD_TEMPLATES.find(t => t.id === selectedTemplate) || CARD_TEMPLATES[0];

  // Handle local image upload to base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        alert('Vui lòng chọn ảnh dung lượng dưới 4MB để tối ưu hiển thị!');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add sticker to card canvas
  const handleAddSticker = (sticker) => {
    if (placedStickers.length >= 6) {
      alert('Bạn đã dán tối đa 6 sticker trên thiệp rồi nhé!');
      return;
    }
    // Random position in central area
    const newSticker = {
      id: 'sticker-' + Date.now(),
      icon: sticker.icon,
      label: sticker.label,
      x: Math.floor(Math.random() * 50) + 25,
      y: Math.floor(Math.random() * 50) + 25
    };
    setPlacedStickers([...placedStickers, newSticker]);
  };

  // Remove individual sticker
  const handleRemoveSticker = (id) => {
    setPlacedStickers(placedStickers.filter(s => s.id !== id));
  };

  // Simple drag interaction for stickers within card
  const handleStickerDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index);
  };

  const handleCanvasDragOver = (e) => {
    e.preventDefault();
  };

  const handleCanvasDrop = (e) => {
    e.preventDefault();
    if (!cardCanvasRef.current) return;
    const stickerIndex = e.dataTransfer.getData('text/plain');
    if (stickerIndex === '') return;

    const rect = cardCanvasRef.current.getBoundingClientRect();
    const x = Math.max(5, Math.min(90, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(5, Math.min(90, ((e.clientY - rect.top) / rect.height) * 100));

    const updated = [...placedStickers];
    if (updated[stickerIndex]) {
      updated[stickerIndex] = { ...updated[stickerIndex], x: Math.round(x), y: Math.round(y) };
      setPlacedStickers(updated);
    }
  };

  // Submit card with celebration
  const handleSubmitCard = (e) => {
    e.preventDefault();

    if (!toTeacher.trim()) {
      alert('Vui lòng nhập tên Thầy / Cô nhận thiệp!');
      return;
    }
    if (!fromStudent.trim()) {
      alert('Vui lòng nhập họ tên của bạn!');
      return;
    }
    if (!message.trim() || message.trim().length < 10) {
      alert('Lời chúc cần ít nhất 10 ký tự để bày tỏ trọn vẹn tình cảm!');
      return;
    }

    setIsSubmitting(true);

    // Create new card object
    const newCard = {
      id: 'card-' + Date.now(),
      template: selectedTemplate,
      toTeacher: toTeacher.trim(),
      faculty: faculty.trim() || 'Khoa / Viện Đào Tạo',
      fromStudent: fromStudent.trim(),
      studentClass: studentClass.trim() || 'Sinh viên / Cựu sinh viên',
      message: message.trim(),
      image: imagePreview,
      stickers: placedStickers,
      likes: 1,
      status: 'approved',
      createdAt: new Date().toISOString(),
      isPinned: false
    };

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#38bdf8', '#fbbf24', '#f43f5e', '#ffffff']
      });
    } catch {
      // fallback if blocked
    }

    setTimeout(() => {
      onAddCard(newCard);
      setIsSubmitting(false);

      // Reset form
      setToTeacher('');
      setMessage('');
      setImagePreview(null);
      setPlacedStickers([{ id: 'init-1', icon: '⚓️', label: 'Thuyền Trưởng', x: 80, y: 15 }]);

      // Smooth scroll to wish wall
      const wallElement = document.getElementById('wishes');
      if (wallElement) {
        wallElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 400);
  };

  return (
    <section id="creator" className="py-24 relative bg-[#070d18]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Xưởng Chế Tác Thiệp 20/11</span>
          </div>
          <h2 className="font-serif-display font-bold text-3xl sm:text-4xl text-white mb-4">
            Thiết Kế Thiệp Tri Ân <span className="text-amber-400">"Captain Teacher"</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Chọn mẫu thiệp độc quyền, cá nhân hóa lời chúc, dán sticker huy hiệu và gửi gắm tấm lòng đến Vị Thuyền Trưởng của bạn.
          </p>
        </div>

        {/* 2-Column Layout: Left Form + Right Live Preview */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* ============ LEFT COLUMN: FORM & CONTROLS (7 COLS) ============ */}
          <div className="lg:col-span-7 bg-[#0b1626]/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-7">
            
            {/* Step 1: Template Selection */}
            <div>
              <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">
                1. Chọn Phong Cách Thiệp ({CARD_TEMPLATES.length} Mẫu)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {CARD_TEMPLATES.map((tmpl) => {
                  const isSelected = selectedTemplate === tmpl.id;
                  return (
                    <button
                      key={tmpl.id}
                      type="button"
                      onClick={() => setSelectedTemplate(tmpl.id)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                        isSelected 
                          ? 'border-amber-400 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.2)]' 
                          : 'border-slate-800 bg-[#070e1b] hover:border-slate-700'
                      }`}
                    >
                      <div className="text-sm font-semibold text-white mb-1 truncate">
                        {tmpl.name}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {tmpl.tagline}
                      </div>
                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 text-amber-400">
                          <CheckCircle2 className="w-4 h-4 fill-amber-400/20" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Information Input */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Thầy / Cô Nhận Thiệp <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="VD: TS. Nguyễn Văn Minh, Cô Thu Hà..."
                  value={toTeacher}
                  onChange={(e) => setToTeacher(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#070e1b] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Khoa / Bộ Môn / Viện
                </label>
                <input
                  type="text"
                  placeholder="VD: Khoa CNTT, Viện Kinh Tế..."
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#070e1b] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Người Gửi (Bạn hoặc Tập thể) <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="VD: Lê Hoàng Nam, Tập thể Lớp K65..."
                  value={fromStudent}
                  onChange={(e) => setFromStudent(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#070e1b] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Khóa / Niên Khóa
                </label>
                <input
                  type="text"
                  placeholder="VD: K65 - Khoa học Máy tính..."
                  value={studentClass}
                  onChange={(e) => setStudentClass(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#070e1b] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors text-sm"
                />
              </div>
            </div>

            {/* Step 3: Wishes Message Input with Prompt Helpers */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-slate-300">
                  Lời Chúc Tri Ân <span className="text-rose-400">*</span>
                </label>
                
                {/* Prompt suggestions trigger */}
                <button
                  type="button"
                  onClick={() => setShowPromptPicker(!showPromptPicker)}
                  className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer font-medium"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Gợi ý lời chúc mẫu</span>
                </button>
              </div>

              {/* Collapsible Prompt Suggestions */}
              {showPromptPicker && (
                <div className="mb-3 p-3.5 rounded-xl bg-[#081220] border border-amber-500/30 space-y-2 text-xs">
                  <div className="text-amber-300 font-semibold mb-1">Bấm chọn một gợi ý để điền nhanh:</div>
                  {PROMPT_WISH_SUGGESTIONS.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setMessage(item.text);
                        setShowPromptPicker(false);
                      }}
                      className="w-full text-left p-2 rounded-lg bg-[#0d1a2d] hover:bg-amber-500/20 text-slate-300 hover:text-amber-200 border border-slate-700/60 transition-colors"
                    >
                      <span className="font-bold text-amber-400 block mb-0.5">{item.category}:</span>
                      "{item.text}"
                    </button>
                  ))}
                </div>
              )}

              <textarea
                rows={4}
                placeholder="Gửi lời tri ân chân thành, kỷ niệm đáng nhớ hay lời cảm ơn sâu sắc nhất đến Vị Thuyền Trưởng của bạn..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={450}
                className="w-full px-4 py-3 rounded-xl bg-[#070e1b] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors text-sm leading-relaxed"
                required
              />
              <div className="flex justify-between items-center text-[11px] text-slate-500 mt-1">
                <span>Khuyên dùng ít nhất 20 chữ để thiệp thêm phần trang trọng</span>
                <span>{message.length}/450 ký tự</span>
              </div>
            </div>

            {/* Step 4: Photo Attachment */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Đính Kèm Ảnh Kỷ Niệm (Tùy chọn)
              </label>
              
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2.5 rounded-xl bg-[#070e1b] hover:bg-slate-800 border border-slate-700 hover:border-amber-400/50 text-slate-200 text-xs font-medium flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Upload className="w-4 h-4 text-amber-400" />
                  <span>{imagePreview ? 'Thay đổi ảnh' : 'Tải ảnh từ máy'}</span>
                </button>

                {imagePreview && (
                  <div className="flex items-center gap-2 bg-[#081220] p-1.5 pr-3 rounded-lg border border-slate-700">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-8 h-8 rounded object-cover border border-slate-600" 
                    />
                    <span className="text-[11px] text-slate-300 truncate max-w-[120px]">Đã chọn ảnh</span>
                    <button
                      type="button"
                      onClick={() => setImagePreview(null)}
                      className="text-rose-400 hover:text-rose-300 ml-1"
                      title="Xóa ảnh"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Step 5: Stickers Toolbox (Client Optional Feature - Fully Working!) */}
            <div className="pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider">
                  5. Dán Sticker & Huy Hiệu (Kéo Thả Trực Quan)
                </label>
                <span className="text-[11px] text-slate-400">
                  {placedStickers.length}/6 sticker trên thiệp
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mb-3">
                Bấm vào biểu tượng bên dưới để gắn sticker lên thiệp. Bạn có thể kéo rê thả sticker tự do trên bề mặt thiệp bên phải!
              </p>

              <div className="flex flex-wrap gap-2">
                {AVAILABLE_STICKERS.map((stk) => (
                  <button
                    key={stk.id}
                    type="button"
                    onClick={() => handleAddSticker(stk)}
                    className="px-3 py-1.5 rounded-full bg-[#070e1b] hover:bg-amber-500/20 text-slate-200 hover:text-amber-300 border border-slate-700 hover:border-amber-500/40 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>{stk.icon}</span>
                    <span>{stk.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="text-xs text-slate-400">
                🔒 Thiệp được gửi duyệt tự động lên tường tri ân
              </div>

              <button
                type="button"
                onClick={handleSubmitCard}
                disabled={isSubmitting}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.99] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Đang gửi...' : 'Gửi Thiệp Lên Tường'}</span>
              </button>
            </div>

          </div>

          {/* ============ RIGHT COLUMN: LIVE CARD PREVIEW (5 COLS) ============ */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="text-center mb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                Xem Trước Thiệp Thời Gian Thực
              </span>
            </div>

            {/* Canvas Card Container */}
            <div
              ref={cardCanvasRef}
              onDragOver={handleCanvasDragOver}
              onDrop={handleCanvasDrop}
              className={`relative min-h-[460px] rounded-3xl p-7 transition-all duration-300 select-none overflow-hidden ${currentTemplate.bgClass} ${currentTemplate.borderStyle}`}
            >
              
              {/* Card Header & Emblems */}
              <div className="flex items-start justify-between border-b border-current/15 pb-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-black/20 backdrop-blur-sm border border-current/20 flex items-center justify-center text-xl shadow-inner">
                    ⚓️
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest opacity-75 block">
                      Thiệp Tri Ân 20/11
                    </span>
                    <span className="text-xs font-serif-display font-bold">
                      CAPTAIN TEACHER 2026
                    </span>
                  </div>
                </div>

                {/* Template badge */}
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-black/25 backdrop-blur-sm border border-current/20 font-semibold tracking-wide">
                  {currentTemplate.badge}
                </span>
              </div>

              {/* Recipient Information */}
              <div className="mb-4">
                <div className="text-[11px] opacity-70 uppercase tracking-wider font-semibold">
                  Kính gửi Vị Thuyền Trưởng:
                </div>
                <div className="font-serif-display font-bold text-xl sm:text-2xl mt-0.5 tracking-tight">
                  {toTeacher || 'Quý Thầy / Cô Kính Yêu'}
                </div>
                <div className="text-xs opacity-80 italic">
                  {faculty || 'Bộ môn / Khoa Viện Đào Tạo'}
                </div>
              </div>

              {/* Optional Photo Attachment on Card */}
              {imagePreview && (
                <div className="mb-4 rounded-xl overflow-hidden border border-current/20 shadow-md max-h-40 bg-black/10">
                  <img
                    src={imagePreview}
                    alt="Kỷ niệm"
                    className="w-full h-36 object-cover"
                  />
                </div>
              )}

              {/* Wishes Message Body */}
              <div className="mb-6 relative">
                <p className="text-sm sm:text-base leading-relaxed italic opacity-95 min-h-[90px] whitespace-pre-line">
                  "{message || 'Kính chúc Thầy/Cô dồi dào sức khỏe, luôn vững tay lái đưa các thế hệ học trò cập bến tri thức tương lai...'}"
                </p>
              </div>

              {/* Sender Signature Area */}
              <div className="border-t border-current/15 pt-4 flex items-end justify-between">
                <div>
                  <div className="text-[10px] opacity-70 uppercase font-semibold">
                    Thủy thủ kính chúc:
                  </div>
                  <div className="font-handwriting font-bold text-2xl tracking-wide mt-0.5">
                    {fromStudent || 'Sinh viên thân quý'}
                  </div>
                  <div className="text-[11px] opacity-80">
                    {studentClass || 'Khóa 2026'}
                  </div>
                </div>

                {/* Wax Seal / Stamp Emblem */}
                <div className="w-14 h-14 rounded-full border-2 border-dashed border-current/40 flex flex-col items-center justify-center rotate-6 text-[9px] font-bold text-center uppercase tracking-tighter opacity-80">
                  <span>★ 20/11 ★</span>
                  <span className="text-[8px] font-mono">VERIFIED</span>
                </div>
              </div>

              {/* Placed Interactive Stickers on Card */}
              {placedStickers.map((stk, index) => (
                <div
                  key={stk.id}
                  draggable
                  onDragStart={(e) => handleStickerDragStart(e, index)}
                  style={{ top: `${stk.y}%`, left: `${stk.x}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing group/stk z-20"
                  title="Kéo rê để di chuyển sticker"
                >
                  <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full border border-white/20 text-xs shadow-xl group-hover/stk:scale-110 transition-transform">
                    <span className="text-sm">{stk.icon}</span>
                    <span className="text-[10px] text-white font-semibold hidden group-hover/stk:inline-block">
                      {stk.label}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveSticker(stk.id);
                      }}
                      className="text-white/60 hover:text-rose-400 ml-0.5 text-xs font-bold leading-none"
                      title="Xóa sticker này"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}

            </div>

            {/* Tip beneath preview */}
            <div className="text-center mt-3 text-[11px] text-slate-500 flex items-center justify-center gap-1">
              <Move className="w-3 h-3 text-amber-400" />
              <span>Gợi ý: Bạn có thể kéo thả trực tiếp các sticker trên mặt thiệp để căn chỉnh bố cục!</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
