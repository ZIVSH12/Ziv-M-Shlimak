import React, { useState, useEffect } from 'react';
import { ShoppingCart, Globe, Star, Truck, ShieldCheck, Sparkles } from 'lucide-react';
import { PRODUCTS, TRANSLATIONS } from './constants';
import { Product, CartItem, Language, ViewState } from './types';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { AIChat } from './components/AIChat';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('he');
  const [view, setView] = useState<ViewState>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);

  // Handle direction based on language
  useEffect(() => {
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Cart Logic
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) return { ...item, quantity: Math.max(1, item.quantity + delta) };
      return item;
    }));
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Content Rendering
  const renderContent = () => {
    switch (view) {
      case 'catalog':
        return (
          <div className="container mx-auto px-4 py-12 animate-in fade-in duration-500">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">{TRANSLATIONS.nav_catalog[lang]}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {PRODUCTS.map(p => (
                <div key={p.id} className="h-96">
                   <ProductCard product={p} lang={lang} onAddToCart={addToCart} />
                </div>
              ))}
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="container mx-auto px-4 py-16 text-center max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
             <h2 className="text-3xl font-bold text-primary mb-6">{TRANSLATIONS.nav_about[lang]}</h2>
             <img src="https://picsum.photos/800/400?grayscale" alt="About" className="w-full rounded-2xl shadow-xl mb-8 object-cover h-64" />
             <p className="text-xl leading-relaxed text-gray-600">
               {lang === 'he' 
                 ? "אנחנו ב-Blue & Gold מבינים את הגעגוע. הגעגוע לריח של הקפה בבוקר, לטעם של הבמבה בגינה. הקמנו את האתר הזה כדי לחבר בין ישראל לבין הקהילות בארה״ב."
                 : "At Blue & Gold, we understand the nostalgia. The longing for the smell of morning coffee, the taste of Bamba in the park. We created this site to connect Israel with communities in the US."}
             </p>
          </div>
        );
      case 'contact':
        return (
          <div className="container mx-auto px-4 py-16 max-w-lg animate-in fade-in zoom-in-95 duration-500">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">{TRANSLATIONS.nav_contact[lang]}</h2>
            <form className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Sent!"); }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{lang === 'he' ? 'שם מלא' : 'Full Name'}</label>
                <input className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{lang === 'he' ? 'אימייל' : 'Email'}</label>
                <input type="email" className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{lang === 'he' ? 'הודעה' : 'Message'}</label>
                <textarea rows={4} className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:outline-none transition" />
              </div>
              <button className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all">
                {lang === 'he' ? 'שלח' : 'Send'}
              </button>
            </form>
          </div>
        );
      default: // Home
        return (
          <div className="animate-in fade-in duration-500">
            {/* Hero */}
            <div className="relative h-[600px] flex items-center justify-center text-center text-white bg-cover bg-center" style={{ backgroundImage: 'linear-gradient(rgba(0,56,184,0.7), rgba(0,0,0,0.5)), url(https://picsum.photos/1920/1080?blur=2)' }}>
              <div className="container px-4 z-10">
                <h1 className="text-5xl md:text-7xl font-black mb-6 drop-shadow-lg leading-tight">
                  {TRANSLATIONS.hero_title[lang]}
                </h1>
                <p className="text-xl md:text-2xl mb-10 text-gray-100 max-w-2xl mx-auto font-light">
                  {TRANSLATIONS.hero_subtitle[lang]}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={() => setView('catalog')} className="bg-accent hover:bg-yellow-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105 shadow-xl">
                    {TRANSLATIONS.hero_cta[lang]}
                  </button>
                  <button onClick={() => setIsAIOpen(true)} className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/50 text-white px-10 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105 shadow-xl flex items-center justify-center gap-2">
                    <Sparkles size={20} className="text-accent" />
                    {TRANSLATIONS.ai_helper_btn[lang]}
                  </button>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-primary text-white py-12">
               <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div className="flex flex-col items-center gap-3">
                     <ShieldCheck size={48} className="text-accent" />
                     <h3 className="font-bold text-xl">{lang === 'he' ? '100% מקורי' : '100% Authentic'}</h3>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                     <Truck size={48} className="text-accent" />
                     <h3 className="font-bold text-xl">{lang === 'he' ? 'משלוח מהיר לארה״ב' : 'Fast US Shipping'}</h3>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                     <Star size={48} className="text-accent" />
                     <h3 className="font-bold text-xl">{lang === 'he' ? 'כשר למהדרין' : 'Kosher Certified'}</h3>
                  </div>
               </div>
            </div>

            {/* Popular Grid */}
            <div className="container mx-auto px-4 py-20">
               <h2 className="text-3xl font-bold text-primary mb-10 text-center">{lang === 'he' ? 'הנמכרים ביותר' : 'Best Sellers'}</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                 {PRODUCTS.slice(0, 4).map(p => (
                   <div key={p.id} className="h-96">
                      <ProductCard product={p} lang={lang} onAddToCart={addToCart} />
                   </div>
                 ))}
               </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${lang === 'he' ? 'font-hebrew' : 'font-english'}`}>
      
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm h-20 flex items-center">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div 
            className="text-3xl font-black text-primary flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
            onClick={() => setView('home')}
          >
            <Star className="text-accent fill-accent" size={28} />
            Blue<span className="text-accent">&</span>Gold
          </div>

          <nav className="hidden md:flex gap-8 font-medium text-gray-600">
            {['home', 'catalog', 'about', 'contact'].map((v) => (
              <button 
                key={v}
                onClick={() => setView(v as ViewState)}
                className={`hover:text-primary transition relative ${view === v ? 'text-primary font-bold after:content-[""] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-accent' : ''}`}
              >
                {TRANSLATIONS[`nav_${v}`][lang]}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
             <button 
               onClick={() => setLang(prev => prev === 'he' ? 'en' : 'he')}
               className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-200 text-sm font-bold text-gray-600 hover:border-primary hover:text-primary transition"
             >
               <Globe size={16} />
               {lang === 'he' ? 'EN' : 'עב'}
             </button>
             
             <button 
               className="relative p-2 text-primary hover:bg-blue-50 rounded-full transition-colors"
               onClick={() => setIsCartOpen(true)}
             >
               <ShoppingCart size={28} />
               {cart.length > 0 && (
                 <span className="absolute top-0 right-0 bg-accent text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                   {cart.length}
                 </span>
               )}
             </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4 text-center md:text-start grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Blue & Gold</h4>
            <p className="text-sm">{TRANSLATIONS.footer_about[lang]}</p>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-4">{TRANSLATIONS.nav_catalog[lang]}</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => setView('catalog')} className="hover:text-accent">New Arrivals</button></li>
              <li><button onClick={() => setView('catalog')} className="hover:text-accent">Best Sellers</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Service</h4>
            <ul className="space-y-2 text-sm">
               <li><button onClick={() => setView('contact')} className="hover:text-accent">Contact Us</button></li>
               <li><button className="hover:text-accent">Shipping Policy</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Connect</h4>
            <div className="flex justify-center md:justify-start gap-4">
              {/* Social placeholders */}
              <div className="w-8 h-8 bg-gray-700 rounded-full hover:bg-accent transition cursor-pointer"></div>
              <div className="w-8 h-8 bg-gray-700 rounded-full hover:bg-accent transition cursor-pointer"></div>
              <div className="w-8 h-8 bg-gray-700 rounded-full hover:bg-accent transition cursor-pointer"></div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        updateQuantity={updateQuantity}
        removeItem={removeFromCart}
        lang={lang}
      />

      <AIChat 
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        lang={lang}
        onAddToCart={(p) => {
          addToCart(p);
          setIsAIOpen(false); // Close chat to show cart or keep open? Let's close for flow.
        }}
      />
      
      {/* Floating AI Button for easy access */}
      {!isAIOpen && (
        <button 
          onClick={() => setIsAIOpen(true)}
          className="fixed bottom-6 left-6 z-30 bg-gradient-to-r from-primary to-blue-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 group"
        >
          <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
        </button>
      )}

    </div>
  );
};

export default App;