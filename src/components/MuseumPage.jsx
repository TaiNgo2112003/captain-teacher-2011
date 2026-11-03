import React, { useState } from 'react';
import { INITIAL_KEEPSAKES } from '../data/museumData';
import { 
  Flame, 
  Search, 
  PlusCircle, 
  X, 
  Check
} from 'lucide-react';

export default function MuseumPage({ version }) {
  const [keepsakes, setKeepsakes] = useState(() => {
    try {
      const saved = localStorage.getItem('captain_teacher_keepsakes');
      return saved ? JSON.parse(saved) : INITIAL_KEEPSAKES;
    } catch {
      return INITIAL_KEEPSAKES;
    }
  });

  const [selectedKeepsake, setSelectedKeepsake] = useState(null);
  const [eraFilter, setEraFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isContributeModalOpen, setIsContributeModalOpen] = useState(false);

  // Form states for adding new keepsake
  const [title, setTitle] = useState('');
  const [relatedTeacher, setRelatedTeacher] = useState('');
  const [department, setDepartment] = useState('');
  const [donor, setDonor] = useState('');
  const [year, setYear] = useState('2024');
  const [story, setStory] = useState('');
  const [quote, setQuote] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contributeSuccess, setContributeSuccess] = useState(false);

  const theme = version?.theme || {};

  // Save to localStorage
  const saveKeepsakes = (newItems) => {
    setKeepsakes(newItems);
    try {
      localStorage.setItem('captain_teacher_keepsakes', JSON.stringify(newItems));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  };

  const handleLikeKeepsake = (id) => {
    const updated = keepsakes.map(item => 
      item.id === id ? { ...item, likes: (item.likes || 0) + 1 } : item
    );
    saveKeepsakes(updated);
    if (selectedKeepsake && selectedKeepsake.id === id) {
      setSelectedKeepsake({ ...selectedKeepsake, likes: (selectedKeepsake.likes || 0) + 1 });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Vui lòng chọn ảnh dưới 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitKeepsake = (e) => {
    e.preventDefault();
    if (!title.trim() || !story.trim() || !relatedTeacher.trim()) {
      alert('Vui lòng điền đủ Tên kỷ vật, Người Thầy liên quan và Câu chuyện đằng sau.');
      return;
    }

    setIsSubmitting(true);
    const newEntry = {
      id: 'keep-' + Date.now(),
      title: title.trim(),
      era: 'recent',
      eraLabel: 'Kỷ vật mới đóng góp',
      relatedTeacher: relatedTeacher.trim(),
      department: department.trim() || 'Giảng đường',
      donor: donor.trim() || 'Sinh viên đóng góp',
      year: year || '2026',
      image: imagePreview || 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
      story: story.trim(),
      quote: quote.trim() ? `“${quote.trim()}”` : '“Tri ân người Thuyền Trưởng thầm lặng.”',
      likes: 1
    };

    setTimeout(() => {
      saveKeepsakes([newEntry, ...keepsakes]);
      setIsSubmitting(false);
      setContributeSuccess(true);

      setTimeout(() => {
        setContributeSuccess(false);
        setIsContributeModalOpen(false);
        setTitle('');
        setStory('');
        setRelatedTeacher('');
        setImagePreview(null);
      }, 1200);
    }, 400);
  };

  // Filter items
  const filteredKeepsakes = keepsakes.filter(item => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      !q || 
      item.title.toLowerCase().includes(q) ||
      item.relatedTeacher.toLowerCase().includes(q) ||
      item.department.toLowerCase().includes(q) ||
      item.story.toLowerCase().includes(q);

    if (!matchesSearch) return false;
    if (eraFilter === 'all') return true;
    return item.era === eraFilter;
  });

  return (
    <section id="museum" className={`py-16 sm:py-24 border-t ${theme.borderSubtle || 'border-current/20'} transition-colors duration-300 ${theme.pageBg || 'bg-[#F5F0E7]'}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Page Hero Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-current/30 text-xs font-mono uppercase tracking-widest mb-4 opacity-80">
            <span>🏛️ KHÔNG GIAN TRIỂN LÃM SỐ</span>
            <span>•</span>
            <span>BẢO TÀNG KỶ VẬT GIẢNG ĐƯỜNG</span>
          </div>

          <h1 className={`${theme.fontHeading || 'font-editorial'} text-4xl sm:text-6xl font-bold tracking-tight mb-5`}>
            Những Kỷ Vật Biết Nói
          </h1>

          <p className="text-base sm:text-lg opacity-80 leading-relaxed font-light">
            Nơi lưu giữ từng trang giáo án ố vàng, chiếc phấn gãy, bản đồ án gạch đỏ lúc nửa đêm hay bức ảnh chụp vội thời sinh viên — những chứng tích thầm lặng của lòng tận tụy người Thầy.
          </p>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setIsContributeModalOpen(true)}
              className={`px-6 py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all shadow hover:shadow-md flex items-center gap-2 cursor-pointer ${theme.btnPrimary || 'bg-black text-white'}`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>Đóng góp kỷ vật của bạn</span>
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 border-y ${theme.borderSubtle || 'border-current/20'} py-4`}>
          
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 opacity-50 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kỷ vật, tên Thầy Cô, năm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-full bg-black/5 border border-current/20 text-xs focus:outline-none focus:border-current"
            />
          </div>

          {/* Era filters */}
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 text-xs">
            <button
              onClick={() => setEraFilter('all')}
              className={`px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
                eraFilter === 'all'
                  ? `${theme.btnPrimary || 'bg-black text-white'} font-semibold`
                  : 'opacity-70 hover:opacity-100 bg-transparent'
              }`}
            >
              Tất Cả ({keepsakes.length})
            </button>

            <button
              onClick={() => setEraFilter('1990s')}
              className={`px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
                eraFilter === '1990s'
                  ? `${theme.btnPrimary || 'bg-black text-white'} font-semibold`
                  : 'opacity-70 hover:opacity-100 bg-transparent'
              }`}
            >
              Thập niên 90s
            </button>

            <button
              onClick={() => setEraFilter('2000s')}
              className={`px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
                eraFilter === '2000s'
                  ? `${theme.btnPrimary || 'bg-black text-white'} font-semibold`
                  : 'opacity-70 hover:opacity-100 bg-transparent'
              }`}
            >
              2000 - 2010
            </button>

            <button
              onClick={() => setEraFilter('2010s')}
              className={`px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
                eraFilter === '2010s'
                  ? `${theme.btnPrimary || 'bg-black text-white'} font-semibold`
                  : 'opacity-70 hover:opacity-100 bg-transparent'
              }`}
            >
              2011 - 2020
            </button>

            <button
              onClick={() => setEraFilter('recent')}
              className={`px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
                eraFilter === 'recent'
                  ? `${theme.btnPrimary || 'bg-black text-white'} font-semibold`
                  : 'opacity-70 hover:opacity-100 bg-transparent'
              }`}
            >
              Thời đại số
            </button>
          </div>

        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredKeepsakes.map((item) => (
            <article
              key={item.id}
              onClick={() => setSelectedKeepsake(item)}
              className={`rounded-2xl overflow-hidden border border-current/20 cursor-pointer group hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ${theme.surfaceBg || 'bg-white shadow'}`}
            >
              {/* Image Frame */}
              <div className="relative h-56 overflow-hidden bg-black/10">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-sm text-white px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider">
                  Năm {item.year}
                </div>
                <div className="absolute top-3 right-3 bg-[#B39765] text-[#11263B] px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                  {item.eraLabel}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] uppercase font-mono tracking-wider opacity-60 mb-1">
                    Kỷ vật liên quan đến:
                  </div>
                  <h3 className={`${theme.fontHeading || 'font-editorial'} font-bold text-lg mb-1 line-clamp-1`}>
                    {item.relatedTeacher}
                  </h3>
                  <div className="text-xs opacity-70 mb-3 truncate">
                    {item.department}
                  </div>

                  <h4 className="font-semibold text-sm mb-2 line-clamp-2">
                    {item.title}
                  </h4>

                  <p className="text-xs opacity-80 line-clamp-3 leading-relaxed italic mb-4 font-light">
                    “{item.story}”
                  </p>
                </div>

                <div className="pt-3 border-t border-current/15 flex items-center justify-between text-xs">
                  <div className="text-[10px] opacity-60">
                    Người hiến tặng: <span className="font-medium text-current">{item.donor}</span>
                  </div>

                  <div className="flex items-center gap-1.5 opacity-80">
                    <Flame className="w-3.5 h-3.5 text-[#B9685C]" />
                    <span className="font-mono text-xs">{item.likes || 0}</span>
                  </div>
                </div>
              </div>

            </article>
          ))}
        </div>

      </div>

      {/* Keepsake Detail Modal */}
      {selectedKeepsake && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="absolute inset-0" onClick={() => setSelectedKeepsake(null)} />

          <div className={`relative w-full max-w-2xl rounded-3xl overflow-hidden border border-current/30 shadow-2xl z-10 p-6 sm:p-9 max-h-[90vh] overflow-y-auto ${theme.surfaceBg || 'bg-[#FAF7F2] text-[#11263B]'}`}>
            <button
              onClick={() => setSelectedKeepsake(null)}
              className="absolute top-4 right-4 p-2 rounded-full border border-current/20 hover:bg-black/10 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#B39765] block mb-1">
                Kỷ Vật Số // {selectedKeepsake.year}
              </span>
              <h2 className={`${theme.fontHeading || 'font-editorial'} text-2xl sm:text-3xl font-bold leading-tight`}>
                {selectedKeepsake.title}
              </h2>
            </div>

            <div className="rounded-2xl overflow-hidden border border-current/20 mb-6 max-h-72 bg-black/10">
              <img
                src={selectedKeepsake.image}
                alt={selectedKeepsake.title}
                className="w-full h-64 object-cover"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mb-6 p-4 rounded-xl bg-black/5 border border-current/10 text-xs">
              <div>
                <span className="opacity-60 block text-[10px] uppercase">Thầy / Cô liên quan:</span>
                <strong className="font-bold text-sm">{selectedKeepsake.relatedTeacher}</strong>
                <span className="block text-[11px] opacity-75">{selectedKeepsake.department}</span>
              </div>
              <div>
                <span className="opacity-60 block text-[10px] uppercase">Người trao tặng kỷ vật:</span>
                <strong className="font-bold text-sm">{selectedKeepsake.donor}</strong>
                <span className="block text-[11px] opacity-75">{selectedKeepsake.eraLabel}</span>
              </div>
            </div>

            <div className="space-y-4 mb-6 leading-relaxed text-sm opacity-90 font-light">
              <p>{selectedKeepsake.story}</p>
              
              <blockquote className="border-l-2 border-[#B9685C] pl-4 italic text-base opacity-100 font-editorial">
                {selectedKeepsake.quote}
              </blockquote>
            </div>

            <div className="pt-4 border-t border-current/15 flex items-center justify-between">
              <button
                onClick={() => handleLikeKeepsake(selectedKeepsake.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-current/30 hover:border-current text-xs font-semibold cursor-pointer transition-colors"
              >
                <Flame className="w-4 h-4 text-[#B9685C]" />
                <span>Thắp nến trân trọng ({selectedKeepsake.likes || 0})</span>
              </button>

              <button
                onClick={() => setSelectedKeepsake(null)}
                className={`px-5 py-2 rounded-full text-xs font-semibold ${theme.btnPrimary || 'bg-black text-white'}`}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contribute Keepsake Modal Form */}
      {isContributeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="absolute inset-0" onClick={() => setIsContributeModalOpen(false)} />

          <div className={`relative w-full max-w-lg rounded-3xl border border-current/30 shadow-2xl z-10 p-6 sm:p-8 max-h-[90vh] overflow-y-auto ${theme.surfaceBg || 'bg-[#FAF7F2] text-[#11263B]'}`}>
            <button
              onClick={() => setIsContributeModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full border border-current/20 hover:bg-black/10 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className={`${theme.fontHeading || 'font-editorial'} text-xl sm:text-2xl font-bold mb-2`}>
              Đóng Góp Kỷ Vật Giảng Đường
            </h3>
            <p className="text-xs opacity-75 mb-6">
              Chia sẻ kỷ vật (ảnh chụp, giáo án, lời dặn, quà kỷ niệm...) gắn liền với người Thầy, người Cô mà bạn kính trọng.
            </p>

            <form onSubmit={handleSubmitKeepsake} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">Tên Kỷ Vật *</label>
                <input
                  type="text"
                  placeholder="VD: Chiếc bút ký tốt nghiệp Thầy tặng, Bản vẽ A0 năm 2005..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 border border-current/20 focus:outline-none focus:border-current"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Thầy / Cô Liên Quan *</label>
                  <input
                    type="text"
                    placeholder="VD: TS. Nguyễn Văn Minh"
                    value={relatedTeacher}
                    onChange={(e) => setRelatedTeacher(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 border border-current/20 focus:outline-none focus:border-current"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Khoa / Bộ Môn</label>
                  <input
                    type="text"
                    placeholder="VD: Khoa CNTT, Viện Kinh Tế..."
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 border border-current/20 focus:outline-none focus:border-current"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Người Đóng Góp</label>
                  <input
                    type="text"
                    placeholder="VD: Lê Hoàng Nam (Cựu SV K60)"
                    value={donor}
                    onChange={(e) => setDonor(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 border border-current/20 focus:outline-none focus:border-current"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Năm Kỷ Niệm</label>
                  <input
                    type="text"
                    placeholder="VD: 2018"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 border border-current/20 focus:outline-none focus:border-current"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Câu Chuyện Kỷ Vật *</label>
                <textarea
                  rows={3}
                  placeholder="Kỷ vật này đã ra đời như thế nào? Thầy Cô đã nói gì với bạn?"
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 border border-current/20 focus:outline-none focus:border-current"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Lời Dặn Hoặc Câu Nói Của Thầy Cô (Tùy chọn)</label>
                <input
                  type="text"
                  placeholder="VD: 'Làm nghề phải giữ được cái tâm trong sáng...'"
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 border border-current/20 focus:outline-none focus:border-current"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Ảnh Chụp Kỷ Vật</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="block w-full text-[11px] file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:bg-black/10 file:cursor-pointer"
                />
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" className="w-16 h-16 object-cover rounded mt-2 border" />
                )}
              </div>

              <div className="pt-3 border-t border-current/20">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 rounded-full font-semibold uppercase tracking-wider text-xs cursor-pointer flex items-center justify-center gap-2 ${theme.btnPrimary || 'bg-black text-white'}`}
                >
                  {isSubmitting ? 'Đang lưu trữ...' : contributeSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Đã đóng góp vào Bảo Tàng!</span>
                    </>
                  ) : 'Gửi Kỷ Vật Vào Bảo Tàng'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
}
