import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  CARD_TEMPLATES, 
  AVAILABLE_STICKERS, 
  PROMPT_WISH_SUGGESTIONS 
} from '../data/initialData';
import { 
  Upload, 
  Trash2, 
  Check, 
  ArrowRight,
  BookOpen
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
    { id: 'init-1', icon: '⚓️', label: 'Dấu mộc Thuyền Trưởng', x: 86, y: 18 }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formError, setFormError] = useState('');
  const [showPromptPicker, setShowPromptPicker] = useState(false);

  const fileInputRef = useRef(null);
  const cardCanvasRef = useRef(null);

  const currentTemplate = CARD_TEMPLATES.find(t => t.id === selectedTemplate) || CARD_TEMPLATES[0];

  // Handle local image upload with size check
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFormError('Vui lòng chọn ảnh dung lượng dưới 5MB để đảm bảo tốc độ tải trang.');
        return;
      }
      setFormError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add postal stamp / sticker
  const handleAddSticker = (sticker) => {
    if (placedStickers.length >= 4) {
      alert('Để giữ tính thẩm mỹ của bưu thiếp, bạn chỉ nên dán tối đa 4 con tem / dấu mộc.');
      return;
    }
    const newStk = {
      id: 'stk-' + Date.now(),
      icon: sticker.icon,
      label: sticker.label,
      x: Math.floor(Math.random() * 40) + 40,
      y: Math.floor(Math.random() * 40) + 30
    };
    setPlacedStickers([...placedStickers, newStk]);
  };

  const handleRemoveSticker = (id) => {
    setPlacedStickers(placedStickers.filter(s => s.id !== id));
  };

  // Drag interaction
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
    const x = Math.max(5, Math.min(92, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(5, Math.min(92, ((e.clientY - rect.top) / rect.height) * 100));

    const updated = [...placedStickers];
    if (updated[stickerIndex]) {
      updated[stickerIndex] = { ...updated[stickerIndex], x: Math.round(x), y: Math.round(y) };
      setPlacedStickers(updated);
    }
  };

  // Submit card
  const handleSubmitCard = (e) => {
    e.preventDefault();

    if (!toTeacher.trim()) {
      setFormError('Vui lòng điền tên Thầy / Cô bạn muốn gửi lời tri ân.');
      return;
    }
    if (!fromStudent.trim()) {
      setFormError('Vui lòng điền họ tên của bạn hoặc nhóm gửi thiệp.');
      return;
    }
    if (!message.trim() || message.trim().length < 10) {
      setFormError('Lời chúc cần có ít nhất 10 ký tự để biểu đạt trọn vẹn tình cảm.');
      return;
    }

    setFormError('');
    setIsSubmitting(true);

    const newCard = {
      id: 'card-' + Date.now(),
      template: selectedTemplate,
      toTeacher: toTeacher.trim(),
      faculty: faculty.trim() || 'Khoa / Viện Giảng Dạy',
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

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#B39765', '#B9685C', '#11263B', '#D3C6B3']
      });
    } catch {
      // fallback
    }

    setTimeout(() => {
      onAddCard(newCard);
      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Reset form fields
      setToTeacher('');
      setMessage('');
      setImagePreview(null);
      setPlacedStickers([{ id: 'init-1', icon: '⚓️', label: 'Dấu mộc Thuyền Trưởng', x: 86, y: 18 }]);

      setTimeout(() => {
        setSubmitSuccess(false);
        const wall = document.getElementById('archive');
        if (wall) wall.scrollIntoView({ behavior: 'smooth' });
      }, 1500);
    }, 450);
  };

  return (
    <section id="studio" className="py-24 sm:py-32 bg-[#FAF7F2] border-t border-[#D3C6B3]/60 relative">
      
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="text-xs uppercase tracking-[0.25em] text-[#B39765] font-semibold mb-3">
            Digital Postcard Studio
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#11263B] tracking-tight mb-4">
            Gửi Một Bức Bưu Thiếp Tri Ân
          </h2>
          <p className="text-sm sm:text-base text-[#5C6A79] leading-relaxed">
            Chọn chất liệu giấy, gửi gắm những lời chưa kịp nói và lưu giữ tấm lòng của bạn vào cuốn hải trình tri ân 20/11.
          </p>
        </div>

        {/* 12-Column Layout: Form (Left 5) + Live Postcard Preview (Right 7) */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* ============ LEFT: EDITORIAL FORM (COL 1-5) ============ */}
          <div className="lg:col-span-5 bg-[#F5F0E7] border border-[#D3C6B3] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            
            {/* Step 1: Material Selection */}
            <div>
              <label className="block text-[11px] font-mono tracking-widest text-[#B39765] uppercase mb-3">
                1. Chọn Chất Liệu Bưu Thiếp
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {CARD_TEMPLATES.map((tmpl) => {
                  const isSelected = selectedTemplate === tmpl.id;
                  return (
                    <button
                      key={tmpl.id}
                      type="button"
                      onClick={() => setSelectedTemplate(tmpl.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#11263B] bg-[#FAF7F2] shadow-sm'
                          : 'border-[#D3C6B3]/60 bg-transparent hover:border-[#B39765]'
                      }`}
                    >
                      <div className="font-editorial text-xs font-semibold text-[#11263B] truncate">
                        {tmpl.name}
                      </div>
                      <div className="text-[10px] text-[#5C6A79] truncate mt-0.5">
                        {tmpl.badge}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Information */}
            <div className="space-y-4 pt-2 border-t border-[#D3C6B3]/50">
              <label className="block text-[11px] font-mono tracking-widest text-[#B39765] uppercase">
                2. Thông Tin Người Nhận & Người Gửi
              </label>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    placeholder="Thầy / Cô nhận thiệp *"
                    value={toTeacher}
                    onChange={(e) => setToTeacher(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF7F2] border border-[#D3C6B3] text-xs text-[#1C2A39] placeholder-[#8C98A4] focus:outline-none focus:border-[#11263B]"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Khoa / Viện / Bộ môn"
                    value={faculty}
                    onChange={(e) => setFaculty(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF7F2] border border-[#D3C6B3] text-xs text-[#1C2A39] placeholder-[#8C98A4] focus:outline-none focus:border-[#11263B]"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Tên của bạn hoặc tập thể *"
                    value={fromStudent}
                    onChange={(e) => setFromStudent(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF7F2] border border-[#D3C6B3] text-xs text-[#1C2A39] placeholder-[#8C98A4] focus:outline-none focus:border-[#11263B]"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Lớp / Niên khóa"
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF7F2] border border-[#D3C6B3] text-xs text-[#1C2A39] placeholder-[#8C98A4] focus:outline-none focus:border-[#11263B]"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Message */}
            <div className="pt-2 border-t border-[#D3C6B3]/50">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[11px] font-mono tracking-widest text-[#B39765] uppercase">
                  3. Lời Tri Ân
                </label>

                <button
                  type="button"
                  onClick={() => setShowPromptPicker(!showPromptPicker)}
                  className="text-[11px] text-[#B9685C] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <BookOpen className="w-3 h-3" />
                  <span>Gợi ý ý tưởng</span>
                </button>
              </div>

              {/* Suggestions */}
              {showPromptPicker && (
                <div className="mb-3 p-3 rounded-xl bg-[#FAF7F2] border border-[#B39765]/40 space-y-2 text-xs">
                  {PROMPT_WISH_SUGGESTIONS.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setMessage(item.text);
                        setShowPromptPicker(false);
                      }}
                      className="w-full text-left p-2 rounded-lg hover:bg-[#F5F0E7] text-[#1C2A39] transition-colors"
                    >
                      <span className="font-semibold text-[#B39765] block">{item.category}:</span>
                      <span className="italic">{item.text}</span>
                    </button>
                  ))}
                </div>
              )}

              <textarea
                rows={4}
                placeholder="Gửi gắm những kỷ niệm sâu sắc, bài học quý giá hoặc lời cảm ơn chân thành..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={450}
                className="w-full px-3.5 py-3 rounded-lg bg-[#FAF7F2] border border-[#D3C6B3] text-xs leading-relaxed text-[#1C2A39] placeholder-[#8C98A4] focus:outline-none focus:border-[#11263B]"
                required
              />
              <div className="flex justify-between items-center text-[10px] text-[#5C6A79] mt-1">
                <span>Khuyên dùng ít nhất 20 chữ</span>
                <span>{message.length}/450 ký tự</span>
              </div>
            </div>

            {/* Step 4: Photo attachment (Optional) */}
            <div className="pt-2 border-t border-[#D3C6B3]/50">
              <label className="block text-[11px] font-mono tracking-widest text-[#B39765] uppercase mb-2">
                4. Kẹp Ảnh Kỷ Niệm (Tùy chọn)
              </label>

              <div className="flex items-center gap-3">
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
                  className="px-4 py-2 rounded-lg border border-[#D3C6B3] bg-[#FAF7F2] hover:border-[#11263B] text-xs text-[#1C2A39] font-medium flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Upload className="w-3.5 h-3.5 text-[#B39765]" />
                  <span>{imagePreview ? 'Thay đổi ảnh' : 'Tải ảnh từ thiết bị'}</span>
                </button>

                {imagePreview && (
                  <div className="flex items-center gap-2 bg-[#FAF7F2] px-2 py-1 rounded border border-[#D3C6B3]">
                    <img src={imagePreview} alt="Thumbnail" className="w-6 h-6 object-cover rounded" />
                    <span className="text-[11px] text-[#5C6A79]">Đã kẹp ảnh</span>
                    <button
                      type="button"
                      onClick={() => setImagePreview(null)}
                      className="text-[#B9685C] hover:text-[#11263B] ml-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Step 5: Optional Stamps */}
            <div className="pt-2 border-t border-[#D3C6B3]/50">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[11px] font-mono tracking-widest text-[#B39765] uppercase">
                  5. Dấu Mộc & Con Tem Bưu Chính (Tùy chọn)
                </label>
                <span className="text-[10px] text-[#5C6A79]">
                  {placedStickers.length}/4 dấu
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {AVAILABLE_STICKERS.map((stk) => (
                  <button
                    key={stk.id}
                    type="button"
                    onClick={() => handleAddSticker(stk)}
                    className="px-2.5 py-1 rounded-full bg-[#FAF7F2] hover:bg-[#FAF7F2]/80 border border-[#D3C6B3] text-[11px] text-[#1C2A39] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>{stk.icon}</span>
                    <span>{stk.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Error notice if any */}
            {formError && (
              <div className="p-3 rounded-lg bg-[#B9685C]/10 border border-[#B9685C]/30 text-xs text-[#B9685C]">
                {formError}
              </div>
            )}

            {/* Submit */}
            <div className="pt-4 border-t border-[#D3C6B3]/50">
              <button
                type="button"
                onClick={handleSubmitCard}
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-full bg-[#11263B] hover:bg-[#18334E] text-[#F5F0E7] text-xs uppercase tracking-wider font-semibold transition-all duration-200 shadow hover:shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Đang niêm phong...</span>
                ) : submitSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-[#B39765]" />
                    <span>Đã gửi vào cuốn hải trình!</span>
                  </>
                ) : (
                  <>
                    <span>Gửi bưu thiếp vào cuốn hải trình</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </div>

          {/* ============ RIGHT: TACTILE POSTCARD PREVIEW (COL 6-12) ============ */}
          <div className="lg:col-span-7 sticky top-28">
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#5C6A79] text-center mb-3">
              Xem Trước Bản In Bưu Thiếp
            </div>

            {/* The Physical Postcard Card Container */}
            <div
              ref={cardCanvasRef}
              onDragOver={handleCanvasDragOver}
              onDrop={handleCanvasDrop}
              className={`relative min-h-[440px] sm:min-h-[480px] rounded-2xl p-7 sm:p-9 transition-all duration-300 select-none overflow-hidden ${currentTemplate.bgClass} ${currentTemplate.borderStyle}`}
            >
              
              {/* Divided Back Postcard Layout Grid (2 Columns on tablet/desktop) */}
              <div className="grid sm:grid-cols-12 gap-8 h-full">
                
                {/* Left Side: Personal Note & Message (Col 1-7) */}
                <div className="sm:col-span-7 flex flex-col justify-between border-b sm:border-b-0 sm:border-r border-current/15 pb-6 sm:pb-0 sm:pr-7">
                  
                  <div>
                    {/* Masthead of the postcard */}
                    <div className="flex items-center gap-2 border-b border-current/10 pb-2 mb-4">
                      <span className="text-[10px] uppercase font-mono tracking-widest opacity-60">
                        Postcard Tribute
                      </span>
                      <span className="text-[9px] opacity-40 font-mono">• 20.11.2026</span>
                    </div>

                    {/* Wishes text */}
                    <p className="font-editorial text-sm sm:text-base leading-relaxed italic opacity-95 min-h-[140px] whitespace-pre-line">
                      “{message || 'Kính gửi Thầy Cô, người đã trao cho chúng em chiếc la bàn tri thức và lòng tin vững chắc để tự mình vươn ra biển lớn...' }”
                    </p>
                  </div>

                  {/* Sender signature block */}
                  <div className="pt-4 border-t border-current/10 mt-4">
                    <div className="text-[10px] uppercase tracking-wider opacity-60">
                      Người gửi:
                    </div>
                    <div className="font-handwriting text-2xl sm:text-3xl text-current font-bold mt-0.5">
                      {fromStudent || 'Sinh viên thân quý'}
                    </div>
                    <div className="text-[11px] opacity-75">
                      {studentClass || 'Khóa 2026'}
                    </div>
                  </div>

                </div>

                {/* Right Side: Recipient & Postmark & Photo (Col 8-12) */}
                <div className="sm:col-span-5 flex flex-col justify-between space-y-4">
                  
                  {/* Postage Stamp & Cancellation Mark (Top Right) */}
                  <div className="flex items-start justify-end gap-2">
                    {/* Postal cancellation lines */}
                    <div className="hidden sm:flex flex-col gap-1 justify-center opacity-40 pt-1">
                      <div className="w-12 h-[1px] bg-current" />
                      <div className="w-16 h-[1px] bg-current" />
                      <div className="w-14 h-[1px] bg-current" />
                    </div>

                    {/* Stamp Box */}
                    <div className="w-14 h-16 rounded border-2 border-dashed border-current/40 flex flex-col items-center justify-between p-1.5 text-center shrink-0">
                      <span className="text-[8px] uppercase tracking-widest font-mono opacity-70">VN POST</span>
                      <span className="text-lg">⚓️</span>
                      <span className="text-[7px] font-bold tracking-tighter opacity-80">20/11</span>
                    </div>
                  </div>

                  {/* Optional Attached Photograph */}
                  {imagePreview && (
                    <div className="rounded-lg overflow-hidden border border-current/20 shadow-sm max-h-36 bg-black/5">
                      <img
                        src={imagePreview}
                        alt="Ảnh kỷ niệm"
                        className="w-full h-32 object-cover"
                      />
                    </div>
                  )}

                  {/* Address Lines to the Teacher */}
                  <div className="space-y-3 pt-2">
                    <div className="border-b border-current/25 pb-1">
                      <div className="text-[9px] uppercase tracking-wider opacity-60">
                        Kính gửi:
                      </div>
                      <div className="font-editorial font-bold text-sm sm:text-base truncate">
                        {toTeacher || 'Quý Thầy / Cô Kính Yêu'}
                      </div>
                    </div>

                    <div className="border-b border-current/25 pb-1">
                      <div className="text-[9px] uppercase tracking-wider opacity-60">
                        Nơi công tác:
                      </div>
                      <div className="text-xs italic truncate opacity-85">
                        {faculty || 'Bộ môn / Giảng đường'}
                      </div>
                    </div>
                  </div>

                </div>

              </div>

              {/* Interactive Placed Stamps / Seals (Can be repositioned) */}
              {placedStickers.map((stk, index) => (
                <div
                  key={stk.id}
                  draggable
                  onDragStart={(e) => handleStickerDragStart(e, index)}
                  style={{ top: `${stk.y}%`, left: `${stk.x}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing group/stk z-20"
                  title="Có thể kéo rê để căn chỉnh vị trí"
                >
                  <div className="flex items-center gap-1 bg-[#FAF7F2]/90 backdrop-blur-sm text-[#11263B] px-2 py-0.5 rounded border border-[#B39765]/60 text-xs shadow-md group-hover/stk:scale-105 transition-transform">
                    <span className="text-sm">{stk.icon}</span>
                    <span className="text-[9px] font-mono tracking-tight font-medium hidden group-hover/stk:inline-block">
                      {stk.label}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveSticker(stk.id);
                      }}
                      className="text-[#B9685C] hover:text-[#11263B] ml-1 text-xs font-bold leading-none"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}

            </div>

            <div className="text-center mt-3 text-[11px] text-[#5C6A79]">
              💡 Có thể kéo rê con tem trên bưu thiếp để căn chỉnh vị trí thẩm mỹ.
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
