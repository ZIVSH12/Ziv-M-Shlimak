import React, { useState } from 'react';
import { Sparkles, Send, X, Loader2 } from 'lucide-react';
import { Product, Language } from '../types';
import { TRANSLATIONS, PRODUCTS } from '../constants';
import { getProductRecommendations } from '../services/geminiService';
import { ProductCard } from './ProductCard';

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onAddToCart: (p: Product) => void;
}

export const AIChat: React.FC<AIChatProps> = ({ isOpen, onClose, lang, onAddToCart }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{ products: Product[], reasoning: string } | null>(null);

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setResults(null);

    const result = await getProductRecommendations(query, PRODUCTS, lang);
    const matchedProducts = PRODUCTS.filter(p => result.productIds.includes(p.id));

    setResults({
      products: matchedProducts,
      reasoning: result.reasoning
    });
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-white flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="text-accent" />
              <h2 className="text-xl font-bold">{TRANSLATIONS.ai_helper_title[lang]}</h2>
            </div>
            <p className="text-blue-100 text-sm opacity-90">
              {lang === 'he' ? 'מופעל ע״י Gemini' : 'Powered by Gemini'}
            </p>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {!results && !isLoading && (
             <div className="text-center text-gray-400 py-10">
                <Sparkles size={48} className="mx-auto mb-4 opacity-50" />
                <p>{lang === 'he' ? 'שאל אותי כל דבר על המוצרים שלנו...' : 'Ask me anything about our products...'}</p>
             </div>
          )}

          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20 text-primary">
              <Loader2 size={40} className="animate-spin mb-4" />
              <p className="animate-pulse font-medium">Thinking...</p>
            </div>
          )}

          {results && (
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-blue-900">
                <p>{results.reasoning}</p>
              </div>
              
              {results.products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {results.products.map(p => (
                    <div key={p.id} className="h-64">
                       <ProductCard product={p} lang={lang} onAddToCart={onAddToCart} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">
                  {lang === 'he' ? 'לא נמצאו מוצרים תואמים.' : 'No matching products found.'}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer / Input */}
        <div className="p-4 bg-white border-t border-gray-100">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={TRANSLATIONS.ai_helper_placeholder[lang]}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
            <button 
              type="submit" 
              disabled={isLoading}
              className="bg-primary hover:bg-primary-dark disabled:opacity-50 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2"
            >
              <Send size={18} />
              <span className="hidden sm:inline">{TRANSLATIONS.ai_helper_btn[lang]}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};