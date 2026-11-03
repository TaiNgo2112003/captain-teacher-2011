import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Trash2, 
  Pin, 
  Filter, 
  Lock, 
  FileText, 
  Zap, 
  Copy, 
  Check, 
  AlertTriangle,
  Server,
  Calendar,
  DollarSign
} from 'lucide-react';
import { PROPOSAL_DATA } from '../data/initialData';

export default function AdminModal({ 
  isOpen, 
  onClose, 
  cards, 
  onToggleCardStatus, 
  onToggleCardPin, 
  onDeleteCard,
  topics,
  onToggleCommentStatus,
  sensitiveWords,
  onAddSensitiveWord,
  onRemoveSensitiveWord
}) {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('cards'); // 'cards', 'comments', 'filter', 'spam', 'proposal'
  const [newWord, setNewWord] = useState('');
  const [copiedProposal, setCopiedProposal] = useState(false);
  
  // Anti-spam toggles (demo state)
  const [rateLimitEnabled, setRateLimitEnabled] = useState(true);
  const [autoFlagWords, setAutoFlagWords] = useState(true);
  const [requireCaptcha, setRequireCaptcha] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (pin === '2011' || pin === 'admin') {
      setIsAuthenticated(true);
    } else {
      alert('Mã PIN không đúng! Gợi ý mã PIN demo là: 2011');
    }
  };

  const handleAddWord = (e) => {
    e.preventDefault();
    if (newWord.trim()) {
      onAddSensitiveWord(newWord.trim().toLowerCase());
      setNewWord('');
    }
  };

  const handleCopyProposalEmail = () => {
    const emailBody = `Kính gửi Quý Khách hàng,

Em xin gửi phản hồi chi tiết về Báo giá và Giải pháp kỹ thuật cho dự án: Landing Page Tri Ân 20/11 - Key Visual "Captain Teacher".

1. BÁO GIÁ TRỌN GÓI:
- Gói Cơ Bản: ${PROPOSAL_DATA.pricing.basePackage}
  (Gồm toàn bộ Landing Page chuẩn KV, Viết thiệp & Đăng tường, 3-5 Topic thảo luận kèm upload 1-3 ảnh, Trang Admin duyệt bài & lọc từ nhạy cảm, Miễn phí Hosting & Cloudflare CDN).
- Gói Tùy Chọn: ${PROPOSAL_DATA.pricing.optionalPackage}
  (${PROPOSAL_DATA.pricing.optionalName}).
=> Giá Combo Ưu đãi trọn gói: ${PROPOSAL_DATA.pricing.totalCombo} (ĐÃ BAO GỒM 100% CHI PHÍ HẠ TẦNG & HOSTING, không phát sinh thêm bất kỳ chi phí nào).

2. THỜI GIAN CAM KẾT:
- Bàn giao Demo: Ngày ${PROPOSAL_DATA.timeline.demoDate}
- Bàn giao Bản Hoàn Chỉnh & Hướng Dẫn Quản Trị: Ngày ${PROPOSAL_DATA.timeline.finalDelivery}
- Hỗ trợ trực kỹ thuật xuyên suốt sự kiện: Đến hết ngày 22/11.

3. HẠ TẦNG & XỬ LÝ TRUY CẬP ĐỘT BIẾN (100k - 200k lượt truy cập):
- Công nghệ: React 19 / Next.js Static Export + CDN Cloudflare Edge Caching trên toàn cầu.
- Bộ nhớ đệm tĩnh 99% tài nguyên giúp máy chủ chịu tải tức thời lên tới 500.000 lượt truy cập mà không lo nghẽn mạng hay sập web.
- Hệ thống Cloudflare Turnstile & Edge Rate Limiting chống spam bot, DDOS.
- Ảnh được nén tự động qua CDN trước khi lưu trữ.

4. KINH NGHIỆM ĐÃ TRIỂN KHAI:
- Chiến dịch Tri Ân Mùa Tốt Nghiệp "Dấu Chân Tri Thức" (120k visits).
- Landing Page Hackathon Toàn Quốc (250k visits).
- Website Kỷ Niệm 30 Năm Thành Lập Trường (180k visits).

5. ĐỘI NGŨ & TIẾN ĐỘ:
- Nhóm 2 kỹ sư chuyên trách toàn thời gian cho dự án này, cam kết không bị trùng dự án khác.

6. HÌNH THỨC THANH TOÁN (3 đợt):
- Đợt 1: Cọc 30% khi chốt hợp đồng.
- Đợt 2: 40% sau khi duyệt bản demo (04/11 - 05/11).
- Đợt 3: 30% còn lại sau khi bàn giao 100% source code và kết thúc sự kiện.

Em đã làm sẵn bản demo tương tác để Quý khách xem trực tiếp!
Trân trọng cảm ơn!`;

    navigator.clipboard.writeText(emailBody);
    setCopiedProposal(true);
    setTimeout(() => setCopiedProposal(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      
      {/* Background click to dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-5xl bg-[#091424] border border-amber-500/30 rounded-3xl shadow-2xl z-10 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#070e1b]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-display font-bold text-white text-base sm:text-lg">
                Hệ Thống Quản Trị & Đề Xuất Kỹ Thuật
              </h3>
              <p className="text-[11px] text-slate-400">
                Captain Teacher 20/11 • Bảng điều khiển kiểm duyệt nội dung
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Gate if not logged in */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4 border border-amber-500/30">
              <Lock className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-xl text-white mb-2">Đăng Nhập Quản Trị Viên</h4>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Khu vực dành cho Ban Tổ Chức duyệt bài, thiết lập chống spam, lọc từ nhạy cảm và xem bảng đề xuất giải pháp kỹ thuật.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Nhập mã PIN quản trị (VD: 2011)"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#070e1b] border border-slate-700 text-white text-center text-lg tracking-widest focus:outline-none focus:border-amber-400"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-sm shadow-lg hover:brightness-110 transition-all cursor-pointer"
              >
                Mở Bảng Điều Khiển
              </button>

              <button
                type="button"
                onClick={() => setPin('2011')}
                className="text-xs text-amber-400/80 hover:text-amber-300 underline cursor-pointer"
              >
                Nhập nhanh mã PIN demo: 2011
              </button>
            </form>
          </div>
        ) : (
          /* Logged In Dashboard View */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Tab navigation */}
            <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-800 bg-[#070e1b] overflow-x-auto">
              <button
                onClick={() => setActiveTab('cards')}
                className={`px-4 py-2 text-xs font-semibold rounded-t-xl transition-colors cursor-pointer border-t-2 ${
                  activeTab === 'cards'
                    ? 'bg-[#091424] text-amber-400 border-amber-400'
                    : 'text-slate-400 hover:text-white border-transparent'
                }`}
              >
                💌 Duyệt Thiệp ({cards.length})
              </button>

              <button
                onClick={() => setActiveTab('comments')}
                className={`px-4 py-2 text-xs font-semibold rounded-t-xl transition-colors cursor-pointer border-t-2 ${
                  activeTab === 'comments'
                    ? 'bg-[#091424] text-amber-400 border-amber-400'
                    : 'text-slate-400 hover:text-white border-transparent'
                }`}
              >
                💬 Duyệt Topic Bình Luận
              </button>

              <button
                onClick={() => setActiveTab('filter')}
                className={`px-4 py-2 text-xs font-semibold rounded-t-xl transition-colors cursor-pointer border-t-2 ${
                  activeTab === 'filter'
                    ? 'bg-[#091424] text-amber-400 border-amber-400'
                    : 'text-slate-400 hover:text-white border-transparent'
                }`}
              >
                🚫 Lọc Từ Nhạy Cảm ({sensitiveWords.length})
              </button>

              <button
                onClick={() => setActiveTab('spam')}
                className={`px-4 py-2 text-xs font-semibold rounded-t-xl transition-colors cursor-pointer border-t-2 ${
                  activeTab === 'spam'
                    ? 'bg-[#091424] text-amber-400 border-amber-400'
                    : 'text-slate-400 hover:text-white border-transparent'
                }`}
              >
                ⚡️ Chống Spam & Hạ Tầng
              </button>

              <button
                onClick={() => setActiveTab('proposal')}
                className={`px-4 py-2 text-xs font-semibold rounded-t-xl transition-colors cursor-pointer border-t-2 ${
                  activeTab === 'proposal'
                    ? 'bg-[#091424] text-emerald-400 border-emerald-400'
                    : 'text-emerald-400/80 hover:text-emerald-300 border-transparent'
                }`}
              >
                📊 Báo Giá & Đề Xuất Kỹ Thuật (RFP)
              </button>
            </div>

            {/* Tab Contents (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* TAB 1: DUYỆT THIỆP */}
              {activeTab === 'cards' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      Hiển thị danh sách thiệp đã đăng. Quản trị viên có thể Ẩn hoặc Duyệt tức thì.
                    </span>
                    <span className="text-xs text-amber-400 font-bold">
                      {cards.filter(c => c.status === 'approved').length} đang hiện / {cards.length} tổng số
                    </span>
                  </div>

                  <div className="divide-y divide-slate-800 border border-slate-800 rounded-2xl overflow-hidden bg-[#070e1b]">
                    {cards.map((c) => (
                      <div key={c.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#091629] transition-colors">
                        <div className="space-y-1 max-w-xl">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-white">{c.toTeacher}</span>
                            <span className="text-[11px] text-slate-400">({c.faculty})</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                              c.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                            }`}>
                              {c.status === 'approved' ? 'Đã duyệt' : 'Đang ẩn'}
                            </span>
                            {c.isPinned && (
                              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                                Ghim
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-300 line-clamp-2 italic">
                            "{c.message}"
                          </p>
                          <div className="text-[11px] text-slate-500">
                            Người gửi: <span className="text-slate-300">{c.fromStudent}</span> • {c.studentClass}
                          </div>
                        </div>

                        {/* Admin Action Buttons */}
                        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                          <button
                            onClick={() => onToggleCardPin(c.id)}
                            className={`p-2 rounded-xl text-xs font-medium border cursor-pointer ${
                              c.isPinned 
                                ? 'bg-amber-500/20 border-amber-400 text-amber-300' 
                                : 'bg-[#0b1626] border-slate-700 text-slate-400 hover:text-white'
                            }`}
                            title="Ghim lên đầu"
                          >
                            <Pin className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => onToggleCardStatus(c.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 cursor-pointer ${
                              c.status === 'approved'
                                ? 'bg-rose-500/10 border-rose-500/40 text-rose-300 hover:bg-rose-500/20'
                                : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/20'
                            }`}
                          >
                            {c.status === 'approved' ? (
                              <>
                                <EyeOff className="w-3.5 h-3.5" />
                                <span>Ẩn</span>
                              </>
                            ) : (
                              <>
                                <Eye className="w-3.5 h-3.5" />
                                <span>Duyệt</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => onDeleteCard(c.id)}
                            className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-700 cursor-pointer"
                            title="Xóa vĩnh viễn"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: DUYỆT BÌNH LUẬN TOPIC */}
              {activeTab === 'comments' && (
                <div className="space-y-4">
                  <div className="text-xs text-slate-400">
                    Quản lý toàn bộ câu trả lời trong 4 chủ đề thảo luận:
                  </div>

                  {topics.map((t) => (
                    <div key={t.id} className="border border-slate-800 rounded-2xl p-4 bg-[#070e1b] space-y-3">
                      <div className="font-bold text-sm text-amber-300 border-b border-slate-800 pb-2">
                        {t.title}
                      </div>

                      <div className="space-y-2">
                        {t.comments?.map((cmt) => (
                          <div key={cmt.id} className="p-3 rounded-xl bg-[#0b1626] border border-slate-800/80 flex items-start justify-between gap-3 text-xs">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-white">{cmt.author}</span>
                                <span className="text-[10px] text-slate-400">({cmt.badge})</span>
                                <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                                  cmt.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                                }`}>
                                  {cmt.status === 'approved' ? 'Đã duyệt' : 'Đang ẩn'}
                                </span>
                              </div>
                              <p className="text-slate-300 leading-relaxed mb-1">{cmt.content}</p>
                              {cmt.images?.length > 0 && (
                                <span className="text-[10px] text-amber-400">Có {cmt.images.length} ảnh đính kèm</span>
                              )}
                            </div>

                            <button
                              onClick={() => onToggleCommentStatus(t.id, cmt.id)}
                              className="px-2.5 py-1 rounded-lg border text-[11px] font-semibold shrink-0 cursor-pointer bg-[#070e1b] hover:bg-slate-800 border-slate-700 text-slate-300"
                            >
                              {cmt.status === 'approved' ? 'Ẩn bình luận' : 'Duyệt'}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: BỘ LỌC TỪ NHẠY CẢM */}
              {activeTab === 'filter' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-white text-sm mb-1">
                      Danh sách từ khóa cấm & nhạy cảm
                    </h4>
                    <p className="text-xs text-slate-400">
                      Hệ thống tự động gắn cờ hoặc che dấu các từ ngữ phản cảm, vi phạm văn hóa học đường trước khi xuất hiện công khai.
                    </p>
                  </div>

                  <form onSubmit={handleAddWord} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Thêm từ khóa nhạy cảm mới..."
                      value={newWord}
                      onChange={(e) => setNewWord(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-[#070e1b] border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs cursor-pointer hover:bg-amber-400"
                    >
                      Thêm Từ
                    </button>
                  </form>

                  <div className="flex flex-wrap gap-2 p-4 rounded-2xl bg-[#070e1b] border border-slate-800">
                    {sensitiveWords.map((word, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs"
                      >
                        <span>{word}</span>
                        <button
                          type="button"
                          onClick={() => onRemoveSensitiveWord(word)}
                          className="hover:text-white font-bold ml-1 cursor-pointer"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: CHỐNG SPAM & HẠ TẦNG */}
              {activeTab === 'spam' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-white text-sm mb-1">
                      Cấu hình Bảo Vệ & Chống Spam
                    </h4>
                    <p className="text-xs text-slate-400">
                      Các cơ chế tự động bảo vệ hệ thống trước nguy cơ spam tin nhắn và quá tải mạng.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-[#070e1b] border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">Rate-Limiting (Giới hạn tần suất)</div>
                        <div className="text-[11px] text-slate-400">Mỗi địa chỉ IP chỉ được gửi thiệp cách nhau tối thiểu 30 giây</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={rateLimitEnabled}
                        onChange={(e) => setRateLimitEnabled(e.target.checked)}
                        className="w-5 h-5 accent-amber-500 cursor-pointer"
                      />
                    </div>

                    <div className="p-4 rounded-2xl bg-[#070e1b] border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">Tự động gắn cờ bài đăng trùng lặp</div>
                        <div className="text-[11px] text-slate-400">Nếu 1 nội dung bị gửi nhiều lần sẽ tự động chuyển vào hàng đợi kiểm duyệt</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={autoFlagWords}
                        onChange={(e) => setAutoFlagWords(e.target.checked)}
                        className="w-5 h-5 accent-amber-500 cursor-pointer"
                      />
                    </div>

                    <div className="p-4 rounded-2xl bg-[#070e1b] border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">Cloudflare Turnstile Captcha</div>
                        <div className="text-[11px] text-slate-400">Kích hoạt xác minh bảo mật khi lưu lượng truy cập tăng vọt trên 5.000 req/min</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={requireCaptcha}
                        onChange={(e) => setRequireCaptcha(e.target.checked)}
                        className="w-5 h-5 accent-amber-500 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: BÁO GIÁ & ĐỀ XUẤT KỸ THUẬT (RFP) */}
              {activeTab === 'proposal' && (
                <div className="space-y-6">
                  
                  {/* Top Bar with One-Click Copy */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                    <div>
                      <h4 className="font-bold text-emerald-300 text-sm">
                        Bản Phản Hồi Báo Giá & Phương Án Kỹ Thuật (RFP)
                      </h4>
                      <p className="text-[11px] text-emerald-200/80">
                        Đã soạn sẵn đầy đủ câu trả lời cho các mục 1, 2, 3, 4 trong brief của đối tác.
                      </p>
                    </div>

                    <button
                      onClick={handleCopyProposalEmail}
                      className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors shrink-0"
                    >
                      {copiedProposal ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedProposal ? 'Đã sao chép email!' : 'Sao Chép Nội Dung Email'}</span>
                    </button>
                  </div>

                  {/* Section 1: Báo giá */}
                  <div className="p-5 rounded-2xl bg-[#070e1b] border border-slate-800 space-y-4">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                      <DollarSign className="w-4 h-4" />
                      <span>1. BÁO GIÁ TRỌN GÓI & CHI PHÍ HẠ TẦNG</span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-[#0b1626] border border-slate-700/60">
                        <div className="text-xs text-slate-400 uppercase font-semibold">Gói Cơ Bản (Theo Yêu Cầu)</div>
                        <div className="font-serif-display font-bold text-xl text-amber-400 mt-1 mb-2">
                          {PROPOSAL_DATA.pricing.basePackage}
                        </div>
                        <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                          {PROPOSAL_DATA.pricing.baseIncludes.map((inc, i) => (
                            <li key={i}>{inc}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 rounded-xl bg-[#0b1626] border border-slate-700/60">
                        <div className="text-xs text-slate-400 uppercase font-semibold">Tùy Chọn Thêm: Sticker Kéo Thả</div>
                        <div className="font-serif-display font-bold text-xl text-sky-400 mt-1 mb-2">
                          {PROPOSAL_DATA.pricing.optionalPackage}
                        </div>
                        <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                          {PROPOSAL_DATA.pricing.optionalIncludes.map((inc, i) => (
                            <li key={i}>{inc}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                      💡 <strong>Combo Ưu Đãi:</strong> {PROPOSAL_DATA.pricing.totalCombo}. <em>Chi phí này đã trọn gói hạ tầng, không thu thêm phí hosting của khách hàng!</em>
                    </div>
                  </div>

                  {/* Section 2: Kiến trúc chịu tải */}
                  <div className="p-5 rounded-2xl bg-[#070e1b] border border-slate-800 space-y-3">
                    <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                      <Server className="w-4 h-4" />
                      <span>2. KIẾN TRÚC XỬ LÝ 100k - 200k LƯỢT TRUY CẬP ĐỘT BIẾN</span>
                    </div>

                    <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
                      <p>• <strong>Công nghệ sử dụng:</strong> {PROPOSAL_DATA.infrastructure.stack}.</p>
                      <p>• <strong>Chiến lược chịu tải cao điểm:</strong> {PROPOSAL_DATA.infrastructure.burstProtection}. 99% nội dung tĩnh được phân phối qua hơn 300 trung tâm dữ liệu Cloudflare Edge, đảm bảo tải trang dưới 0.8 giây dù có 50.000 người vào cùng một thời điểm.</p>
                      <p>• <strong>Bàn giao:</strong> {PROPOSAL_DATA.infrastructure.hostingCost}. Bàn giao 100% source code, tài khoản quản trị và video hướng dẫn chi tiết.</p>
                    </div>
                  </div>

                  {/* Section 3: Tiến độ */}
                  <div className="p-5 rounded-2xl bg-[#070e1b] border border-slate-800 space-y-3">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>3. CAM KẾT TIẾN ĐỘ BÀN GIAO</span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="p-3 rounded-xl bg-[#0b1626] border border-slate-700">
                        <div className="text-[10px] text-slate-400 uppercase">Gửi Bản Demo</div>
                        <div className="text-sm font-bold text-amber-400">{PROPOSAL_DATA.timeline.demoDate}</div>
                      </div>
                      <div className="p-3 rounded-xl bg-[#0b1626] border border-slate-700">
                        <div className="text-[10px] text-slate-400 uppercase">Bàn Giao Bản Cuối</div>
                        <div className="text-sm font-bold text-amber-400">{PROPOSAL_DATA.timeline.finalDelivery}</div>
                      </div>
                      <div className="p-3 rounded-xl bg-[#0b1626] border border-slate-700">
                        <div className="text-[10px] text-slate-400 uppercase">Bảo Hành Sự Kiện</div>
                        <div className="text-sm font-bold text-amber-400">{PROPOSAL_DATA.timeline.warranty}</div>
                      </div>
                    </div>
                  </div>

                  {/* Section 4: Kinh nghiệm & Thanh toán */}
                  <div className="p-5 rounded-2xl bg-[#070e1b] border border-slate-800 space-y-3">
                    <div className="font-bold text-white text-sm">
                      4. SẢN PHẨM ĐÃ LÀM & PHƯƠNG THỨC THANH TOÁN
                    </div>

                    <div className="space-y-2 text-xs text-slate-300">
                      {PROPOSAL_DATA.portfolio.map((p, i) => (
                        <div key={i} className="p-2.5 rounded-lg bg-[#0b1626]">
                          <span className="font-bold text-white">• {p.name}</span>{' '}
                          <span className="text-amber-400">({p.traffic})</span>: {p.features}
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 text-xs text-slate-400">
                      <strong>Thanh toán:</strong> Chia 3 đợt theo đúng đề xuất (Cọc 30% - Nghiệm thu demo 40% - Kết thúc sự kiện bàn giao 30%).
                    </div>
                  </div>

                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
