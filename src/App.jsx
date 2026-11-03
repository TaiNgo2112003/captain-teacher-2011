import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import KeyVisualStory from './components/KeyVisualStory';
import CardCreator from './components/CardCreator';
import WishWall from './components/WishWall';
import DiscussionSection from './components/DiscussionSection';
import FooterSection from './components/FooterSection';
import CardModal from './components/CardModal';
import AdminModal from './components/AdminModal';
import { 
  DEFAULT_CARDS, 
  DISCUSSION_TOPICS, 
  SENSITIVE_WORDS 
} from './data/initialData';

export default function App() {
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
  const [isAdminOpen, setIsAdminOpen] = useState(false);

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
    // Check if message has sensitive words
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

  // Sensitive words handlers
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
    <div className="min-h-screen bg-[#070d18] text-slate-100 selection:bg-amber-400 selection:text-slate-950 font-sans">
      
      {/* Navbar with Live Countdown and Admin Trigger */}
      <Navbar 
        onOpenAdmin={() => setIsAdminOpen(true)} 
        totalWishesCount={approvedWishesCount}
      />

      <main>
        {/* Hero Section */}
        <HeroSection totalWishes={approvedWishesCount} />

        {/* Section 1: Key Visual Story & Event Info */}
        <KeyVisualStory />

        {/* Section 2: Interactive Card Generator with Stickers Drag & Drop */}
        <CardCreator onAddCard={handleAddCard} />

        {/* Section 3: Wall of Wishes */}
        <WishWall 
          cards={cards} 
          onLikeCard={handleLikeCard} 
          onSelectCard={(card) => setSelectedCardForModal(card)}
        />

        {/* Section 4: 3-5 Discussion Topics with 1-3 Images upload */}
        <DiscussionSection 
          topics={topics}
          onAddComment={handleAddComment}
          onLikeComment={handleLikeComment}
        />
      </main>

      {/* Section 5: Closing Greetings & 20/11 Celebration */}
      <FooterSection />

      {/* Card Detail Modal */}
      {selectedCardForModal && (
        <CardModal 
          card={selectedCardForModal} 
          onClose={() => setSelectedCardForModal(null)}
          onLike={handleLikeCard}
        />
      )}

      {/* Admin Panel Modal (PIN: 2011) */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        cards={cards}
        onToggleCardStatus={handleToggleCardStatus}
        onToggleCardPin={handleToggleCardPin}
        onDeleteCard={handleDeleteCard}
        topics={topics}
        onToggleCommentStatus={handleToggleCommentStatus}
        sensitiveWords={sensitiveWords}
        onAddSensitiveWord={handleAddSensitiveWord}
        onRemoveSensitiveWord={handleRemoveSensitiveWord}
      />

    </div>
  );
}
