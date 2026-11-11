export interface NavLinkItem {
  label: string;
  href: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface FeatureItem {
  id: string;
  iconName: 'Zap' | 'ShieldCheck' | 'WalletCards' | 'BotMessageSquare' | 'SlidersHorizontal' | 'Webhook';
  accentClass: string;
  title: string;
  description: string;
}

export interface StepItem {
  number: string;
  iconName: 'Lightbulb' | 'Code2' | 'ShieldCheck' | 'Rocket';
  title: string;
  description: string;
}

export interface PaymentMethodItem {
  id: string;
  iconName: 'Landmark' | 'SmartphoneNfc' | 'CircleDollarSign' | 'QrCode';
  accentClass: string;
  title: string;
  badge: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ModalLinkContent {
  title: string;
  subtitle: string;
  points: string[];
}

// مصفوفة الإحصائيات الثابتة أعلى الملف لسهولة التعديل
export const STATS_DATA: StatItem[] = [
  {
    value: '+2',
    label: 'مشروع منجز',
  },
  {
    value: '٢٤/٧',
    label: 'دعم فني',
  },
  {
    value: 'ثوانٍ',
    label: 'زمن التنفيذ الآلي',
  },
  {
    value: '١٠٠٪',
    label: 'أتمتة كاملة',
  },
];

export const SITE_CONTENT = {
  brand: {
    name: 'ShadowX',
    stylizedName: 'Sʜᴀᴅᴏᴡ𝐗',
    letter: 'S',
    emblemLogo: '/assets/aistudio/7_20261107_230645______08f45ae0.png',
    wordmarkLogo: '/assets/aistudio/6_20261107_230645______4e8b394e.png',
    officialStoreUrl: 'https://shad-vip.store',
    telegramUrl: 'https://t.me/Shadowx_dev',
    whatsappNumber: '+963944574989',
    whatsappUrl: 'https://wa.me/963944574989',
  },

  navbar: {
    links: [
      { label: 'المزايا', href: '#features' },
      { label: 'كيف نعمل', href: '#how' },
      { label: 'الدفع', href: '#pay' },
      { label: 'الأسئلة', href: '#faq' },
    ] as NavLinkItem[],
    ctaText: 'ابدأ مشروعك',
    mobileMenuAriaLabel: 'فتح أو إغلاق القائمة الرئيسية',
  },

  hero: {
    badge: 'فريق ShadowX نصُنع الأشياء بعناية',
    titlePrefix: 'بناء متاجر ومنصات بأنظمة مؤتمتة',
    titleHighlight: 'بالكامل',
    subtitle:
      'الموقع الرسمية لـShadowX — متتخصص ببرمجة المتاجر الرقمية، وبوتات تيليجرام، ولوحات التحكم، مع دفع وتنفيذ تلقائي. فريق التطوير الرسمي لمنصة shad-vip.store.',
    primaryBtn: 'ابدأ مشروعك الآن',
    secondaryBtn: 'زر منصة shad-vip.store',
    secondaryBtnHref: 'https://shad-vip.store',
    outlineBtn: 'كيف نعمل؟',
    outlineBtnHref: '#how',
  },

  features: {
    title: 'لماذا ShadowX؟',
    subtitle: 'كل ما تحتاجه لمتجر رقمي سريع وآمن وقابل للتوسع، في فريق واحد',
    items: [
      {
        id: 'instant-execution',
        iconName: 'Zap',
        accentClass: 'from-violet-500/25 via-indigo-500/15 to-transparent text-violet-300 border-violet-500/35',
        title: 'تنفيذ آلي فوري',
        description:
          'نبرمج أنظمة تنفّذ الطلبات الرقمية تلقائياً لحظة الدفع، دون تدخل بشري ودون انتظار.',
      },
      {
        id: 'verified-transactions',
        iconName: 'ShieldCheck',
        accentClass: 'from-emerald-500/25 via-teal-500/15 to-transparent text-emerald-300 border-emerald-500/35',
        title: 'معاملات موثّقة',
        description:
          'نظام مطابقة يتحقق من كل عملية إيداع برقم العملية لدى مزوّد الدفع قبل إضافة الرصيد.',
      },
      {
        id: 'multi-payments',
        iconName: 'WalletCards',
        accentClass: 'from-blue-500/25 via-indigo-500/15 to-transparent text-blue-300 border-blue-500/35',
        title: 'طرق دفع متعددة',
        description:
          'ربط تلقائي مع شام كاش، سيرياتيل كاش، USDT، Binance Pay وغيرها — بالدولار أو بالليرة.',
      },
      {
        id: 'telegram-bots',
        iconName: 'BotMessageSquare',
        accentClass: 'from-sky-500/25 via-blue-500/15 to-transparent text-sky-300 border-sky-500/35',
        title: 'بوتات تيليجرام',
        description:
          'متجر متكامل يعمل داخل تيليجرام، بلا تطبيقات إضافية، وبتجربة سلسة للعميل.',
      },
      {
        id: 'admin-dashboard',
        iconName: 'SlidersHorizontal',
        accentClass: 'from-purple-500/25 via-fuchsia-500/15 to-transparent text-purple-300 border-purple-500/35',
        title: 'لوحة تحكم متكاملة',
        description:
          'إدارة المنتجات والأقسام والطلبات والمستخدمين والإيداعات من لوحة واحدة سهلة.',
      },
      {
        id: 'rest-api',
        iconName: 'Webhook',
        accentClass: 'from-amber-500/25 via-orange-500/15 to-transparent text-amber-300 border-amber-500/35',
        title: 'واجهة برمجية (API)',
        description:
          'ربط متجرك مع المزوّدين أو فتح إعادة البيع عبر REST API موثّق وجاهز للإنتاج.',
      },
    ] as FeatureItem[],
  },

  howItWorks: {
    title: 'كيف نعمل؟',
    subtitle: 'من الفكرة إلى متجر يعمل خلال أيام',
    steps: [
      {
        number: '١',
        iconName: 'Lightbulb',
        title: 'شاركنا فكرتك',
        description: 'أخبرنا بنوع المتجر والمنتجات وطرق الدفع التي تحتاجها.',
      },
      {
        number: '٢',
        iconName: 'Code2',
        title: 'نصمّم ونبرمج',
        description: 'نبني الواجهة والبوت ولوحة التحكم والأتمتة وفق متطلباتك.',
      },
      {
        number: '٣',
        iconName: 'ShieldCheck',
        title: 'نختبر ونربط الدفع',
        description: 'نختبر كل مسار شراء وإيداع ونربط بوابات الدفع بشكل تلقائي.',
      },
      {
        number: '٤',
        iconName: 'Rocket',
        title: 'نطلق ونواكب',
        description: 'نسلّمك المشروع جاهزاً للعمل مع دعم فني مستمر بعد الإطلاق.',
      },
    ] as StepItem[],
  },

  payments: {
    title: 'طرق الدفع المدعومة في أنظمتنا',
    subtitle: 'نربط متجرك بما يناسب عملاءك — بالدولار أو بالليرة السورية',
    items: [
      {
        id: 'sham-cash',
        iconName: 'Landmark',
        accentClass: 'from-indigo-500/25 via-violet-500/15 to-transparent text-indigo-300 border-indigo-500/35',
        title: 'شام كاش',
        badge: 'تأكيد فوري',
        description: 'تحقق تلقائي من رقم العملية وإضافة فورية للرصيد.',
      },
      {
        id: 'syriatel-cash',
        iconName: 'SmartphoneNfc',
        accentClass: 'from-rose-500/25 via-red-500/15 to-transparent text-rose-300 border-rose-500/35',
        title: 'سيرياتيل كاش',
        badge: 'بالليرة السورية',
        description: 'تحويل بالليرة ثم إدخال رقم العملية للتأكيد التلقائي.',
      },
      {
        id: 'usdt',
        iconName: 'CircleDollarSign',
        accentClass: 'from-emerald-500/25 via-teal-500/15 to-transparent text-emerald-300 border-emerald-500/35',
        title: 'USDT',
        badge: 'كشف على الشبكة',
        description: 'شبكات متعددة مع كشف تلقائي للإيداع على الشبكة.',
      },
      {
        id: 'binance-pay',
        iconName: 'QrCode',
        accentClass: 'from-amber-400/25 via-yellow-500/15 to-transparent text-amber-300 border-amber-400/35',
        title: 'Binance Pay',
        badge: 'دفع مباشر',
        description: 'دفع سريع بمعرّف العملية داخل تطبيق بينانس.',
      },
    ] as PaymentMethodItem[],
  },

  faq: {
    title: 'أسئلة شائعة',
    subtitle: 'إجابات واضحة حول خدماتنا البرمجية وأنظمة الأتمتة والدفع',
    items: [
      {
        question: 'ماذا يقدّم فريق ShadowX؟',
        answer:
          'نبني ونبرمج متاجر ومنصات التجارة الرقمية والأنظمة المؤتمتة، بما فيها بوتات تيليجرام ولوحات التحكم وربط بوابات الدفع.',
      },
      {
        question: 'هل أنتم المطورون الرسميون لـ shad-vip.store؟',
        answer:
          'نعم، ShadowX هو الفريق البرمجي الرسمي المسؤول عن بناء وتطوير منصة shad-vip.store.',
      },
      {
        question: 'كم تستغرق مدة تنفيذ المشروع؟',
        answer:
          'تختلف حسب حجم المشروع، لكن المتاجر الأساسية تُسلَّم خلال أيام قليلة بعد الاتفاق على المتطلبات.',
      },
      {
        question: 'هل يدعم النظام الدفع التلقائي؟',
        answer:
          'نعم، ندعم شام كاش وسيرياتيل كاش وUSDT وBinance Pay مع تحقق تلقائي من العمليات.',
      },
      {
        question: 'هل تقدّمون دعماً بعد التسليم؟',
        answer:
          'نعم، نوفر دعماً فنياً وتحديثات بعد الإطلاق لضمان استقرار المتجر.',
      },
      {
        question: 'هل بياناتي ومشروعي آمنان؟',
        answer:
          'نشفّر البيانات الحساسة ولا نشاركها مع أي طرف ثالث، ونلتزم بمعايير إنتاجية عالية.',
      },
      {
        question: 'كيف أتواصل معكم؟',
        answer:
          'عبر قناتنا الرسمية على تيليجرام (t.me/Shadowx_dev) أو مباشرة عبر واتساب على الرقم (+963944574989).',
      },
    ] as FAQItem[],
  },

  finalCta: {
    title: 'جاهز لبناء متجرك الرقمي؟',
    subtitle: 'ابدأ مشروعك مع ShadowX واحصل على نظام مؤتمت جاهز للإنتاج',
    buttonText: 'تواصل معنا عبر تيليجرام',
    whatsappButtonText: 'تواصل عبر واتساب',
  },

  footer: {
    tagline: 'الفريق البرمجي الرسمي لمنصة shad-vip.store',
    links: [
      { label: 'سياسة الخصوصية', key: 'privacy' },
      { label: 'شروط الاستخدام', key: 'terms' },
      { label: 'توثيق الـ API', key: 'api' },
      { label: 'الدعم الفني', key: 'support' },
    ],
    copyright: '© 2026 ShadowX — جميع الحقوق محفوظة. صُنع بعناية 💜',
  },

  projectModal: {
    title: 'ابدأ مشروعك مع فريق ShadowX',
    subtitle: 'حدد تفاصيل مشروعك الأولية وسنجهز لك خطة التنفيذ والربط البرمجي فوراً',
    projectTypes: [
      'متجر شحن وبطاقات رقمية متكامل',
      'بوت تيليجرام للبيع والشحن التلقائي',
      'لوحة تحكم وربط بوابات دفع (شام كاش / سيرياتيل كاش / USDT)',
      'تطوير نظام مخصص وربط API مع المزودين',
    ],
    paymentOptions: ['شام كاش', 'سيرياتيل كاش', 'USDT', 'Binance Pay'],
    submitButton: 'تجهيز وإرسال طلب المشروع',
    successMessage:
      'تم تجهيز ملخص مشروعك بنجاح! يمكنك إرساله مباشرة عبر واتساب أو متابعة قناتنا الرسمية على تيليجرام.',
  },

  footerModals: {
    privacy: {
      title: 'سياسة الخصوصية وأمن البيانات',
      subtitle: 'نلتزم في استوديو ShadowX بأعلى معايير التشفير وحماية البيانات الإنتاجية',
      points: [
        'تشفير كامل لجميع مفاتيح الربط البرمجي (API Keys) وبيانات بوابات الدفع.',
        'عدم مشاركة أي بيانات تخص المتجر أو العملاء أو المعاملات مع أي طرف ثالث.',
        'عزل قواعد البيانات الخاصة بكل مشروع لضمان الخصوصية الكاملة والأداء المستقر.',
        'سجلات تدقيق مشفرة لحماية عمليات التحقق المالي ومطابقة الإيداعات.',
      ],
    },
    terms: {
      title: 'شروط الاستخدام وتطوير الأنظمة',
      subtitle: 'معايير العمل والالتزام الهندسي في مشاريع ShadowX',
      points: [
        'يتم تسليم المشروع مع لوحة التحكم الكاملة وإعدادات الربط المتفق عليها.',
        'تخضع جميع مسارات الشراء والإيداع لاختبارات ضغط ومطابقة قبل الإطلاق الفعلي.',
        'يشمل التسليم فترة مواكبة ودعم فني لضمان استقرار الأتمتة على مدار الساعة.',
        'الأنظمة مصممة للاستخدام التجاري المشروع في قطاع البطاقات الرقمية وخدمات الشحن.',
      ],
    },
    api: {
      title: 'توثيق الواجهة البرمجية (REST API)',
      subtitle: 'بنية برمجية قياسية للربط مع المزودين وأنظمة إعادة البيع',
      points: [
        'نقاط اتصال (Endpoints) سريعة للاستعلام عن المنتجات، الأسعار، وحالة المخزون لحظياً.',
        'إنشاء وتنفيذ الطلبات تلقائياً مع نظام إشعارات فورية (Webhooks) عند اكتمال الطلب.',
        'مصادقة محمية عبر رموز وصول مشفرة وتحديد عناوين الخوادم المسموحة.',
        'توافق تام مع منصات البطاقات الرقمية ومتاجر الشحن وبوتات تيليجرام.',
      ],
    },
    support: {
      title: 'مركز الدعم الفني والمواكبة',
      subtitle: 'فريقنا الهندسي معك على مدار الساعة لضمان استمرارية متجرك',
      points: [
        'متابعة مباشرة لأداء بوابات الدفع التلقائي (شام كاش، سيرياتيل كاش، USDT، Binance Pay).',
        'تحديثات دورية للأنظمة والبوتات لمواكبة أي تغييرات لدى مزودي الخدمة.',
        'استجابة سريعة للحالات الطارئة واستفسارات الإدارة عبر قنوات التواصل المخصصة.',
        'إمكانية طلب إضافات برمجية أو توسعة البنية التحتية في أي وقت مع نمو متجرك.',
      ],
    },
  } as Record<string, ModalLinkContent>,
};
