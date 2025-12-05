import React from 'react';
import { Product, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { ShoppingCart, Check, Leaf } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  lang: Language;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, lang, onAddToCart }) => {
  const name = lang === 'he' ? product.name_he : product.name_en;
  
  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img 
          src={product.img} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
          {product.kosher && (
            <span className="bg-primary/90 backdrop-blur text-white text-xs px-2 py-1 rounded shadow-sm flex items-center gap-1">
              <Check size={12} /> {TRANSLATIONS.badge_kosher[lang]}
            </span>
          )}
          {product.vegan && (
            <span className="bg-green-600/90 backdrop-blur text-white text-xs px-2 py-1 rounded shadow-sm flex items-center gap-1">
              <Leaf size={12} /> {TRANSLATIONS.badge_vegan[lang]}
            </span>
          )}
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-lg mb-1 text-gray-800 line-clamp-2">{name}</h3>
        <p className="text-sm text-gray-500 mb-4 capitalize">{product.category}</p>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-primary hover:bg-primary-dark text-white p-2 rounded-full transition-colors shadow-lg hover:shadow-xl active:scale-95"
            aria-label={TRANSLATIONS.add_to_cart[lang]}
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};