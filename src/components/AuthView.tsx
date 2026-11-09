import React, { useState } from 'react';
import { User, Phone, Mail, Lock, CheckCircle2 } from 'lucide-react';
import { IMG_TABRIZ_CRIMSON } from '../data/carpets';
import { CarpetImage } from './CarpetImage';

export interface UserProfile {
  fullName: string;
  phone: string;
  email: string;
}

interface AuthViewProps {
  initialMode?: 'login' | 'register';
  onSuccess: (user: UserProfile) => void;
  onCancel: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({
  initialMode = 'register',
  onSuccess,
  onCancel,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (mode === 'register') {
      if (!fullName.trim() || !phone.trim() || !password.trim()) {
        setErrorMessage('لطفاً نام، شماره موبایل و رمز عبور خود را وارد نمایید.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('رمز عبور و تکرار رمز عبور با یکدیگر مطابقت ندارند.');
        return;
      }
      onSuccess({
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim() || 'user@iranifarsh.ir',
      });
    } else {
      if (!email.trim() && !phone.trim()) {
        setErrorMessage('لطفاً ایمیل یا شماره موبایل خود را وارد نمایید.');
        return;
      }
      onSuccess({
        fullName: fullName.trim() || 'کاربر گرامی ایرانی فرش',
        phone: phone.trim() || '۰۹۱۲۰۰۰۰۰۰۰',
        email: email.trim() || 'member@iranifarsh.ir',
      });
    }
  };

  return (
    <div className="max-w-[1140px] mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Right Column in RTL (6 cols): Form matching Irani Farsh Sign Up / Login Figma */}
          <div className="lg:col-span-6">
            <div className="text-center sm:text-right mb-6">
              <button
                type="button"
                onClick={onCancel}
                className="text-2xl font-black text-[#CB1B1B] tracking-tight inline-block mb-2"
              >
                ایـــرانی فرش
              </button>
              <h1 className="text-lg sm:text-xl font-extrabold text-[#1F2024]">
                {mode === 'register'
                  ? 'ثبت نام در باشگاه مشتریان ایرانی فرش'
                  : 'ورود به حساب کاربری ایرانی فرش'}
              </h1>
              <p className="text-xs text-[#717171] mt-1">
                {mode === 'register'
                  ? 'با عضویت در ایرانی فرش از تخفیف‌های ویژه و ارسال رایگان بهره‌مند شوید.'
                  : 'برای پیگیری سفارش‌ها و مدیریت سبد خرید خود وارد شوید.'}
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-[#F9E8E8] border border-[#CB1B1B]/30 text-[#CB1B1B] text-xs font-medium">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {mode === 'register' && (
                <>
                  <div className="relative">
                    <label className="block text-xs font-semibold text-[#505050] mb-1">
                      نام و نام خانوادگی
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="نام و نام خانوادگی خود را بنویسید"
                        className="w-full pr-4 pl-10 py-3 text-sm bg-white border border-[#D1D5DB] rounded-xl focus:outline-none focus:border-[#CB1B1B]"
                      />
                      <User className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-xs font-semibold text-[#505050] mb-1">
                      شماره موبایل
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="شماره موبایل خود را وارد کنید"
                        className="w-full pr-4 pl-10 py-3 text-sm bg-white border border-[#D1D5DB] rounded-xl focus:outline-none focus:border-[#CB1B1B]"
                      />
                      <Phone className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </>
              )}

              <div className="relative">
                <label className="block text-xs font-semibold text-[#505050] mb-1">
                  {mode === 'register' ? 'ایمیل' : 'ایمیل یا شماره موبایل'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={
                      mode === 'register'
                        ? 'ایمیل خود را وارد کنید'
                        : 'ایمیل یا شماره موبایل خود را وارد کنید'
                    }
                    className="w-full pr-4 pl-10 py-3 text-sm bg-white border border-[#D1D5DB] rounded-xl focus:outline-none focus:border-[#CB1B1B]"
                  />
                  <Mail className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="relative">
                <label className="block text-xs font-semibold text-[#505050] mb-1">
                  رمز عبور
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="رمز عبور خود را وارد کنید"
                    className="w-full pr-4 pl-10 py-3 text-sm bg-white border border-[#D1D5DB] rounded-xl focus:outline-none focus:border-[#CB1B1B]"
                  />
                  <Lock className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {mode === 'register' && (
                <div className="relative">
                  <label className="block text-xs font-semibold text-[#505050] mb-1">
                    تکرار رمز عبور
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="تکرار رمز عبور خود را وارد کنید"
                      className="w-full pr-4 pl-10 py-3 text-sm bg-white border border-[#D1D5DB] rounded-xl focus:outline-none focus:border-[#CB1B1B]"
                    />
                    <Lock className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-[#CB1B1B] hover:bg-[#A91616] text-white text-sm font-bold transition-colors shadow-sm mt-2"
              >
                {mode === 'register' ? 'ثبت نام' : 'ورود به حساب کاربری'}
              </button>
            </form>

            <div className="mt-5 text-center text-xs sm:text-sm text-[#505050]">
              {mode === 'register' ? (
                <p>
                  حساب کاربری دارید؟{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      setErrorMessage(null);
                    }}
                    className="font-bold text-[#CB1B1B] hover:underline"
                  >
                    وارد شوید!
                  </button>
                </p>
              ) : (
                <p>
                  هنوز عضو ایرانی فرش نشده‌اید؟{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('register');
                      setErrorMessage(null);
                    }}
                    className="font-bold text-[#CB1B1B] hover:underline"
                  >
                    ثبت نام کنید!
                  </button>
                </p>
              )}
            </div>
          </div>

          {/* Left Column in RTL (6 cols): Framed Persian Carpet Showcase matching Figma */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-[5/4] border border-[#E5E7EB]">
              <CarpetImage
                src={IMG_TABRIZ_CRIMSON}
                alt="کلکسیون فرش‌های اصیل ایرانی فرش"
                containerClassName="w-full h-full bg-[#F5F5F7]"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                <h2 className="text-lg sm:text-xl font-extrabold mb-2">
                  اصالت فرش ایرانی در خانه شما
                </h2>
                <p className="text-xs sm:text-sm text-white/90 leading-6 mb-4">
                  مجموعه‌ای منتخب از نفیس‌ترین فرش‌های دستباف تبریز، کاشان، نائین و کلکسیون فرش‌های ماشینی ۱۲۰۰ و ۱۵۰۰ شانه با ضمانت کتبی اصالت.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-white/90">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#CB1B1B]" />
                    ضمانت اصالت و سلامت
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#CB1B1B]" />
                    ارسال رایگان به سراسر کشور
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
