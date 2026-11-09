import React, { useState } from 'react';
import {
  Heart,
  Share2,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Star,
  ChevronLeft,
  Store,
  Plus,
  Minus,
  MessageSquarePlus,
  Award,
} from 'lucide-react';
import {
  CarpetProduct,
  CarpetReview,
  formatPriceToman,
  toPersianDigits,
} from '../data/carpets';
import { CarpetImage } from './CarpetImage';
import { ProductCard } from './ProductCard';

interface ProductDetailViewProps {
  product: CarpetProduct;
  similarProducts: CarpetProduct[];
  onSelectProduct: (product: CarpetProduct) => void;
  onAddToCart: (product: CarpetProduct, sizeIndex: number, quantity: number) => void;
  onBackToCatalog: (category?: string) => void;
  isFavorite: boolean;
  onToggleFavorite: (productId: string) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  similarProducts,
  onSelectProduct,
  onAddToCart,
  onBackToCatalog,
  isFavorite,
  onToggleFavorite,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [selectedSizeIdx, setSelectedSizeIdx] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [showAllSpecs, setShowAllSpecs] = useState<boolean>(false);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);

  // Review state
  const [reviews, setReviews] = useState<CarpetReview[]>(product.reviews);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerCity, setReviewerCity] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Sync image & reviews when switching product
  React.useEffect(() => {
    setSelectedImage(product.image);
    setSelectedSizeIdx(0);
    setQuantity(1);
    setReviews(product.reviews);
    setReviewSubmitted(false);
  }, [product]);

  const currentSize = product.sizes[selectedSizeIdx] || product.sizes[0];
  const calculatedUnitPrice = Math.round(product.price * currentSize.priceMultiplier);
  const totalSelectedPrice = calculatedUnitPrice * quantity;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) return;

    const newReview: CarpetReview = {
      id: `rev-${Date.now()}`,
      userName: reviewerName.trim(),
      city: reviewerCity.trim() || 'تهران',
      date: '۱۹ آبان ۱۴۰۵',
      rating: reviewRating,
      comment: reviewComment.trim(),
      verifiedBuyer: true,
    };
    setReviews([newReview, ...reviews]);
    setReviewerName('');
    setReviewerCity('');
    setReviewComment('');
    setReviewSubmitted(true);
  };

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb navigation */}
      <nav
        aria-label="مسیر صفحه"
        className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#717171] mb-6"
      >
        <button
          type="button"
          onClick={() => onBackToCatalog('all')}
          className="hover:text-[#CB1B1B] transition-colors"
        >
          صفحه اصلی
        </button>
        <ChevronLeft className="w-4 h-4 text-[#9CA3AF]" />
        <button
          type="button"
          onClick={() => onBackToCatalog(product.category)}
          className="hover:text-[#CB1B1B] transition-colors"
        >
          {product.categoryLabel}
        </button>
        <ChevronLeft className="w-4 h-4 text-[#9CA3AF]" />
        <span className="text-[#1F2024] font-semibold">{product.title}</span>
      </nav>

      {/* Main 3-Zone Irani Farsh Product Detail Section */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 sm:p-8 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Zone 1 (Right in RTL): Carpet Gallery & Action Icons (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="relative rounded-2xl overflow-hidden bg-[#F5F5F7] border border-[#EFEFEF] aspect-[4/3]">
              <CarpetImage
                src={selectedImage}
                alt={product.title}
                containerClassName="w-full h-full bg-[#F5F5F7]"
                className="w-full h-full object-cover"
              />

              {/* Gallery Quick Actions */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => onToggleFavorite(product.id)}
                  aria-label="افزودن به علاقه‌مندی‌ها"
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors shadow-sm ${
                    isFavorite
                      ? 'bg-[#CB1B1B] text-white'
                      : 'bg-white/95 text-[#505050] hover:text-[#CB1B1B]'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  aria-label="اشتراک‌گذاری محصول"
                  className="w-10 h-10 rounded-xl bg-white/95 text-[#505050] hover:text-[#CB1B1B] flex items-center justify-center transition-colors shadow-sm"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {copiedShare && (
                <div className="absolute bottom-3 right-3 left-3 bg-[#1F2024]/90 text-white text-xs py-2 px-3 rounded-lg text-center">
                  لینک صفحه محصول در حافظه کپی شد.
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            <div className="grid grid-cols-4 gap-3">
              {product.gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`rounded-xl overflow-hidden aspect-[4/3] border-2 transition-all ${
                    selectedImage === imgUrl
                      ? 'border-[#CB1B1B] scale-[1.02]'
                      : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                >
                  <CarpetImage
                    src={imgUrl}
                    alt={`${product.shortTitle} - تصویر ${idx + 1}`}
                    containerClassName="w-full h-full bg-[#F5F5F7]"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Zone 2 (Center in RTL): Specifications & Size Selection (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center gap-2 text-xs text-[#717171] mb-2">
              <span>{product.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span>ساخت {product.origin}</span>
              <span aria-hidden="true">·</span>
              <span>کد نقشه: {product.code}</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold text-[#1F2024] leading-9 mb-4 border-b border-[#F1F2F4] pb-4">
              {product.title}
            </h1>

            {/* Size Selector matching Irani Farsh PDP */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-[#1F2024] mb-3">
                اندازه فرش:{' '}
                <span className="font-normal text-[#505050]">
                  {currentSize.label} ({currentSize.dimensions})
                </span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {product.sizes.map((sizeOption, idx) => (
                  <button
                    key={sizeOption.label}
                    type="button"
                    onClick={() => setSelectedSizeIdx(idx)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 ${
                      selectedSizeIdx === idx
                        ? 'border-[#CB1B1B] bg-[#F9E8E8] text-[#CB1B1B]'
                        : 'border-[#E5E7EB] bg-white text-[#505050] hover:border-[#CB1B1B]/50'
                    }`}
                  >
                    {sizeOption.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Carpet Features 6-Box Grid matching Irani Farsh PDP */}
            <div className="mb-5">
              <h2 className="text-sm font-bold text-[#1F2024] mb-3">
                ویژگی‌های فرش:
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-[#F9FAFB] border border-[#EFEFEF] rounded-xl p-3">
                  <span className="block text-xs text-[#717171] mb-1">رنگ زمینه</span>
                  <span className="text-xs sm:text-sm font-bold text-[#1F2024]">
                    {product.backgroundColor}
                  </span>
                </div>
                <div className="bg-[#F9FAFB] border border-[#EFEFEF] rounded-xl p-3">
                  <span className="block text-xs text-[#717171] mb-1">شانه / رج‌شمار</span>
                  <span className="text-xs sm:text-sm font-bold text-[#1F2024]">
                    {product.specs.reedsOrRaj}
                  </span>
                </div>
                <div className="bg-[#F9FAFB] border border-[#EFEFEF] rounded-xl p-3">
                  <span className="block text-xs text-[#717171] mb-1">تراکم بافت</span>
                  <span className="text-xs sm:text-sm font-bold text-[#1F2024]">
                    {product.specs.density}
                  </span>
                </div>
                <div className="bg-[#F9FAFB] border border-[#EFEFEF] rounded-xl p-3">
                  <span className="block text-xs text-[#717171] mb-1">جنس نخ خاب</span>
                  <span className="text-xs sm:text-sm font-bold text-[#1F2024] line-clamp-1">
                    {product.specs.pileMaterial}
                  </span>
                </div>
                <div className="bg-[#F9FAFB] border border-[#EFEFEF] rounded-xl p-3">
                  <span className="block text-xs text-[#717171] mb-1">جنس نخ تار و پود</span>
                  <span className="text-xs sm:text-sm font-bold text-[#1F2024] line-clamp-1">
                    {product.specs.warpMaterial}
                  </span>
                </div>
                <div className="bg-[#F9FAFB] border border-[#EFEFEF] rounded-xl p-3">
                  <span className="block text-xs text-[#717171] mb-1">شکل هندسی</span>
                  <span className="text-xs sm:text-sm font-bold text-[#1F2024]">
                    {product.specs.shape}
                  </span>
                </div>
              </div>
            </div>

            {/* Expand All Features Button matching Irani Farsh PDP */}
            <div className="mt-1">
              <button
                type="button"
                onClick={() => setShowAllSpecs(!showAllSpecs)}
                className="py-2 px-5 rounded-xl border border-[#CB1B1B] text-[#CB1B1B] text-xs font-bold hover:bg-[#F9E8E8] transition-colors"
              >
                {showAllSpecs ? 'بستن جزئیات تکمیلی' : 'همه ویژگی‌ها و توضیحات بافت'}
              </button>
            </div>

            {showAllSpecs && (
              <div className="mt-4 p-4 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-sm text-[#374151] leading-7 space-y-2">
                <p>{product.description}</p>
                <p className="text-xs text-[#505050] pt-2 border-t border-[#E5E7EB]">
                  <strong>سطح کیفی و ضمانت:</strong> {product.specs.qualityGrade} · رنگ حاشیه:{' '}
                  {product.borderColor}
                </p>
              </div>
            )}
          </div>

          {/* Zone 3 (Left in RTL): Contiguous Seller & Purchase Module (3 cols) */}
          <div className="lg:col-span-3">
            <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-5 flex flex-col justify-between space-y-4">
              <div className="border-b border-[#E5E7EB] pb-3">
                <h3 className="text-sm font-bold text-[#1F2024] mb-3 flex items-center gap-2">
                  <Store className="w-4 h-4 text-[#CB1B1B]" />
                  <span>فروشنده: شرکت ایرانی فرش</span>
                </h3>
                <div className="flex items-center justify-between text-xs text-[#505050]">
                  <span>عملکرد: عالی</span>
                  <span className="flex items-center gap-1 font-bold text-[#1F2024]">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    {toPersianDigits(product.rating)} از ۵
                  </span>
                </div>
              </div>

              <div className="space-y-3 border-b border-[#E5E7EB] pb-4 text-xs text-[#374151]">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#CB1B1B] shrink-0" />
                  <span>ضمانت اصالت و سلامت فیزیکی فرش</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>موجود در انبار مرکزی ایرانی فرش</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#CB1B1B] shrink-0" />
                  <span>ارسال رایگان و بیمه‌شده به سراسر کشور</span>
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#505050]">تعداد سفارش:</span>
                <div className="flex items-center gap-3 bg-white border border-[#E5E7EB] rounded-xl px-2.5 py-1">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-6 h-6 flex items-center justify-center text-[#CB1B1B] hover:bg-[#F9E8E8] rounded-md transition-colors"
                    aria-label="افزایش تعداد"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-bold tabular-nums min-w-[20px] text-center">
                    {toPersianDigits(quantity)}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-6 h-6 flex items-center justify-center text-[#505050] hover:bg-[#F3F4F6] rounded-md transition-colors"
                    aria-label="کاهش تعداد"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Price Display */}
              <div className="pt-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-[#505050]">قیمت قابل پرداخت:</span>
                  {product.oldPrice && selectedSizeIdx === 0 && (
                    <span className="text-xs text-[#9CA3AF] line-through tabular-nums">
                      {formatPriceToman(product.oldPrice * quantity)}
                    </span>
                  )}
                </div>
                <div className="text-left text-xl font-black text-[#1F2024] tabular-nums">
                  {formatPriceToman(totalSelectedPrice)}{' '}
                  <span className="text-xs font-normal text-[#505050]">تومان</span>
                </div>
              </div>

              {/* Primary Add to Cart Button */}
              <button
                type="button"
                onClick={() => onAddToCart(product, selectedSizeIdx, quantity)}
                className="w-full py-3.5 px-5 rounded-xl bg-[#CB1B1B] hover:bg-[#A91616] text-white text-sm font-bold transition-colors shadow-sm whitespace-nowrap shrink-0"
              >
                افزودن به سبد خرید
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Carpets Section (فرش‌های مشابه) */}
      <section className="mb-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg sm:text-xl font-extrabold text-[#1F2024]">
            فرش‌های مشابه
          </h2>
          <button
            type="button"
            onClick={() => onBackToCatalog(product.category)}
            className="text-sm font-semibold text-[#CB1B1B] hover:underline flex items-center gap-1"
          >
            <span>مشاهده همه</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {similarProducts.slice(0, 4).map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              onSelect={onSelectProduct}
              onAddToCart={(p) => onAddToCart(p, 0, 1)}
              isFavorite={false}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      </section>

      {/* Customer Reviews Section (دیدگاه‌ها و نظرات) */}
      <section className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F1F2F4] pb-5 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#1F2024] mb-1">
              دیدگاه‌ها و تجربیات خریداران
            </h2>
            <p className="text-xs text-[#717171]">
              نظرات ثبت‌شده برای {product.shortTitle} · امتیاز کل:{' '}
              {toPersianDigits(product.rating)} از ۵
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#505050]">
            <ShieldCheck className="w-4 h-4 text-[#CB1B1B]" />
            <span>تمامی نظرات پس از بررسی اصالت خرید منتشر می‌شوند</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Existing Reviews List */}
          <div className="lg:col-span-7 space-y-4">
            {reviews.length > 0 ? (
              reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 rounded-xl bg-[#F9FAFB] border border-[#EFEFEF]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-xs text-[#505050]">
                      <span className="font-bold text-sm text-[#1F2024]">
                        {rev.userName}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{rev.city}</span>
                      <span aria-hidden="true">·</span>
                      <span>{rev.date}</span>
                      {rev.verifiedBuyer && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-emerald-700 font-medium">خریدار محصول</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-xs font-bold text-[#1F2024]">
                        {toPersianDigits(rev.rating)}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-[#374151] leading-7">{rev.comment}</p>
                </div>
              ))
            ) : (
              <div className="p-6 rounded-xl bg-[#F9FAFB] border border-[#EFEFEF] text-center text-sm text-[#717171]">
                هنوز دیدگاهی برای این نقشه ثبت نشده است. اولین نفری باشید که نظر خود را ثبت می‌کند!
              </div>
            )}
          </div>

          {/* Submit New Review Form */}
          <div className="lg:col-span-5 bg-[#F9FAFB] border border-[#EFEFEF] rounded-2xl p-5">
            <h3 className="text-sm font-bold text-[#1F2024] mb-4 flex items-center gap-2">
              <MessageSquarePlus className="w-4 h-4 text-[#CB1B1B]" />
              <span>ثبت دیدگاه جدید</span>
            </h3>

            {reviewSubmitted && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
                دیدگاه شما با موفقیت ثبت شد و به فهرست نظرات اضافه گردید.
              </div>
            )}

            <form onSubmit={handleReviewSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#505050] mb-1">
                    نام و نام خانوادگی
                  </label>
                  <input
                    type="text"
                    required
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    placeholder="مثلاً: علی رنجبران"
                    className="w-full px-3 py-2 text-sm bg-white border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#CB1B1B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#505050] mb-1">
                    شهر
                  </label>
                  <input
                    type="text"
                    value={reviewerCity}
                    onChange={(e) => setReviewerCity(e.target.value)}
                    placeholder="مثلاً: تهران"
                    className="w-full px-3 py-2 text-sm bg-white border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#CB1B1B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#505050] mb-1">
                  امتیاز شما به این فرش
                </label>
                <div className="flex items-center gap-2">
                  {[5, 4, 3, 2, 1].map((starVal) => (
                    <button
                      key={starVal}
                      type="button"
                      onClick={() => setReviewRating(starVal)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                        reviewRating === starVal
                          ? 'border-[#CB1B1B] bg-[#F9E8E8] text-[#CB1B1B]'
                          : 'border-[#E5E7EB] bg-white text-[#505050]'
                      }`}
                    >
                      {toPersianDigits(starVal)} ستاره
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#505050] mb-1">
                  متن دیدگاه
                </label>
                <textarea
                  rows={3}
                  required
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="تجربه خود را درباره کیفیت بافت، رنگ زمینه و لطافت این فرش بنویسید..."
                  className="w-full px-3 py-2 text-sm bg-white border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#CB1B1B]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-[#CB1B1B] hover:bg-[#A91616] text-white text-xs font-bold transition-colors"
              >
                ثبت دیدگاه
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
