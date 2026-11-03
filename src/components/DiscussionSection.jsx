import React, { useState } from 'react';
import { Image as ImageIcon, Send, Heart, Trash2, CheckCircle2 } from 'lucide-react';

export default function DiscussionSection({ topics, onAddComment, onLikeComment }) {
  const [activeTopicId, setActiveTopicId] = useState(topics[0]?.id || 'topic-1');
  const [authorName, setAuthorName] = useState('');
  const [authorBadge, setAuthorBadge] = useState('');
  const [commentText, setCommentText] = useState('');
  const [attachedImages, setAttachedImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const activeTopic = topics.find(t => t.id === activeTopicId) || topics[0];

  // Upload 1-3 images
  const handleImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    if (attachedImages.length + files.length > 3) {
      alert('Mỗi câu chuyện chỉ được đính kèm tối đa 3 bức ảnh kỷ niệm.');
      return;
    }

    files.forEach((file) => {
      if (file.size > 4 * 1024 * 1024) {
        alert(`Ảnh ${file.name} vượt quá 4MB, vui lòng chọn ảnh nhẹ hơn.`);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAttachedImages((prev) => {
          if (prev.length < 3) return [...prev, reader.result];
          return prev;
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index) => {
    setAttachedImages(attachedImages.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!authorName.trim()) {
      alert('Vui lòng nhập tên của bạn.');
      return;
    }
    if (!commentText.trim() || commentText.trim().length < 5) {
      alert('Vui lòng nhập nội dung kỷ niệm (ít nhất 5 ký tự).');
      return;
    }

    setIsSubmitting(true);

    const newComment = {
      id: 'cmt-' + Date.now(),
      author: authorName.trim(),
      badge: authorBadge.trim() || 'Sinh viên',
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(authorName)}&backgroundColor=11263B,B39765,B9685C&textColor=F5F0E7`,
      content: commentText.trim(),
      images: attachedImages,
      likes: 1,
      createdAt: 'Vừa xong',
      status: 'approved'
    };

    setTimeout(() => {
      onAddComment(activeTopicId, newComment);
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      setCommentText('');
      setAttachedImages([]);

      setTimeout(() => setSubmittedSuccess(false), 2500);
    }, 350);
  };

  return (
    <section id="dialogue" className="py-24 sm:py-32 bg-[#FAF7F2] border-t border-[#D3C6B3]/60 relative">
      
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="text-xs uppercase tracking-[0.25em] text-[#B39765] font-semibold mb-3">
            Đối Thoại & Ký Ức
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#11263B] tracking-tight mb-4">
            Ký Ức Giảng Đường
          </h2>
          <p className="text-sm sm:text-base text-[#5C6A79] leading-relaxed">
            Bốn câu hỏi gợi mở những câu chuyện chưa từng kể giữa sinh viên và những người Thầy, người Cô đáng kính.
          </p>
        </div>

        {/* 4 Topic Questions - Editorial List Navigation */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {topics.map((t, idx) => {
            const isActive = t.id === activeTopicId;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTopicId(t.id)}
                className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#11263B] text-[#F5F0E7] border-[#11263B] shadow-md'
                    : 'bg-[#F5F0E7] text-[#1C2A39] border-[#D3C6B3]/80 hover:border-[#11263B]/50'
                }`}
              >
                <div>
                  <span className={`text-[10px] font-mono tracking-widest uppercase block mb-2 ${
                    isActive ? 'text-[#B39765]' : 'text-[#8C98A4]'
                  }`}>
                    Câu hỏi 0{idx + 1}
                  </span>
                  <h3 className="font-editorial font-bold text-sm leading-snug line-clamp-3">
                    {t.title}
                  </h3>
                </div>

                <div className="pt-4 mt-4 border-t border-current/15 flex items-center justify-between text-[11px] opacity-75">
                  <span>{t.comments?.filter(c => c.status === 'approved').length || 0} chia sẻ</span>
                  <span className="font-medium">{isActive ? 'Đang đọc' : 'Mở xem'}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Question Reading & Storytelling Arena */}
        <div className="bg-[#F5F0E7] border border-[#D3C6B3] rounded-3xl p-6 sm:p-10 shadow-[0_8px_30px_rgba(17,38,59,0.04)]">
          
          {/* Active Question Prompt */}
          <div className="border-b border-[#D3C6B3]/60 pb-6 mb-8">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#B39765] block mb-1">
              Chủ Đề Đang Mở
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#11263B] mb-2 leading-tight">
              {activeTopic.title}
            </h3>
            <p className="text-sm text-[#5C6A79] leading-relaxed max-w-3xl">
              {activeTopic.description}
            </p>
          </div>

          {/* Form to submit response */}
          <form onSubmit={handleSubmit} className="bg-[#FAF7F2] border border-[#D3C6B3] rounded-2xl p-5 sm:p-7 mb-12 space-y-4">
            <div className="text-xs font-semibold text-[#11263B] uppercase tracking-wider">
              Chia sẻ kỷ niệm của bạn về chủ đề này
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  placeholder="Tên của bạn (VD: Trần Văn Đức) *"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#F5F0E7] border border-[#D3C6B3] text-xs text-[#1C2A39] placeholder-[#8C98A4] focus:outline-none focus:border-[#11263B]"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Lớp / Khoa (VD: K65 - CNTT, Cựu sinh viên...)"
                  value={authorBadge}
                  onChange={(e) => setAuthorBadge(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#F5F0E7] border border-[#D3C6B3] text-xs text-[#1C2A39] placeholder-[#8C98A4] focus:outline-none focus:border-[#11263B]"
                />
              </div>
            </div>

            <div>
              <textarea
                rows={3}
                placeholder="Viết câu chuyện hoặc suy nghĩ chân thật của bạn..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full px-3.5 py-3 rounded-lg bg-[#F5F0E7] border border-[#D3C6B3] text-xs leading-relaxed text-[#1C2A39] placeholder-[#8C98A4] focus:outline-none focus:border-[#11263B]"
                required
              />
            </div>

            {/* Photo Attachments & Submit */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#D3C6B3] bg-[#F5F0E7] text-[#1C2A39] text-xs cursor-pointer hover:border-[#11263B] transition-colors">
                  <ImageIcon className="w-3.5 h-3.5 text-[#B39765]" />
                  <span>Kèm ảnh kỷ niệm ({attachedImages.length}/3)</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImagesUpload}
                    disabled={attachedImages.length >= 3}
                    className="hidden"
                  />
                </label>

                {attachedImages.map((img, idx) => (
                  <div key={idx} className="relative group w-9 h-9 rounded overflow-hidden border border-[#D3C6B3]">
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute inset-0 bg-black/60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3 h-3 text-[#B9685C]" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-full bg-[#11263B] hover:bg-[#18334E] text-[#F5F0E7] text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer disabled:opacity-50 flex items-center gap-2"
              >
                {submittedSuccess ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B39765]" />
                    <span>Đã gửi chia sẻ</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Đang gửi...' : 'Gửi câu chuyện'}</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* List of responses formatted like letters in an anthology */}
          <div className="space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest text-[#B39765] border-b border-[#D3C6B3]/60 pb-3">
              Những Dòng Ký Ức Đã Gửi Về ({activeTopic.comments?.filter(c => c.status === 'approved').length || 0})
            </div>

            {(!activeTopic.comments || activeTopic.comments.filter(c => c.status === 'approved').length === 0) ? (
              <div className="text-center py-10 text-xs text-[#5C6A79] italic">
                Chưa có câu chuyện nào ở chủ đề này. Hãy là người đầu tiên ghi dấu kỷ niệm!
              </div>
            ) : (
              activeTopic.comments
                .filter(c => c.status === 'approved')
                .map((cmt) => (
                  <article
                    key={cmt.id}
                    className="p-5 sm:p-6 rounded-2xl bg-[#FAF7F2] border border-[#D3C6B3]/60 space-y-3"
                  >
                    {/* Author Meta */}
                    <div className="flex items-center justify-between gap-2 border-b border-[#D3C6B3]/40 pb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={cmt.avatar}
                          alt={cmt.author}
                          className="w-8 h-8 rounded-full bg-[#11263B] object-cover"
                        />
                        <div>
                          <div className="font-editorial font-bold text-sm text-[#11263B]">
                            {cmt.author}
                          </div>
                          <div className="text-[10px] text-[#5C6A79]">
                            {cmt.badge}
                          </div>
                        </div>
                      </div>

                      <div className="text-[10px] font-mono text-[#8C98A4]">
                        {cmt.createdAt}
                      </div>
                    </div>

                    {/* Content text */}
                    <p className="font-editorial text-sm sm:text-base text-[#1C2A39] leading-relaxed whitespace-pre-line italic">
                      “{cmt.content}”
                    </p>

                    {/* Attached Photos (Polaroid style) */}
                    {cmt.images && cmt.images.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {cmt.images.map((img, i) => (
                          <a
                            key={i}
                            href={img}
                            target="_blank"
                            rel="noreferrer"
                            className="block rounded-lg overflow-hidden border border-[#D3C6B3] p-1 bg-white hover:border-[#11263B] transition-colors"
                          >
                            <img
                              src={img}
                              alt="Ảnh đính kèm"
                              className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded"
                            />
                          </a>
                        ))}
                      </div>
                    )}

                    {/* Like reaction */}
                    <div className="pt-2 flex items-center justify-between text-xs text-[#5C6A79]">
                      <button
                        type="button"
                        onClick={() => onLikeComment(activeTopic.id, cmt.id)}
                        className="flex items-center gap-1.5 hover:text-[#B9685C] transition-colors cursor-pointer"
                      >
                        <Heart className="w-3.5 h-3.5" />
                        <span className="font-mono text-xs">{cmt.likes || 0} đồng cảm</span>
                      </button>
                    </div>

                  </article>
                ))
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
