import React, { useState } from 'react';
import { QUIZ_QUESTIONS, QUIZ_ARCHETYPES } from '../data/quizData';
import { 
  ArrowRight, 
  RotateCcw, 
  Check, 
  Copy
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CompassQuizPage({ version }) {
  const [currentStep, setCurrentStep] = useState(0); // 0: Intro, 1..5: Questions, 6: Result
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [resultArchetype, setResultArchetype] = useState(null);

  // Certificate personalization
  const [teacherName, setTeacherName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [faculty, setFaculty] = useState('');
  const [copiedCertificate, setCopiedCertificate] = useState(false);

  const theme = version?.theme || {};

  const handleSelectOption = (questionId, archetype) => {
    const updated = { ...selectedAnswers, [questionId]: archetype };
    setSelectedAnswers(updated);

    if (currentStep < QUIZ_QUESTIONS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate winner archetype
      calculateResult(updated);
    }
  };

  const calculateResult = (answers) => {
    const counts = { compass: 0, anchor: 0, storm: 0, navigator: 0 };
    Object.values(answers).forEach((type) => {
      if (counts[type] !== undefined) counts[type]++;
    });

    let maxType = 'compass';
    let maxCount = -1;
    Object.entries(counts).forEach(([type, count]) => {
      if (count > maxCount) {
        maxCount = count;
        maxType = type;
      }
    });

    const finalArchetype = QUIZ_ARCHETYPES[maxType] || QUIZ_ARCHETYPES.compass;
    setResultArchetype(finalArchetype);
    setCurrentStep(6);

    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#B39765', '#B9685C', '#11263B', '#D3C6B3']
      });
    } catch {
      // fallback
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setResultArchetype(null);
    setCurrentStep(0);
    setTeacherName('');
    setStudentName('');
  };

  const handleCopyCitation = () => {
    if (!resultArchetype) return;
    const text = `🏆 ${resultArchetype.certificateTitle}\nKính tặng: ${teacherName || 'Quý Thầy/Cô'} (${faculty || 'Giảng đường'})\nDanh hiệu: ${resultArchetype.title} (${resultArchetype.englishTitle})\nTrích dẫn: "${resultArchetype.quote}"\nLời vinh danh: ${resultArchetype.certificateCitation}\n— Người kính dâng: ${studentName || 'Học trò thân quý'}\n#TheCaptainsJournal #2011`;
    navigator.clipboard.writeText(text);
    setCopiedCertificate(true);
    setTimeout(() => setCopiedCertificate(false), 2500);
  };

  return (
    <div className={`py-12 sm:py-20 transition-colors duration-300 ${theme.pageBg || 'bg-[#F5F0E7]'}`}>
      <div className="max-w-4xl mx-auto px-5 sm:px-8">

        {/* STEP 0: INTRO SCREEN */}
        {currentStep === 0 && (
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-current/30 text-xs font-mono uppercase tracking-widest opacity-80">
              <span>🧭 LA BÀN TÂM HỒN</span>
              <span>•</span>
              <span>TRẮC NGHIỆM PHONG CÁCH MENTOR 20/11</span>
            </div>

            <h1 className={`${theme.fontHeading || 'font-editorial'} text-4xl sm:text-6xl font-bold tracking-tight leading-tight max-w-3xl mx-auto`}>
              Vị Thuyền Trưởng Của Bạn <br />
              <span className="italic font-normal">thuộc phong cách nào?</span>
            </h1>

            <p className="text-base sm:text-lg opacity-80 max-w-2xl mx-auto leading-relaxed font-light">
              Mỗi Thầy Cô là một vị Thuyền Trưởng mang phong cách riêng: người là Ngọn Hải Đăng truyền cảm hứng, người là Chiếc Mỏ Neo bao dung, người là Vị Tướng vượt bão táp hay Người Hoa Tiêu đồng hành. 
              Hãy cùng khám phá và tạo một <strong>Tấm Bằng Vinh Danh Thuyền Trưởng</strong> gửi tặng Thầy Cô!
            </p>

            {/* 4 Archetypes Previews */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left pt-4">
              {Object.values(QUIZ_ARCHETYPES).map((arch) => (
                <div key={arch.id} className={`p-4 rounded-2xl border border-current/20 ${theme.surfaceBg || 'bg-white'}`}>
                  <div className="text-2xl mb-2">{arch.emblem}</div>
                  <h4 className="font-bold text-xs truncate">{arch.title}</h4>
                  <p className="text-[10px] opacity-70 mt-1 line-clamp-2">{arch.tagline}</p>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <button
                onClick={() => setCurrentStep(1)}
                className={`px-8 py-4 rounded-full text-xs uppercase tracking-wider font-semibold transition-all shadow hover:shadow-lg inline-flex items-center gap-2 cursor-pointer ${theme.btnPrimary || 'bg-black text-white'}`}
              >
                <span>Bắt đầu khám phá (5 câu hỏi ngắn)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 1..5: QUESTIONNAIRE */}
        {currentStep >= 1 && currentStep <= QUIZ_QUESTIONS.length && (
          <div className="space-y-8">
            
            {/* Progress Header */}
            <div className="flex items-center justify-between border-b border-current/20 pb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#B39765]">
                Câu hỏi {currentStep} / {QUIZ_QUESTIONS.length}
              </span>
              <div className="w-36 h-2 rounded-full bg-black/10 overflow-hidden">
                <div 
                  className="h-full bg-[#B39765] transition-all duration-300"
                  style={{ width: `${(currentStep / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Text */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider opacity-60">
                Tình huống giảng đường:
              </span>
              <h2 className={`${theme.fontHeading || 'font-editorial'} text-2xl sm:text-3xl font-bold leading-snug`}>
                {QUIZ_QUESTIONS[currentStep - 1].question}
              </h2>
            </div>

            {/* 4 Choices */}
            <div className="space-y-3 pt-2">
              {QUIZ_QUESTIONS[currentStep - 1].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(QUIZ_QUESTIONS[currentStep - 1].id, opt.archetype)}
                  className={`w-full p-5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-4 hover:border-current hover:shadow-md group ${theme.surfaceBg || 'bg-white'}`}
                >
                  <span className="w-7 h-7 rounded-full border border-current/30 flex items-center justify-center text-xs font-mono font-bold shrink-0 group-hover:bg-black/10">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-sm sm:text-base leading-relaxed opacity-90 pt-0.5">
                    {opt.text}
                  </span>
                </button>
              ))}
            </div>

            {/* Back button */}
            <div className="pt-4 flex justify-between items-center text-xs opacity-60">
              <button
                onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                className="hover:underline cursor-pointer"
              >
                ← Quay lại câu trước
              </button>
              <span>Chọn phương án phản ánh đúng nhất tính cách Thầy/Cô</span>
            </div>

          </div>
        )}

        {/* STEP 6: RESULT & CERTIFICATE STUDIO */}
        {currentStep === 6 && resultArchetype && (
          <div className="space-y-12">
            
            {/* Top Reveal Announcement */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full border border-current flex items-center justify-center mx-auto text-3xl shadow-sm">
                {resultArchetype.emblem}
              </div>

              <div className="text-xs font-mono uppercase tracking-widest text-[#B39765]">
                KẾT QUẢ ĐỊNH VỊ PHONG CÁCH MENTOR
              </div>

              <h2 className={`${theme.fontHeading || 'font-editorial'} text-3xl sm:text-5xl font-bold`}>
                {resultArchetype.title}
              </h2>
              <p className="text-sm sm:text-base text-[#B39765] font-editorial italic font-medium">
                {resultArchetype.englishTitle} • {resultArchetype.tagline}
              </p>

              <p className="text-sm sm:text-base opacity-85 max-w-2xl mx-auto leading-relaxed">
                {resultArchetype.description}
              </p>
            </div>

            {/* Interactive Certificate Generator Canvas */}
            <div className="bg-[#FAF7F2] text-[#11263B] border-4 border-double border-[#B39765] rounded-3xl p-7 sm:p-12 shadow-2xl relative overflow-hidden">
              
              {/* Corner Ornaments */}
              <div className="absolute top-3 left-3 text-xs text-[#B39765] font-mono select-none">⚓️ 20/11</div>
              <div className="absolute top-3 right-3 text-xs text-[#B39765] font-mono select-none">20/11 ⚓️</div>
              <div className="absolute bottom-3 left-3 text-xs text-[#B39765] font-mono select-none">⚓️ VERITAS</div>
              <div className="absolute bottom-3 right-3 text-xs text-[#B39765] font-mono select-none">HONOR ⚓️</div>

              <div className="text-center space-y-6 max-w-2xl mx-auto">
                
                {/* Certificate Masthead */}
                <div className="border-b border-[#B39765]/40 pb-4">
                  <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#B39765] font-semibold">
                    THE CAPTAIN'S JOURNAL // HONORARY CITATION
                  </div>
                  <h3 className="font-editorial text-2xl sm:text-3xl font-extrabold tracking-wider text-[#11263B] mt-1">
                    {resultArchetype.certificateTitle}
                  </h3>
                </div>

                {/* Citation Statement */}
                <p className="text-xs sm:text-sm text-[#5C6A79] leading-relaxed italic">
                  {resultArchetype.certificateCitation}
                </p>

                {/* Recipient Input Box inside Certificate */}
                <div className="py-4 space-y-4">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#B39765] block mb-1">
                      KÍNH CẨN TRAO TẶNG VỊ THUYỀN TRƯỞNG:
                    </span>
                    <input
                      type="text"
                      placeholder="Nhập tên Thầy / Cô (VD: TS. Nguyễn Văn Minh)"
                      value={teacherName}
                      onChange={(e) => setTeacherName(e.target.value)}
                      className="font-editorial font-bold text-xl sm:text-3xl text-center w-full bg-transparent border-b-2 border-[#B39765] text-[#11263B] focus:outline-none placeholder:text-[#5C6A79]/40 py-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <span className="text-[9px] uppercase font-mono tracking-wider opacity-60 block">Bộ môn / Viện:</span>
                      <input
                        type="text"
                        placeholder="Khoa CNTT, Viện Kinh tế..."
                        value={faculty}
                        onChange={(e) => setFaculty(e.target.value)}
                        className="text-xs text-center w-full bg-transparent border-b border-[#D3C6B3] text-[#11263B] focus:outline-none py-1"
                      />
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-mono tracking-wider opacity-60 block">Học trò kính dâng:</span>
                      <input
                        type="text"
                        placeholder="Tên bạn / Tập thể lớp..."
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        className="font-handwriting font-bold text-xl text-center w-full bg-transparent border-b border-[#D3C6B3] text-[#11263B] focus:outline-none py-0.5"
                      />
                    </div>
                  </div>
                </div>

                {/* Quote of the archetype */}
                <div className="p-4 rounded-xl bg-[#F5F0E7] border border-[#B39765]/30">
                  <p className="font-editorial italic text-sm text-[#11263B]">
                    {resultArchetype.quote}
                  </p>
                </div>

                {/* Certificate Bottom Seal & Signature */}
                <div className="pt-4 border-t border-[#B39765]/40 flex items-end justify-between text-xs">
                  <div className="text-left">
                    <span className="text-[9px] font-mono uppercase opacity-60 block">Xác thực:</span>
                    <span className="font-mono font-bold text-[#11263B]">Hải Trình 20/11/2026</span>
                  </div>

                  {/* Wax Seal */}
                  <div className="w-14 h-14 rounded-full border-2 border-dashed border-[#B9685C] text-[#B9685C] flex flex-col items-center justify-center font-bold text-[9px] uppercase rotate-6">
                    <span>★ 20/11 ★</span>
                    <span className="text-[7px]">HONOR</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Action Buttons Below Certificate */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={handleCopyCitation}
                className="px-6 py-3.5 rounded-full bg-[#11263B] text-[#F5F0E7] hover:bg-[#18334E] text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer flex items-center gap-2 shadow"
              >
                {copiedCertificate ? <Check className="w-4 h-4 text-[#B39765]" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCertificate ? 'Đã sao chép nội dung!' : 'Sao chép nội dung vinh danh'}</span>
              </button>

              <button
                onClick={handleResetQuiz}
                className="px-6 py-3.5 rounded-full border border-current text-xs uppercase tracking-wider font-semibold hover:bg-black/10 transition-all cursor-pointer flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Trắc nghiệm lại cho Thầy/Cô khác</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
