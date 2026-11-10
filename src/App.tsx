/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Zap,
  ShieldCheck,
  WalletCards,
  BotMessageSquare,
  SlidersHorizontal,
  Webhook,
  Landmark,
  SmartphoneNfc,
  CircleDollarSign,
  QrCode,
  Lightbulb,
  Code2,
  Rocket,
  Globe,
  Compass,
  Layers,
  Headset,
  Timer,
  Cpu,
  ChevronDown,
  Menu,
  X,
  Send,
  ArrowUpLeft,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  STATS_DATA,
  SITE_CONTENT,
  FeatureItem,
  StepItem,
  PaymentMethodItem,
  ModalLinkContent,
} from './constants/content';

// ─────────────────────────────────────────────────────────────
// مكتبة الأيقونات المطوّرة (Upgraded Icon System)
// ─────────────────────────────────────────────────────────────
const FEATURE_ICONS: Record<FeatureItem['iconName'], React.ComponentType<{ className?: string }>> = {
  Zap,
  ShieldCheck,
  WalletCards,
  BotMessageSquare,
  SlidersHorizontal,
  Webhook,
};

const STEP_ICONS: Record<StepItem['iconName'], React.ComponentType<{ className?: string }>> = {
  Lightbulb,
  Code2,
  ShieldCheck,
  Rocket,
};

const PAYMENT_ICONS: Record<
  PaymentMethodItem['iconName'],
  React.ComponentType<{ className?: string }>
> = {
  Landmark,
  SmartphoneNfc,
  CircleDollarSign,
  QrCode,
};

const STAT_ICONS: React.ComponentType<{ className?: string }>[] = [
  Layers,
  Headset,
  Timer,
  Cpu,
];

// مكوّن حاوية الأيقونات المتقدم بتوهج وطبقات زجاجية
function IconBadge({
  Icon,
  accentClass = 'from-[#3434d9]/25 via-[#8b5cf6]/15 to-transparent text-violet-300 border-violet-500/35',
  size = 'md',
}: {
  Icon: React.ComponentType<{ className?: string }>;
  accentClass?: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const dimensions =
    size === 'sm'
      ? 'w-10 h-10 rounded-xl'
      : size === 'lg'
        ? 'w-14 h-14 rounded-2xl'
        : 'w-13 h-13 rounded-2xl';
  const iconSize = size === 'sm' ? 'w-5 h-5' : size === 'lg' ? 'w-7 h-7' : 'w-6 h-6';

  return (
    <div
      className={`relative ${dimensions} bg-gradient-to-br ${accentClass} border flex items-center justify-center shadow-lg shadow-black/30 group-hover:scale-105 transition-transform duration-200 shrink-0`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-1 rounded-xl bg-white/[0.03] pointer-events-none"
      />
      <Icon className={`${iconSize} relative z-10 stroke-[1.85]`} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// مكوّن الشعار الموحّد (BrandLogo)
// يعرض صورة الاسم بالكامل (SHADOWX) كشعار رئيسي للموقع
// ─────────────────────────────────────────────────────────────
function BrandLogo() {
  const [wordmarkError, setWordmarkError] = useState(false);

  return (
    <a
      href="#"
      aria-label="العودة إلى أعلى صفحة ShadowX"
      className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5cf6] rounded-2xl"
    >
      {!wordmarkError ? (
        <div className="h-11 sm:h-12 w-36 sm:w-44 flex items-center justify-center overflow-hidden">
          <img
            src={SITE_CONTENT.brand.wordmarkLogo}
            alt={SITE_CONTENT.brand.name}
            referrerPolicy="no-referrer"
            onError={() => setWordmarkError(true)}
            className="w-full h-full object-cover object-center scale-125 transition-transform duration-200 group-hover:scale-[1.32]"
          />
        </div>
      ) : (
        <span
          dir="ltr"
          className="font-display font-extrabold text-xl tracking-tight text-white group-hover:text-violet-200 transition-colors"
        >
          Sʜᴀᴅᴏᴡ<span className="text-[#8b5cf6]">𝐗</span>
        </span>
      )}
    </a>
  );
}

// ─────────────────────────────────────────────────────────────
// ١) شريط التنقل (Navbar) — ثابت (sticky) بخلفية زجاجية blur
// تم نقل الشعار إلى الجهة المقابلة مكان زر القائمة الجانبية وزر ابدأ
// ─────────────────────────────────────────────────────────────
function Navbar({ onOpenProjectModal }: { onOpenProjectModal: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // إغلاق القائمة عند الضغط على Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0b0b14]/80 backdrop-blur-xl border-b border-white/[0.08]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-8">
        {/* الجهة الأولى (يميناً): زر القائمة الجانبية للموبايل + زر "ابدأ مشروعك" */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={SITE_CONTENT.navbar.mobileMenuAriaLabel}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-[#14141f] border border-white/[0.08] text-slate-200 hover:text-white hover:border-violet-500/40 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            type="button"
            onClick={onOpenProjectModal}
            className="hidden sm:inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-l from-[#3434d9] to-[#7c3aed] hover:from-[#3e3ee8] hover:to-[#8b5cf6] shadow-lg shadow-[#3434d9]/30 transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            <Rocket className="w-4 h-4 stroke-[2]" />
            <span>{SITE_CONTENT.navbar.ctaText}</span>
          </button>
        </div>

        {/* وسط: روابط تمرير سلس */}
        <nav
          aria-label="التنقل الرئيسي"
          className="hidden md:flex items-center gap-8 text-base font-medium text-slate-300"
        >
          {SITE_CONTENT.navbar.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 py-1 hover:text-white relative after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-0 after:h-[2px] after:bg-gradient-to-l after:from-[#3434d9] after:to-[#8b5cf6] hover:after:w-full after:transition-all after:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5cf6] rounded"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* الجهة المقابلة (يساراً): الشعار */}
        <BrandLogo />
      </div>

      {/* القائمة المنسدلة للموبايل */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.16 }}
            className="md:hidden bg-[#14141f]/95 backdrop-blur-xl border-b border-white/[0.08] px-4 pt-3 pb-6"
          >
            <nav aria-label="قائمة الموبايل" className="flex flex-col gap-2">
              {SITE_CONTENT.navbar.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-2xl text-base font-medium text-slate-200 hover:text-white hover:bg-white/[0.05] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenProjectModal();
                }}
                className="mt-2 w-full py-3.5 px-5 rounded-2xl font-bold text-center text-white bg-gradient-to-l from-[#3434d9] to-[#7c3aed] shadow-lg shadow-[#3434d9]/30 cursor-pointer flex items-center justify-center gap-2"
              >
                <Rocket className="w-4 h-4" />
                <span>{SITE_CONTENT.navbar.ctaText}</span>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────
// ٢) شريط الإحصائيات (Stats)
// ─────────────────────────────────────────────────────────────
function Stats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: 0.15 }}
      className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
    >
      {STATS_DATA.map((stat, idx) => {
        const StatIcon = STAT_ICONS[idx % STAT_ICONS.length];
        return (
          <div
            key={idx}
            className="group shadowx-card rounded-2xl p-6 text-center flex flex-col items-center justify-center"
          >
            <div className="mb-3 w-10 h-10 rounded-xl bg-gradient-to-br from-[#3434d9]/20 to-[#8b5cf6]/15 border border-violet-500/25 flex items-center justify-center text-violet-300 group-hover:scale-105 transition-transform duration-200">
              <StatIcon className="w-5 h-5 stroke-[1.85]" />
            </div>
            <span
              dir="ltr"
              className="font-display font-extrabold text-3xl sm:text-4xl bg-gradient-to-l from-white via-violet-200 to-[#8b5cf6] bg-clip-text text-transparent tabular-nums"
            >
              {stat.value}
            </span>
            <span className="mt-2 text-sm sm:text-base font-medium text-slate-400">
              {stat.label}
            </span>
          </div>
        );
      })}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// ٣) قسم البطل (Hero)
// ─────────────────────────────────────────────────────────────
function Hero({ onOpenProjectModal }: { onOpenProjectModal: () => void }) {
  return (
    <section className="relative pt-14 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
      {/* تأثير توهج (glow) خلف قسم الـ Hero بتدرج دائري blur من اللون الأساسي */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] sm:w-[680px] sm:h-[420px] rounded-full bg-gradient-to-tr from-[#3434d9]/35 via-[#6d28d9]/25 to-transparent blur-[110px] -z-10"
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* شارة صغيرة أعلى العنوان */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#14141f] border border-white/[0.08] text-violet-300 text-sm font-medium mb-7 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#8b5cf6] shrink-0" />
            <span>{SITE_CONTENT.hero.badge}</span>
          </div>

          {/* العنوان الرئيسي H1 ضخم مع تدرج لوني على الكلمة الأخيرة */}
          <h1
            style={{ textWrap: 'balance' }}
            className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl leading-[1.22] tracking-tight text-white"
          >
            {SITE_CONTENT.hero.titlePrefix}{' '}
            <span className="bg-gradient-to-l from-[#3434d9] via-[#7c3aed] to-[#c084fc] bg-clip-text text-transparent">
              {SITE_CONTENT.hero.titleHighlight}
            </span>
          </h1>

          {/* النص الفرعي */}
          <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto font-normal">
            {SITE_CONTENT.hero.subtitle}
          </p>

          {/* الأزرار الثلاثة */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* ١. زر أساسي */}
            <button
              type="button"
              onClick={onOpenProjectModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl font-bold text-base text-white bg-gradient-to-l from-[#3434d9] via-[#4f46e5] to-[#7c3aed] hover:from-[#3f3fe6] hover:to-[#8b5cf6] shadow-xl shadow-[#3434d9]/35 transition-all duration-200 hover:-translate-y-1 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              <Rocket className="w-5 h-5 stroke-[2] shrink-0" />
              <span>{SITE_CONTENT.hero.primaryBtn}</span>
            </button>

            {/* ٢. زر ثانوي لمنصة shad-vip.store */}
            <a
              href={SITE_CONTENT.hero.secondaryBtnHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl font-bold text-base text-slate-100 bg-[#14141f] hover:bg-[#1c1c2e] border border-white/[0.12] hover:border-violet-500/50 transition-all duration-200 hover:-translate-y-1 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              <Globe className="w-5 h-5 text-violet-400 stroke-[1.9] shrink-0" />
              <span>{SITE_CONTENT.hero.secondaryBtn}</span>
              <ArrowUpLeft className="w-4 h-4 text-violet-400 shrink-0" />
            </a>

            {/* ٣. زر شفاف / Outline */}
            <a
              href={SITE_CONTENT.hero.outlineBtnHref}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-semibold text-base text-slate-300 hover:text-white border border-white/[0.08] hover:border-white/25 bg-transparent hover:bg-white/[0.03] transition-all duration-200 hover:-translate-y-1 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              <Compass className="w-5 h-5 text-violet-400 stroke-[1.9] shrink-0" />
              <span>{SITE_CONTENT.hero.outlineBtn}</span>
            </a>
          </div>
        </motion.div>

        {/* شريط الإحصائيات أسفل الأزرار */}
        <Stats />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// ٤) قسم المزايا (Features) — id="features"
// ─────────────────────────────────────────────────────────────
function Features() {
  return (
    <section id="features" className="py-20 sm:py-24 scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
            {SITE_CONTENT.features.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            {SITE_CONTENT.features.subtitle}
          </p>
        </motion.div>

        {/* شبكة بطاقات: 3 أعمدة ديسكتوب / 2 تابلت / 1 موبايل */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SITE_CONTENT.features.items.map((feature, index) => {
            const IconComponent = FEATURE_ICONS[feature.iconName];
            return (
              <motion.article
                key={feature.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="group shadowx-card rounded-2xl p-7 flex flex-col justify-between"
              >
                <div>
                  {/* أيقونة مطوّرة داخل حاوية متوهجة */}
                  <div className="mb-6">
                    <IconBadge
                      Icon={IconComponent}
                      accentClass={feature.accentClass}
                      size="lg"
                    />
                  </div>

                  {/* عنوان H3 */}
                  <h3 className="font-display font-bold text-xl text-white mb-3">
                    {feature.title}
                  </h3>

                  {/* وصف البطاقة */}
                  <p className="text-slate-300 text-base leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// ٥) قسم "كيف نعمل؟" (HowItWorks) — id="how"
// ─────────────────────────────────────────────────────────────
function HowItWorks() {
  return (
    <section id="how" className="py-20 sm:py-24 scroll-mt-20 relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
            {SITE_CONTENT.howItWorks.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            {SITE_CONTENT.howItWorks.subtitle}
          </p>
        </motion.div>

        {/* 4 خطوات أفقية مرقّمة متصلة بخط على الديسكتوب، وعمودية على الموبايل */}
        <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* الخط الأفقي الواصل بين الدوائر على الديسكتوب */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-11 right-[12%] left-[12%] h-[2px] bg-gradient-to-l from-[#3434d9] via-[#7c3aed] to-[#3434d9]/30 -z-0"
          />

          {SITE_CONTENT.howItWorks.steps.map((step, idx) => {
            const StepIcon = STEP_ICONS[step.iconName];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group relative z-10 flex flex-col items-center text-center shadowx-card rounded-2xl p-7"
              >
                {/* دائرة الأيقونة مع شارة الرقم */}
                <div className="relative mb-5">
                  <div className="w-15 h-15 rounded-2xl bg-gradient-to-br from-[#3434d9] to-[#8b5cf6] text-white flex items-center justify-center shadow-lg shadow-[#3434d9]/40 border-4 border-[#0b0b14] group-hover:scale-105 transition-transform duration-200">
                    <StepIcon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#14141f] border border-violet-400/50 text-violet-200 font-display font-bold text-xs flex items-center justify-center tabular-nums">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl text-white mb-2.5">
                  {step.title}
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// ٦) قسم طرق الدفع (Payments) — id="pay"
// ─────────────────────────────────────────────────────────────
function Payments() {
  return (
    <section id="pay" className="py-20 sm:py-24 scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
            {SITE_CONTENT.payments.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            {SITE_CONTENT.payments.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SITE_CONTENT.payments.items.map((item, idx) => {
            const IconComponent = PAYMENT_ICONS[item.iconName];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="group shadowx-card rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <IconBadge
                      Icon={IconComponent}
                      accentClass={item.accentClass}
                      size="md"
                    />
                    <span className="text-xs font-medium text-violet-300">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-white mb-2.5">
                    {item.title}
                  </h3>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// ٧) قسم الأسئلة الشائعة (FAQ) — id="faq"
// Accordion يفتح عنصر واحد فقط، مع أيقونة سهم تدور وحركة انسيابية
// ─────────────────────────────────────────────────────────────
function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="py-20 sm:py-24 scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
            {SITE_CONTENT.faq.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            {SITE_CONTENT.faq.subtitle}
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3.5">
          {SITE_CONTENT.faq.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            const contentId = `faq-answer-${idx}`;
            const buttonId = `faq-question-${idx}`;

            return (
              <div
                key={idx}
                className={`rounded-2xl transition-colors duration-200 border ${
                  isOpen
                    ? 'bg-[#14141f] border-[#8b5cf6]/50 shadow-lg shadow-[#3434d9]/15'
                    : 'bg-[#14141f]/80 border-white/[0.08] hover:border-white/20'
                }`}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() => toggleItem(idx)}
                    className="w-full px-6 py-5 text-right flex items-center justify-between gap-4 font-display font-bold text-base sm:text-lg text-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-2xl"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-violet-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                    />
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={contentId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-white/[0.06]">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// ٨) قسم الدعوة الأخيرة (Final CTA)
// ─────────────────────────────────────────────────────────────
function FinalCTA({ onOpenProjectModal }: { onOpenProjectModal: () => void }) {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45 }}
          className="relative rounded-2xl overflow-hidden p-8 sm:p-14 text-center bg-gradient-to-br from-[#3434d9] via-[#4c1d95] to-[#1e1b4b] border border-violet-400/30 shadow-2xl shadow-[#3434d9]/40"
        >
          {/* توهج داخلي */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-violet-400/25 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#3434d9]/40 blur-3xl"
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              {SITE_CONTENT.finalCta.title}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-violet-100/90 leading-relaxed">
              {SITE_CONTENT.finalCta.subtitle}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={onOpenProjectModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-display font-bold text-base bg-white text-[#1e1b4b] hover:bg-violet-50 shadow-xl transition-all duration-200 hover:-translate-y-1 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Send className="w-5 h-5 text-[#3434d9]" />
                <span>{SITE_CONTENT.finalCta.buttonText}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// ٩) التذييل (Footer)
// ─────────────────────────────────────────────────────────────
function Footer({ onOpenInfoModal }: { onOpenInfoModal: (key: string) => void }) {
  return (
    <footer className="border-t border-white/[0.08] bg-[#090910] py-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-white/[0.06]">
          {/* يميناً: الشعار + سطر الفريق البرمجي الرسمي */}
          <div className="flex flex-col items-center md:items-start gap-2.5 text-center md:text-right">
            <BrandLogo />
            <p className="text-sm text-slate-400">
              {SITE_CONTENT.footer.tagline} —{' '}
              <a
                href={SITE_CONTENT.brand.officialStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-400 hover:text-violet-300 underline underline-offset-4 transition-colors"
              >
                shad-vip.store
              </a>
            </p>
          </div>

          {/* روابط التذييل */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-slate-300">
            {SITE_CONTENT.footer.links.map((link) => (
              <a
                key={link.key}
                href={`#${link.key}`}
                onClick={(e) => {
                  e.preventDefault();
                  onOpenInfoModal(link.key);
                }}
                className="hover:text-white transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded px-1 py-0.5"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* حقوق النشر */}
        <div className="pt-8 text-center text-sm text-slate-400">
          {SITE_CONTENT.footer.copyright}
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────
// نافذة طلب مشروع جديد / التواصل عبر تيليجرام (Interactive Modal)
// ─────────────────────────────────────────────────────────────
function ProjectInquiryModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [selectedType, setSelectedType] = useState(SITE_CONTENT.projectModal.projectTypes[0]);
  const [selectedPayments, setSelectedPayments] = useState<string[]>([
    'شام كاش',
    'سيرياتيل كاش',
    'USDT',
  ]);
  const [projectName, setProjectName] = useState('');
  const [contactHandle, setContactHandle] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [submitPulse, setSubmitPulse] = useState(false);
  const [storePulse, setStorePulse] = useState(false);

  const togglePayment = (method: string) => {
    setSelectedPayments((prev) =>
      prev.includes(method) ? prev.filter((m) => m !== method) : [...prev, method]
    );
  };

  const summaryText = `مرحباً فريق ShadowX، أرغب ببناء مشروع جديد:
• نوع المشروع: ${selectedType}
• اسم المتجر المقترح: ${projectName || 'قيد التحديد'}
• بوابات الدفع المطلوبة: ${selectedPayments.join('، ') || 'الكل'}
• معرف التواصل: ${contactHandle || 'مباشر'}`;

  const handleCopySummary = () => {
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitPulse(true);
    setTimeout(() => {
      setSubmitPulse(false);
      setSubmitted(true);
    }, 280);
  };

  const handleStoreClick = () => {
    setStorePulse(true);
    setTimeout(() => setStorePulse(false), 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.18 }}
            className="relative w-full max-w-xl rounded-2xl bg-[#14141f] border border-white/15 p-6 sm:p-8 shadow-2xl text-right max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-[#8b5cf6]" />
                <h3
                  id="project-modal-title"
                  className="font-display font-bold text-xl text-white"
                >
                  {SITE_CONTENT.projectModal.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="إغلاق النافذة"
                className="w-9 h-9 rounded-2xl bg-white/[0.05] hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="mt-5 space-y-5">
                <p className="text-sm text-slate-300 leading-relaxed">
                  {SITE_CONTENT.projectModal.subtitle}
                </p>

                <div>
                  <label className="block text-sm font-bold text-slate-200 mb-2">
                    نوع النظام المطلوب:
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {SITE_CONTENT.projectModal.projectTypes.map((type) => (
                      <motion.button
                        key={type}
                        type="button"
                        whileTap={{ scale: 0.985 }}
                        onClick={() => setSelectedType(type)}
                        className={`w-full text-right px-4 py-3 rounded-2xl text-sm font-medium border transition-all cursor-pointer flex items-center justify-between ${
                          selectedType === type
                            ? 'bg-[#3434d9]/25 border-[#8b5cf6] text-white'
                            : 'bg-[#0b0b14]/60 border-white/[0.08] text-slate-300 hover:border-white/20'
                        }`}
                      >
                        <span>{type}</span>
                        {selectedType === type && (
                          <motion.span
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.16 }}
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          </motion.span>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-200 mb-2">
                    بوابات الدفع التلقائي المطلوبة:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SITE_CONTENT.projectModal.paymentOptions.map((method) => {
                      const active = selectedPayments.includes(method);
                      return (
                        <motion.button
                          key={method}
                          type="button"
                          whileTap={{ scale: 0.93 }}
                          onClick={() => togglePayment(method)}
                          className={`px-3.5 py-2 rounded-2xl text-xs font-bold border transition-all cursor-pointer ${
                            active
                              ? 'bg-[#3434d9] border-[#8b5cf6] text-white shadow-sm shadow-[#3434d9]/40'
                              : 'bg-[#0b0b14]/60 border-white/[0.08] text-slate-400 hover:text-white'
                          }`}
                        >
                          {method}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="store-name-input"
                      className="block text-xs font-bold text-slate-300 mb-1.5"
                    >
                      اسم المتجر أو المشروع (اختياري)
                    </label>
                    <input
                      id="store-name-input"
                      type="text"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      placeholder="مثال: متجر الشحن السريع"
                      className="w-full px-4 py-2.5 rounded-2xl bg-[#0b0b14] border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#8b5cf6]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="telegram-handle-input"
                      className="block text-xs font-bold text-slate-300 mb-1.5"
                    >
                      معرّف تيليجرام أو رقم التواصل
                    </label>
                    <input
                      id="telegram-handle-input"
                      type="text"
                      required
                      value={contactHandle}
                      onChange={(e) => setContactHandle(e.target.value)}
                      placeholder="اكتب معرّف تيليجرام أو رقمك"
                      className="w-full px-4 py-2.5 rounded-2xl bg-[#0b0b14] border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#8b5cf6]"
                    />
                  </div>
                </div>

                {/* زر إرسال طلب المشروع عبر تيليجرام مع تأثير نبض وتغير لون الأيقونة */}
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.96 }}
                  className={`relative overflow-hidden w-full py-3.5 px-6 rounded-2xl font-display font-bold text-base text-white bg-gradient-to-l from-[#3434d9] to-[#7c3aed] hover:from-[#3e3ee8] hover:to-[#8b5cf6] shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2.5 ${
                    submitPulse
                      ? 'ring-4 ring-emerald-400/40 shadow-emerald-500/30'
                      : 'shadow-[#3434d9]/30'
                  }`}
                >
                  <AnimatePresence>
                    {submitPulse && (
                      <motion.span
                        aria-hidden="true"
                        initial={{ scale: 0.6, opacity: 0.7 }}
                        animate={{ scale: 2.2, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="pointer-events-none absolute inset-0 rounded-2xl bg-emerald-400/25"
                      />
                    )}
                  </AnimatePresence>

                  <Send
                    className={`w-4 h-4 transition-all duration-200 ${
                      submitPulse
                        ? 'text-emerald-300 scale-125 -translate-x-1 -translate-y-0.5'
                        : 'text-white'
                    }`}
                  />
                  <span>{SITE_CONTENT.projectModal.submitButton}</span>
                </motion.button>
              </form>
            ) : (
              <div className="mt-6 space-y-5">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 text-sm leading-relaxed flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{SITE_CONTENT.projectModal.successMessage}</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#0b0b14] border border-white/10 text-xs sm:text-sm text-slate-200 whitespace-pre-line leading-relaxed">
                  {summaryText}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  {/* زر النسخ مع تأثير نبض وتغيير لون الأيقونة مؤقتاً */}
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopySummary}
                    className={`relative overflow-hidden w-full sm:w-auto flex-1 py-3 px-5 rounded-2xl font-bold text-sm text-white transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                      copied
                        ? 'bg-gradient-to-l from-emerald-600 to-teal-600 ring-4 ring-emerald-400/35 shadow-lg shadow-emerald-500/25'
                        : 'bg-gradient-to-l from-[#3434d9] to-[#7c3aed] hover:from-[#3f3fe6] hover:to-[#8b5cf6] shadow-lg shadow-[#3434d9]/25'
                    }`}
                  >
                    <AnimatePresence>
                      {copied && (
                        <motion.span
                          aria-hidden="true"
                          initial={{ scale: 0.5, opacity: 0.75 }}
                          animate={{ scale: 2.4, opacity: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.55 }}
                          className="pointer-events-none absolute inset-0 rounded-2xl bg-emerald-300/30"
                        />
                      )}
                    </AnimatePresence>

                    <AnimatePresence mode="wait" initial={false}>
                      {copied ? (
                        <motion.span
                          key="copied"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: [1, 1.25, 1], opacity: 1 }}
                          exit={{ scale: 0.5, opacity: 0 }}
                          transition={{ duration: 0.22 }}
                          className="inline-flex items-center gap-2"
                        >
                          <Check className="w-4 h-4 text-emerald-200 stroke-[2.5]" />
                          <span>تم نسخ تفاصيل المشروع</span>
                        </motion.span>
                      ) : (
                        <motion.span
                          key="copy"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          transition={{ duration: 0.16 }}
                          className="inline-flex items-center gap-2"
                        >
                          <Copy className="w-4 h-4 text-violet-200" />
                          <span>نسخ ملخص المشروع للتواصل</span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  {/* زر التواصل / زيارة المنصة مع تأثير نبض وتغير لون السهم */}
                  <motion.a
                    href={SITE_CONTENT.brand.officialStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{ scale: 0.95 }}
                    onClick={handleStoreClick}
                    className={`w-full sm:w-auto py-3 px-5 rounded-2xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 border ${
                      storePulse
                        ? 'bg-violet-500/20 border-emerald-400/60 text-white ring-4 ring-emerald-400/25'
                        : 'text-slate-200 bg-white/[0.06] border-white/10 hover:bg-white/10 hover:border-violet-400/40'
                    }`}
                  >
                    <span>زيارة shad-vip.store</span>
                    <ArrowLeft
                      className={`w-4 h-4 transition-all duration-200 ${
                        storePulse
                          ? 'text-emerald-400 scale-125 -translate-x-1'
                          : 'text-violet-400'
                      }`}
                    />
                  </motion.a>
                </div>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                >
                  تعديل بيانات الطلب
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────
// نافذة روابط التذييل (سياسة الخصوصية، الشروط، توثيق API، الدعم)
// ─────────────────────────────────────────────────────────────
function FooterInfoModal({
  modalKey,
  onClose,
  onOpenProjectModal,
}: {
  modalKey: string | null;
  onClose: () => void;
  onOpenProjectModal: () => void;
}) {
  const [ctaPulse, setCtaPulse] = useState(false);

  const content: ModalLinkContent | undefined = modalKey
    ? SITE_CONTENT.footerModals[modalKey]
    : undefined;

  const handleStartFromInfo = () => {
    setCtaPulse(true);
    setTimeout(() => {
      setCtaPulse(false);
      onClose();
      onOpenProjectModal();
    }, 240);
  };

  return (
    <AnimatePresence>
      {content && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="footer-info-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.18 }}
            className="relative w-full max-w-lg rounded-2xl bg-[#14141f] border border-white/15 p-6 sm:p-8 shadow-2xl text-right"
          >
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
              <h3 id="footer-info-title" className="font-display font-bold text-xl text-white">
                {content.title}
              </h3>
              <button
                type="button"
                onClick={onClose}
                aria-label="إغلاق النافذة"
                className="w-9 h-9 rounded-2xl bg-white/[0.05] hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="mt-4 text-sm text-violet-300 font-medium">{content.subtitle}</p>

            <ul className="mt-5 space-y-3">
              {content.points.map((point, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-sm sm:text-base text-slate-300 leading-relaxed"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#8b5cf6] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
              <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={handleStartFromInfo}
                className={`relative overflow-hidden inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-l from-[#3434d9] to-[#7c3aed] transition-all cursor-pointer ${
                  ctaPulse ? 'ring-4 ring-emerald-400/40 shadow-lg shadow-emerald-500/30' : ''
                }`}
              >
                <Rocket
                  className={`w-4 h-4 transition-all duration-200 ${
                    ctaPulse ? 'text-emerald-300 scale-125 -translate-y-0.5' : 'text-violet-200'
                  }`}
                />
                <span>ابدأ مشروعك الآن</span>
              </motion.button>
              <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="px-4 py-2.5 rounded-2xl text-sm font-medium text-slate-300 hover:text-white bg-white/[0.05] cursor-pointer"
              >
                إغلاق
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────
// التطبيق الرئيسي (App) — يجمع الأقسام بالترتيب المطلوب بالضبط:
// Navbar -> Hero (+ Stats) -> Features -> HowItWorks -> Payments -> FAQ -> FinalCTA -> Footer
// ─────────────────────────────────────────────────────────────
export default function App() {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [infoModalKey, setInfoModalKey] = useState<string | null>(null);

  return (
    <div dir="rtl" className="min-h-screen bg-[#0b0b14] text-slate-100 flex flex-col">
      <Navbar onOpenProjectModal={() => setProjectModalOpen(true)} />

      <main className="flex-1">
        <Hero onOpenProjectModal={() => setProjectModalOpen(true)} />
        <Features />
        <HowItWorks />
        <Payments />
        <FAQ />
        <FinalCTA onOpenProjectModal={() => setProjectModalOpen(true)} />
      </main>

      <Footer onOpenInfoModal={(key) => setInfoModalKey(key)} />

      {/* النوافذ التفاعلية للأزرار والروابط */}
      <ProjectInquiryModal
        isOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      />
      <FooterInfoModal
        modalKey={infoModalKey}
        onClose={() => setInfoModalKey(null)}
        onOpenProjectModal={() => setProjectModalOpen(true)}
      />
    </div>
  );
}
