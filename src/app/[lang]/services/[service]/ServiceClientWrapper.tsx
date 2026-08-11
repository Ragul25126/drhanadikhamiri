'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import FloatingWidget from '@/components/FloatingWidget';
import BookingModal from '@/components/BookingModal';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const serviceData = {
  'cosmetic-veneers-lumineers': {
    en: {
      tagline: 'Crafting Flawless, Natural Smiles in Dubai',
      overview: 'Our custom-crafted, ultra-thin porcelain veneers and Lumineers are designed to elevate your smile aesthetics with a natural luster. We focus on preserving your natural tooth structure while achieving a radiant, Hollywood-level transformation.',
      benefits: [
        { icon: 'M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z', title: 'Ultra-Thin Precision', desc: 'Minimal to no preparation required for maximum tooth preservation.' },
        { icon: 'M21 11H13V3C17.42 3 21 6.58 21 11M11 21V13H3Z', title: 'Natural Luster', desc: 'Premium ceramics matched exactly to natural tooth translucency.' },
        { icon: 'M18 10V14H14V10H18M10 10V14H6V10H10Z', title: 'Stain Resistant', desc: 'Long-lasting white smile resistant to coffee and tea stains.' }
      ],
      faqs: [
        { q: 'How long do veneers last?', a: 'With proper care and oral hygiene, our high-quality porcelain veneers can last 10 to 15 years, or even longer.' },
        { q: 'Will it damage my natural teeth?', a: 'No, we practice minimally invasive dentistry. Lumineers often require zero tooth preparation.' },
        { q: 'Is the procedure painful?', a: 'The procedure is completely pain-free, done under local anesthesia if any preparation is needed.' }
      ]
    },
    ar: {
      tagline: 'صناعة ابتسامات خالية من العيوب وطبيعية في دبي',
      overview: 'قشور البورسلين واللومينير الرقيقة جداً والمصممة خصيصاً لرفع جمال ابتسامتك ببريق طبيعي. نركز على الحفاظ على بنية أسنانك الطبيعية مع تحقيق تحول مشع بمستوى هوليوود.',
      benefits: [
        { icon: 'M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z', title: 'دقة فائقة النحافة', desc: 'الحد الأدنى أو لا حاجة للتحضير للحفاظ على الأسنان بأقصى قدر.' },
        { icon: 'M21 11H13V3C17.42 3 21 6.58 21 11M11 21V13H3Z', title: 'بريق طبيعي', desc: 'سيراميك فاخر يتطابق تمامًا مع شفافية الأسنان الطبيعية.' },
        { icon: 'M18 10V14H14V10H18M10 10V14H6V10H10Z', title: 'مقاوم للبقع', desc: 'ابتسامة بيضاء تدوم طويلاً مقاومة لبقع القهوة والشاي.' }
      ],
      faqs: [
        { q: 'كم تدوم الفينير؟', a: 'مع الرعاية المناسبة ونظافة الفم، يمكن أن تدوم قشور البورسلين عالية الجودة لدينا من 10 إلى 15 عامًا، أو حتى لفترة أطول.' },
        { q: 'هل سيتلف أسناني الطبيعية؟', a: 'لا، نحن نمارس طب الأسنان طفيف التوغل. اللومينير غالبًا لا يتطلب أي تحضير للأسنان.' },
        { q: 'هل الإجراء مؤلم؟', a: 'الإجراء خالٍ تمامًا من الألم، ويتم تحت التخدير الموضعي إذا لزم أي تحضير.' }
      ]
    }
  },
  'invisalign-clear-aligners': {
    en: {
      tagline: 'Top 1% Certified Invisalign Provider',
      overview: 'Transform your smile discreetly with Invisalign clear aligners. Utilizing the advanced iTero Lumina 3D scanner, we create a precise digital map of your teeth and a customized treatment plan to achieve perfect alignment comfortably and effectively.',
      benefits: [
        { icon: 'M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M15 7H9V9H15V7Z', title: 'Virtually Invisible', desc: 'Clear, medical-grade plastic aligners that go unnoticed.' },
        { icon: 'M21 11H13V3C17.42 3 21 6.58 21 11M11 21V13H3Z', title: 'iTero 3D Mapping', desc: 'No messy impressions. Instant 3D simulation of your future smile.' },
        { icon: 'M16 11C17.66 11 18.9 9.66 18.9 8C18.9 6.34 17.66 5 16 5Z', title: 'Comfort & Removable', desc: 'Eat your favorite foods and maintain easy oral hygiene.' }
      ],
      faqs: [
        { q: 'How long does Invisalign treatment take?', a: 'Depending on the complexity, treatment usually takes between 6 to 18 months.' },
        { q: 'Do I have to wear them all day?', a: 'For best results, aligners should be worn for 20-22 hours a day, removing them only to eat and brush.' },
        { q: 'Does it affect my speech?', a: 'You may have a slight lisp for the first few days as your tongue adjusts, but it quickly goes away.' }
      ]
    },
    ar: {
      tagline: 'أفضل مزود معتمد لإنفزلاين (أفضل 1%)',
      overview: 'حوّل ابتسامتك بسرية مع مقومات إنفزلاين الشفافة. باستخدام ماسح iTero Lumina ثلاثي الأبعاد المتقدم، نقوم بإنشاء خريطة رقمية دقيقة لأسنانك وخطة علاج مخصصة لتحقيق التوافق المثالي بشكل مريح وفعال.',
      benefits: [
        { icon: 'M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M15 7H9V9H15V7Z', title: 'غير مرئي تقريبًا', desc: 'مقومات بلاستيكية طبية شفافة تمر دون أن يلاحظها أحد.' },
        { icon: 'M21 11H13V3C17.42 3 21 6.58 21 11M11 21V13H3Z', title: 'تخطيط iTero ثلاثي الأبعاد', desc: 'لا انطباعات فوضوية. محاكاة ثلاثية الأبعاد فورية لابتسامتك المستقبلية.' },
        { icon: 'M16 11C17.66 11 18.9 9.66 18.9 8C18.9 6.34 17.66 5 16 5Z', title: 'مريح وقابل للإزالة', desc: 'تناول الأطعمة المفضلة لديك وحافظ على نظافة الفم بسهولة.' }
      ],
      faqs: [
        { q: 'كم يستغرق علاج إنفزلاين؟', a: 'اعتمادًا على التعقيد، يستغرق العلاج عادة ما بين 6 إلى 18 شهرًا.' },
        { q: 'هل يجب أن أرتديها طوال اليوم؟', a: 'للحصول على أفضل النتائج، يجب ارتداء المقومات لمدة 20-22 ساعة في اليوم، وإزالتها فقط لتناول الطعام وتنظيف الأسنان.' },
        { q: 'هل يؤثر على طريقة كلامي؟', a: 'قد يكون لديك لثغة طفيفة في الأيام القليلة الأولى بينما يتكيف لسانك، لكنها سرعان ما تختفي.' }
      ]
    }
  },
  'ceramic-crowns': {
    en: {
      tagline: 'Strength Meets Uncompromised Aesthetics',
      overview: 'Our high-strength ceramic crowns restore damaged or weakened teeth while blending seamlessly with your natural smile. Using advanced shade-matching technology, we ensure your crown looks entirely natural and functions perfectly.',
      benefits: [
        { icon: 'M18 10V14H14V10H18M10 10V14H6V10H10Z', title: 'Durability', desc: 'Engineered from premium ceramics for long-lasting strength.' },
        { icon: 'M21 11H13V3C17.42 3 21 6.58 21 11M11 21V13H3Z', title: 'Seamless Blend', desc: 'Meticulously color-matched to your surrounding teeth.' },
        { icon: 'M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2', title: 'Biocompatible', desc: 'Metal-free solutions ensuring healthy gums and zero toxicity.' }
      ],
      faqs: [
        { q: 'How long does a crown procedure take?', a: 'The process typically requires two visits: one for preparation and scanning, and the second for placement.' },
        { q: 'Are ceramic crowns better than metal ones?', a: 'Ceramic crowns offer superior aesthetics without the dark metal line at the gums, while providing excellent durability.' },
        { q: 'Is the procedure painful?', a: 'Local anesthesia is used to ensure you feel absolutely no pain during the preparation process.' }
      ]
    },
    ar: {
      tagline: 'القوة تلتقي بالجمال الذي لا هوادة فيه',
      overview: 'تيجان السيراميك عالية القوة لدينا تعيد الأسنان التالفة أو الضعيفة بينما تمتزج بسلاسة مع ابتسامتك الطبيعية. باستخدام تقنية مطابقة الألوان المتقدمة، نضمن أن التاج يبدو طبيعيًا تمامًا ويعمل بشكل مثالي.',
      benefits: [
        { icon: 'M18 10V14H14V10H18M10 10V14H6V10H10Z', title: 'متانة', desc: 'مصممة من السيراميك الفاخر لقوة تدوم طويلاً.' },
        { icon: 'M21 11H13V3C17.42 3 21 6.58 21 11M11 21V13H3Z', title: 'مزيج سلس', desc: 'مطابقة الألوان بدقة مع أسنانك المحيطة.' },
        { icon: 'M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2', title: 'متوافق حيويا', desc: 'حلول خالية من المعادن تضمن لثة صحية وخالية من السمية.' }
      ],
      faqs: [
        { q: 'كم تستغرق عملية التاج؟', a: 'تتطلب العملية عادة زيارتين: واحدة للتحضير والمسح، والثانية للوضع.' },
        { q: 'هل تيجان السيراميك أفضل من التيجان المعدنية؟', a: 'توفر تيجان السيراميك جماليات فائقة بدون الخط المعدني الداكن عند اللثة، مع توفير متانة ممتازة.' },
        { q: 'هل الإجراء مؤلم؟', a: 'يتم استخدام التخدير الموضعي لضمان عدم شعورك بأي ألم على الإطلاق أثناء عملية التحضير.' }
      ]
    }
  },
  'aesthetic-fillings': {
    en: {
      tagline: 'Invisible Restorations for a Perfect Smile',
      overview: 'Say goodbye to noticeable metal fillings. We use premium composite materials to restore cavities, sculpting them to replicate the natural anatomy and translucency of your teeth for a completely invisible repair.',
      benefits: [
        { icon: 'M21 11H13V3C17.42 3 21 6.58 21 11M11 21V13H3Z', title: 'Invisible Repair', desc: 'Composite resins matched perfectly to your tooth color.' },
        { icon: 'M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2', title: 'Tooth Preservation', desc: 'Requires less removal of the healthy tooth compared to amalgam.' },
        { icon: 'M18 10V14H14V10H18M10 10V14H6V10H10Z', title: 'Immediate Bonding', desc: 'The filling is cured instantly, allowing you to eat right away.' }
      ],
      faqs: [
        { q: 'Are composite fillings safe?', a: 'Absolutely. They are completely free of mercury and other metals, making them a biocompatible choice.' },
        { q: 'How long do aesthetic fillings last?', a: 'They generally last 5-10 years, depending on their location and your chewing habits.' },
        { q: 'Can I replace old silver fillings?', a: 'Yes! We frequently replace old amalgam fillings with aesthetic composites for health and beauty reasons.' }
      ]
    },
    ar: {
      tagline: 'ترميمات غير مرئية لابتسامة مثالية',
      overview: 'قل وداعا للحشوات المعدنية الملحوظة. نستخدم مواد مركبة فاخرة لترميم التجاويف، ونحتها لتكرار التشريح والشفافية الطبيعية لأسنانك من أجل إصلاح غير مرئي تمامًا.',
      benefits: [
        { icon: 'M21 11H13V3C17.42 3 21 6.58 21 11M11 21V13H3Z', title: 'إصلاح غير مرئي', desc: 'راتنجات مركبة تتطابق تمامًا مع لون أسنانك.' },
        { icon: 'M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2', title: 'الحفاظ على الأسنان', desc: 'يتطلب إزالة أقل للأسنان السليمة مقارنة بالأملغم.' },
        { icon: 'M18 10V14H14V10H18M10 10V14H6V10H10Z', title: 'ترابط فوري', desc: 'تتم معالجة الحشوة على الفور، مما يسمح لك بتناول الطعام على الفور.' }
      ],
      faqs: [
        { q: 'هل الحشوات المركبة آمنة؟', a: 'مطلقاً. فهي خالية تمامًا من الزئبق والمعادن الأخرى، مما يجعلها خيارًا متوافقًا حيويًا.' },
        { q: 'كم تدوم الحشوات التجميلية؟', a: 'تدوم بشكل عام من 5 إلى 10 سنوات، اعتمادًا على موقعها وعادات المضغ لديك.' },
        { q: 'هل يمكنني استبدال الحشوات الفضية القديمة؟', a: 'نعم! غالبًا ما نستبدل حشوات الأملغم القديمة بمركبات تجميلية لأسباب صحية وجمالية.' }
      ]
    }
  },
  'guided-biofilm-therapy': {
    en: {
      tagline: 'The Ultimate Dental Spa Experience',
      overview: 'Guided Biofilm Therapy (GBT) by EMS Swiss represents a paradigm shift in professional teeth cleaning. Using warm water, air, and fine powder, it gently and efficiently removes plaque, stains, and early calculus without the pain of traditional scraping.',
      benefits: [
        { icon: 'M12 2L4 5V11.09C4 16.14 7.41 20.85 12 22Z', title: 'Pain-Free Cleaning', desc: 'No harsh scraping. Warm water and AIRFLOW technology guarantee comfort.' },
        { icon: 'M21 11H13V3C17.42 3 21 6.58 21 11M11 21V13H3Z', title: 'Deep Stain Removal', desc: 'Effectively erases coffee, tea, and tobacco stains.' },
        { icon: 'M16 11C17.66 11 18.9 9.66 18.9 8C18.9 6.34 17.66 5 16 5Z', title: 'Implant Safe', desc: 'The gentlest and most effective way to clean around implants and braces.' }
      ],
      faqs: [
        { q: 'Does GBT hurt?', a: 'No, GBT is famously known as the pain-free dental cleaning. The warm water ensures even patients with sensitive teeth are comfortable.' },
        { q: 'How often should I get GBT?', a: 'We recommend a GBT session every 6 months to maintain optimal oral hygiene and prevent gum disease.' },
        { q: 'Is it suitable for children?', a: 'Yes, GBT is highly recommended for children as it is pain-free and introduces them to positive dental visits.' }
      ]
    },
    ar: {
      tagline: 'تجربة سبا الأسنان المطلقة',
      overview: 'يمثل علاج الجير الموجه (GBT) بواسطة EMS السويسرية نقلة نوعية في تنظيف الأسنان الاحترافي. باستخدام الماء الدافئ والهواء والمسحوق الناعم، يزيل بلطف وكفاءة البلاك والبقع والجير المبكر دون ألم الكشط التقليدي.',
      benefits: [
        { icon: 'M12 2L4 5V11.09C4 16.14 7.41 20.85 12 22Z', title: 'تنظيف بدون ألم', desc: 'لا كشط قاسي. الماء الدافئ وتكنولوجيا تدفق الهواء تضمن الراحة.' },
        { icon: 'M21 11H13V3C17.42 3 21 6.58 21 11M11 21V13H3Z', title: 'إزالة البقع العميقة', desc: 'يمحو بفعالية بقع القهوة والشاي والتبغ.' },
        { icon: 'M16 11C17.66 11 18.9 9.66 18.9 8C18.9 6.34 17.66 5 16 5Z', title: 'آمن للزرع', desc: 'الطريقة الألطف والأكثر فعالية للتنظيف حول الزرع والتقويم.' }
      ],
      faqs: [
        { q: 'هل GBT يؤلم؟', a: 'لا، يشتهر GBT بأنه تنظيف الأسنان الخالي من الألم. يضمن الماء الدافئ راحة حتى المرضى الذين يعانون من أسنان حساسة.' },
        { q: 'كم مرة يجب أن أحصل على GBT؟', a: 'نوصي بجلسة GBT كل 6 أشهر للحفاظ على النظافة المثلى للفم والوقاية من أمراض اللثة.' },
        { q: 'هل هو مناسب للأطفال؟', a: 'نعم، يوصى بشدة بـ GBT للأطفال لأنه خالٍ من الألم ويعرفهم بزيارات طب الأسنان الإيجابية.' }
      ]
    }
  },
  'family-care': {
    en: {
      tagline: 'Comprehensive Care for Every Generation',
      overview: 'We believe that exceptional dental care begins with prevention and education. Our Family Care services offer gentle, comprehensive dentistry for patients of all ages, ensuring long-term oral wellness in a relaxing, anxiety-free environment.',
      benefits: [
        { icon: 'M16 11C17.66 11 18.9 9.66 18.9 8C18.9 6.34 17.66 5 16 5Z', title: 'Pediatric Friendly', desc: 'Gentle, patient approach to make children feel at ease.' },
        { icon: 'M12 2L4 5V11.09C4 16.14 7.41 20.85 12 22Z', title: 'Preventive Focus', desc: 'Comprehensive exams, fluoride treatments, and sealants.' },
        { icon: 'M18 10V14H14V10H18M10 10V14H6V10H10Z', title: 'Anxiety-Free', desc: 'A serene clinic environment designed to eliminate dental fear.' }
      ],
      faqs: [
        { q: 'At what age should my child first visit the dentist?', a: 'We recommend scheduling the first visit when the first tooth appears, or no later than their first birthday.' },
        { q: 'Do you offer emergency dental appointments?', a: 'Yes, we accommodate dental emergencies promptly during clinic hours to relieve pain and address trauma.' },
        { q: 'How can I prevent cavities in my family?', a: 'Regular check-ups every 6 months, along with daily brushing and flossing, are your best defense against cavities.' }
      ]
    },
    ar: {
      tagline: 'رعاية شاملة لكل جيل',
      overview: 'نعتقد أن العناية الاستثنائية بالأسنان تبدأ بالوقاية والتعليم. تقدم خدمات الرعاية الأسرية لدينا طب أسنان لطيف وشامل للمرضى من جميع الأعمار، مما يضمن صحة الفم على المدى الطويل في بيئة مريحة وخالية من القلق.',
      benefits: [
        { icon: 'M16 11C17.66 11 18.9 9.66 18.9 8C18.9 6.34 17.66 5 16 5Z', title: 'صديق للأطفال', desc: 'نهج لطيف وصبور لجعل الأطفال يشعرون بالراحة.' },
        { icon: 'M12 2L4 5V11.09C4 16.14 7.41 20.85 12 22Z', title: 'التركيز الوقائي', desc: 'فحوصات شاملة وعلاجات الفلورايد والمواد المانعة للتسرب.' },
        { icon: 'M18 10V14H14V10H18M10 10V14H6V10H10Z', title: 'خالية من القلق', desc: 'بيئة عيادة هادئة مصممة للقضاء على خوف طبيب الأسنان.' }
      ],
      faqs: [
        { q: 'في أي عمر يجب أن يزور طفلي طبيب الأسنان لأول مرة؟', a: 'نوصي بتحديد الزيارة الأولى عندما يظهر السن الأول، أو في موعد لا يتجاوز عيد ميلادهم الأول.' },
        { q: 'هل تقدمون مواعيد طوارئ لطب الأسنان؟', a: 'نعم، نحن نستوعب حالات طوارئ الأسنان على الفور خلال ساعات العيادة لتخفيف الألم ومعالجة الصدمات.' },
        { q: 'كيف يمكنني منع التسوس في عائلتي؟', a: 'الفحوصات المنتظمة كل 6 أشهر، إلى جانب التنظيف بالفرشاة والخيط يوميًا، هي أفضل دفاع ضد التسوس.' }
      ]
    }
  }
};

export default function ServiceClientWrapper({ serviceSlug }: { serviceSlug: string }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const { language, dict } = useLanguage();

  const serviceKeys: Record<string, keyof typeof dict.services> = {
    'cosmetic-veneers-lumineers': 'c1title',
    'invisalign-clear-aligners': 'c2title',
    'ceramic-crowns': 'c3title',
    'aesthetic-fillings': 'c4title',
    'guided-biofilm-therapy': 'c5title',
    'family-care': 'c6title',
  };
  
  const titleKey = serviceKeys[serviceSlug];
  const title = titleKey ? dict.services[titleKey] : '';
  
  const typedLang = language === 'ar' ? 'ar' : 'en';
  const data = serviceData[serviceSlug as keyof typeof serviceData]?.[typedLang] || serviceData['family-care'][typedLang];

  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    return () => revealObserver.disconnect();
  }, [serviceSlug]);

  return (
    <>
      <FloatingWidget onBookClick={() => setIsBookingOpen(true)} />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      <Navbar onBookClick={() => setIsBookingOpen(true)} />

      <main style={{ minHeight: '100vh', paddingTop: '130px', backgroundColor: 'var(--pearl)', paddingBottom: '6rem' }}>
        
        {/* Service Hero */}
        <section className="container">
          <Link
            href={`/${language}/#services`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.9rem',
              color: '#666',
              textDecoration: 'none',
              fontFamily: 'var(--font-sans)',
              marginBottom: '3rem',
              letterSpacing: '0.5px',
              transition: 'color 0.2s',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ transform: language === 'ar' ? 'rotate(180deg)' : 'none' }}>
              <path d="M20,11H7.83l5.59-5.59L12,4l-8,8l8,8l1.41-1.41L7.83,13H20V11Z"/>
            </svg>
            {language === 'ar' ? 'العودة إلى الخدمات' : 'Back to Services'}
          </Link>

          <div className="reveal" style={{ textAlign: 'left', marginBottom: '4rem', maxWidth: '900px' }}>
            <h1 style={{ fontSize: 'clamp(3.5rem, 6vw, 5rem)', marginBottom: '1.5rem', color: 'var(--charcoal)', fontFamily: 'var(--font-serif)', lineHeight: '1.1' }}>
              {title}
            </h1>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--gold)', fontFamily: 'var(--font-serif)', marginBottom: '2rem', fontStyle: 'italic' }}>
              {data.tagline}
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#555', lineHeight: '1.8', maxWidth: '800px' }}>
              {data.overview}
            </p>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="container" style={{ margin: '6rem auto' }}>
          <h3 className="reveal" style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', marginBottom: '3rem', textAlign: 'center' }}>
            {language === 'ar' ? 'لماذا تختارنا لهذا العلاج؟' : 'Why Choose Us For This Treatment?'}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {data.benefits.map((benefit, i) => (
              <div key={i} className={`service-card reveal delay-${(i % 3) + 1}`} style={{ padding: '3rem 2rem', background: '#fff', borderRadius: '20px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                <div className="service-icon" style={{ margin: '0 auto 1.5rem', width: '70px', height: '70px', background: 'var(--ivory)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)' }}>
                  <svg viewBox="0 0 24 24" style={{ width: '35px', height: '35px', fill: 'currentColor' }}>
                    <path d={benefit.icon} />
                  </svg>
                </div>
                <h4 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-serif)', marginBottom: '1rem', color: 'var(--charcoal)' }}>{benefit.title}</h4>
                <p style={{ fontSize: '1rem', color: '#666', lineHeight: '1.6' }}>{benefit.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container" style={{ margin: '6rem auto', maxWidth: '800px' }}>
          <h3 className="reveal" style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', marginBottom: '3rem', textAlign: 'center' }}>
            {language === 'ar' ? 'الأسئلة الشائعة حول العلاج' : 'Treatment FAQs'}
          </h3>
          <div className="reveal delay-1">
            {data.faqs.map((faq, i) => (
              <div 
                key={i} 
                className={`faq-item ${activeFaq === i ? 'active' : ''}`}
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                style={{ borderBottom: '1px solid rgba(28,28,30,0.1)', padding: '2rem 0', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 500, color: activeFaq === i ? 'var(--gold)' : 'var(--charcoal)', transition: 'color 0.3s' }}>
                  {faq.q}
                  <div className="faq-icon" style={{ position: 'relative', width: '24px', height: '24px', flexShrink: 0, marginLeft: '20px' }}>
                    <div style={{ position: 'absolute', top: '11px', left: 0, width: '24px', height: '2px', background: activeFaq === i ? 'var(--gold)' : 'var(--charcoal)', transition: 'all 0.4s' }}></div>
                    <div style={{ position: 'absolute', top: 0, left: '11px', width: '2px', height: '24px', background: 'var(--charcoal)', transition: 'all 0.4s', transform: activeFaq === i ? 'rotate(90deg)' : 'none', opacity: activeFaq === i ? 0 : 1 }}></div>
                  </div>
                </div>
                <div style={{ maxHeight: activeFaq === i ? '200px' : '0', overflow: 'hidden', transition: 'all 0.5s ease', opacity: activeFaq === i ? 1 : 0, marginTop: activeFaq === i ? '1.5rem' : '0' }}>
                  <p style={{ color: '#555', fontSize: '1.1rem', lineHeight: '1.7' }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Booking CTA */}
        <section className="container">
          <div className="reveal delay-1" style={{
            background: 'linear-gradient(135deg, var(--charcoal) 0%, #2a2a2a 100%)',
            padding: '5rem 3rem',
            borderRadius: '24px',
            textAlign: 'center',
            color: '#fff',
            marginTop: '3rem',
            boxShadow: '0 30px 60px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.5rem', color: 'var(--gold)', fontStyle: 'italic' }}>
              {dict.bookingCta.h2}
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem', fontSize: '1.15rem' }}>
              {dict.bookingCta.sub}
            </p>
            <button
              onClick={() => setIsBookingOpen(true)}
              className="btn btn-gold"
              style={{ padding: '1.2rem 3.5rem', fontSize: '1rem' }}
            >
              {dict.bookingCta.btn}
            </button>
          </div>
        </section>

      </main>

      {/* Shared Footer */}
      <Footer onBookClick={() => setIsBookingOpen(true)} />
    </>
  );
}
