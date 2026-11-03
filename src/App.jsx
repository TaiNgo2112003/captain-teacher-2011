import React, { useState, useEffect } from 'react';
import VersionBar from './components/VersionBar';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import KeyVisualStory from './components/KeyVisualStory';
import CardCreator from './components/CardCreator';
import WishWall from './components/WishWall';
import DiscussionSection from './components/DiscussionSection';
import FooterSection from './components/FooterSection';
import MuseumPage from './components/MuseumPage';
import CompassQuizPage from './components/CompassQuizPage';
import CardModal from './components/CardModal';
import AdminPage from './components/AdminPage';
import { 
  DEFAULT_CARDS, 
  DISCUSSION_TOPICS, 
  SENSITIVE_WORDS 
} from './data/initialData';
import { VERSIONS } from './data/versionsConfig';

export default function App() {
  // Page state: 'home', 'museum', 'quiz', 'admin'
  const [currentPage, setCurrentPage] = useState(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const pageParam = urlParams.get('page');
      if (pageParam && ['home', 'museum', 'quiz', 'admin'].includes(pageParam)) {
        return pageParam;
      }
      return 'home';
    } catch {
      return 'home';
    }
  });

  // Version theme state
  const [activeVersionId, setActiveVersionId] = useState(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const vParam = urlParams.get('v') || urlParams.get('version');
      if (vParam && VERSIONS.some(v => v.id === vParam)) {
        return vParam;
      }
      const saved = localStorage.getItem('captain_teacher_version');
      return (saved && VERSIONS.some(v => v.id === saved)) ? saved : VERSIONS[0].id;
    } catch {
      return VERSIONS[0].id;
    }
  });

  const activeVersion = VERSIONS.find(v => v.id === activeVersionId) || VERSIONS[0];

  const handleSelectPage = (pageName) => {
    setCurrentPage(pageName);
    try {
      const url = new URL(window.location);
      url.searchParams.set('page', pageName);
      window.history.replaceState({}, '', url);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      console.warn('URL update warning', e);
    }
  };

  const handleSelectVersion = (versionId) => {
    setActiveVersionId(versionId);
    try {
      localStorage.setItem('captain_teacher_version', versionId);
      const url = new URL(window.location);
      url.searchParams.set('v', versionId);
      window.history.replaceState({}, '', url);
    } catch (e) {
      console.warn('URL update warning', e);
    }
  };

  // Cards state with localStorage persistence
  const [cards, setCards] = useState(() => {
    try {
      const saved = localStorage.getItem('captain_teacher_cards');
      return saved ? JSON.parse(saved) : DEFAULT_CARDS;
    } catch {
      return DEFAULT_CARDS;
    }
  });

  // Discussion Topics state with localStorage persistence
  const [topics, setTopics] = useState(() => {
    try {
      const saved = localStorage.getItem('captain_teacher_topics');
      return saved ? JSON.parse(saved) : DISCUSSION_TOPICS;
    } catch {
      return DISCUSSION_TOPICS;
    }
  });

  // Sensitive Words list
  const [sensitiveWords, setSensitiveWords] = useState(() => {
    try {
      const saved = localStorage.getItem('captain_teacher_badwords');
      return saved ? JSON.parse(saved) : SENSITIVE_WORDS;
    } catch {
      return SENSITIVE_WORDS;
    }
  });

  // Modals state
  const [selectedCardForModal, setSelectedCardForModal] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('captain_teacher_cards', JSON.stringify(cards));
    } catch (e) {
      console.warn('localStorage quota warning', e);
    }
  }, [cards]);

  useEffect(() => {
    try {
      localStorage.setItem('captain_teacher_topics', JSON.stringify(topics));
    } catch (e) {
      console.warn('localStorage quota warning', e);
    }
  }, [topics]);

  useEffect(() => {
    try {
      localStorage.setItem('captain_teacher_badwords', JSON.stringify(sensitiveWords));
    } catch (e) {
      console.warn('localStorage quota warning', e);
    }
  }, [sensitiveWords]);

  // Add new card with auto-filtering
  const handleAddCard = (newCard) => {
    let cleanedMessage = newCard.message;
    sensitiveWords.forEach((word) => {
      const regex = new RegExp(word, 'gi');
      cleanedMessage = cleanedMessage.replace(regex, '***');
    });

    const cardToInsert = {
      ...newCard,
      message: cleanedMessage
    };

    setCards((prev) => [cardToInsert, ...prev]);
  };

  // Like a card
  const handleLikeCard = (cardId) => {
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, likes: (c.likes || 0) + 1 } : c))
    );
    if (selectedCardForModal && selectedCardForModal.id === cardId) {
      setSelectedCardForModal((prev) => ({ ...prev, likes: (prev.likes || 0) + 1 }));
    }
  };

  // Toggle card approval status in Admin
  const handleToggleCardStatus = (cardId) => {
    setCards((prev) =>
      prev.map((c) =>
        c.id === cardId ? { ...c, status: c.status === 'approved' ? 'hidden' : 'approved' } : c
      )
    );
  };

  // Toggle pin
  const handleToggleCardPin = (cardId) => {
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, isPinned: !c.isPinned } : c))
    );
  };

  // Delete card
  const handleDeleteCard = (cardId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa thiệp này không?')) {
      setCards((prev) => prev.filter((c) => c.id !== cardId));
    }
  };

  // Add comment to discussion topic
  const handleAddComment = (topicId, newComment) => {
    let cleaned = newComment.content;
    sensitiveWords.forEach((word) => {
      const regex = new RegExp(word, 'gi');
      cleaned = cleaned.replace(regex, '***');
    });

    setTopics((prev) =>
      prev.map((t) => {
        if (t.id === topicId) {
          return {
            ...t,
            comments: [{ ...newComment, content: cleaned }, ...(t.comments || [])]
          };
        }
        return t;
      })
    );
  };

  // Like comment
  const handleLikeComment = (topicId, commentId) => {
    setTopics((prev) =>
      prev.map((t) => {
        if (t.id === topicId) {
          return {
            ...t,
            comments: t.comments.map((cmt) =>
              cmt.id === commentId ? { ...cmt, likes: (cmt.likes || 0) + 1 } : cmt
            )
          };
        }
        return t;
      })
    );
  };

  // Toggle comment status in Admin
  const handleToggleCommentStatus = (topicId, commentId) => {
    setTopics((prev) =>
      prev.map((t) => {
        if (t.id === topicId) {
          return {
            ...t,
            comments: t.comments.map((cmt) =>
              cmt.id === commentId
                ? { ...cmt, status: cmt.status === 'approved' ? 'hidden' : 'approved' }
                : cmt
            )
          };
        }
        return t;
      })
    );
  };

  const handleAddSensitiveWord = (word) => {
    if (!sensitiveWords.includes(word)) {
      setSensitiveWords([...sensitiveWords, word]);
    }
  };

  const handleRemoveSensitiveWord = (word) => {
    setSensitiveWords(sensitiveWords.filter((w) => w !== word));
  };

  const approvedWishesCount = cards.filter((c) => c.status === 'approved').length;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${activeVersion.theme.pageBg || 'bg-[#F5F0E7]'} ${activeVersion.theme.pageText || 'text-[#1C2A39]'}`}>
      
      {/* 5-Version Concept Switcher Bar (Sticky on Top) */}
      <VersionBar 
        activeVersionId={activeVersionId} 
        onSelectVersion={handleSelectVersion} 
      />

      {/* Navbar with Page Switcher and Admin Trigger */}
      <Navbar 
        totalWishesCount={approvedWishesCount}
        version={activeVersion}
        currentPage={currentPage}
        onSelectPage={handleSelectPage}
      />

      {/* Dynamic Page Router */}
      <main>
        {currentPage === 'home' && (
          <>
            {/* Hero Section */}
            <HeroSection 
              totalWishes={approvedWishesCount} 
              version={activeVersion}
            />

            {/* Section 1: Key Visual Story & Event Info */}
            <KeyVisualStory 
              version={activeVersion}
            />

            {/* Section 2: Interactive Card Generator */}
            <CardCreator 
              onAddCard={handleAddCard} 
              version={activeVersion}
            />

            {/* Section 3: Wall of Wishes */}
            <WishWall 
              cards={cards} 
              onLikeCard={handleLikeCard} 
              onSelectCard={(card) => setSelectedCardForModal(card)}
              version={activeVersion}
            />

            {/* Section 4: 4 Discussion Topics */}
            <DiscussionSection 
              topics={topics}
              onAddComment={handleAddComment}
              onLikeComment={handleLikeComment}
              version={activeVersion}
            />
          </>
        )}

        {/* Page 2: Bảo Tàng Kỷ Vật Giảng Đường */}
        {currentPage === 'museum' && (
          <MuseumPage version={activeVersion} />
        )}

        {/* Page 3: La Bàn Thuyền Trưởng & Bằng Khen */}
        {currentPage === 'quiz' && (
          <CompassQuizPage 
            version={activeVersion}
            onGoToPostcardStudio={() => handleSelectPage('home')}
          />
        )}

        {/* Page 4: Trang Quản Trị Admin Chuyên Biệt */}
        {currentPage === 'admin' && (
          <AdminPage
            version={activeVersion}
            cards={cards}
            onToggleCardStatus={handleToggleCardStatus}
            onToggleCardPin={handleToggleCardPin}
            onDeleteCard={handleDeleteCard}
            topics={topics}
            onToggleCommentStatus={handleToggleCommentStatus}
            sensitiveWords={sensitiveWords}
            onAddSensitiveWord={handleAddSensitiveWord}
            onRemoveSensitiveWord={handleRemoveSensitiveWord}
            onBackToHome={() => handleSelectPage('home')}
          />
        )}
      </main>

      {/* Footer Section */}
      <FooterSection 
        onOpenAdmin={() => handleSelectPage('admin')} 
        version={activeVersion}
      />

      {/* Floating Navigation Quick Access Pill */}
      {currentPage === 'admin' ? (
        <button
          onClick={() => handleSelectPage('home')}
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#11263B] text-[#F5F0E7] border border-[#B39765]/60 shadow-2xl hover:bg-[#18334E] hover:scale-105 active:scale-95 transition-all text-xs font-semibold cursor-pointer group"
          title="Quay lại Trang Chủ Tri Ân"
        >
          <span>← Quay Lại Trang Chủ</span>
        </button>
      ) : (
        <button
          onClick={() => handleSelectPage('admin')}
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#11263B] text-[#F5F0E7] border border-[#B39765]/60 shadow-2xl hover:bg-[#18334E] hover:scale-105 active:scale-95 transition-all text-xs font-semibold cursor-pointer group"
          title="Mở Bảng Điều Khiển Quản Trị & Đề Xuất Kỹ Thuật (Mã PIN: 2011)"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Admin (PIN: 2011)</span>
        </button>
      )}

      {/* Card Detail Modal */}
      {selectedCardForModal && (
        <CardModal 
          card={selectedCardForModal} 
          onClose={() => setSelectedCardForModal(null)}
          onLike={handleLikeCard}
        />
      )}

    </div>
  );
}
