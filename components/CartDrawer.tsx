import React from 'react';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { CartItem, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  updateQuantity: (id: number, delta: number) => void;
  removeItem: (id: number) => void;
  lang: Language;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, onClose, cart, updateQuantity, removeItem, lang 
}) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const isRTL = lang === 'he';

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div 
        className={`fixed top-0 bottom-0 ${isRTL ? 'left-0' : 'right-0'} w-full max-w-md bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : (isRTL ? '-translate-x-full' : 'translate-x-full')}`}
      >
        <div className="p-5 border-b flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            {TRANSLATIONS.cart_title[lang]}
            <span className="text-sm font-normal text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
              {cart.length}
            </span>
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <Trash2 size={32} />
              </div>
              <p className="text-lg">{TRANSLATIONS.cart_empty[lang]}</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-4 p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
                <img src={item.img} alt={lang === 'he' ? item.name_he : item.name_en} className="w-20 h-20 object-cover rounded-md bg-gray-100" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-gray-800 line-clamp-1">{lang === 'he' ? item.name_he : item.name_en}</h4>
                    <p className="text-primary font-medium">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)} 
                        className="w-6 h-6 flex items-center justify-center hover:bg-white rounded shadow-sm transition-all"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                         onClick={() => updateQuantity(item.id, 1)}
                         className="w-6 h-6 flex items-center justify-center hover:bg-white rounded shadow-sm transition-all"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)} 
                      className="text-red-400 hover:text-red-600 p-1 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-5 border-t bg-gray-50 space-y-4">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>{TRANSLATIONS.cart_total[lang]}</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]">
              {TRANSLATIONS.cart_checkout[lang]}
            </button>
          </div>
        )}
      </div>
    </>
  );
};