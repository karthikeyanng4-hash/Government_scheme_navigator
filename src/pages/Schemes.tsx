import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Filter, 
  ChevronRight, 
  MapPin, 
  User, 
  Briefcase, 
  GraduationCap, 
  IndianRupee,
  FileText,
  ExternalLink,
  CheckCircle2,
  X,
  Mic,
  MicOff
} from 'lucide-react';
import schemesData from '../data/schemes.json';
import translations from '../data/translations.json';

const Schemes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedScheme, setSelectedScheme] = useState<any>(null);
  const [isListening, setIsListening] = useState(false);
  const [filteredSchemes, setFilteredSchemes] = useState(schemesData);
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('appLang') || 'en';
    setLang(savedLang);
    
    const handleLangChange = () => {
      setLang(localStorage.getItem('appLang') || 'en');
    };
    window.addEventListener('languageChange', handleLangChange);
    return () => window.removeEventListener('languageChange', handleLangChange);
  }, []);

  const t = (translations as any)[lang];

  const categories = ['All', ...new Set(schemesData.map(s => s.category))];

  useEffect(() => {
    let filtered = schemesData.filter(scheme => 
      (scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       scheme.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === 'All' || scheme.category === selectedCategory)
    );
    setFilteredSchemes(filtered);
  }, [searchTerm, selectedCategory]);

  const toggleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Voice search is not supported in this browser.");
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-IN';

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchTerm(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    }
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Search & Filter Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white dark:text-white light:text-slate-900 mb-4 tracking-tight">{t.nav.schemes}</h1>
        <p className="text-slate-400 mb-8 max-w-2xl">{t.schemes.subtitle}</p>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder={t.schemes.search_placeholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 dark:bg-slate-900 light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 rounded-2xl py-4 pl-12 pr-12 text-white dark:text-white light:text-slate-900 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-all shadow-xl"
            />
            <button
              onClick={toggleVoiceSearch}
              className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all ${
                isListening ? 'bg-red-500 text-white animate-pulse' : 'text-slate-500 hover:text-cyan-400'
              }`}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
          </div>
          
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                  selectedCategory === cat 
                    ? 'bg-cyan-500 border-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]' 
                    : 'bg-slate-900 dark:bg-slate-900 light:bg-slate-100 border-white/10 dark:border-white/10 light:border-slate-200 text-slate-400 hover:border-white/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredSchemes.map((scheme, i) => (
          <motion.div
            key={scheme.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setSelectedScheme(scheme)}
            className="bg-slate-900 dark:bg-slate-900 light:bg-white border border-white/5 dark:border-white/5 light:border-slate-200 rounded-3xl p-6 hover:border-cyan-500/30 transition-all group cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 -mr-16 -mt-16 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-all"></div>
            
            <div className="flex items-center justify-between mb-4">
              <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 text-[10px] font-bold uppercase tracking-widest border border-cyan-500/20">
                {scheme.category}
              </span>
              <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
            </div>
            
            <h3 className="text-lg font-bold text-white dark:text-white light:text-slate-900 mb-3 group-hover:text-cyan-400 transition-colors leading-tight">{scheme.name}</h3>
            <p className="text-slate-400 text-sm line-clamp-3 mb-6 leading-relaxed">{scheme.description}</p>
            
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5 dark:border-white/5 light:border-slate-100">
              <div className="flex items-center space-x-2 text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                <User className="w-3 h-3 text-cyan-500" />
                <span>{t.schemes.age}: {scheme.minimum_age}-{scheme.maximum_age}</span>
              </div>
              <div className="flex items-center space-x-2 text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                <IndianRupee className="w-3 h-3 text-emerald-500" />
                <span>{t.schemes.limit}: ₹{scheme.income_limit.toLocaleString()}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredSchemes.length === 0 && (
        <div className="py-20 text-center">
          <div className="w-20 h-20 bg-slate-900 dark:bg-slate-900 light:bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/5">
            <Search className="w-8 h-8 text-slate-700" />
          </div>
          <h3 className="text-xl font-bold text-white dark:text-white light:text-slate-900 mb-2">{t.schemes.no_results}</h3>
          <p className="text-slate-500">{t.schemes.no_results_desc}</p>
        </div>
      )}

      {/* Scheme Detail Modal */}
      <AnimatePresence>
        {selectedScheme && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedScheme(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-slate-900 dark:bg-slate-900 light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar">
                <button 
                  onClick={() => setSelectedScheme(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/5 dark:bg-white/5 light:bg-slate-100 text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-900 hover:bg-white/10 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="mb-8">
                  <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase tracking-widest border border-cyan-500/20 mb-4">
                    {selectedScheme.category}
                  </span>
                  <h2 className="text-3xl font-bold text-white dark:text-white light:text-slate-900 mb-4 leading-tight">{selectedScheme.name}</h2>
                  <p className="text-slate-400 text-lg leading-relaxed">{selectedScheme.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div className="space-y-6">
                    <div className="bg-slate-800/50 dark:bg-slate-800/50 light:bg-slate-50 rounded-2xl p-6 border border-white/5 dark:border-white/5 light:border-slate-200">
                      <h4 className="text-white dark:text-white light:text-slate-900 font-bold mb-4 flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-cyan-400" />
                        <span>{t.schemes.eligibility_criteria}</span>
                      </h4>
                      <ul className="space-y-3">
                        <li className="flex items-center justify-between text-sm">
                          <span className="text-slate-500">{t.schemes.age_range}</span>
                          <span className="text-slate-200 dark:text-slate-200 light:text-slate-700 font-medium">{selectedScheme.minimum_age} - {selectedScheme.maximum_age} {t.schemes.age}</span>
                        </li>
                        <li className="flex items-center justify-between text-sm">
                          <span className="text-slate-500">{t.schemes.income_limit}</span>
                          <span className="text-slate-200 dark:text-slate-200 light:text-slate-700 font-medium">Up to ₹{selectedScheme.income_limit.toLocaleString()} / Year</span>
                        </li>
                        <li className="flex items-center justify-between text-sm">
                          <span className="text-slate-500">{t.schemes.occupation}</span>
                          <span className="text-slate-200 dark:text-slate-200 light:text-slate-700 font-medium">{selectedScheme.occupation}</span>
                        </li>
                        <li className="flex items-center justify-between text-sm">
                          <span className="text-slate-500">{t.schemes.education}</span>
                          <span className="text-slate-200 dark:text-slate-200 light:text-slate-700 font-medium">{selectedScheme.education_required}</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-slate-800/50 dark:bg-slate-800/50 light:bg-slate-50 rounded-2xl p-6 border border-white/5 dark:border-white/5 light:border-slate-200">
                      <h4 className="text-white dark:text-white light:text-slate-900 font-bold mb-4 flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-cyan-400" />
                        <span>{t.schemes.availability}</span>
                      </h4>
                      <p className="text-slate-300 dark:text-slate-300 light:text-slate-600 text-sm">{selectedScheme.state_availability}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-slate-800/50 dark:bg-slate-800/50 light:bg-slate-50 rounded-2xl p-6 border border-white/5 dark:border-white/5 light:border-slate-200">
                      <h4 className="text-white dark:text-white light:text-slate-900 font-bold mb-4 flex items-center space-x-2">
                        <SparklesIcon className="w-4 h-4 text-cyan-400" />
                        <span>{t.schemes.key_benefits}</span>
                      </h4>
                      <p className="text-slate-300 dark:text-slate-300 light:text-slate-600 text-sm leading-relaxed">{selectedScheme.benefits}</p>
                    </div>

                    <div className="bg-slate-800/50 dark:bg-slate-800/50 light:bg-slate-50 rounded-2xl p-6 border border-white/5 dark:border-white/5 light:border-slate-200">
                      <h4 className="text-white dark:text-white light:text-slate-900 font-bold mb-4 flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>{t.schemes.required_documents}</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedScheme.documents_required.map((doc: string, i: number) => (
                          <span key={i} className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded-lg border border-emerald-500/20">
                            {doc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <a
                    href={selectedScheme.application_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-8 py-4 bg-cyan-500 text-white rounded-2xl font-bold hover:bg-cyan-400 transition-all shadow-xl flex items-center justify-center space-x-2"
                  >
                    <span>{t.schemes.apply_now}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button className="w-full sm:w-auto px-8 py-4 bg-white/5 dark:bg-white/5 light:bg-slate-100 text-white dark:text-white light:text-slate-900 rounded-2xl font-bold border border-white/10 dark:border-white/10 light:border-slate-200 hover:bg-white/10 transition-all">
                    {t.schemes.save_later}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

export default Schemes;
