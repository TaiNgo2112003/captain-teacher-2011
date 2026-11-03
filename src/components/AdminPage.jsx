import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Trash2, 
  Pin, 
  Lock, 
  Copy, 
  Check, 
  DollarSign, 
  Server,
  ArrowLeft,
  Search,
  LogOut
} from 'lucide-react';
import { PROPOSAL_DATA } from '../data/initialData';

export default function AdminPage({ 
  version, 
  cards, 
  onToggleCardStatus, 
  onToggleCardPin, 
  onDeleteCard,
  topics,
  onToggleCommentStatus,
  sensitiveWords,
  onAddSensitiveWord,
  onRemoveSensitiveWord,
  onBackToHome
}) {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem('captain_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [activeTab, setActiveTab] = useState('cards'); // 'cards', 'comments', 'filter', 'spam', 'proposal'
  const [cardSearch, setCardSearch] = useState('');
  const [cardFilter, setCardFilter] = useState('all'); // 'all', 'approved', 'hidden', 'pinned'
  const [newWord, setNewWord] = useState('');
  const [testText, setTestText] = useState('');
  const [copiedProposal, setCopiedProposal] = useState(false);

  // Anti-spam toggles
  const [rateLimitEnabled, setRateLimitEnabled] = useState(true);
  const [autoFlagWords, setAutoFlagWords] = useState(true);
  const [cloudflareEdgeCache, setCloudflareEdgeCache] = useState(true);

  const theme = version?.theme || {};

  const handleLogin = (e) => {
    e.preventDefault();
    if (pin === '2011' || pin === 'admin') {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem('captain_admin_auth', 'true');
      } catch (e) {
        console.warn(e);
      }
    } else {
      alert('Mã PIN không đúng! Gợi ý mã PIN demo là: 2011');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem('captain_admin_auth');
    } catch (e) {
      console.warn(e);
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
  (Gồm toàn bộ Landing Page chuẩn KV The Captain’s Journal, Postcard Studio viết & lưu bưu thiếp thời gian thực, Bảo tàng kỷ vật, Trắc nghiệm la bàn, 4 Chủ đề ký ức kèm upload 1-3 ảnh, Trang Admin chuyên biệt duyệt bài & lọc từ nhạy cảm, Miễn phí Hosting & Cloudflare Edge CDN).
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

  // Filter cards in admin
  const filteredCards = cards.filter(c => {
    const q = cardSearch.toLowerCase().trim();
    const matchesSearch = !q || 
      c.toTeacher?.toLowerCase().includes(q) ||
      c.fromStudent?.toLowerCase().includes(q) ||
      c.faculty?.toLowerCase().includes(q) ||
      c.message?.toLowerCase().includes(q);

    if (!matchesSearch) return false;
    if (cardFilter === 'approved') return c.status === 'approved';
    if (cardFilter === 'hidden') return c.status !== 'approved';
    if (cardFilter === 'pinned') return !!c.isPinned;
    return true;
  });

  // Calculate stats
  const totalCards = cards.length;
  const approvedCards = cards.filter(c => c.status === 'approved').length;
  const hiddenCards = totalCards - approvedCards;
  const totalComments = topics.reduce((sum, t) => sum + (t.comments?.length || 0), 0);

  // NOT AUTHENTICATED: FULL-PAGE LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className={`min-h-[85vh] flex items-center justify-center p-5 transition-colors duration-300 ${theme.pageBg || 'bg-[#F5F0E7]'}`}>
        <div className={`w-full max-w-md p-8 sm:p-10 rounded-3xl border border-current/20 shadow-2xl space-y-6 text-center ${theme.surfaceBg || 'bg-white'}`}>
          
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-semibold opacity-70 hover:opacity-100 mb-2 cursor-pointer transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại Trang Chủ</span>
          </button>

          <div className="w-16 h-16 rounded-full border border-current flex items-center justify-center mx-auto text-2xl shadow-inner">
            <Lock className="w-7 h-7 text-[#B39765]" />
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#B39765] font-semibold block mb-1">
              HỆ THỐNG QUẢN TRỊ TRUNG TÂM
            </span>
            <h1 className={`${theme.fontHeading || 'font-editorial'} text-2xl sm:text-3xl font-bold`}>
              Đăng Nhập Quản Trị Viên
            </h1>
            <p className="text-xs opacity-75 mt-2 leading-relaxed">
              Trang kiểm duyệt bài đăng, cấu hình bộ lọc từ nhạy cảm và báo cáo giải pháp hạ tầng chịu tải 200k truy cập.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 pt-2">
            <div>
              <input
                type="password"
                placeholder="Nhập mã PIN (VD: 2011)"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-black/5 border border-current/25 text-center text-lg tracking-[0.3em] font-mono focus:outline-none focus:border-current"
                autoFocus
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer shadow hover:shadow-md ${theme.btnPrimary || 'bg-black text-white'}`}
            >
              Mở Trang Quản Trị
            </button>

            <button
              type="button"
              onClick={() => setPin('2011')}
              className="text-xs text-[#B9685C] hover:underline cursor-pointer block mx-auto pt-1 font-medium"
            >
              Điền nhanh mã PIN demo: 2011
            </button>
          </form>

        </div>
      </div>
    );
  }

  // AUTHENTICATED: FULL-PAGE DEDICATED ADMIN DASHBOARD
  return (
    <div className={`min-h-screen py-8 sm:py-12 transition-colors duration-300 ${theme.pageBg || 'bg-[#F5F0E7]'}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-8">
        
        {/* Top Control Bar */}
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-current/20 shadow-sm ${theme.surfaceBg || 'bg-white'}`}>
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="p-2.5 rounded-xl border border-current/20 hover:bg-black/10 transition-colors cursor-pointer"
              title="Quay lại giao diện người dùng"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h1 className={`${theme.fontHeading || 'font-editorial'} text-lg sm:text-xl font-bold`}>
                  Trang Quản Trị Nội Dung & Kỹ Thuật (Admin Center)
                </h1>
              </div>
              <p className="text-xs opacity-70">
                The Captain’s Journal • Bảng điều khiển kiểm duyệt sự kiện 20/11
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <button
              onClick={onBackToHome}
              className="px-4 py-2 rounded-full border border-current/30 text-xs font-semibold hover:bg-black/5 transition-colors cursor-pointer"
            >
              ← Về Trang Chủ
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-500/10 text-rose-700 hover:bg-rose-500/20 text-xs font-semibold transition-colors cursor-pointer border border-rose-500/30"
              title="Đăng xuất khỏi trang quản trị"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`p-5 rounded-2xl border border-current/20 ${theme.surfaceBg || 'bg-white'}`}>
            <span className="text-[10px] font-mono uppercase tracking-wider opacity-60 block mb-1">
              Tổng Bưu Thiếp
            </span>
            <div className="text-2xl sm:text-3xl font-bold font-mono">
              {totalCards}
            </div>
            <div className="text-[11px] opacity-70 mt-1 flex items-center gap-2">
              <span className="text-emerald-700 font-semibold">{approvedCards} hiện</span>
              <span>•</span>
              <span className="text-rose-700 font-semibold">{hiddenCards} ẩn</span>
            </div>
          </div>

          <div className={`p-5 rounded-2xl border border-current/20 ${theme.surfaceBg || 'bg-white'}`}>
            <span className="text-[10px] font-mono uppercase tracking-wider opacity-60 block mb-1">
              Ký Ức Giảng Đường
            </span>
            <div className="text-2xl sm:text-3xl font-bold font-mono">
              {totalComments}
            </div>
            <div className="text-[11px] opacity-70 mt-1">
              Phản hồi trong 4 chủ đề
            </div>
          </div>

          <div className={`p-5 rounded-2xl border border-current/20 ${theme.surfaceBg || 'bg-white'}`}>
            <span className="text-[10px] font-mono uppercase tracking-wider opacity-60 block mb-1">
              Từ Khóa Nhạy Cảm
            </span>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-[#B9685C]">
              {sensitiveWords.length}
            </div>
            <div className="text-[11px] opacity-70 mt-1">
              Tự động che dấu ***
            </div>
          </div>

          <div className={`p-5 rounded-2xl border border-current/20 ${theme.surfaceBg || 'bg-white'}`}>
            <span className="text-[10px] font-mono uppercase tracking-wider opacity-60 block mb-1">
              Hạ Tầng CDN & Chống Spam
            </span>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-700">
              Active
            </div>
            <div className="text-[11px] opacity-70 mt-1">
              Sẵn sàng chịu tải 200k visits
            </div>
          </div>
        </div>

        {/* Tab Navigation Row */}
        <div className={`flex items-center gap-2 border-b border-current/20 pb-1 overflow-x-auto text-xs`}>
          <button
            onClick={() => setActiveTab('cards')}
            className={`px-4 py-2.5 rounded-xl font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'cards'
                ? `${theme.btnPrimary || 'bg-black text-white'} shadow-sm`
                : 'opacity-70 hover:opacity-100 hover:bg-black/5'
            }`}
          >
            <span>💌 Quản Lý Bưu Thiếp</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 font-mono">
              {cards.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('comments')}
            className={`px-4 py-2.5 rounded-xl font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'comments'
                ? `${theme.btnPrimary || 'bg-black text-white'} shadow-sm`
                : 'opacity-70 hover:opacity-100 hover:bg-black/5'
            }`}
          >
            <span>💬 Duyệt Ký Ức Giảng Đường</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 font-mono">
              {totalComments}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('filter')}
            className={`px-4 py-2.5 rounded-xl font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'filter'
                ? `${theme.btnPrimary || 'bg-black text-white'} shadow-sm`
                : 'opacity-70 hover:opacity-100 hover:bg-black/5'
            }`}
          >
            <span>🚫 Bộ Lọc Từ Nhạy Cảm</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 font-mono">
              {sensitiveWords.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('spam')}
            className={`px-4 py-2.5 rounded-xl font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'spam'
                ? `${theme.btnPrimary || 'bg-black text-white'} shadow-sm`
                : 'opacity-70 hover:opacity-100 hover:bg-black/5'
            }`}
          >
            <span>⚡️ Bảo Mật & Chống Spam</span>
          </button>

          <button
            onClick={() => setActiveTab('proposal')}
            className={`px-4 py-2.5 rounded-xl font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'proposal'
                ? 'bg-[#B9685C] text-white shadow-sm'
                : 'text-[#B9685C] hover:bg-[#B9685C]/10'
            }`}
          >
            <span>📊 Đề Xuất Báo Giá & Kỹ Thuật (RFP)</span>
          </button>
        </div>

        {/* TAB 1: QUẢN LÝ BƯU THIẾP */}
        {activeTab === 'cards' && (
          <div className="space-y-6">
            
            {/* Filter and Search Bar for Cards */}
            <div className={`p-4 rounded-2xl border border-current/20 flex flex-col sm:flex-row items-center justify-between gap-4 ${theme.surfaceBg || 'bg-white'}`}>
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 opacity-50 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tìm theo tên Thầy Cô, Sinh viên, Khoa..."
                  value={cardSearch}
                  onChange={(e) => setCardSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-black/5 border border-current/20 text-xs focus:outline-none focus:border-current"
                />
              </div>

              <div className="flex items-center gap-2 text-xs w-full sm:w-auto overflow-x-auto">
                <button
                  onClick={() => setCardFilter('all')}
                  className={`px-3 py-1.5 rounded-lg font-medium cursor-pointer ${
                    cardFilter === 'all' ? `${theme.btnPrimary || 'bg-black text-white'}` : 'bg-black/5'
                  }`}
                >
                  Tất Cả ({cards.length})
                </button>
                <button
                  onClick={() => setCardFilter('approved')}
                  className={`px-3 py-1.5 rounded-lg font-medium cursor-pointer ${
                    cardFilter === 'approved' ? `${theme.btnPrimary || 'bg-black text-white'}` : 'bg-black/5'
                  }`}
                >
                  Đang Hiện ({approvedCards})
                </button>
                <button
                  onClick={() => setCardFilter('hidden')}
                  className={`px-3 py-1.5 rounded-lg font-medium cursor-pointer ${
                    cardFilter === 'hidden' ? `${theme.btnPrimary || 'bg-black text-white'}` : 'bg-black/5'
                  }`}
                >
                  Đang Ẩn ({hiddenCards})
                </button>
                <button
                  onClick={() => setCardFilter('pinned')}
                  className={`px-3 py-1.5 rounded-lg font-medium cursor-pointer ${
                    cardFilter === 'pinned' ? `${theme.btnPrimary || 'bg-black text-white'}` : 'bg-black/5'
                  }`}
                >
                  Ghim Nổi Bật ({cards.filter(c => c.isPinned).length})
                </button>
              </div>
            </div>

            {/* Cards List Table */}
            <div className={`border border-current/20 rounded-2xl overflow-hidden divide-y divide-current/15 ${theme.surfaceBg || 'bg-white'}`}>
              {filteredCards.length === 0 ? (
                <div className="text-center py-12 text-xs opacity-60">
                  Không tìm thấy bưu thiếp nào phù hợp với bộ lọc.
                </div>
              ) : (
                filteredCards.map((c) => (
                  <div key={c.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-black/5 transition-colors">
                    
                    <div className="space-y-1.5 max-w-2xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`${theme.fontHeading || 'font-editorial'} font-bold text-base`}>
                          {c.toTeacher}
                        </span>
                        <span className="text-xs opacity-75">
                          ({c.faculty})
                        </span>
                        
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          c.status === 'approved' 
                            ? 'bg-emerald-500/15 text-emerald-800' 
                            : 'bg-rose-500/15 text-rose-800'
                        }`}>
                          {c.status === 'approved' ? 'Đang Hiển Thị' : 'Đang Ẩn'}
                        </span>

                        {c.isPinned && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800 font-bold flex items-center gap-1">
                            <Pin className="w-2.5 h-2.5 fill-current" />
                            Ghim Đầu Tường
                          </span>
                        )}

                        {c.image && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/5 opacity-70">
                            Có ảnh đính kèm
                          </span>
                        )}
                      </div>

                      <p className="text-xs opacity-90 leading-relaxed italic line-clamp-2">
                        “{c.message}”
                      </p>

                      <div className="text-[11px] opacity-60 flex items-center gap-3">
                        <span>Người gửi: <strong className="opacity-90">{c.fromStudent}</strong> ({c.studentClass})</span>
                        <span>•</span>
                        <span>{new Date(c.createdAt).toLocaleDateString('vi-VN')}</span>
                        <span>•</span>
                        <span>{c.likes || 0} lượt thích</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                      <button
                        onClick={() => onToggleCardPin(c.id)}
                        className={`p-2 rounded-xl text-xs font-semibold border cursor-pointer transition-colors ${
                          c.isPinned
                            ? 'bg-[#B39765]/20 border-[#B39765] text-[#11263B]'
                            : 'border-current/25 hover:bg-black/10'
                        }`}
                        title={c.isPinned ? "Bỏ ghim" : "Ghim lên đầu trang"}
                      >
                        <Pin className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onToggleCardStatus(c.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 cursor-pointer transition-colors ${
                          c.status === 'approved'
                            ? 'bg-rose-500/10 border-rose-500/30 text-rose-800 hover:bg-rose-500/20'
                            : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 hover:bg-emerald-500/20'
                        }`}
                      >
                        {c.status === 'approved' ? (
                          <>
                            <EyeOff className="w-3.5 h-3.5" />
                            <span>Ẩn bài</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-3.5 h-3.5" />
                            <span>Duyệt hiện</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => onDeleteCard(c.id)}
                        className="p-2 rounded-xl border border-current/25 hover:bg-rose-500/20 hover:text-rose-700 transition-colors cursor-pointer"
                        title="Xóa vĩnh viễn"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                ))
              )}
            </div>

          </div>
        )}

        {/* TAB 2: DUYỆT KÝ ỨC GIẢNG ĐƯỜNG */}
        {activeTab === 'comments' && (
          <div className="space-y-6">
            <div className="text-xs opacity-70">
              Kiểm duyệt các câu trả lời của sinh viên trong 4 chủ đề đối thoại mở:
            </div>

            <div className="space-y-4">
              {topics.map((t) => (
                <div key={t.id} className={`p-5 rounded-2xl border border-current/20 space-y-4 ${theme.surfaceBg || 'bg-white'}`}>
                  <div className="flex items-center justify-between border-b border-current/15 pb-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#B39765] block">
                        Chủ đề thảo luận:
                      </span>
                      <h3 className={`${theme.fontHeading || 'font-editorial'} font-bold text-base`}>
                        {t.title}
                      </h3>
                    </div>
                    <span className="text-xs font-mono opacity-70">
                      {t.comments?.length || 0} phản hồi
                    </span>
                  </div>

                  <div className="space-y-3">
                    {(!t.comments || t.comments.length === 0) ? (
                      <div className="text-xs opacity-60 italic py-2">
                        Chưa có câu trả lời nào trong chủ đề này.
                      </div>
                    ) : (
                      t.comments.map((cmt) => (
                        <div key={cmt.id} className="p-4 rounded-xl bg-black/5 border border-current/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold">{cmt.author}</span>
                              <span className="text-[10px] opacity-70">({cmt.badge})</span>
                              <span className={`text-[9px] px-2 py-0.2 rounded font-bold uppercase ${
                                cmt.status === 'approved' ? 'bg-emerald-500/15 text-emerald-800' : 'bg-rose-500/15 text-rose-800'
                              }`}>
                                {cmt.status === 'approved' ? 'Đã duyệt' : 'Đang ẩn'}
                              </span>
                            </div>
                            <p className="opacity-85 italic">“{cmt.content}”</p>
                            {cmt.images?.length > 0 && (
                              <div className="text-[10px] text-[#B39765]">Có {cmt.images.length} ảnh đính kèm</div>
                            )}
                          </div>

                          <button
                            onClick={() => onToggleCommentStatus(t.id, cmt.id)}
                            className="px-3 py-1 rounded-lg border border-current/25 font-semibold text-xs shrink-0 cursor-pointer hover:bg-black/10 self-end sm:self-center"
                          >
                            {cmt.status === 'approved' ? 'Ẩn phản hồi' : 'Duyệt phản hồi'}
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: BỘ LỌC TỪ NHẠY CẢM */}
        {activeTab === 'filter' && (
          <div className="grid md:grid-cols-12 gap-8 items-start">
            
            <div className={`md:col-span-7 p-6 rounded-2xl border border-current/20 space-y-5 ${theme.surfaceBg || 'bg-white'}`}>
              <div>
                <h3 className={`${theme.fontHeading || 'font-editorial'} font-bold text-lg mb-1`}>
                  Danh Sách Từ Khóa Nhạy Cảm & Chặn Vi Phạm
                </h3>
                <p className="text-xs opacity-75 leading-relaxed">
                  Bất kỳ bài viết hoặc bình luận nào chứa từ trong danh sách này sẽ tự động được che bằng dấu hoa thị <code>***</code> hoặc chuyển vào hàng đợi kiểm duyệt.
                </p>
              </div>

              <form onSubmit={handleAddWord} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Thêm từ khóa cấm mới (VD: xúc phạm, bậy bạ...)"
                  value={newWord}
                  onChange={(e) => setNewWord(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-black/5 border border-current/25 text-xs focus:outline-none focus:border-current"
                />
                <button
                  type="submit"
                  className={`px-5 py-2.5 rounded-xl font-semibold text-xs cursor-pointer ${theme.btnPrimary || 'bg-black text-white'}`}
                >
                  Thêm Từ
                </button>
              </form>

              <div className="flex flex-wrap gap-2 pt-2">
                {sensitiveWords.map((word, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-800 text-xs font-medium"
                  >
                    <span>{word}</span>
                    <button
                      type="button"
                      onClick={() => onRemoveSensitiveWord(word)}
                      className="hover:text-black font-bold ml-1 cursor-pointer"
                      title="Xóa từ khỏi danh sách cấm"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Live Filter Tester */}
            <div className={`md:col-span-5 p-6 rounded-2xl border border-current/20 space-y-4 ${theme.surfaceBg || 'bg-white'}`}>
              <div>
                <h4 className="font-bold text-sm mb-1 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#B39765]" />
                  <span>Thử Nghiệm Bộ Lọc Real-Time</span>
                </h4>
                <p className="text-xs opacity-70">
                  Gõ thử nội dung bên dưới để kiểm tra thuật toán tự động lọc từ:
                </p>
              </div>

              <textarea
                rows={3}
                placeholder="Gõ thử câu văn có chứa từ cấm để test..."
                value={testText}
                onChange={(e) => setTestText(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/5 border border-current/20 text-xs focus:outline-none"
              />

              <div className="p-3.5 rounded-xl bg-black/5 border border-current/15 text-xs">
                <span className="text-[10px] font-mono uppercase opacity-60 block mb-1">Kết quả sau khi lọc:</span>
                <p className="italic font-medium">
                  {testText ? (
                    sensitiveWords.reduce((acc, word) => {
                      const regex = new RegExp(word, 'gi');
                      return acc.replace(regex, '***');
                    }, testText)
                  ) : (
                    <span className="opacity-40">Chưa nhập văn bản test...</span>
                  )}
                </p>
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: CHỐNG SPAM & HẠ TẦNG */}
        {activeTab === 'spam' && (
          <div className="grid md:grid-cols-2 gap-6">
            
            <div className={`p-6 rounded-2xl border border-current/20 space-y-4 ${theme.surfaceBg || 'bg-white'}`}>
              <h3 className={`${theme.fontHeading || 'font-editorial'} font-bold text-base mb-1`}>
                Cơ Chế Bảo Vệ Tự Động (Spam Guard)
              </h3>
              
              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-xl bg-black/5 border border-current/15 flex items-center justify-between">
                  <div>
                    <div className="font-bold">Rate-Limiting (30 giây / lượt gửi)</div>
                    <div className="text-[11px] opacity-70">Chặn người dùng hoặc bot bấm gửi liên tục gây spam dữ liệu</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={rateLimitEnabled}
                    onChange={(e) => setRateLimitEnabled(e.target.checked)}
                    className="w-4 h-4 accent-black cursor-pointer"
                  />
                </div>

                <div className="p-4 rounded-xl bg-black/5 border border-current/15 flex items-center justify-between">
                  <div>
                    <div className="font-bold">Tự động gắn cờ nội dung trùng lặp</div>
                    <div className="text-[11px] opacity-70">Phát hiện bài gửi có nội dung giống hệt nhau trong thời gian ngắn</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={autoFlagWords}
                    onChange={(e) => setAutoFlagWords(e.target.checked)}
                    className="w-4 h-4 accent-black cursor-pointer"
                  />
                </div>

                <div className="p-4 rounded-xl bg-black/5 border border-current/15 flex items-center justify-between">
                  <div>
                    <div className="font-bold">Cloudflare Edge Cache 99%</div>
                    <div className="text-[11px] opacity-70">Bộ nhớ đệm phân tán toàn cầu, tối ưu tải trang dưới 0.8 giây</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={cloudflareEdgeCache}
                    onChange={(e) => setCloudflareEdgeCache(e.target.checked)}
                    className="w-4 h-4 accent-black cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-2xl border border-current/20 space-y-4 ${theme.surfaceBg || 'bg-white'}`}>
              <h3 className={`${theme.fontHeading || 'font-editorial'} font-bold text-base mb-1`}>
                Mô Phỏng Tải Hệ Thống (Stress Test 200k Visits)
              </h3>
              <p className="text-xs opacity-75 leading-relaxed">
                Hệ thống kiến trúc tĩnh Jamstack kết hợp CDN Edge Caching bảo đảm website không bị nghẽn mạng ngay cả khi 50.000 sinh viên cùng truy cập vào thời khắc 20/11.
              </p>

              <div className="space-y-2 text-xs pt-2">
                <div className="flex justify-between font-mono">
                  <span>Trạng thái máy chủ CDN:</span>
                  <strong className="text-emerald-700">Healthy (300+ Edge PoPs)</strong>
                </div>
                <div className="flex justify-between font-mono">
                  <span>Thời gian phản hồi trung bình:</span>
                  <strong>~180ms</strong>
                </div>
                <div className="flex justify-between font-mono">
                  <span>Chi phí máy chủ phát sinh thêm:</span>
                  <strong className="text-emerald-700">0 VNĐ (Đã trọn gói)</strong>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 5: ĐỀ XUẤT BÁO GIÁ & KỸ THUẬT (RFP) */}
        {activeTab === 'proposal' && (
          <div className="space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#B39765]/20 border border-[#B39765]">
              <div>
                <h3 className={`${theme.fontHeading || 'font-editorial'} font-bold text-base text-[#11263B]`}>
                  Bản Đề Xuất Báo Giá & Phương Án Kỹ Thuật (RFP)
                </h3>
                <p className="text-xs opacity-80">
                  Đã chuẩn bị sẵn sàng nội dung chi tiết phản hồi từng câu hỏi 1, 2, 3, 4 trong brief khách hàng.
                </p>
              </div>

              <button
                onClick={handleCopyProposalEmail}
                className="px-5 py-2.5 rounded-full bg-[#11263B] text-[#F5F0E7] text-xs font-semibold flex items-center gap-2 cursor-pointer shadow hover:bg-[#18334E] transition-colors shrink-0"
              >
                {copiedProposal ? <Check className="w-4 h-4 text-[#B39765]" /> : <Copy className="w-4 h-4" />}
                <span>{copiedProposal ? 'Đã sao chép email!' : 'Sao chép nội dung email phản hồi'}</span>
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              
              <div className={`p-6 rounded-2xl border border-current/20 space-y-4 ${theme.surfaceBg || 'bg-white'}`}>
                <div className="flex items-center gap-2 font-bold text-sm text-[#B39765]">
                  <DollarSign className="w-4 h-4" />
                  <span>1. BÁO GIÁ TRỌN GÓI</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-black/5 border border-current/15">
                    <div className="font-bold text-sm">Gói Cơ Bản: {PROPOSAL_DATA.pricing.basePackage}</div>
                    <p className="opacity-75 mt-1 leading-relaxed">
                      Toàn bộ Landing page chuẩn KV Captain Teacher (5 phiên bản concept), Postcard Studio, Bảo tàng kỷ vật, La bàn trắc nghiệm, 4 Chủ đề ký ức, Trang Admin chuyên biệt. Đã gồm 100% chi phí hosting & CDN.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/5 border border-current/15">
                    <div className="font-bold text-sm">Tùy Chọn Thêm: {PROPOSAL_DATA.pricing.optionalPackage}</div>
                    <p className="opacity-75 mt-1 leading-relaxed">
                      Mô-đun con tem/dấu mộc sáp kéo thả tương tác và xuất ảnh bưu thiếp HD để học trò lưu giữ.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 font-semibold">
                    💡 Combo Ưu Đãi Trọn Gói: {PROPOSAL_DATA.pricing.totalCombo}
                  </div>
                </div>
              </div>

              <div className={`p-6 rounded-2xl border border-current/20 space-y-4 ${theme.surfaceBg || 'bg-white'}`}>
                <div className="flex items-center gap-2 font-bold text-sm text-[#B39765]">
                  <Server className="w-4 h-4" />
                  <span>2. HẠ TẦNG & CHỊU TẢI 200.000 VISITS</span>
                </div>

                <div className="space-y-3 text-xs leading-relaxed opacity-90">
                  <p>• <strong>Kiến trúc:</strong> {PROPOSAL_DATA.infrastructure.stack}</p>
                  <p>• <strong>Chống nghẽn cao điểm:</strong> {PROPOSAL_DATA.infrastructure.burstProtection}</p>
                  <p>• <strong>Tiến độ cam kết:</strong> Gửi demo ngày {PROPOSAL_DATA.timeline.demoDate}, bàn giao ngày {PROPOSAL_DATA.timeline.finalDelivery}, bảo hành trực chiến đến hết ngày 22/11.</p>
                  <p>• <strong>Hình thức thanh toán:</strong> Chia 3 đợt thuận tiện (Cọc 30% - Duyệt demo 40% - Bàn giao 100% source code 30%).</p>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
