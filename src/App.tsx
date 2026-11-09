/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  ShoppingBag,
  Search,
  User,
  ChevronLeft,
  Phone,
  MapPin,
  Mail,
  ShieldCheck,
  Truck,
  Award,
  Heart,
  Menu,
  X,
  CheckCircle2,
  BookOpen,
  SlidersHorizontal,
} from 'lucide-react';
import {
  CARPET_PRODUCTS,
  BLOG_POSTS,
  CarpetProduct,
  BlogPost,
  HERO_IMAGE,
  IMG_TABRIZ_CRIMSON,
  IMG_KASHAN_IVORY,
  IMG_NAIN_NAVY,
  IMG_VINTAGE_GREY,
  toPersianDigits,
  formatPriceToman,
} from './data/carpets';
import { CarpetImage } from './components/CarpetImage';
import { ProductCard } from './components/ProductCard';
import { ProductDetailView } from './components/ProductDetailView';
import { CartView, CartItem } from './components/CartView';
import { AuthView, UserProfile } from './components/AuthView';

type ActivePage =
  | 'home'
  | 'catalog'
  | 'product-detail'
  | 'cart'
  | 'auth'
  | 'blog'
  | 'about-contact';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'cheapest' | 'expensive'>('popular');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<CarpetProduct>(CARPET_PRODUCTS[0]);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Cart state (pre-populated with 2 authentic items so the user can also inspect the Irani Farsh Cart screen immediately)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: CARPET_PRODUCTS[0],
      sizeIndex: 0,
      quantity: 1,
    },
    {
      product: CARPET_PRODUCTS[4],
      sizeIndex: 0,
      quantity: 1,
    },
  ]);

  const [favoriteIds, setFavoriteIds] = useState<string[]>(['hw-1']);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactText, setContactText] = useState('');
  const [contactSent, setContactSent] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3000);
  };

  const totalCartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const handleAddToCart = (
    product: CarpetProduct,
    sizeIndex: number = 0,
    quantity: number = 1
  ) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.sizeIndex === sizeIndex
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + quantity,
        };
        return updated;
      }
      return [...prev, { product, sizeIndex, quantity }];
    });
    const sizeLabel = product.sizes[sizeIndex]?.label || '۱۲ متری';
    showToast(`«${product.shortTitle} (${sizeLabel})» به سبد خرید اضافه شد.`);
  };

  const handleUpdateCartQuantity = (
    productId: string,
    sizeIndex: number,
    delta: number
  ) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.sizeIndex === sizeIndex) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (productId: string, sizeIndex: number) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.sizeIndex === sizeIndex)
      )
    );
    showToast('محصول از سبد خرید حذف شد.');
  };

  const handleToggleFavorite = (productId: string) => {
    setFavoriteIds((prev) => {
      const exists = prev.includes(productId);
      const next = exists
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      showToast(
        exists
          ? 'از فهرست علاقه‌مندی‌ها حذف شد.'
          : 'به فهرست علاقه‌مندی‌های شما اضافه شد.'
      );
      return next;
    });
  };

  const handleOpenProduct = (product: CarpetProduct) => {
    setSelectedProduct(product);
    setActivePage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCatalog = (category: string = 'all') => {
    setSelectedCategory(category);
    setActivePage('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handwovenProducts = useMemo(
    () => CARPET_PRODUCTS.filter((p) => p.category === 'handwoven'),
    []
  );

  const machineProducts = useMemo(
    () => CARPET_PRODUCTS.filter((p) => p.category === 'machine'),
    []
  );

  const filteredCatalogProducts = useMemo(() => {
    let list = [...CARPET_PRODUCTS];
    if (selectedCategory === 'handwoven') {
      list = list.filter((p) => p.category === 'handwoven');
    } else if (selectedCategory === 'machine') {
      list = list.filter((p) => p.category === 'machine');
    } else if (selectedCategory === 'favorites') {
      list = list.filter((p) => favoriteIds.includes(p.id));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim();
      list = list.filter(
        (p) =>
          p.title.includes(q) ||
          p.origin.includes(q) ||
          p.backgroundColor.includes(q) ||
          p.categoryLabel.includes(q)
      );
    }

    if (sortBy === 'cheapest') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'expensive') {
      list.sort((a, b) => b.price - a.price);
    } else {
      list.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return list;
  }, [selectedCategory, searchQuery, sortBy, favoriteIds]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActivePage('catalog');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactPhone.trim()) return;
    setContactSent(true);
    setContactName('');
    setContactPhone('');
    setContactText('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1F2024]">
      {/* Toast Feedback Banner */}
      {toastMessage && (
        <div className="fixed bottom-5 left-5 z-50 bg-[#1F2024] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 text-xs sm:text-sm border border-white/10">
          <CheckCircle2 className="w-4 h-4 text-[#CB1B1B] shrink-0" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setActivePage('cart')}
            className="text-xs font-bold text-[#CB1B1B] bg-white px-2.5 py-1 rounded-lg hover:bg-[#F9E8E8] transition-colors whitespace-nowrap shrink-0"
          >
            مشاهده سبد
          </button>
        </div>
      )}

      {/* Top Navigation Header (3-Zone Contract: Brand Wordmark — 5 Nav Links — Primary CTA) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Single Text Element Brand Wordmark */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              setActivePage('home');
            }}
            className="text-2xl sm:text-[26px] font-black text-[#CB1B1B] tracking-tight whitespace-nowrap shrink-0"
          >
            ایـــرانی فرش
          </a>

          {/* Zone 2: 5 Concise Single-Line Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#374151]">
            <button
              type="button"
              onClick={() => setActivePage('home')}
              className={`hover:text-[#CB1B1B] transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                activePage === 'home'
                  ? 'text-[#CB1B1B] border-[#CB1B1B] font-bold'
                  : 'border-transparent'
              }`}
            >
              صفحه اصلی
            </button>
            <button
              type="button"
              onClick={() => handleOpenCatalog('handwoven')}
              className={`hover:text-[#CB1B1B] transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                activePage === 'catalog' && selectedCategory === 'handwoven'
                  ? 'text-[#CB1B1B] border-[#CB1B1B] font-bold'
                  : 'border-transparent'
              }`}
            >
              فرش دستباف
            </button>
            <button
              type="button"
              onClick={() => handleOpenCatalog('machine')}
              className={`hover:text-[#CB1B1B] transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                activePage === 'catalog' && selectedCategory === 'machine'
                  ? 'text-[#CB1B1B] border-[#CB1B1B] font-bold'
                  : 'border-transparent'
              }`}
            >
              فرش ماشینی
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedBlogPost(null);
                setActivePage('blog');
              }}
              className={`hover:text-[#CB1B1B] transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                activePage === 'blog'
                  ? 'text-[#CB1B1B] border-[#CB1B1B] font-bold'
                  : 'border-transparent'
              }`}
            >
              وبلاگ
            </button>
            <button
              type="button"
              onClick={() => setActivePage('about-contact')}
              className={`hover:text-[#CB1B1B] transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                activePage === 'about-contact'
                  ? 'text-[#CB1B1B] border-[#CB1B1B] font-bold'
                  : 'border-transparent'
              }`}
            >
              تماس با ما
            </button>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setActivePage('cart')}
              className="px-4 py-2.5 rounded-xl bg-[#CB1B1B] hover:bg-[#A91616] text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>سبد خرید ({toPersianDigits(totalCartCount)})</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="منوی موبایل"
              className="md:hidden p-2 rounded-xl border border-[#E5E7EB] text-[#1F2024]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-[#F1F2F4] px-4 py-4 space-y-2">
            <button
              type="button"
              onClick={() => {
                setActivePage('home');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-right py-2 px-3 rounded-lg text-sm font-bold text-[#1F2024] hover:bg-[#F9E8E8] hover:text-[#CB1B1B]"
            >
              صفحه اصلی
            </button>
            <button
              type="button"
              onClick={() => {
                handleOpenCatalog('handwoven');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-right py-2 px-3 rounded-lg text-sm font-semibold text-[#374151] hover:bg-[#F9E8E8] hover:text-[#CB1B1B]"
            >
              فرش دستباف
            </button>
            <button
              type="button"
              onClick={() => {
                handleOpenCatalog('machine');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-right py-2 px-3 rounded-lg text-sm font-semibold text-[#374151] hover:bg-[#F9E8E8] hover:text-[#CB1B1B]"
            >
              فرش ماشینی
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedBlogPost(null);
                setActivePage('blog');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-right py-2 px-3 rounded-lg text-sm font-semibold text-[#374151] hover:bg-[#F9E8E8] hover:text-[#CB1B1B]"
            >
              وبلاگ تخصصی فرش
            </button>
            <button
              type="button"
              onClick={() => {
                setActivePage('about-contact');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-right py-2 px-3 rounded-lg text-sm font-semibold text-[#374151] hover:bg-[#F9E8E8] hover:text-[#CB1B1B]"
            >
              درباره ما و تماس با ما
            </button>
          </div>
        )}
      </header>

      {/* Secondary Search & Account Toolbar matching Irani Farsh header sub-bar */}
      <div className="bg-[#F9FAFB] border-b border-[#EFEFEF]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
          {/* Search Input ("جستجو فرش") */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex-1 max-w-md min-w-[240px]"
          >
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو فرش (مثلاً: تبریز، کاشان، افشان، ۱۲۰۰ شانه)..."
              className="w-full pr-10 pl-4 py-2 text-xs sm:text-sm bg-white border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#CB1B1B]"
            />
            <Search className="w-4 h-4 text-[#9CA3AF] absolute right-3.5 top-1/2 -translate-y-1/2" />
          </form>

          {/* Secondary Utility Controls: Favorites & Account Login/Register */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleOpenCatalog('favorites')}
              className="py-2 px-3.5 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#CB1B1B] text-xs font-semibold text-[#374151] flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
            >
              <Heart className="w-3.5 h-3.5 text-[#CB1B1B]" />
              <span>علاقه‌مندی‌ها ({toPersianDigits(favoriteIds.length)})</span>
            </button>

            <button
              type="button"
              onClick={() => setActivePage('auth')}
              className="py-2 px-4 rounded-xl border border-[#CB1B1B] text-[#CB1B1B] hover:bg-[#CB1B1B] hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
            >
              <User className="w-3.5 h-3.5" />
              <span>
                {userProfile ? userProfile.fullName : 'ورود / ثبت نام'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1">
        {activePage === 'home' && (
          <div>
            {/* 1. HERO SECTION matching Irani Farsh Figma */}
            <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
                {/* Right Column in RTL (6 cols): Headline, Subtitle & Dual CTAs */}
                <div className="lg:col-span-6 flex flex-col justify-center py-4 lg:py-8">
                  <p className="text-xs sm:text-sm font-bold text-[#CB1B1B] mb-3">
                    به ایـــرانی فرش خوش آمدید · اصالت هنر قالی‌بافی ایران
                  </p>
                  <h1
                    className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#1F2024] leading-[1.35] mb-5"
                    style={{ textWrap: 'balance' }}
                  >
                    خرید آسان فرش، در{' '}
                    <span className="text-[#CB1B1B]">ایـــرانی فرش</span>
                  </h1>
                  <p className="text-sm sm:text-base text-[#505050] leading-8 mb-8 max-w-xl">
                    با ایرانی فرش در کمترین زمان ممکن فرش دلخواه خود را به صورت آنلاین سفارش دهید و از تنوع بی‌نظیر فرش‌های دستباف تبریز، کاشان، نائین و کلکسیون فرش‌های ماشینی با ضمانت اصالت لذت ببرید.
                  </p>

                  <div className="flex flex-wrap items-center gap-3.5 mb-8">
                    <button
                      type="button"
                      onClick={() => handleOpenCatalog('all')}
                      className="py-3.5 px-6 rounded-xl border border-[#CB1B1B] text-[#CB1B1B] hover:bg-[#F9E8E8] text-sm font-bold transition-colors whitespace-nowrap shrink-0"
                    >
                      مشاهده محصولات
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivePage('auth')}
                      className="py-3.5 px-6 rounded-xl bg-[#CB1B1B] hover:bg-[#A91616] text-white text-sm font-bold transition-colors shadow-sm whitespace-nowrap shrink-0"
                    >
                      عضویت در باشگاه مشتریان
                    </button>
                  </div>

                  {/* Trust Highlights */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#F1F2F4]">
                    <div>
                      <span className="block text-lg sm:text-xl font-black text-[#1F2024] tabular-nums">
                        +۲,۴۰۰
                      </span>
                      <span className="text-xs text-[#717171]">
                        نقشه دستباف و ماشینی
                      </span>
                    </div>
                    <div>
                      <span className="block text-lg sm:text-xl font-black text-[#1F2024] tabular-nums">
                        ۱۰ سال
                      </span>
                      <span className="text-xs text-[#717171]">
                        ضمانت کتبی اصالت و کیفیت
                      </span>
                    </div>
                    <div>
                      <span className="block text-lg sm:text-xl font-black text-[#CB1B1B] tabular-nums">
                        ارسال رایگان
                      </span>
                      <span className="text-xs text-[#717171]">
                        سراسر ایران با بیمه کامل
                      </span>
                    </div>
                  </div>
                </div>

                {/* Left Column in RTL (6 cols): Framed Hero Carpet Showcase */}
                <div className="lg:col-span-6 flex items-stretch">
                  <div className="relative w-full rounded-3xl overflow-hidden border border-[#E5E7EB] shadow-sm min-h-[320px] sm:min-h-[420px]">
                    <CarpetImage
                      src={HERO_IMAGE}
                      alt="فرش دستباف لاکی ایرانی در چیدمان پذیرایی مدرن"
                      containerClassName="w-full h-full bg-[#F5F5F7]"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                      <span className="text-xs text-white/80 mb-1">
                        کلکسیون منتخب سال ۱۴۰۵ · بافت استادکاران تبریز و کاشان
                      </span>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <h2 className="text-lg sm:text-xl font-extrabold">
                          قالی دستباف تبریز طرح سالاری زمینه لاکی
                        </h2>
                        <button
                          type="button"
                          onClick={() => handleOpenProduct(CARPET_PRODUCTS[0])}
                          className="self-start sm:self-auto py-2 px-4 rounded-xl bg-[#CB1B1B] hover:bg-[#A91616] text-white text-xs font-bold transition-colors whitespace-nowrap shrink-0"
                        >
                          بررسی و خرید این فرش
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. CATEGORY MOSAIC BANNERS matching Irani Farsh Figma */}
            <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pb-14">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                {/* Banner 1 (Large 6 cols): Handwoven Carpets */}
                <div className="md:col-span-6 relative rounded-2xl overflow-hidden aspect-[16/9] group border border-[#E5E7EB]">
                  <CarpetImage
                    src={IMG_TABRIZ_CRIMSON}
                    alt="فرش‌های دستباف تبریز و کاشان"
                    containerClassName="w-full h-full bg-[#F5F5F7]"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-6 flex flex-col justify-end text-white">
                    <h2 className="text-lg sm:text-xl font-extrabold mb-1">
                      فرش‌های دستباف اصیل ایرانی
                    </h2>
                    <p className="text-xs text-white/85 mb-4">
                      کلکسیون نفیس قالی‌های ۴۰ تا ۶۰ رج تبریز، کاشان و ابریشم نائین
                    </p>
                    <div>
                      <button
                        type="button"
                        onClick={() => handleOpenCatalog('handwoven')}
                        className="py-2 px-4 rounded-xl border border-white/80 bg-black/30 hover:bg-[#CB1B1B] hover:border-[#CB1B1B] text-white text-xs font-bold transition-colors whitespace-nowrap shrink-0"
                      >
                        مشاهده و خرید فرش دستباف
                      </button>
                    </div>
                  </div>
                </div>

                {/* Banner 2 (Large 6 cols): Machine-Woven Carpets */}
                <div className="md:col-span-6 relative rounded-2xl overflow-hidden aspect-[16/9] group border border-[#E5E7EB]">
                  <CarpetImage
                    src={IMG_KASHAN_IVORY}
                    alt="فرش‌های ماشینی مدرن و کلاسیک"
                    containerClassName="w-full h-full bg-[#F5F5F7]"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-6 flex flex-col justify-end text-white">
                    <h2 className="text-lg sm:text-xl font-extrabold mb-1">
                      فرش‌های ماشینی ۱۲۰۰ و ۱۵۰۰ شانه
                    </h2>
                    <p className="text-xs text-white/85 mb-4">
                      بافت ظریف گل‌برجسته با نخ ۱۰۰٪ اکریلیک هیت‌ست شده بدون پرزدهی
                    </p>
                    <div>
                      <button
                        type="button"
                        onClick={() => handleOpenCatalog('machine')}
                        className="py-2 px-4 rounded-xl border border-white/80 bg-black/30 hover:bg-[#CB1B1B] hover:border-[#CB1B1B] text-white text-xs font-bold transition-colors whitespace-nowrap shrink-0"
                      >
                        مشاهده و خرید فرش ماشینی
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3 Secondary Category Cards below (4 cols each) matching Figma */}
                <div className="md:col-span-4 relative rounded-2xl overflow-hidden aspect-[16/10] group border border-[#E5E7EB]">
                  <CarpetImage
                    src={IMG_NAIN_NAVY}
                    alt="فرش‌های گل ابریشم نائین"
                    containerClassName="w-full h-full bg-[#F5F5F7]"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-5 flex flex-col justify-end text-white">
                    <h3 className="text-base font-extrabold mb-2">
                      فرش‌های گل ابریشم نائین
                    </h3>
                    <div>
                      <button
                        type="button"
                        onClick={() => handleOpenProduct(CARPET_PRODUCTS[2])}
                        className="py-1.5 px-3.5 rounded-lg border border-white/80 bg-black/30 hover:bg-[#CB1B1B] hover:border-[#CB1B1B] text-white text-xs font-semibold transition-colors"
                      >
                        مشاهده و خرید
                      </button>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-4 relative rounded-2xl overflow-hidden aspect-[16/10] group border border-[#E5E7EB]">
                  <CarpetImage
                    src={IMG_VINTAGE_GREY}
                    alt="فرش‌های مدرن و وینتیج کهنه‌نما"
                    containerClassName="w-full h-full bg-[#F5F5F7]"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-5 flex flex-col justify-end text-white">
                    <h3 className="text-base font-extrabold mb-2">
                      فرش‌های مدرن و وینتیج کهنه‌نما
                    </h3>
                    <div>
                      <button
                        type="button"
                        onClick={() => handleOpenProduct(CARPET_PRODUCTS[6])}
                        className="py-1.5 px-3.5 rounded-lg border border-white/80 bg-black/30 hover:bg-[#CB1B1B] hover:border-[#CB1B1B] text-white text-xs font-semibold transition-colors"
                      >
                        مشاهده و خرید
                      </button>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-4 relative rounded-2xl overflow-hidden aspect-[16/10] group border border-[#E5E7EB]">
                  <CarpetImage
                    src={HERO_IMAGE}
                    alt="ست دکوراسیون و قالیچه‌های پذیرایی"
                    containerClassName="w-full h-full bg-[#F5F5F7]"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-5 flex flex-col justify-end text-white">
                    <h3 className="text-base font-extrabold mb-2">
                      کلکسیون قالیچه‌های ۴ و ۶ متری
                    </h3>
                    <div>
                      <button
                        type="button"
                        onClick={() => handleOpenCatalog('all')}
                        className="py-1.5 px-3.5 rounded-lg border border-white/80 bg-black/30 hover:bg-[#CB1B1B] hover:border-[#CB1B1B] text-white text-xs font-semibold transition-colors"
                      >
                        مشاهده و خرید
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. HANDWOVEN CARPETS SECTION (فرش‌های دستباف) */}
            <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pb-14">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#1F2024]">
                    فرش‌های دستباف
                  </h2>
                  <p className="text-xs text-[#717171] mt-1">
                    گزیده‌ای از قالی‌های دستباف تبریز، کاشان و نائین با رنگرزی گیاهی
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenCatalog('handwoven')}
                  className="py-2 px-4 rounded-xl border border-[#E5E7EB] hover:border-[#CB1B1B] text-xs sm:text-sm font-bold text-[#1F2024] hover:text-[#CB1B1B] flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
                >
                  <span>مشاهده همه</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {handwovenProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={handleOpenProduct}
                    onAddToCart={(p) => handleAddToCart(p, 0, 1)}
                    isFavorite={favoriteIds.includes(product.id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            </section>

            {/* 4. MACHINE-WOVEN CARPETS SECTION (فرش‌های ماشینی) */}
            <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#1F2024]">
                    فرش‌های ماشینی
                  </h2>
                  <p className="text-xs text-[#717171] mt-1">
                    فرش‌های ۱۲۰۰ و ۱۵۰۰ شانه کاشان با نخ ۱۰۰٪ اکریلیک هیت‌ست آلمانی
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenCatalog('machine')}
                  className="py-2 px-4 rounded-xl border border-[#E5E7EB] hover:border-[#CB1B1B] text-xs sm:text-sm font-bold text-[#1F2024] hover:text-[#CB1B1B] flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
                >
                  <span>مشاهده همه</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {machineProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={handleOpenProduct}
                    onAddToCart={(p) => handleAddToCart(p, 0, 1)}
                    isFavorite={favoriteIds.includes(product.id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            </section>

            {/* 5. CUSTOMER CLUB SECTION matching Irani Farsh Figma (`عضویت در باشگاه مشتریان`) */}
            <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
              <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-3xl p-6 sm:p-10 lg:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Right Column in RTL (6 cols) */}
                  <div className="lg:col-span-6 space-y-4">
                    <h2 className="text-2xl sm:text-3xl font-black text-[#1F2024] leading-snug">
                      عضویت در باشگاه مشتریان{' '}
                      <span className="text-[#CB1B1B]">ایرانــی فرش</span>
                    </h2>
                    <p className="text-sm sm:text-base text-[#505050] leading-8">
                      با عضویت در باشگاه مشتریان ایرانــی فرش زودتر از دیگران از تخفیف‌ها، جشنواره‌های فروش فصلی و کلکسیون‌های جدید فرش دستباف و ماشینی باخبر شوید و از امکان ارسال رایگان بهره‌مند گردید.
                    </p>
                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setActivePage('auth')}
                        className="py-3.5 px-8 rounded-xl border-2 border-[#CB1B1B] text-[#CB1B1B] hover:bg-[#CB1B1B] hover:text-white text-sm font-extrabold transition-colors whitespace-nowrap shrink-0"
                      >
                        ایجاد عضویت
                      </button>
                      <span className="text-xs text-[#717171]">
                        همراه با ۱۰٪ کد تخفیف اولین خرید (کد: IRANI10)
                      </span>
                    </div>
                  </div>

                  {/* Left Column in RTL (6 cols): Overlapping Carpet Showcase */}
                  <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                    <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-[#E5E7EB] shadow-sm">
                      <CarpetImage
                        src={IMG_TABRIZ_CRIMSON}
                        alt="فرش دستباف تبریز لاکی"
                        containerClassName="w-full h-full bg-white"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-[#E5E7EB] shadow-sm sm:translate-y-4">
                      <CarpetImage
                        src={IMG_NAIN_NAVY}
                        alt="فرش دستباف نائین سرمه‌ای"
                        containerClassName="w-full h-full bg-white"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* CATALOG VIEW (`همه محصولات` / `فرش دستباف` / `فرش ماشینی`) */}
        {activePage === 'catalog' && (
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#E5E7EB]">
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#1F2024]">
                  {selectedCategory === 'handwoven'
                    ? 'کلکسیون فرش‌های دستباف ایرانی'
                    : selectedCategory === 'machine'
                    ? 'کلکسیون فرش‌های ماشینی کاشان'
                    : selectedCategory === 'favorites'
                    ? 'فهرست فرش‌های مورد علاقه شما'
                    : 'تمامی محصولات ایرانی فرش'}
                </h1>
                <p className="text-xs text-[#717171] mt-1">
                  نمایش {toPersianDigits(filteredCatalogProducts.length)} تخته فرش آماده ارسال
                </p>
              </div>

              {/* Interactive Filter Tabs & Sort Bar */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1 p-1 bg-[#F3F4F6] rounded-xl">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('all')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                      selectedCategory === 'all'
                        ? 'bg-white text-[#CB1B1B] shadow-sm'
                        : 'text-[#505050] hover:text-[#1F2024]'
                    }`}
                  >
                    همه فرش‌ها
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('handwoven')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                      selectedCategory === 'handwoven'
                        ? 'bg-white text-[#CB1B1B] shadow-sm'
                        : 'text-[#505050] hover:text-[#1F2024]'
                    }`}
                  >
                    فرش دستباف
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('machine')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                      selectedCategory === 'machine'
                        ? 'bg-white text-[#CB1B1B] shadow-sm'
                        : 'text-[#505050] hover:text-[#1F2024]'
                    }`}
                  >
                    فرش ماشینی
                  </button>
                </div>

                <div className="flex items-center gap-2 bg-white border border-[#E5E7EB] rounded-xl px-3 py-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#717171]" />
                  <span className="text-xs text-[#717171]">مرتب‌سازی:</span>
                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(e.target.value as 'popular' | 'cheapest' | 'expensive')
                    }
                    className="text-xs font-bold text-[#1F2024] bg-transparent focus:outline-none"
                  >
                    <option value="popular">پرفروش‌ترین</option>
                    <option value="cheapest">ارزان‌ترین</option>
                    <option value="expensive">گران‌ترین</option>
                  </select>
                </div>
              </div>
            </div>

            {filteredCatalogProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredCatalogProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={handleOpenProduct}
                    onAddToCart={(p) => handleAddToCart(p, 0, 1)}
                    isFavorite={favoriteIds.includes(product.id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-12 text-center">
                <p className="text-base font-bold text-[#1F2024] mb-2">
                  فرشی مطابق با جستجوی شما یافت نشد
                </p>
                <p className="text-xs text-[#717171] mb-5">
                  پیشنهاد می‌کنیم عبارت جستجو را تغییر دهید یا تمامی دسته‌بندی‌ها را مشاهده کنید.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="py-2.5 px-6 rounded-xl bg-[#CB1B1B] text-white text-xs font-bold"
                >
                  نمایش همه فرش‌ها
                </button>
              </div>
            )}
          </div>
        )}

        {/* PRODUCT DETAIL PAGE (PDP) */}
        {activePage === 'product-detail' && (
          <ProductDetailView
            product={selectedProduct}
            similarProducts={CARPET_PRODUCTS.filter(
              (p) => p.id !== selectedProduct.id
            )}
            onSelectProduct={handleOpenProduct}
            onAddToCart={handleAddToCart}
            onBackToCatalog={handleOpenCatalog}
            isFavorite={favoriteIds.includes(selectedProduct.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {/* SHOPPING CART VIEW (`سبد خرید`) */}
        {activePage === 'cart' && (
          <CartView
            items={cartItems}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            onClearCart={() => setCartItems([])}
            onContinueShopping={() => setActivePage('home')}
            onSelectProduct={handleOpenProduct}
          />
        )}

        {/* AUTH VIEW (`ورود / ثبت نام`) */}
        {activePage === 'auth' && (
          <AuthView
            initialMode="register"
            onSuccess={(user) => {
              setUserProfile(user);
              showToast(`خوش آمدید ${user.fullName}؛ حساب کاربری شما فعال شد.`);
              setActivePage('home');
            }}
            onCancel={() => setActivePage('home')}
          />
        )}

        {/* BLOG VIEW (`وبلاگ تخصصی فرش`) */}
        {activePage === 'blog' && (
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {!selectedBlogPost ? (
              <>
                <div className="mb-8">
                  <h1 className="text-2xl font-extrabold text-[#1F2024] mb-2">
                    مجله و وبلاگ تخصصی ایـــرانی فرش
                  </h1>
                  <p className="text-sm text-[#717171]">
                    مقالات تخصصی شناخت قالی دستباف، راهنمای خرید فرش ماشینی و اصول چیدمان دکوراسیون ایرانی
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {BLOG_POSTS.map((post) => (
                    <article
                      key={post.id}
                      className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
                    >
                      <div>
                        <div className="aspect-[16/10] bg-[#F5F5F7]">
                          <CarpetImage
                            src={post.image}
                            alt={post.title}
                            containerClassName="w-full h-full bg-[#F5F5F7]"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-5">
                          <div className="flex items-center gap-2 text-xs text-[#717171] mb-2">
                            <span>{post.category}</span>
                            <span aria-hidden="true">·</span>
                            <span>{post.date}</span>
                            <span aria-hidden="true">·</span>
                            <span>{post.readTime}</span>
                          </div>
                          <h2 className="text-base font-extrabold text-[#1F2024] leading-7 mb-2">
                            {post.title}
                          </h2>
                          <p className="text-xs text-[#505050] leading-6 line-clamp-3">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>
                      <div className="px-5 pb-5 pt-2">
                        <button
                          type="button"
                          onClick={() => setSelectedBlogPost(post)}
                          className="w-full py-2.5 px-4 rounded-xl border border-[#CB1B1B] text-[#CB1B1B] hover:bg-[#CB1B1B] hover:text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                        >
                          <BookOpen className="w-4 h-4" />
                          <span>مطالعه کامل مقاله</span>
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            ) : (
              <article className="max-w-3xl mx-auto bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-10">
                <button
                  type="button"
                  onClick={() => setSelectedBlogPost(null)}
                  className="text-xs font-bold text-[#CB1B1B] hover:underline mb-4 inline-block"
                >
                  ← بازگشت به فهرست مقالات وبلاگ
                </button>
                <div className="flex items-center gap-2 text-xs text-[#717171] mb-3">
                  <span>{selectedBlogPost.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>نویسنده: {selectedBlogPost.author}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedBlogPost.date}</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-[#1F2024] leading-9 mb-6">
                  {selectedBlogPost.title}
                </h1>
                <div className="rounded-2xl overflow-hidden aspect-[16/9] mb-6 bg-[#F5F5F7]">
                  <CarpetImage
                    src={selectedBlogPost.image}
                    alt={selectedBlogPost.title}
                    containerClassName="w-full h-full bg-[#F5F5F7]"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-4 text-sm sm:text-base text-[#374151] leading-8">
                  {selectedBlogPost.content.map((para, index) => (
                    <p key={index}>{para}</p>
                  ))}
                </div>
              </article>
            )}
          </div>
        )}

        {/* ABOUT & CONTACT VIEW (`درباره ما و تماس با ما`) */}
        {activePage === 'about-contact' && (
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6 space-y-5">
                <span className="text-xs font-bold text-[#CB1B1B]">
                  درباره مجموعه ایـــرانی فرش
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-[#1F2024] leading-snug">
                  بیش از سه دهه همراه با هنر و اصالت فرش ایرانی
                </h1>
                <p className="text-sm text-[#505050] leading-8">
                  فروشگاه اینترنتی ایرانی فرش با هدف عرضه مستقیم و بدون واسطه نفیس‌ترین فرش‌های دستباف تبریز، کاشان، نائین و برترین کلکسیون‌های فرش ماشینی کاشان فعالیت می‌کند. تمامی فرش‌ها پیش از ارسال توسط کارشناسان خبره بررسی شده و به همراه شناسنامه اصالت و ضمانت‌نامه کتبی تقدیم حضور شما می‌گردند.
                </p>

                <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-5 space-y-3.5 text-xs sm:text-sm text-[#374151]">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#CB1B1B] shrink-0" />
                    <span>تلفن مشاوره و فروش: ۰۲۱-۸۸۴۴۲۲۱۱ (پاسخگویی ۹ صبح تا ۹ شب)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-[#CB1B1B] shrink-0" />
                    <span>نگارخانه مرکزی: تهران، خیابان ولیعصر، بالاتر از پارک ساعی، سرای ایرانی فرش</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#CB1B1B] shrink-0" />
                    <span>پست الکترونیک: info@iranifarsh.ir</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8">
                  <h2 className="text-lg font-extrabold text-[#1F2024] mb-2">
                    فرم تماس و درخواست مشاوره خرید فرش
                  </h2>
                  <p className="text-xs text-[#717171] mb-5">
                    چنانچه برای انتخاب ابعاد یا رنگ فرش متناسب با دکوراسیون منزل خود نیاز به راهنمایی دارید، پیام خود را ثبت نمایید.
                  </p>

                  {contactSent && (
                    <div className="mb-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
                      پیام شما با موفقیت ثبت شد. کارشناسان ایرانی فرش در اسرع وقت با شما تماس خواهند گرفت.
                    </div>
                  )}

                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-[#374151] mb-1">
                        نام و نام خانوادگی
                      </label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="نام خود را وارد کنید"
                        className="w-full px-3.5 py-2.5 text-sm border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#CB1B1B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#374151] mb-1">
                        شماره تماس
                      </label>
                      <input
                        type="tel"
                        required
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                        className="w-full px-3.5 py-2.5 text-sm border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#CB1B1B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#374151] mb-1">
                        پیام یا مشخصات فرش مدنظر شما
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={contactText}
                        onChange={(e) => setContactText(e.target.value)}
                        placeholder="سوال یا درخواست مشاوره خود را بنویسید..."
                        className="w-full px-3.5 py-2.5 text-sm border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#CB1B1B]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 px-6 rounded-xl bg-[#CB1B1B] hover:bg-[#A91616] text-white text-sm font-bold transition-colors"
                    >
                      ارسال درخواست مشاوره
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER matching Irani Farsh Figma (`فوتر ایرانی فرش`) */}
      <footer className="bg-[#F9FAFB] border-t border-[#E5E7EB] mt-16">
        {/* Service Guarantee Strip */}
        <div className="border-b border-[#E5E7EB]">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#F9E8E8] text-[#CB1B1B] flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1F2024]">
                  ضمانت کتبی اصالت و کیفیت
                </h3>
                <p className="text-xs text-[#717171]">
                  همراه با شناسنامه بافت برای تمام فرش‌های دستباف و ماشینی
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#F9E8E8] text-[#CB1B1B] flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1F2024]">
                  ارسال رایگان و بیمه‌شده
                </h3>
                <p className="text-xs text-[#717171]">
                  تحویل سریع و ایمن در بسته‌بندی استاندارد به سراسر ایران
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#F9E8E8] text-[#CB1B1B] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1F2024]">
                  ۷ روز ضمانت بازگشت و تعویض
                </h3>
                <p className="text-xs text-[#717171]">
                  امکان بررسی هماهنگی فرش با دکوراسیون منزل شما
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Columns matching Irani Farsh Figma */}
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Brand Story Column (5 cols) */}
            <div className="md:col-span-5 space-y-3">
              <span className="text-2xl font-black text-[#CB1B1B] tracking-tight inline-block">
                ایـــرانی فرش
              </span>
              <p className="text-xs sm:text-sm text-[#505050] leading-7 max-w-md">
                ایرانی فرش مرجع تخصصی بررسی، مقایسه و خرید آنلاین فرش‌های دستباف تبریز، کاشان، نائین و فرش‌های ماشینی مدرن و کلاسیک است. ما اصالت هنر ایرانی را مستقیم از کارگاه‌های معتبر به خانه شما می‌آوریم.
              </p>
              <div className="pt-2 space-y-1.5 text-xs text-[#505050]">
                <p>تلفن پشتیبانی: ۰۲۱-۸۸۴۴۲۲۱۱</p>
                <p>نشانی: تهران، خیابان ولیعصر، بالاتر از پارک ساعی، پلاک ۱۴۲۰</p>
              </div>
            </div>

            {/* Links Column 1: Handwoven (2 cols) */}
            <div className="md:col-span-2 space-y-3">
              <h4 className="text-sm font-extrabold text-[#1F2024]">فرش‌های دستباف</h4>
              <ul className="space-y-2 text-xs text-[#505050]">
                <li>
                  <button
                    type="button"
                    onClick={() => handleOpenProduct(CARPET_PRODUCTS[0])}
                    className="hover:text-[#CB1B1B] transition-colors"
                  >
                    فرش دستباف تبریز
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleOpenProduct(CARPET_PRODUCTS[1])}
                    className="hover:text-[#CB1B1B] transition-colors"
                  >
                    فرش دستباف کاشان
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleOpenProduct(CARPET_PRODUCTS[2])}
                    className="hover:text-[#CB1B1B] transition-colors"
                  >
                    فرش ابریشم نائین
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleOpenProduct(CARPET_PRODUCTS[3])}
                    className="hover:text-[#CB1B1B] transition-colors"
                  >
                    فرش دستباف هریس
                  </button>
                </li>
              </ul>
            </div>

            {/* Links Column 2: Machine Carpets (2 cols) */}
            <div className="md:col-span-2 space-y-3">
              <h4 className="text-sm font-extrabold text-[#1F2024]">فرش‌های ماشینی</h4>
              <ul className="space-y-2 text-xs text-[#505050]">
                <li>
                  <button
                    type="button"
                    onClick={() => handleOpenProduct(CARPET_PRODUCTS[4])}
                    className="hover:text-[#CB1B1B] transition-colors"
                  >
                    فرش ماشینی ۱۲۰۰ شانه
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleOpenProduct(CARPET_PRODUCTS[5])}
                    className="hover:text-[#CB1B1B] transition-colors"
                  >
                    فرش ماشینی ۱۵۰۰ شانه
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleOpenProduct(CARPET_PRODUCTS[6])}
                    className="hover:text-[#CB1B1B] transition-colors"
                  >
                    فرش وینتیج و کهنه‌نما
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleOpenProduct(CARPET_PRODUCTS[7])}
                    className="hover:text-[#CB1B1B] transition-colors"
                  >
                    فرش طرح نائین درباری
                  </button>
                </li>
              </ul>
            </div>

            {/* Trust Seal Column (3 cols) */}
            <div className="md:col-span-3 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-extrabold text-[#1F2024] mb-3">
                  مجوزها و نماد اعتماد
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white border border-[#E5E7EB] rounded-2xl p-3 flex flex-col items-center justify-center text-center">
                    <ShieldCheck className="w-7 h-7 text-[#CB1B1B] mb-1.5" />
                    <span className="text-[11px] font-bold text-[#1F2024]">
                      نماد اعتماد الکترونیکی
                    </span>
                    <span className="text-[10px] text-[#717171]">وزارت صمت</span>
                  </div>
                  <div className="bg-white border border-[#E5E7EB] rounded-2xl p-3 flex flex-col items-center justify-center text-center">
                    <Award className="w-7 h-7 text-[#CB1B1B] mb-1.5" />
                    <span className="text-[11px] font-bold text-[#1F2024]">
                      اتحادیه فرش ایران
                    </span>
                    <span className="text-[10px] text-[#717171]">عضو رسمی</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#717171]">
            <p>
              تمامی حقوق مادی و معنوی این وب‌سایت متعلق به فروشگاه اینترنتی{' '}
              <strong className="text-[#1F2024]">ایـــرانی فرش</strong> می‌باشد.
            </p>
            <div className="flex items-center gap-5">
              <button
                type="button"
                onClick={() => setActivePage('home')}
                className="hover:text-[#CB1B1B]"
              >
                صفحه اصلی
              </button>
              <button
                type="button"
                onClick={() => handleOpenCatalog('all')}
                className="hover:text-[#CB1B1B]"
              >
                فروشگاه
              </button>
              <button
                type="button"
                onClick={() => setActivePage('cart')}
                className="hover:text-[#CB1B1B]"
              >
                سبد خرید ({formatPriceToman(
                  cartItems.reduce(
                    (acc, item) =>
                      acc +
                      Math.round(
                        item.product.price *
                          (item.product.sizes[item.sizeIndex]?.priceMultiplier || 1)
                      ) *
                        item.quantity,
                    0
                  )
                )}{' '}
                تومان)
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Developer Signature (Fixed Bottom-Right across all pages) */}
      <div
        dir="ltr"
        className="fixed bottom-4 right-4 z-50 pointer-events-auto select-none"
      >
        <div className="group flex items-center gap-2.5 pl-1.5 pr-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#E5E7EB] shadow-sm hover:border-[#CB1B1B]/40 hover:shadow transition-all duration-200">
          <div className="relative w-6 h-6 rounded-full overflow-hidden ring-1 ring-[#CB1B1B]/40 shrink-0">
            <img
              src="/assets/aistudio/photo_2026-09-28_15-02-04_e21961f3.jpg"
              alt="Ali Ranjbaran"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-[11px] font-medium tracking-wide text-[#505050]">
            Crafted by{' '}
            <strong className="font-bold text-[#1F2024] group-hover:text-[#CB1B1B] transition-colors">
              Ali Ranjbaran
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
}
