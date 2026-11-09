import React from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import { CarpetProduct, formatPriceToman } from '../data/carpets';
import { CarpetImage } from './CarpetImage';

interface ProductCardProps {
  product: CarpetProduct;
  onSelect: (product: CarpetProduct) => void;
  onAddToCart: (product: CarpetProduct, sizeIndex?: number) => void;
  isFavorite: boolean;
  onToggleFavorite: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <article className="group bg-white border border-[#E5E7EB] rounded-2xl p-4 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[#CB1B1B]/30">
      <div>
        {/* Product Image Container */}
        <div className="relative rounded-xl overflow-hidden bg-[#F5F5F7] aspect-[4/3] mb-4">
          <button
            type="button"
            onClick={() => onSelect(product)}
            className="w-full h-full block text-right focus:outline-none"
            aria-label={product.title}
          >
            <CarpetImage
              src={product.image}
              alt={product.title}
              containerClassName="w-full h-full bg-[#F5F5F7]"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>

          {/* Subtle Favorite & Quick Add Actions */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(product.id);
              }}
              aria-label="افزودن به علاقه‌مندی‌ها"
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors shadow-sm ${
                isFavorite
                  ? 'bg-[#CB1B1B] text-white'
                  : 'bg-white/90 text-[#505050] hover:text-[#CB1B1B]'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Metadata line (No Pills - Clean unboxed typography) */}
        <div className="flex items-center gap-1.5 text-xs text-[#717171] mb-1.5">
          <span>{product.categoryLabel}</span>
          <span aria-hidden="true">·</span>
          <span>بافت {product.origin}</span>
          <span aria-hidden="true">·</span>
          <span>زمینه {product.backgroundColor}</span>
        </div>

        {/* Product Title */}
        <h3 className="text-[15px] font-bold text-[#1F2024] leading-7 line-clamp-2 mb-3">
          <button
            type="button"
            onClick={() => onSelect(product)}
            className="text-right hover:text-[#CB1B1B] transition-colors"
          >
            {product.title}
          </button>
        </h3>
      </div>

      <div className="pt-2 border-t border-[#F1F2F4]">
        {/* Price Row */}
        <div className="flex items-center justify-between py-2.5">
          <span className="text-xs font-medium text-[#505050]">قیمت:</span>
          <div className="text-left">
            {product.oldPrice && (
              <span className="block text-xs text-[#9CA3AF] line-through tabular-nums">
                {formatPriceToman(product.oldPrice)}
              </span>
            )}
            <span className="text-[15px] font-extrabold text-[#1F2024] tabular-nums">
              {formatPriceToman(product.price)}{' '}
              <span className="text-xs font-medium text-[#505050]">تومان</span>
            </span>
          </div>
        </div>

        {/* Action Buttons matching Irani Farsh card design */}
        <div className="flex items-center gap-2 mt-1">
          <button
            type="button"
            onClick={() => onSelect(product)}
            className="flex-1 py-2.5 px-4 rounded-xl border border-[#CB1B1B] text-[#CB1B1B] text-sm font-semibold hover:bg-[#CB1B1B] hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            مشاهده بیشتر
          </button>
          <button
            type="button"
            onClick={() => onAddToCart(product, 0)}
            title="افزودن سریع به سبد خرید"
            aria-label="افزودن سریع به سبد خرید"
            className="w-10 h-10 rounded-xl bg-[#F9E8E8] text-[#CB1B1B] hover:bg-[#CB1B1B] hover:text-white flex items-center justify-center transition-colors shrink-0"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
};
