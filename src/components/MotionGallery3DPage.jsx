import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Sparkles, 
  RotateCw, 
  Layers, 
  Film, 
  Heart, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  VolumeX, 
  PlusCircle, 
  X, 
  Check, 
  Compass, 
  Share2, 
  Eye,
  Play,
  Pause
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { COLOR_ATMOSPHERES, INITIAL_MOTION_PHOTOS } from '../data/motionPhotosData';

export default function MotionGallery3DPage({ version }) {
  const theme = version?.theme || {};

  // Saved photos with localStorage persistence
  const [photos, setPhotos] = useState(() => {
    try {
      const saved = localStorage.getItem('captain_teacher_motion_photos');
      return saved ? JSON.parse(saved) : INITIAL_MOTION_PHOTOS;
    } catch {
      return INITIAL_MOTION_PHOTOS;
    }
  });

  // Display mode: 'carousel3d', 'tiltgrid', 'cinematic'
  const [viewMode, setViewMode] = useState('carousel3d');

  // Color atmosphere: 'aurora', 'sunset', 'ocean', 'crimson'
  const [activeAtmosphereId, setActiveAtmosphereId] = useState('aurora');

  // 3D Carousel state
  const [carouselRotation, setCarouselRotation] = useState(0);
  const [isAutoSpinning, setIsAutoSpinning] = useState(true);
  const [isDraggingCarousel, setIsDraggingCarousel] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);

  // Active expanded photo modal
  const [activePhotoModal, setActivePhotoModal] = useState(null);

  // Add photo modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newQuote, setNewQuote] = useState('');
  const [newMentor, setNewMentor] = useState('');
  const [newFaculty, setNewFaculty] = useState('');
  const [newYear, setNewYear] = useState('Khóa 2026');
  const [newColorMode, setNewColorMode] = useState('aurora');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newStoryDetail, setNewStoryDetail] = useState('');

  // Audio ambience toggle (synthesized calming chime / visualizer)
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [copiedQuoteId, setCopiedQuoteId] = useState(null);

  const carouselRef = useRef(null);

  // Active Atmosphere Config
  const activeAtmosphere = useMemo(() => {
    return COLOR_ATMOSPHERES.find(a => a.id === activeAtmosphereId) || COLOR_ATMOSPHERES[0];
  }, [activeAtmosphereId]);

  // Persist photos to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('captain_teacher_motion_photos', JSON.stringify(photos));
    } catch (e) {
      console.warn('localStorage warning', e);
    }
  }, [photos]);

  // 3D Carousel Auto-Spin
  useEffect(() => {
    if (!isAutoSpinning || viewMode !== 'carousel3d') return;
    const interval = setInterval(() => {
      setCarouselRotation((prev) => prev - 0.25);
    }, 30);
    return () => clearInterval(interval);
  }, [isAutoSpinning, viewMode]);

  // Handle Like with confetti
  const handleLikePhoto = (photoId, e) => {
    if (e) e.stopPropagation();
    setPhotos((prev) =>
      prev.map((p) => (p.id === photoId ? { ...p, likes: (p.likes || 0) + 1 } : p))
    );

    if (activePhotoModal && activePhotoModal.id === photoId) {
      setActivePhotoModal((prev) => ({ ...prev, likes: (prev.likes || 0) + 1 }));
    }

    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FF007A', '#00F0FF', '#FFBE0B', '#7928CA']
      });
    } catch {
      // ignore
    }
  };

  // Carousel mouse drag handlers
  const handleCarouselMouseDown = (e) => {
    setIsDraggingCarousel(true);
    setDragStartX(e.clientX);
    setIsAutoSpinning(false);
  };

  const handleCarouselMouseMove = (e) => {
    if (!isDraggingCarousel) return;
    const deltaX = e.clientX - dragStartX;
    setCarouselRotation((prev) => prev + deltaX * 0.3);
    setDragStartX(e.clientX);
  };

  const handleCarouselMouseUp = () => {
    setIsDraggingCarousel(false);
  };

  // Carousel Next/Prev buttons
  const handleSpinNext = () => {
    setIsAutoSpinning(false);
    const step = 360 / Math.max(photos.length, 1);
    setCarouselRotation((prev) => prev - step);
  };

  const handleSpinPrev = () => {
    setIsAutoSpinning(false);
    const step = 360 / Math.max(photos.length, 1);
    setCarouselRotation((prev) => prev + step);
  };

  // Handle Add New Motion Photo
  const handleAddNewPhoto = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newQuote.trim() || !newMentor.trim()) {
      alert('Vui lòng điền đầy đủ tiêu đề, câu trích dẫn và tên giảng viên!');
      return;
    }

    const createdPhoto = {
      id: 'mp-custom-' + Date.now(),
      title: newTitle.trim(),
      subtitle: newSubtitle.trim() || 'Khoảnh khắc tri ân đặc biệt do sinh viên đóng góp',
      quote: newQuote.startsWith('“') ? newQuote.trim() : `“${newQuote.trim()}”`,
      mentor: newMentor.trim(),
      faculty: newFaculty.trim() || 'Đại Học Quốc Gia',
      year: newYear.trim() || '2026',
      colorMode: newColorMode,
      likes: 1,
      badge: 'Student Tribute 3D',
      imageUrl: newImageUrl.trim() || 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
      motionType: 'particles-sunbeam',
      tags: ['#TuHaoTriAn', '#SinhVienDongGop', '#KhoanhKhac3D'],
      storyDetail: newStoryDetail.trim() || 'Bức ảnh và câu chuyện được tạo bởi sinh viên để tri ân thầy cô nhân dịp 20/11.'
    };

    setPhotos([createdPhoto, ...photos]);
    setIsAddModalOpen(false);

    // Reset inputs
    setNewTitle('');
    setNewSubtitle('');
    setNewQuote('');
    setNewMentor('');
    setNewFaculty('');
    setNewImageUrl('');
    setNewStoryDetail('');

    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const handleCopyQuote = (photo, e) => {
    if (e) e.stopPropagation();
    const textToCopy = `${photo.quote}\n— Dành tặng ${photo.mentor} (${photo.faculty})`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedQuoteId(photo.id);
    setTimeout(() => setCopiedQuoteId(null), 2500);
  };

  return (
    <section id="gallery3d" className="py-20 sm:py-28 bg-[#070B14] text-white relative overflow-hidden transition-colors duration-500 border-t border-cyan-500/20">
      
      {/* Dynamic 3D Chromatic Ambient Lights */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-[120px] opacity-40 transition-all duration-700 animate-pulse"
          style={{ background: activeAtmosphere.glowColor }}
        />
        <div 
          className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full blur-[140px] opacity-30 transition-all duration-700"
          style={{ background: activeAtmosphere.primaryColor }}
        />
        <div 
          className="absolute -bottom-40 left-1/4 w-[600px] h-[600px] rounded-full blur-[160px] opacity-25 transition-all duration-700"
          style={{ background: activeAtmosphere.glowColor }}
        />
        {/* Subtle Spatial Horizon Grid */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 240, 255, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 240, 255, 0.15) 1px, transparent 1px)`,
            backgroundSize: '48px 48px'
          }}
        />
      </div>

      {/* Main Page Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-10 relative z-10">

        {/* Hero Spatial Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/50 bg-cyan-950/40 backdrop-blur-md shadow-[0_0_20px_rgba(0,240,255,0.25)] text-xs font-semibold text-cyan-300">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="uppercase tracking-widest text-[11px]">Trải Nghiệm 3D Động Ảnh & Sắc Màu Tri Ân</span>
          </div>

          <h2 className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight ${theme.fontHeading || 'font-syne'} text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400`}>
            HẢI TRÌNH ÁNH SÁNG 3D
          </h2>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light max-w-2xl mx-auto">
            Những khoảnh khắc xúc động giữa Giảng viên & Sinh viên được tái sinh trong không gian 3 chiều đa sắc màu: từng bức ảnh chuyển động theo nhịp ánh sáng và hơi thở giảng đường.
          </p>

          {/* Audio Ambience & Quick Stat */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            
            <button
              onClick={() => setIsSoundEnabled(!isSoundEnabled)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/20 text-xs text-gray-300 hover:text-white hover:border-cyan-400/60 transition-all cursor-pointer"
              title="Bật/Tắt hiệu ứng sóng âm thanh tri ân"
            >
              {isSoundEnabled ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5 opacity-60" />}
              <span>{isSoundEnabled ? 'Âm thanh đại dương: Bật' : 'Âm thanh: Tắt'}</span>
              {isSoundEnabled && (
                <span className="flex items-center gap-0.5 ml-1">
                  <span className="w-1 h-2 bg-cyan-400 animate-pulse rounded-full" />
                  <span className="w-1 h-3.5 bg-pink-500 animate-pulse rounded-full" style={{ animationDelay: '0.2s' }} />
                  <span className="w-1 h-2 bg-amber-400 animate-pulse rounded-full" style={{ animationDelay: '0.4s' }} />
                </span>
              )}
            </button>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/20 text-xs text-gray-300">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>{photos.length} Khoảnh Khắc 3D Sống Động</span>
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white font-semibold text-xs shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:opacity-95 transition-all cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Góp Ảnh 3D Của Bạn</span>
            </button>

          </div>

        </div>

        {/* Control Bar: View Modes & Color Atmospheres */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl mb-10 shadow-2xl">
          
          {/* View Modes */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10 w-full sm:w-auto justify-center">
            
            <button
              onClick={() => setViewMode('carousel3d')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'carousel3d'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Vòng Xoay 3D</span>
            </button>

            <button
              onClick={() => setViewMode('tiltgrid')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'tiltgrid'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Ma Trận Phản Quang 3D</span>
            </button>

            <button
              onClick={() => setViewMode('cinematic')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'cinematic'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Dòng Chảy Điện Ảnh</span>
            </button>

          </div>

          {/* Color Atmosphere Switcher */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
            <span className="text-[11px] uppercase tracking-wider text-gray-400 font-mono hidden lg:inline">
              Ánh Sáng Sắc Màu:
            </span>

            <div className="flex items-center gap-1.5">
              {COLOR_ATMOSPHERES.map((atm) => {
                const isSelected = atm.id === activeAtmosphereId;
                return (
                  <button
                    key={atm.id}
                    onClick={() => setActiveAtmosphereId(atm.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 border ${
                      isSelected
                        ? `${atm.accentBorder} bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]`
                        : 'border-white/10 text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                    title={atm.sub}
                  >
                    <span 
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: atm.primaryColor }}
                    />
                    <span>{atm.name.split(' ')[0]} {atm.name.split(' ')[1]}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* MODE 1: 3D CYLINDER CAROUSEL VIEW                                          */}
        {/* ========================================================================= */}
        {viewMode === 'carousel3d' && (
          <div className="relative py-12 select-none">
            
            <div className="text-center mb-6">
              <span className="text-xs text-cyan-300/80 font-mono tracking-widest uppercase">
                ✦ Kéo chuột trái/phải hoặc dùng nút để xoay tròn không gian 3D ✦
              </span>
            </div>

            {/* 3D Perspective Stage Container */}
            <div 
              className="perspective-1500 w-full h-[540px] flex items-center justify-center cursor-grab active:cursor-grabbing"
              onMouseDown={handleCarouselMouseDown}
              onMouseMove={handleCarouselMouseMove}
              onMouseUp={handleCarouselMouseUp}
              onMouseLeave={handleCarouselMouseUp}
              ref={carouselRef}
            >
              <div 
                className="transform-style-3d relative w-[320px] sm:w-[380px] h-[480px] transition-transform duration-300"
                style={{
                  transform: `rotateY(${carouselRotation}deg)`
                }}
              >
                {photos.map((item, index) => {
                  const count = photos.length;
                  const angle = (360 / count) * index;
                  // radius of 3D cylinder
                  const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 340 : 450;

                  return (
                    <div
                      key={item.id}
                      className="absolute inset-0 rounded-2xl overflow-hidden border border-cyan-400/40 bg-[#0F172A]/90 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.8)] transition-all duration-300 group cursor-pointer hover:border-cyan-300"
                      style={{
                        transform: `rotateY(${angle}deg) translateZ(${radius}px)`
                      }}
                      onClick={() => setActivePhotoModal(item)}
                    >
                      {/* Photo Top Container with Dynamic Cinemagraph Light */}
                      <div className="relative h-[250px] overflow-hidden">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Animated Light Sweep Shimmer */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-light-sweep pointer-events-none" />

                        {/* Top Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-black/60" />

                        {/* Badge Tag */}
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-cyan-400/40 text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                          <span>{item.badge}</span>
                        </div>

                        {/* Expand Button */}
                        <button
                          onClick={(e) => { e.stopPropagation(); setActivePhotoModal(item); }}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-cyan-400 transition-colors"
                          title="Xem cận cảnh 3D"
                        >
                          <Maximize2 className="w-4 h-4" />
                        </button>

                        {/* Year pill */}
                        <div className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-md bg-black/60 text-[11px] text-gray-300 font-mono">
                          {item.year}
                        </div>
                      </div>

                      {/* Card Content Information */}
                      <div className="p-5 flex flex-col justify-between h-[230px] bg-gradient-to-b from-[#0F172A] to-[#070B14]">
                        
                        <div>
                          <div className="text-[11px] text-cyan-400 font-medium mb-1 truncate">
                            {item.faculty}
                          </div>

                          <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1 font-syne">
                            {item.title}
                          </h3>

                          <p className="text-xs text-gray-300 italic font-editorial line-clamp-3 mt-2 leading-relaxed opacity-90">
                            {item.quote}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-gray-400 block uppercase font-mono">Giảng viên kính mến:</span>
                            <span className="text-xs font-bold text-amber-300 truncate block">{item.mentor}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => handleLikePhoto(item.id, e)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/20 text-xs font-semibold text-pink-400 hover:bg-pink-500/20 hover:border-pink-500 transition-all cursor-pointer"
                              title="Thả tim tri ân"
                            >
                              <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                              <span>{item.likes}</span>
                            </button>
                          </div>
                        </div>

                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3D Carousel Floating Navigation Controls */}
            <div className="flex items-center justify-center gap-4 mt-8">
              
              <button
                onClick={handleSpinPrev}
                className="w-11 h-11 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-cyan-500 hover:border-cyan-400 transition-all shadow-lg cursor-pointer active:scale-95"
                title="Xoay lùi"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={() => setIsAutoSpinning(!isAutoSpinning)}
                className={`px-4 py-2 rounded-full text-xs font-semibold border flex items-center gap-2 transition-all cursor-pointer ${
                  isAutoSpinning
                    ? 'border-cyan-400 bg-cyan-950/60 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                    : 'border-white/20 bg-white/10 text-gray-300 hover:text-white'
                }`}
              >
                {isAutoSpinning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isAutoSpinning ? 'Dừng Tự Xoay' : 'Tự Động Xoay 3D'}</span>
              </button>

              <button
                onClick={handleSpinNext}
                className="w-11 h-11 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-cyan-500 hover:border-cyan-400 transition-all shadow-lg cursor-pointer active:scale-95"
                title="Xoay tới"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* MODE 2: 3D HOLOGRAPHIC TILT MATRIX VIEW                                    */}
        {/* ========================================================================= */}
        {viewMode === 'tiltgrid' && (
          <div className="space-y-6">
            
            <div className="text-center mb-8">
              <span className="text-xs text-cyan-300/80 font-mono tracking-widest uppercase">
                ✦ Di chuyển chuột trên từng bức ảnh để trải nghiệm hiệu ứng chiều sâu 3D Parallax & Lớp phản quang đa sắc ✦
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {photos.map((item) => (
                <TiltPhotoCard 
                  key={item.id} 
                  item={item} 
                  onOpenModal={() => setActivePhotoModal(item)}
                  onLike={(e) => handleLikePhoto(item.id, e)}
                  onCopyQuote={(e) => handleCopyQuote(item, e)}
                  isCopied={copiedQuoteId === item.id}
                />
              ))}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* MODE 3: CINEMATIC STREAM VIEW                                              */}
        {/* ========================================================================= */}
        {viewMode === 'cinematic' && (
          <div className="space-y-12">
            
            <div className="text-center mb-4">
              <span className="text-xs text-cyan-300/80 font-mono tracking-widest uppercase">
                ✦ Dòng thời gian điện ảnh chuyển động — Những hải trình không bao giờ phai mờ ✦
              </span>
            </div>

            <div className="space-y-12">
              {photos.map((item, idx) => (
                <div 
                  key={item.id}
                  className={`flex flex-col lg:flex-row items-center gap-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden relative group ${
                    idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Background Aura Light */}
                  <div 
                    className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-[100px] opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity"
                    style={{ background: activeAtmosphere.glowColor }}
                  />

                  {/* Photo Display Stage with Animated Layers */}
                  <div className="w-full lg:w-1/2 relative rounded-2xl overflow-hidden aspect-[16/10] border border-cyan-400/30 shadow-2xl">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Cinemagraph sweep */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-light-sweep pointer-events-none" />

                    {/* Floating Sunbeam Effect */}
                    <div className="absolute -top-12 -left-12 w-48 h-48 bg-cyan-400/20 rounded-full blur-2xl animate-sunbeam pointer-events-none" />

                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-mono text-cyan-300 border border-cyan-400/30">
                      {item.badge}
                    </div>

                    <button
                      onClick={() => setActivePhotoModal(item)}
                      className="absolute bottom-4 right-4 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md text-xs font-semibold text-white border border-white/20 hover:border-cyan-400 flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Xem Phim Ký Ức 3D</span>
                    </button>
                  </div>

                  {/* Story & Typography Details */}
                  <div className="w-full lg:w-1/2 space-y-4">
                    
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">{item.faculty}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-xs font-mono text-gray-400">{item.year}</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-syne group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h2>

                    <p className="text-base sm:text-lg italic font-editorial text-amber-200/90 leading-relaxed border-l-2 border-cyan-400 pl-4 py-1">
                      {item.quote}
                    </p>

                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                      {item.storyDetail}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {item.tags.map((t, i) => (
                        <span key={i} className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/5 text-gray-300 border border-white/10">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <div className="text-[11px] text-gray-400 font-mono uppercase">Vị Thuyền Trưởng:</div>
                        <div className="text-sm font-bold text-white">{item.mentor}</div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) => handleLikePhoto(item.id, e)}
                          className="flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/40 text-pink-400 font-semibold text-xs hover:bg-pink-500/20 transition-all cursor-pointer"
                        >
                          <Heart className="w-4 h-4 fill-pink-500" />
                          <span>{item.likes} Yêu Thích</span>
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* 3D FULLSCREEN CINEMA LIGHTBOX MODAL                                       */}
      {/* ========================================================================= */}
      {activePhotoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-2xl animate-fade-in">
          
          <div className="relative w-full max-w-5xl rounded-3xl overflow-hidden bg-[#0A0F1D] border border-cyan-400/40 shadow-[0_0_80px_rgba(0,240,255,0.25)] flex flex-col lg:flex-row max-h-[90vh]">
            
            {/* Close button */}
            <button
              onClick={() => setActivePhotoModal(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 border border-white/20 text-white hover:text-cyan-400 flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left 3D Animated Photo Stage */}
            <div className="w-full lg:w-3/5 relative bg-black flex items-center justify-center overflow-hidden min-h-[300px] lg:min-h-[500px]">
              <img 
                src={activePhotoModal.imageUrl} 
                alt={activePhotoModal.title} 
                className="w-full h-full object-cover animate-float-gentle"
              />

              {/* Shimmer sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-light-sweep pointer-events-none" />

              {/* Audio visualizer bar on bottom */}
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/20">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-mono text-cyan-300">Không Gian Âm Hưởng 3D • 20/11</span>
                </div>
                <div className="flex items-center gap-1">
                  {[40, 70, 90, 50, 100, 30, 80, 60, 95, 45].map((h, i) => (
                    <span 
                      key={i} 
                      className="w-1 bg-gradient-to-t from-cyan-400 to-pink-500 rounded-full animate-pulse"
                      style={{ 
                        height: `${h * 0.22}px`,
                        animationDelay: `${i * 0.1}s` 
                      }} 
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Detailed Narrative Panel */}
            <div className="w-full lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-gradient-to-b from-[#0F172A] to-[#0A0F1D] space-y-6">
              
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/40 text-[11px] font-mono text-cyan-300">
                  <span>{activePhotoModal.badge}</span>
                  <span>•</span>
                  <span>{activePhotoModal.year}</span>
                </div>

                <h2 className="text-2xl font-bold font-syne text-white">
                  {activePhotoModal.title}
                </h2>

                <div className="text-xs text-cyan-400 font-medium">
                  {activePhotoModal.faculty}
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <div className="text-[10px] uppercase font-mono text-gray-400">Câu nói chạm khắc:</div>
                  <p className="text-sm italic font-editorial text-amber-200 leading-relaxed">
                    {activePhotoModal.quote}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-mono text-gray-400 uppercase">Ký ức đằng sau khung hình:</div>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                    {activePhotoModal.storyDetail}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {activePhotoModal.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-gray-400 border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-mono block">Giảng viên:</span>
                  <span className="text-sm font-bold text-amber-300">{activePhotoModal.mentor}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleLikePhoto(activePhotoModal.id)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold text-xs shadow-lg hover:opacity-90 transition-all cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 fill-white" />
                    <span>{activePhotoModal.likes}</span>
                  </button>

                  <button
                    onClick={() => handleCopyQuote(activePhotoModal)}
                    className="p-2 rounded-full bg-white/10 border border-white/20 text-white hover:text-cyan-400 transition-colors cursor-pointer"
                    title="Sao chép lời tri ân"
                  >
                    {copiedQuoteId === activePhotoModal.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: CONTRIBUTE NEW 3D MOTION PHOTO                                     */}
      {/* ========================================================================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
          
          <div className="relative w-full max-w-2xl rounded-3xl overflow-hidden bg-[#0F172A] border border-cyan-400/40 shadow-2xl p-6 sm:p-8 space-y-6">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-xl font-bold font-syne text-white">
                  Đăng Bức Ảnh Kỷ Niệm 3D Của Bạn
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Lưu giữ hình ảnh và lời tri ân người Thuyền Trưởng trong không gian 3 chiều sống động
                </p>
              </div>

              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNewPhoto} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-medium mb-1">
                    Tiêu Đề Khoảnh Khắc <span className="text-pink-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="VD: Nụ Cười Thầy Ngày Bảo Vệ Đồ Án"
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white placeholder-gray-500 focus:border-cyan-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-1">
                    Tên Giảng Viên Kính Mến <span className="text-pink-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newMentor}
                    onChange={(e) => setNewMentor(e.target.value)}
                    placeholder="VD: Thầy/Cô Nguyễn Văn A"
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white placeholder-gray-500 focus:border-cyan-400 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-medium mb-1">Khoa / Viện Giảng Dạy</label>
                  <input
                    type="text"
                    value={newFaculty}
                    onChange={(e) => setNewFaculty(e.target.value)}
                    placeholder="VD: Khoa Cơ Điện Tử"
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white placeholder-gray-500 focus:border-cyan-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-1">Niên Khóa / Năm Kỷ Niệm</label>
                  <input
                    type="text"
                    value={newYear}
                    onChange={(e) => setNewYear(e.target.value)}
                    placeholder="VD: Khóa K2022 - 2026"
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white placeholder-gray-500 focus:border-cyan-400 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-1">
                  Câu Trích Dẫn / Lời Dặn Của Thầy Cô <span className="text-pink-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newQuote}
                  onChange={(e) => setNewQuote(e.target.value)}
                  placeholder="VD: Dù bão táp thế nào, con tàu của chúng ta vẫn luôn tiến về phía trước..."
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white placeholder-gray-500 focus:border-cyan-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-1">Đường Dẫn Ảnh (Hoặc để trống dùng ảnh mẫu nghệ thuật)</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white placeholder-gray-500 focus:border-cyan-400 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setNewImageUrl('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80')}
                    className="px-3 py-2 rounded-xl bg-white/10 border border-white/20 hover:border-cyan-400 text-[11px] whitespace-nowrap"
                  >
                    Chọn Ảnh Mẫu
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-1">Câu Chuyện Kỷ Niệm Xúc Động</label>
                <textarea
                  rows={3}
                  value={newStoryDetail}
                  onChange={(e) => setNewStoryDetail(e.target.value)}
                  placeholder="Kể lại câu chuyện thật hoặc kỷ niệm khó quên với thầy cô..."
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/20 text-white placeholder-gray-500 focus:border-cyan-400 outline-none resize-none"
                />
              </div>

              {/* Color Atmosphere Selection */}
              <div>
                <label className="block text-gray-300 font-medium mb-1.5">Hiệu Ứng Sắc Màu 3D</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {COLOR_ATMOSPHERES.map((atm) => (
                    <button
                      type="button"
                      key={atm.id}
                      onClick={() => setNewColorMode(atm.id)}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                        newColorMode === atm.id
                          ? 'border-cyan-400 bg-cyan-950/50 text-white'
                          : 'border-white/10 bg-black/20 text-gray-400 hover:text-white'
                      }`}
                    >
                      <span className="block text-xs font-semibold">{atm.name.split(' ')[0]} {atm.name.split(' ')[1]}</span>
                      <span className="text-[10px] text-gray-400 block truncate">{atm.sub.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-white/20 text-gray-300 hover:text-white"
                >
                  Hủy bỏ
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white font-bold text-xs shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:opacity-95 cursor-pointer"
                >
                  ✨ Đăng Vào Thư Viện 3D
                </button>
              </div>

            </form>

          </div>

        </div>
      )}

      {/* Modal / Add forms */}
    </section>
  );
}

// =========================================================================
// SUBCOMPONENT: 3D HOLOGRAPHIC TILT PHOTO CARD
// =========================================================================
function TiltPhotoCard({ item, onOpenModal, onLike, onCopyQuote, isCopied }) {
  const cardRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({
    rotateX: 0,
    rotateY: 0,
    shineX: 50,
    shineY: 50,
    isHovered: false
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    const shineX = (x / rect.width) * 100;
    const shineY = (y / rect.height) * 100;

    setTiltStyle({
      rotateX,
      rotateY,
      shineX,
      shineY,
      isHovered: true
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      rotateX: 0,
      rotateY: 0,
      shineX: 50,
      shineY: 50,
      isHovered: false
    });
  };

  return (
    <div 
      className="perspective-1000"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="rounded-3xl border border-white/15 bg-gradient-to-b from-[#0F172A] to-[#070B14] overflow-hidden shadow-2xl transition-transform duration-200 ease-out relative group cursor-pointer"
        style={{
          transform: `rotateX(${tiltStyle.rotateX}deg) rotateY(${tiltStyle.rotateY}deg) ${tiltStyle.isHovered ? 'scale(1.02)' : 'scale(1)'}`,
          transformStyle: 'preserve-3d'
        }}
        onClick={onOpenModal}
      >
        
        {/* Holographic Specular Shine Overlay */}
        {tiltStyle.isHovered && (
          <div 
            className="absolute inset-0 pointer-events-none z-20 opacity-40 mix-blend-overlay transition-opacity"
            style={{
              background: `radial-gradient(circle at ${tiltStyle.shineX}% ${tiltStyle.shineY}%, rgba(255,255,255,0.8) 0%, rgba(0,240,255,0.4) 30%, transparent 70%)`
            }}
          />
        )}

        {/* Photo Container */}
        <div className="relative h-64 overflow-hidden">
          <img 
            src={item.imageUrl} 
            alt={item.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Cinemagraph Light Sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-light-sweep pointer-events-none" />

          {/* Badge */}
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-cyan-400/40 text-[10px] font-mono text-cyan-300 font-bold uppercase">
            {item.badge}
          </div>

          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/60 text-[10px] font-mono text-gray-300">
            {item.year}
          </div>
        </div>

        {/* Content Body with 3D Pop Out */}
        <div 
          className="p-6 space-y-3 relative z-10"
          style={{ transform: tiltStyle.isHovered ? 'translateZ(30px)' : 'translateZ(0px)', transition: 'transform 0.2s' }}
        >
          <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider truncate">
            {item.faculty}
          </div>

          <h3 className="text-lg font-bold text-white font-syne group-hover:text-cyan-300 transition-colors line-clamp-1">
            {item.title}
          </h3>

          <p className="text-xs text-amber-200/90 italic font-editorial line-clamp-2 leading-relaxed">
            {item.quote}
          </p>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-gray-400 font-mono uppercase block">Thầy Cô:</span>
              <span className="text-xs font-bold text-white truncate block">{item.mentor}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onLike}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-xs font-semibold text-pink-400 hover:bg-pink-500/20 transition-all cursor-pointer"
                title="Yêu thích"
              >
                <Heart className="w-3.5 h-3.5 fill-pink-500" />
                <span>{item.likes}</span>
              </button>

              <button
                onClick={onCopyQuote}
                className="p-1.5 rounded-full bg-white/5 border border-white/15 text-gray-400 hover:text-white transition-colors"
                title="Sao chép lời tri ân"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
