export type CarpetCategory = 'handwoven' | 'machine' | 'vintage' | 'silk';

export interface CarpetReview {
  id: string;
  userName: string;
  date: string;
  rating: number;
  comment: string;
  verifiedBuyer: boolean;
  city: string;
}

export interface CarpetProduct {
  id: string;
  title: string;
  shortTitle: string;
  code: string;
  category: CarpetCategory;
  categoryLabel: string;
  origin: string;
  backgroundColor: string;
  borderColor: string;
  price: number;
  oldPrice?: number;
  image: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  sizes: {
    label: string;
    dimensions: string;
    priceMultiplier: number;
  }[];
  specs: {
    density: string;
    reedsOrRaj: string;
    pileMaterial: string;
    warpMaterial: string;
    shape: string;
    qualityGrade: string;
  };
  description: string;
  reviews: CarpetReview[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  content: string[];
}

export const HERO_IMAGE = '/src/assets/images/hero_persian_carpet_interior_1794246812464.jpg';
export const IMG_TABRIZ_CRIMSON = '/src/assets/images/carpet_tabriz_crimson_medallion_1794246814150.jpg';
export const IMG_KASHAN_IVORY = '/src/assets/images/carpet_kashan_ivory_afshan_1794246815243.jpg';
export const IMG_NAIN_NAVY = '/src/assets/images/carpet_nain_navy_silk_1794246817197.jpg';
export const IMG_VINTAGE_GREY = '/src/assets/images/carpet_modern_vintage_grey_1794246816793.jpg';

const STANDARD_SIZES = [
  { label: '۱۲ متری', dimensions: '۳۰۰ × ۴۰۰ سانتی‌متر', priceMultiplier: 1 },
  { label: '۹ متری', dimensions: '۲۵۰ × ۳۵۰ سانتی‌متر', priceMultiplier: 0.78 },
  { label: '۶ متری', dimensions: '۲۰۰ × ۳۰۰ سانتی‌متر', priceMultiplier: 0.54 },
  { label: '۴ متری (ذرع و نیم)', dimensions: '۱۵۰ × ۲۲۵ سانتی‌متر', priceMultiplier: 0.36 },
];

export const CARPET_PRODUCTS: CarpetProduct[] = [
  // Hand-woven carpets (فرش‌های دستباف)
  {
    id: 'hw-1',
    title: 'فرش دستباف تبریز طرح سالاری ۴۰ رج زمینه لاکی',
    shortTitle: 'فرش دستباف تبریز طرح سالاری ۴۰ رج',
    code: 'IF-TBZ-401',
    category: 'handwoven',
    categoryLabel: 'فرش دستباف',
    origin: 'تبریز',
    backgroundColor: 'لاکی (قرمز روناسی)',
    borderColor: 'سرمه‌ای درباری',
    price: 48500000,
    oldPrice: 52000000,
    image: IMG_TABRIZ_CRIMSON,
    gallery: [IMG_TABRIZ_CRIMSON, HERO_IMAGE, IMG_KASHAN_IVORY, IMG_NAIN_NAVY],
    rating: 4.9,
    reviewCount: 38,
    inStock: true,
    sizes: STANDARD_SIZES,
    specs: {
      density: 'تراکم ویژه استادباف تبریز',
      reedsOrRaj: '۴۰ رج تقارن‌دار',
      pileMaterial: 'پشم مرینوس درجه یک به همراه گل ابریشم طبیعی',
      warpMaterial: 'چله نخ پنبه خالص دو لا تابیده',
      shape: 'مستطیل استاندارد',
      qualityGrade: 'درجه یک صادراتی (ضمانت کتبی اصالت)',
    },
    description:
      'فرش دستباف تبریز طرح سالاری یکی از اصیل‌ترین و ماندگارترین نقشه‌های قالی‌بافی آذربایجان است. ترکیب رنگ لاکی روناسی طبیعی با ترنج مرکزی سرمه‌ای و گل‌های ابریشم درخشان، جلوه‌ای باشکوه به فضای پذیرایی شما می‌بخشد.',
    reviews: [
      {
        id: 'r-1',
        userName: 'مهرداد فرهادی',
        city: 'تهران',
        date: '۱۴ آبان ۱۴۰۵',
        rating: 5,
        verifiedBuyer: true,
        comment: 'کیفیت بافت و درخشش گل‌های ابریشم این فرش واقعاً بی‌نظیره. دقیقاً مطابق تصاویر و با شناسنامه اصالت تحویل گرفتم.',
      },
      {
        id: 'r-2',
        userName: 'سارا طاهری',
        city: 'شیراز',
        date: '۲ آبان ۱۴۰۵',
        rating: 5,
        verifiedBuyer: true,
        comment: 'رنگ لاکی زمینه بسیار گرم و اصیل هست و اصلاً تند یا زننده نیست. بسته‌بندی و ارسال هم عالی بود.',
      },
    ],
  },
  {
    id: 'hw-2',
    title: 'فرش دستباف کاشان طرح افشان شاه‌عباسی زمینه کرم',
    shortTitle: 'فرش دستباف کاشان طرح افشان کرم',
    code: 'IF-KSH-209',
    category: 'handwoven',
    categoryLabel: 'فرش دستباف',
    origin: 'کاشان',
    backgroundColor: 'کرم عاجی',
    borderColor: 'فیروزه‌ای مسجدی',
    price: 42800000,
    image: IMG_KASHAN_IVORY,
    gallery: [IMG_KASHAN_IVORY, IMG_TABRIZ_CRIMSON, HERO_IMAGE, IMG_NAIN_NAVY],
    rating: 4.8,
    reviewCount: 29,
    inStock: true,
    sizes: STANDARD_SIZES,
    specs: {
      density: 'بافت ریز کاشان',
      reedsOrRaj: '۴۵ رج کاشان',
      pileMaterial: 'پشم کرک دست‌ریس با رنگرزی گیاهی',
      warpMaterial: 'پنبه اعلا',
      shape: 'مستطیل',
      qualityGrade: 'ممتاز با ضمانت ۵ ساله ایرانی فرش',
    },
    description:
      'طرح افشان شاه‌عباسی کاشان به دلیل نداشتن ترنج مرکزی، فضاهای نشیمن و پذیرایی را دلبازتر و بزرگ‌تر نشان می‌دهد. حاشیه فیروزه‌ای اصیل در کنار متن کرم عاجی، هماهنگی فوق‌العاده‌ای با مبلمان کلاسیک و نئوکلاسیک ایجاد می‌کند.',
    reviews: [
      {
        id: 'r-3',
        userName: 'علیرضا کاظمی',
        city: 'اصفهان',
        date: '۱۹ مهر ۱۴۰۵',
        rating: 5,
        verifiedBuyer: true,
        comment: 'حاشیه فیروزه‌ای این قالی روح تازه به خانه ما داد. نرمی و لطافت پرزها کاملاً اصالت پشم کاشان رو نشون میده.',
      },
    ],
  },
  {
    id: 'hw-3',
    title: 'فرش دستباف نائین ۶ لا گل ابریشم طرح لچک ترنج سرمه‌ای',
    shortTitle: 'فرش دستباف نائین ۶ لا گل ابریشم',
    code: 'IF-NAN-604',
    category: 'handwoven',
    categoryLabel: 'فرش دستباف',
    origin: 'نائین',
    backgroundColor: 'سرمه‌ای رویال',
    borderColor: 'کرم استخوانی',
    price: 56900000,
    oldPrice: 61000000,
    image: IMG_NAIN_NAVY,
    gallery: [IMG_NAIN_NAVY, IMG_KASHAN_IVORY, IMG_TABRIZ_CRIMSON, HERO_IMAGE],
    rating: 4.9,
    reviewCount: 44,
    inStock: true,
    sizes: STANDARD_SIZES,
    specs: {
      density: 'فوق ریزبافت نائین',
      reedsOrRaj: '۶ لا (معادل ۵۵ رج)',
      pileMaterial: 'پشم مرینوس و ابریشم طبیعی دورگیری شده',
      warpMaterial: 'چله ابریشم و نخ ۶ لا',
      shape: 'مستطیل',
      qualityGrade: 'صادراتی کلکسیونی',
    },
    description:
      'فرش نائین ۶ لا یکی از ظریف‌ترین دستبافته‌های ایران است که با طیف رنگی آرامش‌بخش سرمه‌ای، بژ و آبی آسمانی شناخته می‌شود. دورگیری گل‌های شاه‌عباسی با ابریشم طبیعی، عمق و درخششی خیره‌کننده به این اثر هنری بخشیده است.',
    reviews: [
      {
        id: 'r-4',
        userName: 'کتایون رضوی',
        city: 'تهران',
        date: '۲۵ مهر ۱۴۰۵',
        rating: 5,
        verifiedBuyer: true,
        comment: 'ظرافت گره‌ها و تقارن نقشه تحسین‌برانگیزه. برای جهیزیه دخترم تهیه کردیم و همه مهمان‌ها مجذوبش شدن.',
      },
    ],
  },
  {
    id: 'hw-4',
    title: 'فرش دستباف تبریز طرح هریس کهنه‌نما ابریشم‌باف',
    shortTitle: 'فرش دستباف تبریز طرح هریس کهنه‌نما',
    code: 'IF-TBZ-418',
    category: 'handwoven',
    categoryLabel: 'فرش دستباف',
    origin: 'تبریز - هریس',
    backgroundColor: 'خاکستری نقره‌ای و مسی',
    borderColor: 'سفالین مات',
    price: 44200000,
    image: IMG_VINTAGE_GREY,
    gallery: [IMG_VINTAGE_GREY, HERO_IMAGE, IMG_TABRIZ_CRIMSON, IMG_KASHAN_IVORY],
    rating: 4.7,
    reviewCount: 21,
    inStock: true,
    sizes: STANDARD_SIZES,
    specs: {
      density: 'بافت متراکم هریس',
      reedsOrRaj: '۳۵ رج پشم دست‌ریس',
      pileMaterial: 'پشم طبیعی کوهستان با شستشوی پتینه گیاهی',
      warpMaterial: 'پنبه خالص',
      shape: 'مستطیل',
      qualityGrade: 'ممتاز صادراتی اروپا',
    },
    description:
      'ترکیب هنر اصیل قالی‌بافی آذربایجان با پالت رنگی مدرن نقره‌ای، طوسی و اخرایی ملایم؛ گزینه‌ای ایده‌آل برای دکوراسیون‌های مدرن و مینیمال که به دنبال اصالت فرش دستباف ایرانی هستند.',
    reviews: [],
  },

  // Machine-woven carpets (فرش‌های ماشینی)
  {
    id: 'mw-1',
    title: 'فرش ماشینی کاشان ۱۲۰۰ شانه طرح خشتی باغ ارم لاکی',
    shortTitle: 'فرش ماشینی ۱۲۰۰ شانه طرح باغ ارم',
    code: 'IF-MCH-1201',
    category: 'machine',
    categoryLabel: 'فرش ماشینی',
    origin: 'کاشان',
    backgroundColor: 'لاکی روناسی',
    borderColor: 'سرمه‌ای',
    price: 14300000,
    oldPrice: 15800000,
    image: IMG_TABRIZ_CRIMSON,
    gallery: [IMG_TABRIZ_CRIMSON, IMG_KASHAN_IVORY, IMG_VINTAGE_GREY, HERO_IMAGE],
    rating: 4.8,
    reviewCount: 64,
    inStock: true,
    sizes: STANDARD_SIZES,
    specs: {
      density: 'تراکم ۳۶۰۰ واقعی',
      reedsOrRaj: '۱۲۰۰ شانه گل برجسته',
      pileMaterial: '۱۰۰٪ اکریلیک هیت‌ست شده آلمانی (بدون پرزدهی)',
      warpMaterial: 'پنبه پلی‌استر مقاوم',
      shape: 'مستطیل',
      qualityGrade: 'درجه یک استاندارد ملی ایران (۱۰ سال ضمانت)',
    },
    description:
      'فرش ماشینی ۱۲۰۰ شانه کاشان با تراکم ۳۶۰۰ و نخ ۱۰۰ درصد اکریلیک هیت‌ست شده، ظاهری بسیار شبیه به قالی‌های دستباف ۴۰ رج دارد و در برابر شستشو، حرارت و پاخوردگی کاملاً مقاوم است.',
    reviews: [
      {
        id: 'r-5',
        userName: 'حسین مرادی',
        city: 'کرج',
        date: '۱۰ آبان ۱۴۰۵',
        rating: 5,
        verifiedBuyer: true,
        comment: 'از نزدیک واقعاً با فرش دستباف مو نمی‌زنه. اصلاً پرزدهی نداره و قیمتش نسبت به بازار خیلی منصفانه است.',
      },
    ],
  },
  {
    id: 'mw-2',
    title: 'فرش ماشینی ۱۵۰۰ شانه گل برجسته طرح افشان سلطنتی کرم',
    shortTitle: 'فرش ماشینی ۱۵۰۰ شانه طرح افشان کرم',
    code: 'IF-MCH-1504',
    category: 'machine',
    categoryLabel: 'فرش ماشینی',
    origin: 'کاشان',
    backgroundColor: 'کرم روشن',
    borderColor: 'فیروزه‌ای و طلاکوب',
    price: 16900000,
    image: IMG_KASHAN_IVORY,
    gallery: [IMG_KASHAN_IVORY, IMG_NAIN_NAVY, IMG_TABRIZ_CRIMSON, HERO_IMAGE],
    rating: 4.9,
    reviewCount: 52,
    inStock: true,
    sizes: STANDARD_SIZES,
    specs: {
      density: 'تراکم ۴۵۰۰ ظریف‌بافت',
      reedsOrRaj: '۱۵۰۰ شانه هایبالک (گل برجسته)',
      pileMaterial: 'اکریلیک هیت‌ست نمره ۵۰ ترک',
      warpMaterial: 'پنبه خالص',
      shape: 'مستطیل',
      qualityGrade: 'درجه یک ممتاز',
    },
    description:
      'ظرافت خیره‌کننده ۱۵۰۰ شانه با تراکم ۴۵۰۰ و گل‌های برجسته هایبالک، این فرش را به انتخابی لوکس برای سالن‌های پذیرایی تبدیل کرده است.',
    reviews: [],
  },
  {
    id: 'mw-3',
    title: 'فرش ماشینی وینتیج ۱۲۰۰ شانه طرح پتینه طوسی و تراکوتا',
    shortTitle: 'فرش ماشینی وینتیج طرح پتینه طوسی',
    code: 'IF-MCH-1288',
    category: 'machine',
    categoryLabel: 'فرش ماشینی',
    origin: 'کاشان',
    backgroundColor: 'طوسی نقره‌ای',
    borderColor: 'آجری ملایم (تراکوتا)',
    price: 12800000,
    oldPrice: 14200000,
    image: IMG_VINTAGE_GREY,
    gallery: [IMG_VINTAGE_GREY, IMG_NAIN_NAVY, IMG_KASHAN_IVORY, HERO_IMAGE],
    rating: 4.7,
    reviewCount: 41,
    inStock: true,
    sizes: STANDARD_SIZES,
    specs: {
      density: 'تراکم ۳۶۰۰',
      reedsOrRaj: '۱۲۰۰ شانه کلاریس وینتیج',
      pileMaterial: 'اکریلیک هیت‌ست ضدحساسیت',
      warpMaterial: 'پنبه',
      shape: 'مستطیل',
      qualityGrade: 'درجه یک صادراتی',
    },
    description:
      'فرش وینتیج یا کهنه‌نما با ترکیب رنگ طوسی نقره‌ای و آجری ملایم، هارمونی بی‌نظیری با مبلمان مدرن، راحتی و کف‌پوش‌های پارکت و سرامیک روشن ایجاد می‌کند.',
    reviews: [],
  },
  {
    id: 'mw-4',
    title: 'فرش ماشینی ۱۲۰۰ شانه طرح نائین درباری سرمه‌ای',
    shortTitle: 'فرش ماشینی ۱۲۰۰ شانه طرح نائین سرمه‌ای',
    code: 'IF-MCH-1219',
    category: 'machine',
    categoryLabel: 'فرش ماشینی',
    origin: 'کاشان',
    backgroundColor: 'سرمه‌ای تیره',
    borderColor: 'کرم صدفی',
    price: 14600000,
    image: IMG_NAIN_NAVY,
    gallery: [IMG_NAIN_NAVY, IMG_TABRIZ_CRIMSON, IMG_KASHAN_IVORY, HERO_IMAGE],
    rating: 4.8,
    reviewCount: 33,
    inStock: true,
    sizes: STANDARD_SIZES,
    specs: {
      density: 'تراکم ۳۶۰۰ واقعی',
      reedsOrRaj: '۱۲۰۰ شانه هشت رنگ',
      pileMaterial: '۱۰۰٪ اکریلیک هیت‌ست بایر آلمان',
      warpMaterial: 'پنبه',
      shape: 'مستطیل',
      qualityGrade: 'درجه یک با ضمانتنامه معتبر',
    },
    description:
      'فرش طرح نائین درباری با زمینه سرمه‌ای چرک‌تاب و ترنج استخوانی، انتخابی اصیل و کاربردی برای خانواده‌های ایرانی است که زیبایی کلاسیک و دوام بالا را هم‌زمان می‌خواهند.',
    reviews: [],
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'راهنمای جامع تشخیص فرش دستباف اصل از نمونه‌های ماشینی و شبه‌دستباف',
    excerpt:
      'چگونه با بررسی گره‌های پشت فرش، نوع ریشه، تقارن رنگ‌ها و لطافت پشم مرینوس یا ابریشم، اصالت قالی دستباف ایرانی را در چند دقیقه تشخیص دهیم؟',
    category: 'راهنمای خرید فرش',
    readTime: '۶ دقیقه مطالعه',
    date: '۱۸ آبان ۱۴۰۵',
    author: 'استاد بهرام فرشباف',
    image: IMG_TABRIZ_CRIMSON,
    content: [
      'فرش دستباف ایرانی نه تنها یک کف‌پوش اصیل، بلکه یک سرمایه هنری ماندگار است. در هنگام خرید قالی دستباف، اولین نکته‌ای که باید بررسی کنید پشت فرش و نحوه گره‌زنی آن است.',
      'در فرش‌های دستباف، گره‌ها به دلیل بافته شدن با دست استادکار دارای اندکی تفاوت طبیعی در اندازه هستند، در حالی که در فرش ماشینی تمام گره‌ها کاملاً ماشینی و یکنواخت در ردیف‌های منظم قرار گرفته‌اند.',
      'نکته دوم ریشه‌های فرش است: در قالی دستباف، ریشه‌ها امتداد مستقیم چله (تار) فرش هستند و به بدنه دوخته نشده‌اند؛ اما در فرش‌های ماشینی ریشه به صورت نوار جداگانه در پایان کار به دو سر فرش دوخته می‌شود.',
    ],
  },
  {
    id: 'blog-2',
    title: 'تفاوت فرش ۷۰۰ شانه، ۱۲۰۰ شانه و ۱۵۰۰ شانه؛ کدام برای خانه شما مناسب‌تر است؟',
    excerpt:
      'بررسی دقیق شانه و تراکم در فرش‌های ماشینی کاشان، میزان نرمی کف فرش، ضخامت خاب و مقاومت در برابر پاخوردگی برای فضاهای پررفت‌وآمد.',
    category: 'دانستنی‌های فرش ماشینی',
    readTime: '۵ دقیقه مطالعه',
    date: '۱۲ آبان ۱۴۰۵',
    author: 'نگار سلیمانی',
    image: IMG_KASHAN_IVORY,
    content: [
      'بسیاری از خریداران تصور می‌کنند هرچه شانه و تراکم فرش بالاتر باشد، آن فرش برای هر فضایی مناسب‌تر است؛ در حالی که انتخاب شانه فرش کاملاً به کاربری فضا بستگی دارد.',
      'فرش‌های ۱۵۰۰ شانه و ۱۲۰۰ شانه دارای ظرافت فوق‌العاده و نقشه بسیار ریز (شبیه دستباف) هستند و برای سالن‌های پذیرایی و چیدمان‌های مبلمان رسمی بهترین گزینه‌اند.',
      'در مقابل، فرش‌های ۷۰۰ شانه و ۱۰۰۰ شانه دارای ارتفاع نخ خاب بلندتر و نرمی بیشتری زیر پا هستند و برای اتاق نشیمن که اعضای خانواده روی فرش می‌نشینند، راحتی بیشتری فراهم می‌کنند.',
    ],
  },
  {
    id: 'blog-3',
    title: 'اصول ست کردن رنگ فرش با مبلمان و پرده در دکوراسیون مدرن و کلاسیک',
    excerpt:
      'چگونه فرش‌های زمینه لاکی، سرمه‌ای، کرم یا وینتیج طوسی را با رنگ چوب مبل، کوسن‌ها و نورپردازی خانه هماهنگ کنیم تا فضا بزرگ‌تر و دلنشین‌تر دیده شود؟',
    category: 'دکوراسیون داخلی',
    readTime: '۷ دقیقه مطالعه',
    date: '۳ آبان ۱۴۰۵',
    author: 'مهندس آرمان رضایی',
    image: HERO_IMAGE,
    content: [
      'فرش نقطه کانونی دکوراسیون خانه ایرانی است. اگر مبلمان شما به رنگ‌های خنثی مانند کرم، طوسی، نسکافه‌ای یا سبز زیتونی است، یک فرش زمینه لاکی یا سرمه‌ای تبریز گرما و شخصیت بی‌نظیری به فضا می‌بخشد.',
      'برای آپارتمان‌های با متراژ کمتر یا نورگیر محدود، فرش‌های طرح افشان زمینه کرم یا وینتیج نقره‌ای باعث انعکاس بهتر نور و دلبازتر شدن فضای نشیمن می‌شوند.',
    ],
  },
];

export function toPersianDigits(value: number | string): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(value).replace(/\d/g, (d) => persianDigits[Number(d)]);
}

export function formatPriceToman(amount: number): string {
  const formattedWithCommas = Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '،');
  return toPersianDigits(formattedWithCommas);
}
