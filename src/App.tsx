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
  MessageCircle,
  Phone,
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
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
// شريط تقدم التمرير العلوي (Scroll Progress Bar)
// يمتلئ بالتدرج اللوني الأساسي كلما مرّر المستخدم لأسفل الصفحة
// ─────────────────────────────────────────────────────────────
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 inset-x-0 z-50 h-[3px] bg-white/[0.03]"
    >
      <motion.div
        style={{ scaleX }}
        className="h-full w-full origin-right bg-gradient-to-l from-[#3434d9] via-[#7c3aed] to-[#c084fc] shadow-[0_0_12px_rgba(139,92,246,0.85)]"
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// مكوّن الشعار الموحّد (BrandLogo)
// يعرض صورة الاسم بالكامل (SHADOWX) كشعار رئيسي للموقع (بمحاذاة دقيقة داخل h-14 على الموبايل)
// ─────────────────────────────────────────────────────────────
function BrandLogo() {
  const [wordmarkError, setWordmarkError] = useState(false);

  return (
    <a
      href="#"
      aria-label="العودة إلى أعلى صفحة ShadowX"
      className="inline-flex items-center justify-center h-9 sm:h-12 whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5cf6] rounded-xl sm:rounded-2xl"
    >
      {!wordmarkError ? (
        <div className="h-7 sm:h-11 w-25 sm:w-42 flex items-center justify-center overflow-hidden">
          <img
            src={SITE_CONTENT.brand.wordmarkLogo}
            alt={SITE_CONTENT.brand.name}
            referrerPolicy="no-referrer"
            onError={() => setWordmarkError(true)}
            className="w-full h-full object-cover object-center scale-[1.22] sm:scale-125 transition-transform duration-200 group-hover:scale-[1.3]"
          />
        </div>
      ) : (
        <span
          dir="ltr"
          className="font-display font-extrabold text-base sm:text-xl leading-none tracking-tight text-white group-hover:text-violet-200 transition-colors"
        >
          Sʜᴀᴅᴏᴡ<span className="text-[#8b5cf6]">𝐗</span>
        </span>
      )}
    </a>
  );
}

// ─────────────────────────────────────────────────────────────
// ١) شريط التنقل (Navbar) — ثابت (sticky) بخلفية زجاجية blur
// مضبوط بارتفاع 14 وحدة (h-14 / 56px) على الموبايل مع محاذاة مركزية مثالية للعناصر
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
    <header className="sticky top-0 z-40 w-full bg-[#0b0b14]/85 backdrop-blur-xl border-b border-white/[0.08]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-14 sm:h-20 flex items-center justify-between gap-3 sm:gap-8">
        {/* الجهة الأولى (يميناً): زر القائمة الجانبية للموبايل + زر "ابدأ مشروعك" */}
        <div className="flex items-center gap-2 sm:gap-3 h-full shrink-0">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={SITE_CONTENT.navbar.mobileMenuAriaLabel}
            className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-xl bg-[#14141f] border border-white/[0.08] text-slate-200 hover:text-white hover:border-violet-500/40 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 stroke-[2.2]" /> : <Menu className="w-4 h-4 stroke-[2.2]" />}
          </button>

          <button
            type="button"
            onClick={onOpenProjectModal}
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 h-9 sm:h-auto px-3.5 sm:px-5 sm:py-2.5 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm leading-none text-white bg-gradient-to-l from-[#3434d9] to-[#7c3aed] hover:from-[#3e3ee8] hover:to-[#8b5cf6] shadow-md sm:shadow-lg shadow-[#3434d9]/30 transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            <Rocket className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2] shrink-0" />
            <span>{SITE_CONTENT.navbar.ctaText}</span>
          </button>
        </div>

        {/* وسط: روابط تمرير سلس */}
        <nav
          aria-label="التنقل الرئيسي"
          className="hidden md:flex items-center gap-8 text-base font-medium text-slate-300 h-full"
        >
          {SITE_CONTENT.navbar.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex items-center whitespace-nowrap shrink-0 py-1 hover:text-white relative after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-0 after:h-[2px] after:bg-gradient-to-l after:from-[#3434d9] after:to-[#8b5cf6] hover:after:w-full after:transition-all after:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5cf6] rounded"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* الجهة المقابلة (يساراً): الشعار بمحاذاة عمودية متكافئة */}
        <div className="flex items-center h-full shrink-0">
          <BrandLogo />
        </div>
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
            className="md:hidden bg-[#14141f]/95 backdrop-blur-xl border-b border-white/[0.08] px-4 pt-2.5 pb-5"
          >
            <nav aria-label="قائمة الموبايل" className="flex flex-col gap-1.5">
              {SITE_CONTENT.navbar.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:text-white hover:bg-white/[0.05] transition-colors"
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
                className="mt-2 w-full py-3 px-5 rounded-xl font-bold text-sm text-center text-white bg-gradient-to-l from-[#3434d9] to-[#7c3aed] shadow-lg shadow-[#3434d9]/30 cursor-pointer flex items-center justify-center gap-2"
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
// متغيرات الحركة التدريجية المتتابعة عند التمرير (Staggered Scroll Fade-Up Variants)
// ─────────────────────────────────────────────────────────────
const SECTION_FADE_UP_VARIANTS = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1] as const,
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const STAGGER_CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const FADE_UP_ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

// ─────────────────────────────────────────────────────────────
// ٢) شريط الإحصائيات (Stats) — مع ظهور تدريجي متتابع لكل بطاقة إحصائية
// ─────────────────────────────────────────────────────────────
function Stats() {
  return (
    <motion.div
      variants={STAGGER_CONTAINER_VARIANTS}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
    >
      {STATS_DATA.map((stat, idx) => {
        const StatIcon = STAT_ICONS[idx % STAT_ICONS.length];
        return (
          <motion.div
            key={idx}
            variants={FADE_UP_ITEM_VARIANTS}
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
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// ٣) قسم البطل (Hero) — مع تأثير ظهور انسيابي للكلمات (Reveal Animation)
// ─────────────────────────────────────────────────────────────
const heroTitleWords = SITE_CONTENT.hero.titlePrefix.split(' ');
const heroSubtitleWords = SITE_CONTENT.hero.subtitle.split(' ');

function Hero({ onOpenProjectModal }: { onOpenProjectModal: () => void }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative pt-14 pb-20 sm:pt-20 sm:pb-28 overflow-hidden"
    >
      {/* تأثير توهج (glow) خلف قسم الـ Hero بتدرج دائري blur من اللون الأساسي */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] sm:w-[680px] sm:h-[420px] rounded-full bg-gradient-to-tr from-[#3434d9]/35 via-[#6d28d9]/25 to-transparent blur-[110px] -z-10"
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* ١. شارة صغيرة أعلى العنوان مع حركة كشف ناعمة */}
          <motion.div
            initial={{ opacity: 0, y: -14, scale: 0.94, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#14141f] border border-white/[0.08] text-violet-300 text-sm font-medium mb-7 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-[#8b5cf6] shrink-0" />
            <span>{SITE_CONTENT.hero.badge}</span>
          </motion.div>

          {/* ٢. العنوان الرئيسي H1 ضخم مع ظهور متدرج للكلمات (Staggered Word Reveal) */}
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.085,
                  delayChildren: 0.12,
                },
              },
            }}
            style={{ textWrap: 'balance' }}
            className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl leading-[1.26] tracking-tight text-white flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-3.5 gap-y-2"
          >
            {heroTitleWords.map((word, idx) => (
              <motion.span
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    transition: {
                      duration: 0.52,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  },
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}

            {/* الكلمة الأخيرة بتدرج لوني وتأثير بروز خاص */}
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 24, scale: 0.9, filter: 'blur(8px)' },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: 'blur(0px)',
                  transition: {
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  },
                },
              }}
              className="inline-block bg-gradient-to-l from-[#3434d9] via-[#7c3aed] to-[#c084fc] bg-clip-text text-transparent"
            >
              {SITE_CONTENT.hero.titleHighlight}
            </motion.span>
          </motion.h1>

          {/* ٣. النص الفرعي مع ظهور انسيابي متسلسل للكلمات */}
          <motion.p
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.025,
                  delayChildren: 0.55,
                },
              },
            }}
            className="mt-6 text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto font-normal flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1"
          >
            {heroSubtitleWords.map((word, idx) => (
              <motion.span
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    transition: {
                      duration: 0.38,
                      ease: 'easeOut',
                    },
                  },
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </motion.p>

          {/* ٤. الأزرار الثلاثة تظهر بتتابع ناعم بعد اكتمال العنوان */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
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
          </motion.div>
        </div>

        {/* شريط الإحصائيات أسفل الأزرار */}
        <Stats />
      </div>
    </motion.section>
  );
}

// ─────────────────────────────────────────────────────────────
// بطاقة ميزة تفاعلية مع إضاءة خلفية بنفسجية ناعمة عند المرور (Hover)
// وظهور تدريجي متتابع (Fade-up) ضمن شبكة المزايا
// ─────────────────────────────────────────────────────────────
function FeatureCard({
  feature,
}: {
  feature: FeatureItem;
  index: number;
}) {
  const IconComponent = FEATURE_ICONS[feature.iconName];
  const [mousePos, setMousePos] = useState({ x: 180, y: 120 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.article
      variants={FADE_UP_ITEM_VARIANTS}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden shadowx-card rounded-2xl p-7 flex flex-col justify-between"
    >
      {/* ١. هالة إضاءة خلفية بنفسجية ناعمة تضيء البطاقة عند المرور وتتلاشى عند الخروج */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
        style={{
          background: `radial-gradient(380px circle at ${mousePos.x}px ${mousePos.y}px, rgba(139, 92, 246, 0.22), rgba(52, 52, 217, 0.10) 45%, transparent 80%)`,
        }}
      />

      {/* ٢. توهج خلفي محيطي ناعم أعلى البطاقة يتلاشى بسلاسة */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -top-20 -right-20 w-52 h-52 rounded-full bg-gradient-to-br from-[#8b5cf6]/25 via-[#3434d9]/20 to-transparent blur-3xl transition-opacity duration-500 ease-out ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* ٣. خط بريق علوي رفيع يظهر بنعومة عند الـ Hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-8 h-[1px] bg-gradient-to-l from-transparent via-violet-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      <div className="relative z-10">
        {/* أيقونة مطوّرة داخل حاوية متوهجة */}
        <div className="mb-6">
          <IconBadge
            Icon={IconComponent}
            accentClass={feature.accentClass}
            size="lg"
          />
        </div>

        {/* عنوان H3 */}
        <h3 className="font-display font-bold text-xl text-white group-hover:text-violet-100 transition-colors duration-300 mb-3">
          {feature.title}
        </h3>

        {/* وصف البطاقة */}
        <p className="text-slate-300 group-hover:text-slate-200 transition-colors duration-300 text-base leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────
// ٤) قسم المزايا (Features) — id="features"
// مع ظهور تدريجي متتابع (Fade-up) للقسم والبطاقات عند التمرير
// ─────────────────────────────────────────────────────────────
function Features() {
  return (
    <motion.section
      id="features"
      variants={SECTION_FADE_UP_VARIANTS}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      className="py-20 sm:py-24 scroll-mt-14 sm:scroll-mt-20 relative"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          variants={FADE_UP_ITEM_VARIANTS}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
            {SITE_CONTENT.features.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            {SITE_CONTENT.features.subtitle}
          </p>
        </motion.div>

        {/* شبكة بطاقات: 3 أعمدة ديسكتوب / 2 تابلت / 1 موبايل مع تتابع Fade-up */}
        <motion.div
          variants={STAGGER_CONTAINER_VARIANTS}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SITE_CONTENT.features.items.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

// ─────────────────────────────────────────────────────────────
// ٥) قسم "كيف نعمل؟" (HowItWorks) — id="how"
// يتضمن خطاً تفاعلياً بين الخطوات + ظهور تدريجي متتابع (Fade-up) عند التمرير
// ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const [isLineHovered, setIsLineHovered] = useState(false);
  const [hoveredStepIdx, setHoveredStepIdx] = useState<number | null>(null);

  return (
    <motion.section
      id="how"
      variants={SECTION_FADE_UP_VARIANTS}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="py-20 sm:py-24 scroll-mt-14 sm:scroll-mt-20 relative"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          variants={FADE_UP_ITEM_VARIANTS}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
            {SITE_CONTENT.howItWorks.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            {SITE_CONTENT.howItWorks.subtitle}
          </p>
        </motion.div>

        {/* 4 خطوات أفقية مرقّمة متصلة بخط تفاعلي على الديسكتوب، وعمودية على الموبايل */}
        <motion.div
          variants={STAGGER_CONTAINER_VARIANTS}
          className="relative grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {/* الخط الأفقي التفاعلي الواصل بين الخطوات على الديسكتوب */}
          <div
            onMouseEnter={() => setIsLineHovered(true)}
            onMouseLeave={() => setIsLineHovered(false)}
            title="مرّر هنا لتنشيط مسار العمل"
            className="hidden lg:flex items-center absolute top-6 right-[8%] left-[8%] h-12 z-20 cursor-pointer group/line"
          >
            {/* المسار الأساسي للخط الواصل */}
            <div
              className={`w-full rounded-full transition-all duration-300 relative overflow-hidden ${
                isLineHovered || hoveredStepIdx !== null
                  ? 'h-[4px] bg-gradient-to-l from-[#3434d9] via-[#a855f7] to-[#3434d9] shadow-[0_0_20px_rgba(139,92,246,0.85)]'
                  : 'h-[2px] bg-gradient-to-l from-[#3434d9] via-[#7c3aed] to-[#3434d9]/40'
              }`}
            >
              {/* نبض ضوئي متحرك على طول الخط الواصل */}
              <motion.div
                animate={{ x: ['100%', '-100%'] }}
                transition={{
                  duration: isLineHovered ? 1.4 : 3.2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="w-1/3 h-full bg-gradient-to-l from-transparent via-white to-transparent opacity-80"
              />
            </div>
          </div>

          {/* الخط العمودي التفاعلي على الموبايل والتابلت */}
          <div
            onMouseEnter={() => setIsLineHovered(true)}
            onMouseLeave={() => setIsLineHovered(false)}
            className="lg:hidden absolute top-10 bottom-10 left-1/2 -translate-x-1/2 w-8 z-0 flex justify-center cursor-pointer"
          >
            <div
              className={`h-full transition-all duration-300 rounded-full ${
                isLineHovered
                  ? 'w-[3px] bg-gradient-to-b from-[#3434d9] via-[#a855f7] to-[#3434d9] shadow-[0_0_16px_rgba(139,92,246,0.8)]'
                  : 'w-[2px] bg-gradient-to-b from-[#3434d9]/60 via-[#7c3aed]/50 to-transparent'
              }`}
            />
          </div>

          {SITE_CONTENT.howItWorks.steps.map((step, idx) => {
            const StepIcon = STEP_ICONS[step.iconName];
            const isCardTriggered = isLineHovered || hoveredStepIdx === idx;

            return (
              <motion.div
                key={idx}
                variants={FADE_UP_ITEM_VARIANTS}
                className="relative z-10 flex"
              >
                <motion.div
                  animate={
                    isLineHovered
                      ? {
                          scale: 1.035,
                          y: -5,
                          rotate: [0, -0.8, 0.8, -0.4, 0],
                        }
                      : hoveredStepIdx === idx
                        ? {
                            scale: 1.03,
                            y: -5,
                            rotate: [0, -0.6, 0.6, 0],
                          }
                        : {
                            scale: 1,
                            y: 0,
                            rotate: 0,
                          }
                  }
                  transition={{
                    duration: 0.35,
                    delay: isLineHovered ? idx * 0.04 : 0,
                    ease: 'easeOut',
                  }}
                  onMouseEnter={() => setHoveredStepIdx(idx)}
                  onMouseLeave={() => setHoveredStepIdx(null)}
                  className={`group relative w-full flex flex-col items-center text-center shadowx-card rounded-2xl p-7 ${
                    isCardTriggered
                      ? 'border-[#8b5cf6]/65 shadow-[0_16px_38px_-10px_rgba(139,92,246,0.38)]'
                      : ''
                  }`}
                >
                  {/* توهج خلفي خفيف داخل البطاقة عند تنشيط الخط الواصل */}
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-[#8b5cf6]/12 via-transparent to-transparent transition-opacity duration-300 ${
                      isCardTriggered ? 'opacity-100' : 'opacity-0'
                    }`}
                  />

                  {/* دائرة الأيقونة مع شارة الرقم */}
                  <motion.div
                    animate={
                      isCardTriggered
                        ? {
                            scale: [1, 1.12, 1.06],
                            rotate: [0, -5, 5, 0],
                          }
                        : { scale: 1, rotate: 0 }
                    }
                    transition={{ duration: 0.35 }}
                    className="relative z-20 mb-5"
                  >
                    <div
                      className={`w-15 h-15 rounded-2xl bg-gradient-to-br from-[#3434d9] to-[#8b5cf6] text-white flex items-center justify-center shadow-lg border-4 border-[#0b0b14] transition-all duration-200 ${
                        isCardTriggered
                          ? 'shadow-[#8b5cf6]/60 ring-2 ring-violet-400/50'
                          : 'shadow-[#3434d9]/40'
                      }`}
                    >
                      <StepIcon className="w-6 h-6 stroke-[2]" />
                    </div>
                    <span
                      className={`absolute -top-2 -right-2 w-6 h-6 rounded-full border font-display font-bold text-xs flex items-center justify-center tabular-nums transition-colors duration-200 ${
                        isCardTriggered
                          ? 'bg-[#8b5cf6] border-white/60 text-white shadow-sm shadow-violet-400/50'
                          : 'bg-[#14141f] border-violet-400/50 text-violet-200'
                      }`}
                    >
                      {step.number}
                    </span>
                  </motion.div>

                  <h3 className="relative z-10 font-display font-bold text-xl text-white group-hover:text-violet-100 transition-colors mb-2.5">
                    {step.title}
                  </h3>

                  <p className="relative z-10 text-slate-300 text-sm sm:text-base leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}

// ─────────────────────────────────────────────────────────────
// ٦) قسم طرق الدفع (Payments) — id="pay"
// مع ظهور تدريجي متتابع (Fade-up) عند التمرير
// ─────────────────────────────────────────────────────────────
function Payments() {
  return (
    <motion.section
      id="pay"
      variants={SECTION_FADE_UP_VARIANTS}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="py-20 sm:py-24 scroll-mt-14 sm:scroll-mt-20"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          variants={FADE_UP_ITEM_VARIANTS}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
            {SITE_CONTENT.payments.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            {SITE_CONTENT.payments.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={STAGGER_CONTAINER_VARIANTS}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {SITE_CONTENT.payments.items.map((item) => {
            const IconComponent = PAYMENT_ICONS[item.iconName];
            return (
              <motion.div
                key={item.id}
                variants={FADE_UP_ITEM_VARIANTS}
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
        </motion.div>
      </div>
    </motion.section>
  );
}

// ─────────────────────────────────────────────────────────────
// ٧) قسم الأسئلة الشائعة (FAQ) — id="faq"
// Accordion يفتح عنصر واحد فقط، مع ظهور تدريجي متتابع (Fade-up) لكل سؤال عند التمرير
// ─────────────────────────────────────────────────────────────
function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <motion.section
      id="faq"
      variants={SECTION_FADE_UP_VARIANTS}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      className="py-20 sm:py-24 scroll-mt-14 sm:scroll-mt-20"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          variants={FADE_UP_ITEM_VARIANTS}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
            {SITE_CONTENT.faq.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            {SITE_CONTENT.faq.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={STAGGER_CONTAINER_VARIANTS}
          className="max-w-3xl mx-auto space-y-3.5"
        >
          {SITE_CONTENT.faq.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            const contentId = `faq-answer-${idx}`;
            const buttonId = `faq-question-${idx}`;

            return (
              <motion.div
                key={idx}
                variants={FADE_UP_ITEM_VARIANTS}
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
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}

// ─────────────────────────────────────────────────────────────
// ٨) قسم الدعوة الأخيرة (Final CTA) — مع ظهور تدريجي متتابع (Fade-up)
// ─────────────────────────────────────────────────────────────
function FinalCTA({ onOpenProjectModal }: { onOpenProjectModal: () => void }) {
  return (
    <motion.section
      variants={SECTION_FADE_UP_VARIANTS}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="py-16 sm:py-24"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          variants={FADE_UP_ITEM_VARIANTS}
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

          <motion.div
            variants={STAGGER_CONTAINER_VARIANTS}
            className="relative z-10 max-w-2xl mx-auto"
          >
            <motion.h2
              variants={FADE_UP_ITEM_VARIANTS}
              className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight"
            >
              {SITE_CONTENT.finalCta.title}
            </motion.h2>
            <motion.p
              variants={FADE_UP_ITEM_VARIANTS}
              className="mt-4 text-base sm:text-lg text-violet-100/90 leading-relaxed"
            >
              {SITE_CONTENT.finalCta.subtitle}
            </motion.p>

            <motion.div
              variants={FADE_UP_ITEM_VARIANTS}
              className="mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3.5"
            >
              <a
                href={SITE_CONTENT.brand.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl font-display font-bold text-base bg-white text-[#1e1b4b] hover:bg-violet-50 shadow-xl transition-all duration-200 hover:-translate-y-1 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Send className="w-5 h-5 text-[#3434d9]" />
                <span>{SITE_CONTENT.finalCta.buttonText}</span>
              </a>

              <a
                href={SITE_CONTENT.brand.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl font-display font-bold text-base bg-emerald-500/20 hover:bg-emerald-500/30 text-white border border-emerald-400/40 shadow-xl transition-all duration-200 hover:-translate-y-1 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                <MessageCircle className="w-5 h-5 text-emerald-300" />
                <span>{SITE_CONTENT.finalCta.whatsappButtonText}</span>
              </a>

              <button
                type="button"
                onClick={onOpenProjectModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-display font-bold text-sm bg-white/10 hover:bg-white/15 text-violet-100 border border-white/20 transition-all duration-200 hover:-translate-y-1 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Sparkles className="w-4 h-4 text-violet-200" />
                <span>طلب مشروع مخصّص</span>
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
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
          {/* يميناً: الشعار + سطر الفريق البرمجي الرسمي + قنوات التواصل */}
          <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-right">
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
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1">
              <a
                href={SITE_CONTENT.brand.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-[#3434d9]/20 border border-white/[0.08] hover:border-violet-400/40 text-xs font-medium text-slate-300 hover:text-white transition-all"
              >
                <Send className="w-3.5 h-3.5 text-violet-400" />
                <span>قناة تيليجرام الرسمية</span>
              </a>
              <a
                href={SITE_CONTENT.brand.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-emerald-500/15 border border-white/[0.08] hover:border-emerald-400/40 text-xs font-medium text-slate-300 hover:text-white transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>واتساب:</span>
                <span dir="ltr" className="font-mono text-emerald-300">
                  {SITE_CONTENT.brand.whatsappNumber}
                </span>
              </a>
            </div>
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
// نافذة طلب مشروع جديد / التواصل عبر تيليجرام وواتساب (Interactive Modal)
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

  const whatsappDirectUrl = `${SITE_CONTENT.brand.whatsappUrl}?text=${encodeURIComponent(summaryText)}`;

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

                {/* روابط تواصل سريعة مباشرة */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 border-t border-white/[0.06]">
                  <span>أو تواصل معنا مباشرة:</span>
                  <div className="flex items-center gap-3">
                    <a
                      href={SITE_CONTENT.brand.telegramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-violet-300 hover:text-white transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>تيليجرام</span>
                    </a>
                    <span className="text-white/20">|</span>
                    <a
                      href={SITE_CONTENT.brand.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-emerald-300 hover:text-white transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span dir="ltr">{SITE_CONTENT.brand.whatsappNumber}</span>
                    </a>
                  </div>
                </div>
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

                {/* أزرار الإرسال المباشر عبر واتساب وتيليجرام */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <motion.a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{ scale: 0.96 }}
                    className="py-3 px-4 rounded-2xl font-bold text-sm text-white bg-gradient-to-l from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-100" />
                    <span>إرسال الطلب عبر واتساب</span>
                  </motion.a>

                  <motion.a
                    href={SITE_CONTENT.brand.telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{ scale: 0.96 }}
                    className="py-3 px-4 rounded-2xl font-bold text-sm text-white bg-gradient-to-l from-[#3434d9] to-[#7c3aed] hover:from-[#3f3fe6] hover:to-[#8b5cf6] shadow-lg shadow-[#3434d9]/25 flex items-center justify-center gap-2 transition-all"
                  >
                    <Send className="w-4 h-4 text-violet-100" />
                    <span>فتح قناة تيليجرام</span>
                  </motion.a>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  {/* زر النسخ مع تأثير نبض وتغيير لون الأيقونة مؤقتاً */}
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopySummary}
                    className={`relative overflow-hidden w-full sm:w-auto flex-1 py-3 px-5 rounded-2xl font-bold text-sm text-white transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border ${
                      copied
                        ? 'bg-emerald-500/20 border-emerald-400/50 ring-4 ring-emerald-400/25'
                        : 'bg-white/[0.06] border-white/10 hover:bg-white/10'
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
                          className="pointer-events-none absolute inset-0 rounded-2xl bg-emerald-300/20"
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
                          <Check className="w-4 h-4 text-emerald-300 stroke-[2.5]" />
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
                          <Copy className="w-4 h-4 text-violet-300" />
                          <span>نسخ ملخص المشروع</span>
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
// مؤشر التحميل المخصّص لشعار Sʜᴀᴅᴏᴡ𝐗 بنبض وتأثير توهج دوراني
// ─────────────────────────────────────────────────────────────
function SectionsSkeleton() {
  const [emblemError, setEmblemError] = useState(false);

  return (
    <motion.div
      key="shadowx-brand-loader"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98, filter: 'blur(6px)' }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      role="status"
      aria-live="polite"
      aria-label="جاري تحميل موقع ShadowX"
      className="relative z-10 flex-1 min-h-[75vh] flex flex-col items-center justify-center px-4 py-16 overflow-hidden"
    >
      {/* هالة خلفية متوهجة بنبض مستمر */}
      <motion.div
        aria-hidden="true"
        animate={{
          scale: [1, 1.22, 1],
          opacity: [0.35, 0.65, 0.35],
        }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-[#3434d9]/40 via-[#7c3aed]/30 to-transparent blur-[95px]"
      />

      {/* الحاوية الدائرية للتوهج الدوراني والشعار */}
      <div className="relative flex items-center justify-center w-36 h-36 sm:w-44 sm:h-44 mb-8">
        {/* ١. حلقة التوهج الدوراني الخارجية (Conic Gradient Rotating Glow) */}
        <motion.div
          aria-hidden="true"
          animate={{ rotate: 360 }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full p-[2px]"
          style={{
            background:
              'conic-gradient(from 0deg, transparent 0%, rgba(52,52,217,0.2) 25%, #8b5cf6 65%, #c084fc 85%, transparent 100%)',
          }}
        >
          <div className="w-full h-full rounded-full bg-[#0b0b14]" />
        </motion.div>

        {/* ٢. هالة ضوئية دورانية ناعمة خلف الحلقة */}
        <motion.div
          aria-hidden="true"
          animate={{ rotate: -360 }}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'linear' }}
          className="absolute -inset-2 rounded-full opacity-75 blur-md pointer-events-none"
          style={{
            background:
              'conic-gradient(from 180deg, transparent 0%, rgba(139,92,246,0.45) 50%, rgba(52,52,217,0.55) 85%, transparent 100%)',
          }}
        />

        {/* ٣. مدار متقطع يدور بالاتجاه المعاكس */}
        <motion.div
          aria-hidden="true"
          animate={{ rotate: -360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-3 rounded-full border border-dashed border-violet-400/35"
        />

        {/* ٤. قلب الشعار النابض */}
        <motion.div
          animate={{
            scale: [0.95, 1.06, 0.95],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#14141f] via-[#1c1c32] to-[#0b0b14] border border-violet-500/30 shadow-[0_0_40px_rgba(52,52,217,0.45)] flex items-center justify-center overflow-hidden"
        >
          {!emblemError ? (
            <img
              src={SITE_CONTENT.brand.emblemLogo}
              alt="شعار ShadowX"
              referrerPolicy="no-referrer"
              onError={() => setEmblemError(true)}
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-[0_0_14px_rgba(139,92,246,0.65)]"
            />
          ) : (
            <span
              dir="ltr"
              className="font-display font-extrabold text-3xl text-white tracking-tight"
            >
              SX
            </span>
          )}
        </motion.div>
      </div>

      {/* نص الهوية Sʜᴀᴅᴏᴡ𝐗 مع نبض وتدرج متوهج */}
      <motion.div
        animate={{
          opacity: [0.7, 1, 0.7],
          scale: [0.98, 1.02, 0.98],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="text-center"
      >
        <div
          dir="ltr"
          className="font-display font-extrabold text-3xl sm:text-4xl tracking-wider text-white drop-shadow-[0_0_20px_rgba(139,92,246,0.45)]"
        >
          Sʜᴀᴅᴏᴡ
          <span className="bg-gradient-to-tr from-[#3434d9] via-[#8b5cf6] to-[#c084fc] bg-clip-text text-transparent">
            𝐗
          </span>
        </div>
        <p className="mt-2.5 text-xs sm:text-sm font-medium text-violet-300/80">
          {SITE_CONTENT.hero.badge}
        </p>
      </motion.div>

      {/* شريط تحميل ضوئي سفلي أنيق */}
      <div className="mt-6 w-44 sm:w-56 h-1 rounded-full bg-white/[0.06] overflow-hidden relative">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: '-100%' }}
          transition={{
            duration: 1.1,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-2/3 h-full rounded-full bg-gradient-to-l from-transparent via-[#8b5cf6] to-transparent shadow-[0_0_12px_#8b5cf6]"
        />
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// خلفية نقوش هندسية ورسوم ووسوم متحركة كصفحات الهبوط الاحترافية
// ─────────────────────────────────────────────────────────────
const FLOATING_BADGES = [
  {
    label: '< API />',
    top: '13%',
    left: '4%',
    delay: 0,
    duration: 5.5,
    hideOnMobile: false,
  },
  {
    label: '{ USDT }',
    top: '21%',
    right: '4%',
    delay: 0.8,
    duration: 6.2,
    hideOnMobile: false,
  },
  {
    label: 'Sʜᴀᴅᴏᴡ𝐗',
    top: '44%',
    left: '3%',
    delay: 0.4,
    duration: 6.8,
    hideOnMobile: true,
  },
  {
    label: '⚡ أتمتة ١٠٠٪',
    top: '54%',
    right: '4%',
    delay: 1.1,
    duration: 5.8,
    hideOnMobile: false,
  },
  {
    label: 'Binance Pay',
    top: '74%',
    left: '5%',
    delay: 0.6,
    duration: 6.5,
    hideOnMobile: false,
  },
  {
    label: '٢٤/٧',
    top: '83%',
    right: '5%',
    delay: 1.4,
    duration: 5.4,
    hideOnMobile: false,
  },
];

const GEOMETRIC_SHAPES = [
  {
    id: 'hex-top-right',
    type: 'hexagon',
    top: '11%',
    right: '14%',
    size: 'w-16 h-16 sm:w-24 sm:h-24',
    duration: 14,
    floatDuration: 5.5,
    delay: 0,
  },
  {
    id: 'ring-top-left',
    type: 'orbit-ring',
    top: '18%',
    left: '12%',
    size: 'w-20 h-20 sm:w-28 sm:h-28',
    duration: 18,
    floatDuration: 6.5,
    delay: 0.5,
  },
  {
    id: 'diamond-mid-right',
    type: 'diamond',
    top: '38%',
    right: '9%',
    size: 'w-14 h-14 sm:w-20 sm:h-20',
    duration: 12,
    floatDuration: 5,
    delay: 1,
  },
  {
    id: 'hex-mid-left',
    type: 'hexagon',
    top: '62%',
    left: '10%',
    size: 'w-16 h-16 sm:w-24 sm:h-24',
    duration: 16,
    floatDuration: 6,
    delay: 0.3,
  },
  {
    id: 'ring-bottom-right',
    type: 'orbit-ring',
    top: '70%',
    right: '13%',
    size: 'w-20 h-20 sm:w-28 sm:h-28',
    duration: 20,
    floatDuration: 7,
    delay: 0.9,
  },
  {
    id: 'diamond-bottom-left',
    type: 'diamond',
    top: '86%',
    left: '16%',
    size: 'w-12 h-12 sm:w-16 sm:h-16',
    duration: 13,
    floatDuration: 5.2,
    delay: 1.4,
  },
];

function AnimatedLandingBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* ١. شبكة هندسية معمارية متحركة باستمرار (Panning Architectural Grid) */}
      <div className="absolute inset-0 bg-architectural-grid opacity-95" />

      {/* ٢. مصفوفة نقاط دقيقة متحركة بالاتجاه المعاكس (Drifting Dot Matrix) */}
      <div className="absolute inset-0 bg-dot-matrix opacity-70" />

      {/* ٣. نبضات ضوئية سريعة تسري على خطوط الشبكة أفقياً وعمودياً (Cyber Grid Light Beams) */}
      <motion.div
        animate={{ x: ['-25vw', '125vw'] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[22%] left-0 w-44 sm:w-72 h-[2px] bg-gradient-to-r from-transparent via-[#8b5cf6] to-transparent shadow-[0_0_16px_#8b5cf6] opacity-75"
      />
      <motion.div
        animate={{ x: ['125vw', '-25vw'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear', delay: 1.8 }}
        className="absolute top-[58%] left-0 w-48 sm:w-80 h-[2px] bg-gradient-to-r from-transparent via-[#3434d9] to-transparent shadow-[0_0_18px_#3434d9] opacity-75"
      />
      <motion.div
        animate={{ x: ['-25vw', '125vw'] }}
        transition={{ duration: 7.2, repeat: Infinity, ease: 'linear', delay: 3.2 }}
        className="absolute top-[84%] left-0 w-40 sm:w-64 h-[2px] bg-gradient-to-r from-transparent via-violet-400 to-transparent shadow-[0_0_14px_#a78bfa] opacity-65"
      />
      <motion.div
        animate={{ y: ['-25vh', '125vh'] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: 'linear', delay: 0.7 }}
        className="absolute top-0 left-[18%] w-[2px] h-44 sm:h-64 bg-gradient-to-b from-transparent via-[#8b5cf6] to-transparent shadow-[0_0_16px_#8b5cf6] opacity-60"
      />
      <motion.div
        animate={{ y: ['125vh', '-25vh'] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'linear', delay: 2.4 }}
        className="absolute top-0 right-[18%] w-[2px] h-48 sm:h-72 bg-gradient-to-b from-transparent via-[#3434d9] to-transparent shadow-[0_0_16px_#3434d9] opacity-60"
      />

      {/* ٤. هالات ضوئية متحركة في الخلفية */}
      <motion.div
        animate={{
          x: [0, 65, -45, 0],
          y: [0, -55, 40, 0],
          scale: [1, 1.15, 0.92, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-24 -right-24 w-[380px] sm:w-[500px] h-[380px] sm:h-[500px] rounded-full bg-gradient-to-br from-[#3434d9]/25 via-[#8b5cf6]/18 to-transparent blur-[115px]"
      />
      <motion.div
        animate={{
          x: [0, -60, 45, 0],
          y: [0, 55, -40, 0],
          scale: [1, 0.9, 1.12, 1],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[40%] -left-32 w-[400px] sm:w-[520px] h-[400px] sm:h-[520px] rounded-full bg-gradient-to-tr from-[#6d28d9]/22 via-[#3434d9]/14 to-transparent blur-[125px]"
      />

      {/* ٥. مسارات ومنحنيات هندسية متوهجة متحركة (Animated Vector Waves) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-65"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="shadowx-line-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3434d9" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#3434d9" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="shadowx-line-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#3434d9" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        <motion.path
          d="M-100 190 C 320 50, 580 350, 1020 150 C 1240 60, 1400 230, 1560 130"
          stroke="url(#shadowx-line-grad-1)"
          strokeWidth="2"
          strokeDasharray="12 10"
          animate={{
            strokeDashoffset: [0, -220],
            y: [0, -18, 0],
            opacity: [0.45, 0.85, 0.45],
          }}
          transition={{
            strokeDashoffset: { duration: 6, repeat: Infinity, ease: 'linear' },
            y: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
            opacity: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
          }}
        />

        <motion.path
          d="M-80 670 C 340 500, 760 830, 1140 600 C 1310 510, 1420 680, 1540 580"
          stroke="url(#shadowx-line-grad-2)"
          strokeWidth="2"
          strokeDasharray="14 12"
          animate={{
            strokeDashoffset: [0, 240],
            y: [0, 20, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            strokeDashoffset: { duration: 7, repeat: Infinity, ease: 'linear' },
            y: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
            opacity: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
      </svg>

      {/* ٦. عناصر وأشكال هندسية ثلاثية وثنائية الأبعاد تدور وتطفو باستمرار (جميع الشاشات) */}
      {GEOMETRIC_SHAPES.map((shape) => (
        <motion.div
          key={shape.id}
          style={{
            top: shape.top,
            left: shape.left,
            right: shape.right,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 14, -10, 0],
          }}
          transition={{
            duration: shape.floatDuration,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={`absolute ${shape.size} flex items-center justify-center opacity-70 sm:opacity-85`}
        >
          {shape.type === 'hexagon' && (
            <motion.svg
              viewBox="0 0 100 100"
              className="w-full h-full overflow-visible drop-shadow-[0_0_12px_rgba(139,92,246,0.45)]"
              animate={{ rotate: 360 }}
              transition={{
                duration: shape.duration,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <polygon
                points="50,6 90,28 90,72 50,94 10,72 10,28"
                fill="rgba(52, 52, 217, 0.08)"
                stroke="#8b5cf6"
                strokeWidth="2"
                strokeOpacity="0.65"
              />
              <polygon
                points="50,22 76,36 76,64 50,78 24,64 24,36"
                fill="none"
                stroke="#c084fc"
                strokeWidth="1.2"
                strokeDasharray="4 4"
                strokeOpacity="0.55"
              />
              <circle cx="50" cy="50" r="4" fill="#a855f7" fillOpacity="0.8" />
            </motion.svg>
          )}

          {shape.type === 'orbit-ring' && (
            <div className="relative w-full h-full flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: shape.duration,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-violet-400/50 shadow-[0_0_20px_rgba(139,92,246,0.25)]"
              />
              <motion.div
                animate={{ rotate: -360, scale: [0.92, 1.08, 0.92] }}
                transition={{
                  rotate: {
                    duration: shape.duration * 0.7,
                    repeat: Infinity,
                    ease: 'linear',
                  },
                  scale: {
                    duration: 3.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }}
                className="w-3/5 h-3/5 rounded-full border border-[#3434d9]/70 bg-[#3434d9]/10 flex items-center justify-center"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-violet-400 shadow-[0_0_10px_#a855f7]" />
              </motion.div>
            </div>
          )}

          {shape.type === 'diamond' && (
            <div className="relative w-full h-full flex items-center justify-center">
              <motion.div
                animate={{ rotate: [45, 405] }}
                transition={{
                  duration: shape.duration,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="w-4/5 h-4/5 rounded-xl border-2 border-violet-400/55 bg-gradient-to-br from-[#3434d9]/15 to-[#8b5cf6]/10 shadow-[0_0_18px_rgba(52,52,217,0.35)]"
              />
              <motion.div
                animate={{ rotate: [405, 45] }}
                transition={{
                  duration: shape.duration * 0.8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute w-1/2 h-1/2 rounded-lg border border-dashed border-violet-300/60"
              />
            </div>
          )}
        </motion.div>
      ))}

      {/* ٧. وسوم ورموز برمجية زجاجية متحركة (Floating Tech Tags) على الموبايل والديسكتوب */}
      <div>
        {FLOATING_BADGES.map((badge, idx) => (
          <motion.div
            key={idx}
            style={{
              top: badge.top,
              left: badge.left,
              right: badge.right,
            }}
            animate={{
              y: [0, -22, 0],
              x: [0, idx % 2 === 0 ? 12 : -12, 0],
              rotate: [-3, 3, -3],
              opacity: [0.55, 0.92, 0.55],
            }}
            transition={{
              duration: badge.duration,
              delay: badge.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className={`${
              badge.hideOnMobile ? 'hidden sm:inline-flex' : 'inline-flex'
            } absolute px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-2xl bg-[#14141f]/80 backdrop-blur-md border border-violet-400/35 shadow-[0_0_20px_rgba(139,92,246,0.22)] text-[10px] sm:text-xs font-mono font-bold text-violet-200 tracking-wider`}
          >
            <span dir="ltr">{badge.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// التطبيق الرئيسي (App) — يجمع الأقسام بالترتيب المطلوب بالضبط:
// Navbar -> Hero (+ Stats) -> Features -> HowItWorks -> Payments -> FAQ -> FinalCTA -> Footer
// مع عرض Skeleton Loading بنبض ناعم عند فتح الموقع لأول مرة
// ─────────────────────────────────────────────────────────────
export default function App() {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [infoModalKey, setInfoModalKey] = useState<string | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 850);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div dir="rtl" className="relative min-h-screen bg-[#0b0b14] text-slate-100 flex flex-col isolate">
      {/* شريط تقدم التمرير العلوي */}
      <ScrollProgressBar />

      {/* خلفية النقوش والرسوم والوسوم المتحركة */}
      <AnimatedLandingBackground />

      <Navbar onOpenProjectModal={() => setProjectModalOpen(true)} />

      <AnimatePresence mode="wait">
        {isInitialLoading ? (
          <SectionsSkeleton />
        ) : (
          <motion.main
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="relative z-10 flex-1"
          >
            <Hero onOpenProjectModal={() => setProjectModalOpen(true)} />
            <Features />
            <HowItWorks />
            <Payments />
            <FAQ />
            <FinalCTA onOpenProjectModal={() => setProjectModalOpen(true)} />
          </motion.main>
        )}
      </AnimatePresence>

      <div className="relative z-10">
        <Footer onOpenInfoModal={(key) => setInfoModalKey(key)} />
      </div>

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
