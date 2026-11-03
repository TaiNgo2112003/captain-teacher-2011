import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Trash2, 
  Pin, 
  Lock, 
  Copy, 
  Check, 
  DollarSign, 
  Server
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
  
  const [rateLimitEnabled, setRateLimitEnabled] = useState(true);
  const [autoFlagWords, setAutoFlagWords] = useState(true);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (pin === '2011' || pin === 'admin') {
      setIsAuthenticated(true);
    } else {
      alert('Mã PIN không đúng! Gợi ý mã PIN demo: 2011');
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
    const emailBody = `Kính gửi Quý Đối tác,

Em xin gửi phản hồi chi tiết về Báo giá và Giải pháp kỹ thuật cho dự án: Landing Page Tri Ân 20/11 - Key Visual "Captain Teacher" (The Captain’s Journal).

1. BÁO GIÁ TRỌN GÓI:
- Gói Cơ Bản: ${PROPOSAL_DATA.pricing.basePackage}
  (Gồm toàn bộ Landing Page chuẩn KV The Captain’s Journal, Postcard Studio viết & lưu bưu thiếp thời gian thực, 4 Chủ đề ký ức kèm upload 1-3 ảnh, Trang Admin duyệt bài & lọc từ nhạy cảm, Miễn phí Hosting & Cloudflare Edge CDN).
- Gói Tùy Chọn: ${PROPOSAL_DATA.pricing.optionalPackage}
  (${PROPOSAL_DATA.pricing.optionalName}).
=> Giá Combo Ưu đãi trọn gói: ${PROPOSAL_DATA.pricing.totalCombo} (ĐÃ BAO GỒM 100% CHI PHÍ HẠ TẦNG & HOSTING, không phát sinh chi phí).

2. THỜI GIAN CAM KẾT:
- Bàn giao Demo: Ngày ${PROPOSAL_DATA.timeline.demoDate}
- Bàn giao Bản Hoàn Chỉnh: Ngày ${PROPOSAL_DATA.timeline.finalDelivery}
- Hỗ trợ trực kỹ thuật: Đến hết ngày 22/11.

3. HẠ TẦNG & CHỊU TẢI (100.000 - 200.000 lượt truy cập):
- Công nghệ: React 19 / Vite Static + CDN Cloudflare Edge Caching trên 300+ PoPs toàn cầu.
- Bộ nhớ đệm tĩnh 99% tài nguyên giúp hệ thống chịu tải tức thời lên tới 500.000 lượt truy cập mà không lo nghẽn mạng hay sập web.
- Cloudflare Turnstile & Edge Rate Limiting chống spam bot, DDOS.

4. KINH NGHIỆM ĐÃ TRIỂN KHAI:
- Chiến dịch Tri Ân "Dấu Chân Tri Thức" (120k visits).
- Landing Page Hackathon Sinh Viên Toàn Quốc (250k visits).
- Website Kỷ Niệm 30 Năm Thành Lập Trường (180k visits).

5. ĐỘI NGŨ & TIẾN ĐỘ:
- Nhóm 2 kỹ sư chuyên trách toàn thời gian cho dự án này, cam kết không bị trùng dự án khác.

6. HÌNH THỨC THANH TOÁN (3 đợt):
- Đợt 1: Cọc 30% khi chốt hợp đồng.
- Đợt 2: 40% sau khi nghiệm thu bản demo (04/11 - 05/11).
- Đợt 3: 30% còn lại sau khi bàn giao 100% source code và kết thúc sự kiện.

Em đã hoàn thiện bản demo tương tác để Quý khách xem trực tiếp!
Trân trọng cảm ơn!`;

    navigator.clipboard.writeText(emailBody);
    setCopiedProposal(true);
    setTimeout(() => setCopiedProposal(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#11263B]/85 backdrop-blur-sm animate-fadeIn">
      
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-[#FAF7F2] border border-[#D3C6B3] rounded-2xl shadow-2xl z-10 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D3C6B3] bg-[#F5F0E7]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-[#B39765] flex items-center justify-center text-[#B39765]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-editorial font-bold text-sm sm:text-base text-[#11263B]">
                Bảng Điều Khiển Kiểm Duyệt & Kỹ Thuật
              </h3>
              <p className="text-[10px] text-[#5C6A79]">
                The Captain’s Journal • Quản trị nội dung 20/11
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#5C6A79] hover:text-[#11263B] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Gate */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-sm mx-auto my-auto">
            <div className="w-12 h-12 rounded-full border border-[#B39765] flex items-center justify-center mx-auto mb-4 text-[#B39765]">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="font-editorial font-bold text-lg text-[#11263B] mb-2">Đăng Nhập Quản Trị</h4>
            <p className="text-xs text-[#5C6A79] mb-6 leading-relaxed">
              Khu vực dành cho Ban Tổ Chức duyệt bưu thiếp, thiết lập bộ lọc từ nhạy cảm và xem đề xuất kỹ thuật.
            </p>

            <form onSubmit={handleLogin} className="space-y-3">
              <input
                type="password"
                placeholder="Nhập mã PIN (VD: 2011)"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F5F0E7] border border-[#D3C6B3] text-[#11263B] text-center text-base tracking-widest focus:outline-none focus:border-[#11263B]"
                autoFocus
              />

              <button
                type="submit"
                className="w-full py-2.5 rounded-full bg-[#11263B] text-[#F5F0E7] font-semibold text-xs uppercase tracking-wider hover:bg-[#18334E] transition-all cursor-pointer"
              >
                Mở Bảng Điều Khiển
              </button>

              <button
                type="button"
                onClick={() => setPin('2011')}
                className="text-[11px] text-[#B9685C] underline cursor-pointer"
              >
                Điền nhanh mã PIN demo: 2011
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Tabs */}
            <div className="flex items-center gap-1 px-6 pt-3 border-b border-[#D3C6B3] bg-[#F5F0E7] overflow-x-auto text-xs">
              <button
                onClick={() => setActiveTab('cards')}
                className={`px-3 py-2 font-medium rounded-t-lg transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'cards'
                    ? 'border-[#11263B] text-[#11263B] font-semibold bg-[#FAF7F2]'
                    : 'border-transparent text-[#5C6A79]'
                }`}
              >
                Bưu Thiếp ({cards.length})
              </button>

              <button
                onClick={() => setActiveTab('comments')}
                className={`px-3 py-2 font-medium rounded-t-lg transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'comments'
                    ? 'border-[#11263B] text-[#11263B] font-semibold bg-[#FAF7F2]'
                    : 'border-transparent text-[#5C6A79]'
                }`}
              >
                Ký Ức Giảng Đường
              </button>

              <button
                onClick={() => setActiveTab('filter')}
                className={`px-3 py-2 font-medium rounded-t-lg transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'filter'
                    ? 'border-[#11263B] text-[#11263B] font-semibold bg-[#FAF7F2]'
                    : 'border-transparent text-[#5C6A79]'
                }`}
              >
                Lọc Từ Nhạy Cảm ({sensitiveWords.length})
              </button>

              <button
                onClick={() => setActiveTab('spam')}
                className={`px-3 py-2 font-medium rounded-t-lg transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'spam'
                    ? 'border-[#11263B] text-[#11263B] font-semibold bg-[#FAF7F2]'
                    : 'border-transparent text-[#5C6A79]'
                }`}
              >
                Chống Spam
              </button>

              <button
                onClick={() => setActiveTab('proposal')}
                className={`px-3 py-2 font-medium rounded-t-lg transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'proposal'
                    ? 'border-[#B9685C] text-[#B9685C] font-semibold bg-[#FAF7F2]'
                    : 'border-transparent text-[#B9685C]/75'
                }`}
              >
                Đề Xuất Kỹ Thuật (RFP)
              </button>
            </div>

            {/* Tab Contents */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs text-[#1C2A39]">
              
              {/* TAB 1: DUYỆT BƯU THIẾP */}
              {activeTab === 'cards' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[#5C6A79]">
                    <span>Quản lý bưu thiếp công khai trên tường tri ân:</span>
                    <span className="font-mono font-bold text-[#11263B]">
                      {cards.filter(c => c.status === 'approved').length} đang hiện / {cards.length} tổng
                    </span>
                  </div>

                  <div className="divide-y divide-[#D3C6B3]/60 border border-[#D3C6B3] rounded-xl overflow-hidden bg-[#FAF7F2]">
                    {cards.map((c) => (
                      <div key={c.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#F5F0E7] transition-colors">
                        <div className="space-y-1 max-w-lg">
                          <div className="flex items-center gap-2">
                            <span className="font-editorial font-bold text-[#11263B]">{c.toTeacher}</span>
                            <span className="text-[11px] text-[#5C6A79]">({c.faculty})</span>
                            <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                              c.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              {c.status === 'approved' ? 'Hiển thị' : 'Đang ẩn'}
                            </span>
                            {c.isPinned && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-bold">
                                Ghim
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#1C2A39]/80 italic line-clamp-2">
                            “{c.message}”
                          </p>
                          <div className="text-[10px] text-[#8C98A4]">
                            Từ: {c.fromStudent} • {c.studentClass}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                          <button
                            onClick={() => onToggleCardPin(c.id)}
                            className={`p-1.5 rounded-lg border cursor-pointer ${
                              c.isPinned 
                                ? 'bg-[#B39765]/20 border-[#B39765] text-[#11263B]' 
                                : 'bg-[#F5F0E7] border-[#D3C6B3] text-[#8C98A4]'
                            }`}
                            title="Ghim nổi bật"
                          >
                            <Pin className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => onToggleCardStatus(c.id)}
                            className={`px-2.5 py-1 rounded-lg border font-medium flex items-center gap-1 cursor-pointer ${
                              c.status === 'approved'
                                ? 'bg-rose-50 border-rose-200 text-rose-700'
                                : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                            }`}
                          >
                            {c.status === 'approved' ? (
                              <>
                                <EyeOff className="w-3 h-3" />
                                <span>Ẩn</span>
                              </>
                            ) : (
                              <>
                                <Eye className="w-3 h-3" />
                                <span>Duyệt</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => onDeleteCard(c.id)}
                            className="p-1.5 rounded-lg bg-[#F5F0E7] hover:bg-rose-50 text-[#8C98A4] hover:text-rose-700 border border-[#D3C6B3] cursor-pointer"
                            title="Xóa vĩnh viễn"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
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
                  {topics.map((t) => (
                    <div key={t.id} className="border border-[#D3C6B3] rounded-xl p-4 bg-[#FAF7F2] space-y-3">
                      <div className="font-editorial font-bold text-xs text-[#11263B] border-b border-[#D3C6B3]/60 pb-2">
                        {t.title}
                      </div>

                      <div className="space-y-2">
                        {t.comments?.map((cmt) => (
                          <div key={cmt.id} className="p-3 rounded-lg bg-[#F5F0E7] border border-[#D3C6B3]/60 flex items-start justify-between gap-3 text-xs">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-[#11263B]">{cmt.author}</span>
                                <span className="text-[10px] text-[#5C6A79]">({cmt.badge})</span>
                                <span className={`text-[8px] px-1 py-0.2 rounded font-bold uppercase ${
                                  cmt.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                                }`}>
                                  {cmt.status === 'approved' ? 'Đã duyệt' : 'Đang ẩn'}
                                </span>
                              </div>
                              <p className="text-[#1C2A39] leading-relaxed italic">“{cmt.content}”</p>
                            </div>

                            <button
                              onClick={() => onToggleCommentStatus(t.id, cmt.id)}
                              className="px-2 py-1 rounded border border-[#D3C6B3] bg-[#FAF7F2] text-[10px] font-semibold shrink-0 cursor-pointer"
                            >
                              {cmt.status === 'approved' ? 'Ẩn' : 'Duyệt'}
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
                <div className="space-y-4">
                  <p className="text-xs text-[#5C6A79]">
                    Hệ thống tự động che dấu bằng dấu hoa thị <code>***</code> những từ ngữ không phù hợp với thuần phong mỹ tục giảng đường.
                  </p>

                  <form onSubmit={handleAddWord} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Thêm từ khóa nhạy cảm..."
                      value={newWord}
                      onChange={(e) => setNewWord(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg bg-[#F5F0E7] border border-[#D3C6B3] text-xs focus:outline-none focus:border-[#11263B]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-[#11263B] text-[#F5F0E7] font-semibold text-xs cursor-pointer"
                    >
                      Thêm
                    </button>
                  </form>

                  <div className="flex flex-wrap gap-2 p-4 rounded-xl bg-[#FAF7F2] border border-[#D3C6B3]">
                    {sensitiveWords.map((word, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs"
                      >
                        <span>{word}</span>
                        <button
                          type="button"
                          onClick={() => onRemoveSensitiveWord(word)}
                          className="hover:text-black font-bold ml-1 cursor-pointer"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: CHỐNG SPAM */}
              {activeTab === 'spam' && (
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#D3C6B3] flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-[#11263B]">Rate-Limiting (Giới hạn tần suất)</div>
                      <div className="text-[11px] text-[#5C6A79]">Mỗi địa chỉ IP chỉ được gửi bưu thiếp cách nhau tối thiểu 30 giây</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={rateLimitEnabled}
                      onChange={(e) => setRateLimitEnabled(e.target.checked)}
                      className="w-4 h-4 accent-[#11263B]"
                    />
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#D3C6B3] flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-[#11263B]">Gắn cờ nội dung trùng lặp</div>
                      <div className="text-[11px] text-[#5C6A79]">Tự động chuyển vào hàng đợi kiểm duyệt nếu phát hiện spam trùng nội dung</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={autoFlagWords}
                      onChange={(e) => setAutoFlagWords(e.target.checked)}
                      className="w-4 h-4 accent-[#11263B]"
                    />
                  </div>
                </div>
              )}

              {/* TAB 5: BÁO GIÁ & KỸ THUẬT (RFP) */}
              {activeTab === 'proposal' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-[#B39765]/15 border border-[#B39765]/30">
                    <div>
                      <h4 className="font-editorial font-bold text-sm text-[#11263B]">
                        Bản Đề Xuất Báo Giá & Kiến Trúc Chịu Tải 200.000 Visits
                      </h4>
                      <p className="text-[11px] text-[#5C6A79]">
                        Đã sẵn sàng nội dung phản hồi các mục 1, 2, 3, 4 trong brief khách hàng.
                      </p>
                    </div>

                    <button
                      onClick={handleCopyProposalEmail}
                      className="px-4 py-2 rounded-full bg-[#11263B] text-[#F5F0E7] font-semibold text-xs flex items-center gap-1.5 cursor-pointer hover:bg-[#18334E] transition-colors"
                    >
                      {copiedProposal ? <Check className="w-3.5 h-3.5 text-[#B39765]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedProposal ? 'Đã sao chép' : 'Sao chép email phản hồi'}</span>
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#D3C6B3] space-y-3">
                    <div className="flex items-center gap-1.5 font-bold text-xs text-[#11263B]">
                      <DollarSign className="w-4 h-4 text-[#B39765]" />
                      <span>BÁO GIÁ TRỌN GÓI</span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-lg bg-[#F5F0E7] border border-[#D3C6B3]/60">
                        <div className="font-bold text-[#11263B]">Gói Cơ Bản: {PROPOSAL_DATA.pricing.basePackage}</div>
                        <p className="text-[11px] text-[#5C6A79] mt-1">Đầy đủ tính năng, miễn phí 100% hosting & CDN Cloudflare.</p>
                      </div>
                      <div className="p-3 rounded-lg bg-[#F5F0E7] border border-[#D3C6B3]/60">
                        <div className="font-bold text-[#11263B]">Tùy chọn thêm: {PROPOSAL_DATA.pricing.optionalPackage}</div>
                        <p className="text-[11px] text-[#5C6A79] mt-1">Mô-đun con tem/dấu mộc kéo thả & xuất ảnh bưu thiếp HD.</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#D3C6B3] space-y-2">
                    <div className="flex items-center gap-1.5 font-bold text-xs text-[#11263B]">
                      <Server className="w-4 h-4 text-[#B39765]" />
                      <span>GIẢI PHÁP HẠ TẦNG CHỊU TẢI 200K VISITS</span>
                    </div>
                    <p className="text-xs text-[#5C6A79] leading-relaxed">
                      Phân phối 99% tài nguyên tĩnh qua 300+ Edge Data Centers của Cloudflare. Thời gian phản hồi &lt;0.8 giây, an toàn tuyệt đối trước lưu lượng truy cập tăng vọt.
                    </p>
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
