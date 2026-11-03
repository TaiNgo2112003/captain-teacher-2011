import React, { useState } from 'react';
import { MessageSquare, Image as ImageIcon, Send, Heart, Trash2, ShieldAlert } from 'lucide-react';

export default function DiscussionSection({ topics, onAddComment, onLikeComment }) {
  const [activeTopicId, setActiveTopicId] = useState(topics[0]?.id || 'topic-1');
  const [authorName, setAuthorName] = useState('');
  const [authorBadge, setAuthorBadge] = useState('');
  const [commentText, setCommentText] = useState('');
  const [attachedImages, setAttachedImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeTopic = topics.find(t => t.id === activeTopicId) || topics[0];

  // Handle uploading 1-3 images
  const handleImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    if (attachedImages.length + files.length > 3) {
      alert('Mỗi phản hồi chỉ được đính kèm tối đa 3 ảnh!');
      return;
    }

    files.forEach((file) => {
      if (file.size > 3 * 1024 * 1024) {
        alert(`Ảnh ${file.name} vượt quá 3MB, vui lòng chọn ảnh nhẹ hơn!`);
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

  // Remove single image
  const handleRemoveImage = (index) => {
    setAttachedImages(attachedImages.filter((_, i) => i !== index));
  };

  // Submit comment
  const handleSubmitComment = (e) => {
    e.preventDefault();

    if (!authorName.trim()) {
      alert('Vui lòng nhập tên của bạn!');
      return;
    }
    if (!commentText.trim() || commentText.trim().length < 5) {
      alert('Vui lòng nhập nội dung chia sẻ (ít nhất 5 ký tự)!');
      return;
    }

    setIsSubmitting(true);

    const newComment = {
      id: 'cmt-' + Date.now(),
      author: authorName.trim(),
      badge: authorBadge.trim() || 'Sinh viên',
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(authorName)}`,
      content: commentText.trim(),
      images: attachedImages,
      likes: 1,
      createdAt: 'Vừa xong',
      status: 'approved'
    };

    setTimeout(() => {
      onAddComment(activeTopicId, newComment);
      setIsSubmitting(false);

      // Reset form
      setCommentText('');
      setAttachedImages([]);
    }, 300);
  };

  return (
    <section id="discussions" className="py-24 relative bg-[#070d18]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Diễn Đàn Thảo Luận Mở</span>
          </div>
          <h2 className="font-serif-display font-bold text-3xl sm:text-4xl text-white mb-4">
            Kỷ Niệm Hải Trình <span className="text-amber-400">Giảng Đường</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Cùng chia sẻ những khoảnh khắc xúc động, những câu nói bất hủ và bức ảnh đáng nhớ nhất cùng các Vị Thuyền Trưởng.
          </p>
        </div>

        {/* 4 Topic Selector Tabs */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {topics.map((t) => {
            const isActive = t.id === activeTopicId;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTopicId(t.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-gradient-to-br from-[#10243d] to-[#0c182a] border-amber-400/80 shadow-[0_0_20px_rgba(245,158,11,0.15)] ring-1 ring-amber-400/50'
                    : 'bg-[#0b1626] border-slate-800 hover:border-slate-700 opacity-80 hover:opacity-100'
                }`}
              >
                <div>
                  <h4 className="text-sm font-bold text-white mb-2 line-clamp-2">
                    {t.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {t.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-amber-400 font-semibold">
                    {t.comments?.filter(c => c.status === 'approved').length || 0} phản hồi
                  </span>
                  <span className={`text-[10px] uppercase font-bold tracking-wider ${isActive ? 'text-amber-300' : 'text-slate-500'}`}>
                    {isActive ? 'Đang mở' : 'Xem ngay'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Topic Discussion Panel */}
        <div className="bg-[#0b1626] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          
          {/* Active Topic Banner */}
          <div className="border-b border-slate-800 pb-6 mb-8">
            <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
              Chủ Đề Đang Thảo Luận:
            </span>
            <h3 className="font-serif-display font-bold text-2xl sm:text-3xl text-white mt-1 mb-2">
              {activeTopic.title}
            </h3>
            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              {activeTopic.description}
            </p>
          </div>

          {/* Form to submit comment with 1-3 images */}
          <form onSubmit={handleSubmitComment} className="bg-[#070e1b] border border-slate-800 rounded-2xl p-5 sm:p-6 mb-10 space-y-4">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
              Gửi phản hồi của bạn vào chủ đề này
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Tên của bạn (VD: Trần Văn Đức)*"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0b1626] border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Lớp / Khóa (VD: K65 - CNTT, Cựu sinh viên...)"
                  value={authorBadge}
                  onChange={(e) => setAuthorBadge(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0b1626] border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <textarea
                rows={3}
                placeholder="Chia sẻ câu chuyện, kỷ niệm hoặc gửi lời tâm sự của bạn tại đây..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#0b1626] border border-slate-700 text-white placeholder-slate-500 text-xs leading-relaxed focus:outline-none focus:border-amber-400"
                required
              />
            </div>

            {/* Upload 1-3 Images Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0b1626] hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium cursor-pointer transition-colors">
                  <ImageIcon className="w-4 h-4 text-amber-400" />
                  <span>Đính kèm 1-3 ảnh ({attachedImages.length}/3)</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImagesUpload}
                    disabled={attachedImages.length >= 3}
                    className="hidden"
                  />
                </label>

                {/* Attached image thumbnails */}
                {attachedImages.map((img, idx) => (
                  <div key={idx} className="relative group w-10 h-10 rounded-lg overflow-hidden border border-slate-700">
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute inset-0 bg-black/60 flex items-center justify-center text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs shadow-md hover:scale-[1.02] active:scale-[0.99] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Đang gửi...' : 'Đăng Bình Luận'}</span>
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-3">
              Danh sách phản hồi ({activeTopic.comments?.filter(c => c.status === 'approved').length || 0})
            </h4>

            {(!activeTopic.comments || activeTopic.comments.filter(c => c.status === 'approved').length === 0) ? (
              <div className="text-center py-10 text-slate-500 text-xs">
                Chưa có phản hồi nào trong chủ đề này. Hãy là người đầu tiên chia sẻ!
              </div>
            ) : (
              activeTopic.comments
                .filter(c => c.status === 'approved')
                .map((cmt) => (
                  <div
                    key={cmt.id}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-[#081322] border border-slate-800/80 hover:border-slate-700/80 transition-colors"
                  >
                    {/* Avatar */}
                    <img
                      src={cmt.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(cmt.author)}`}
                      alt={cmt.author}
                      className="w-10 h-10 rounded-xl bg-slate-800 object-cover border border-slate-700 shrink-0"
                    />

                    {/* Content area */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">{cmt.author}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                            {cmt.badge}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500">{cmt.createdAt}</span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-3 whitespace-pre-line">
                        {cmt.content}
                      </p>

                      {/* Display attached images if any */}
                      {cmt.images && cmt.images.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {cmt.images.map((img, i) => (
                            <a
                              key={i}
                              href={img}
                              target="_blank"
                              rel="noreferrer"
                              className="block rounded-xl overflow-hidden border border-slate-700 hover:border-amber-400 transition-colors"
                            >
                              <img
                                src={img}
                                alt="Ảnh đính kèm"
                                className="w-24 h-24 sm:w-28 sm:h-28 object-cover hover:scale-105 transition-transform"
                              />
                            </a>
                          ))}
                        </div>
                      )}

                      {/* Comment interactions */}
                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <button
                          type="button"
                          onClick={() => onLikeComment(activeTopic.id, cmt.id)}
                          className="flex items-center gap-1.5 hover:text-rose-400 transition-colors cursor-pointer"
                        >
                          <Heart className="w-3.5 h-3.5 fill-rose-500/20 text-rose-400" />
                          <span>{cmt.likes || 0} thích</span>
                        </button>
                      </div>

                    </div>
                  </div>
                ))
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
