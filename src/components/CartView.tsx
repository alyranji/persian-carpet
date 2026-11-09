import React, { useState } from 'react';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Tag,
} from 'lucide-react';
import { CarpetProduct, formatPriceToman, toPersianDigits } from '../data/carpets';
import { CarpetImage } from './CarpetImage';

export interface CartItem {
  product: CarpetProduct;
  sizeIndex: number;
  quantity: number;
}

interface CartViewProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, sizeIndex: number, delta: number) => void;
  onRemoveItem: (productId: string, sizeIndex: number) => void;
  onClearCart: () => void;
  onContinueShopping: () => void;
  onSelectProduct: (product: CarpetProduct) => void;
}

export const CartView: React.FC<CartViewProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onContinueShopping,
  onSelectProduct,
}) => {
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscountPercent, setAppliedDiscountPercent] = useState(0);
  const [discountMessage, setDiscountMessage] = useState<string | null>(null);

  // Checkout step state
  const [isCheckoutStep, setIsCheckoutStep] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerPostalCode, setCustomerPostalCode] = useState('');
  const [confirmedOrderCode, setConfirmedOrderCode] = useState<string | null>(null);

  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const subtotalAmount = items.reduce((acc, item) => {
    const sizeObj = item.product.sizes[item.sizeIndex] || item.product.sizes[0];
    const unitPrice = Math.round(item.product.price * sizeObj.priceMultiplier);
    return acc + unitPrice * item.quantity;
  }, 0);

  const discountAmount = Math.round((subtotalAmount * appliedDiscountPercent) / 100);
  const payableAmount = Math.max(0, subtotalAmount - discountAmount);

  const handleApplyDiscount = (e: React.FormEvent) => {
    e.preventDefault();
    const code = discountCode.trim().toUpperCase();
    if (code === 'IRANI10' || code === 'FARSH10') {
      setAppliedDiscountPercent(10);
      setDiscountMessage('کد تخفیف ۱۰٪ باشگاه مشتریان با موفقیت اعمال شد.');
    } else if (!code) {
      setDiscountMessage('لطفاً کد تخفیف را وارد نمایید (کد نمونه: IRANI10).');
    } else {
      setAppliedDiscountPercent(0);
      setDiscountMessage('کد وارد شده معتبر نیست. از کد تخفیف IRANI10 استفاده کنید.');
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) return;
    const randomCode = `IF-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedOrderCode(randomCode);
    onClearCart();
  };

  // Order Confirmation State
  if (confirmedOrderCode) {
    return (
      <div className="max-w-[820px] mx-auto px-4 sm:px-6 py-14">
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#1F2024] mb-2">
            سفارش شما با موفقیت ثبت شد
          </h1>
          <p className="text-sm text-[#505050] mb-6 leading-7">
            ضمن سپاس از اعتماد شما به <strong className="text-[#CB1B1B]">ایـــرانی فرش</strong>،
            سفارش شما در واحد کنترل کیفی و بسته‌بندی ثبت گردید و هماهنگی ارسال با شما انجام خواهد شد.
          </p>

          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-5 text-right max-w-md mx-auto mb-8 space-y-2.5 text-xs sm:text-sm">
            <div className="flex items-center justify-between">
              <span className="text-[#717171]">شماره پیگیری سفارش:</span>
              <span className="font-bold text-[#CB1B1B] tabular-nums">
                {toPersianDigits(confirmedOrderCode)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#717171]">تحویل‌گیرنده:</span>
              <span className="font-semibold text-[#1F2024]">{customerName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#717171]">شماره تماس:</span>
              <span className="font-semibold text-[#1F2024] tabular-nums">
                {toPersianDigits(customerPhone)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#717171]">نحوه ارسال:</span>
              <span className="font-semibold text-emerald-700">
                ارسال رایگان ویژه ایرانی فرش
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onContinueShopping}
            className="py-3 px-8 rounded-xl bg-[#CB1B1B] hover:bg-[#A91616] text-white text-sm font-bold transition-colors"
          >
            بازگشت به صفحه اصلی فروشگاه
          </button>
        </div>
      </div>
    );
  }

  // Empty Cart State
  if (items.length === 0) {
    return (
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 py-16">
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#F9E8E8] text-[#CB1B1B] flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-extrabold text-[#1F2024] mb-2">
            سبد خرید شما در حال حاضر خالی است
          </h1>
          <p className="text-sm text-[#717171] max-w-md mx-auto mb-6 leading-7">
            می‌توانید برای مشاهده کلکسیون فرش‌های دستباف تبریز، کاشان، نائین و فرش‌های ماشینی به صفحه محصولات مراجعه کنید.
          </p>
          <button
            type="button"
            onClick={onContinueShopping}
            className="py-3 px-7 rounded-xl bg-[#CB1B1B] hover:bg-[#A91616] text-white text-sm font-bold transition-colors"
          >
            مشاهده محصولات ایرانی فرش
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#1F2024]">
          سبد خرید شما
        </h1>
        <button
          type="button"
          onClick={onContinueShopping}
          className="text-xs sm:text-sm font-semibold text-[#505050] hover:text-[#CB1B1B] flex items-center gap-1.5 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>ادامه خرید در فروشگاه</span>
        </button>
      </div>

      {/* Exact Irani Farsh 2-Column Cart Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Right Column (8 cols in RTL): Cart Items List or Shipping Form */}
        <div className="lg:col-span-8 space-y-4">
          {!isCheckoutStep ? (
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 sm:p-6 divide-y divide-[#F1F2F4]">
              {items.map((item) => {
                const sizeObj =
                  item.product.sizes[item.sizeIndex] || item.product.sizes[0];
                const unitPrice = Math.round(
                  item.product.price * sizeObj.priceMultiplier
                );
                return (
                  <div
                    key={`${item.product.id}-${item.sizeIndex}`}
                    className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center gap-5"
                  >
                    {/* Product Thumbnail + Quantity Stepper underneath as in Irani Farsh Figma */}
                    <div className="flex sm:flex-col items-center gap-3 w-full sm:w-36 shrink-0">
                      <button
                        type="button"
                        onClick={() => onSelectProduct(item.product)}
                        className="w-28 sm:w-36 aspect-[4/3] rounded-xl overflow-hidden bg-[#F5F5F7] border border-[#EFEFEF]"
                      >
                        <CarpetImage
                          src={item.product.image}
                          alt={item.product.title}
                          containerClassName="w-full h-full bg-[#F5F5F7]"
                          className="w-full h-full object-cover"
                        />
                      </button>

                      {/* Stepper Box */}
                      <div className="flex items-center justify-between gap-3 border border-[#E5E7EB] rounded-xl px-3 py-1.5 bg-white">
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.sizeIndex, 1)
                          }
                          aria-label="افزایش تعداد"
                          className="text-[#CB1B1B] hover:bg-[#F9E8E8] rounded p-0.5 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-bold text-[#1F2024] tabular-nums min-w-[24px] text-center">
                          {toPersianDigits(item.quantity)}
                        </span>
                        {item.quantity > 1 ? (
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(item.product.id, item.sizeIndex, -1)
                            }
                            aria-label="کاهش تعداد"
                            className="text-[#505050] hover:bg-[#F3F4F6] rounded p-0.5 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              onRemoveItem(item.product.id, item.sizeIndex)
                            }
                            aria-label="حذف فرش از سبد"
                            className="text-[#CB1B1B] hover:bg-[#F9E8E8] rounded p-0.5 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Item Details matching Irani Farsh Cart Figma */}
                    <div className="flex-1 space-y-2">
                      <h3 className="text-base font-extrabold text-[#1F2024]">
                        <button
                          type="button"
                          onClick={() => onSelectProduct(item.product)}
                          className="hover:text-[#CB1B1B] transition-colors text-right"
                        >
                          {item.product.title}
                        </button>
                      </h3>

                      <div className="space-y-1 text-xs sm:text-sm text-[#505050]">
                        <p>رنگ زمینه: {item.product.backgroundColor}</p>
                        <p>
                          ابعاد انتخابی: {sizeObj.label} ({sizeObj.dimensions})
                        </p>
                        <p>فروشنده: شرکت ایرانی فرش (ضمانت اصالت کتبی)</p>
                      </div>

                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-xs text-[#717171]">قیمت واحد:</span>
                        <span className="text-base font-black text-[#1F2024] tabular-nums">
                          قیمت: {formatPriceToman(unitPrice * item.quantity)}{' '}
                          <span className="text-xs font-normal text-[#505050]">
                            تومان
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Step 2: Shipping & Receiver Information Form */
            <form
              id="checkout-shipping-form"
              onSubmit={handleCompleteOrder}
              className="bg-white border border-[#E5E7EB] rounded-2xl p-6 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-[#F1F2F4] pb-4">
                <h2 className="text-lg font-extrabold text-[#1F2024]">
                  اطلاعات تحویل‌گیرنده و آدرس ارسال
                </h2>
                <button
                  type="button"
                  onClick={() => setIsCheckoutStep(false)}
                  className="text-xs font-semibold text-[#CB1B1B] hover:underline"
                >
                  ویرایش سبد خرید
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#374151] mb-1.5">
                    نام و نام خانوادگی تحویل‌گیرنده
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="مثلاً: محمدرضا صادقی"
                    className="w-full px-3.5 py-2.5 text-sm border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#CB1B1B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#374151] mb-1.5">
                    شماره موبایل جهت هماهنگی ارسال
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    className="w-full px-3.5 py-2.5 text-sm border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#CB1B1B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#374151] mb-1.5">
                  نشانی دقیق پستی
                </label>
                <textarea
                  rows={3}
                  required
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="استان، شهر، خیابان، کوچه، پلاک و واحد..."
                  className="w-full px-3.5 py-2.5 text-sm border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#CB1B1B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#374151] mb-1.5">
                    کد پستی ده رقمی (اختیاری)
                  </label>
                  <input
                    type="text"
                    value={customerPostalCode}
                    onChange={(e) => setCustomerPostalCode(e.target.value)}
                    placeholder="۱۴۵۶۷۸۹۱۲۳"
                    className="w-full px-3.5 py-2.5 text-sm border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#CB1B1B]"
                  />
                </div>
                <div className="flex items-end">
                  <div className="w-full p-3 rounded-xl bg-[#F9FAFB] border border-[#EFEFEF] text-xs text-[#505050] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#CB1B1B] shrink-0" />
                    <span>امکان پرداخت در محل یا درگاه امن بانکی پس از تایید</span>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Left Column (4 cols in RTL): Sticky Summary Card matching Irani Farsh Cart Figma */}
        <div className="lg:col-span-4">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between text-sm text-[#1F2024] font-semibold">
              <span>تعداد فرش:</span>
              <span className="tabular-nums font-bold">
                {toPersianDigits(totalCount)} تخته
              </span>
            </div>

            <div className="flex items-center justify-between text-sm text-[#1F2024] font-semibold">
              <span>مجموع سبد خرید:</span>
              <span className="tabular-nums font-bold">
                {formatPriceToman(subtotalAmount)}{' '}
                <span className="text-xs font-normal text-[#505050]">تومان</span>
              </span>
            </div>

            <div className="flex items-center justify-between text-sm text-[#1F2024] font-semibold">
              <span>ارسال توسط:</span>
              <span className="text-emerald-700 font-bold">
                ایرانی فرش (رایگان)
              </span>
            </div>

            {appliedDiscountPercent > 0 && (
              <div className="flex items-center justify-between text-sm text-[#CB1B1B] font-semibold">
                <span>تخفیف باشگاه مشتریان ({toPersianDigits(appliedDiscountPercent)}٪):</span>
                <span className="tabular-nums font-bold">
                  - {formatPriceToman(discountAmount)} تومان
                </span>
              </div>
            )}

            {/* Discount Code Input */}
            <form onSubmit={handleApplyDiscount} className="pt-2 border-t border-[#F1F2F4]">
              <label className="block text-xs font-medium text-[#505050] mb-2">
                کد تخفیف دارید؟ (کد هدیه: <span className="font-mono text-[#CB1B1B]">IRANI10</span>)
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="وارد کردن کد تخفیف"
                    className="w-full pl-3 pr-8 py-2 text-xs border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#CB1B1B]"
                  />
                  <Tag className="w-3.5 h-3.5 text-[#9CA3AF] absolute right-2.5 top-1/2 -translate-y-1/2" />
                </div>
                <button
                  type="submit"
                  className="py-2 px-3.5 rounded-xl border border-[#CB1B1B] text-[#CB1B1B] text-xs font-bold hover:bg-[#F9E8E8] transition-colors whitespace-nowrap shrink-0"
                >
                  ثبت کد
                </button>
              </div>
              {discountMessage && (
                <p className="text-xs text-[#505050] mt-2">{discountMessage}</p>
              )}
            </form>

            {/* Payable Total */}
            <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
              <span className="text-sm font-bold text-[#1F2024]">مبلغ قابل پرداخت:</span>
              <span className="text-lg font-black text-[#CB1B1B] tabular-nums">
                {formatPriceToman(payableAmount)}{' '}
                <span className="text-xs font-normal text-[#505050]">تومان</span>
              </span>
            </div>

            {!isCheckoutStep ? (
              <button
                type="button"
                onClick={() => setIsCheckoutStep(true)}
                className="w-full py-3.5 px-5 rounded-xl bg-[#CB1B1B] hover:bg-[#A91616] text-white text-sm font-bold transition-colors shadow-sm"
              >
                سفارش و ادامه خرید
              </button>
            ) : (
              <button
                type="submit"
                form="checkout-shipping-form"
                className="w-full py-3.5 px-5 rounded-xl bg-[#CB1B1B] hover:bg-[#A91616] text-white text-sm font-bold transition-colors shadow-sm"
              >
                تایید نهایی و ثبت سفارش
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
