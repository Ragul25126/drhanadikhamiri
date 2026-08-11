import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServiceClientWrapper from './ServiceClientWrapper';

const servicesMap = {
  'cosmetic-veneers-lumineers': {
    en: { title: 'Porcelain Veneers & Lumineers in Dubai | Dr. Hanadi Khamiri', desc: 'Custom-crafted, ultra-thin ceramic veneers and lumineers designed to elevate smile aesthetics with natural luster.' },
    ar: { title: 'فينير ولومينير الأسنان في دبي | د. هنادي خميري', desc: 'قشور خزفية رقيقة مخصصة لرفع جمال الابتسامة ببريق طبيعي.' }
  },
  'invisalign-clear-aligners': {
    en: { title: 'Invisalign Clear Aligners in Dubai | Dr. Hanadi Khamiri', desc: 'Top 1% Certified Invisalign Provider in Dubai offering bespoke clear aligner therapy.' },
    ar: { title: 'تقويم إنفزلاين الشفاف في دبي | د. هنادي خميري', desc: 'أفضل طبيب معتمد 1% لتقويم إنفزلاين في دبي، نقدم علاجات مخصصة بالتقويم الشفاف.' }
  },
  'ceramic-crowns': {
    en: { title: 'Ceramic Crowns in Dubai | Dr. Hanadi Khamiri', desc: 'High-strength, natural-looking ceramic crowns meticulously shade-matched to blend seamlessly.' },
    ar: { title: 'تيجان السيراميك في دبي | د. هنادي خميري', desc: 'تيجان سيراميك طبيعية المظهر ومقاومة، متطابقة بدقة للاندماج بسلاسة مع أسنانك.' }
  },
  'aesthetic-fillings': {
    en: { title: 'Aesthetic Fillings in Dubai | Dr. Hanadi Khamiri', desc: 'Premium composite restorations sculpted to replicate the natural anatomy and translucency of teeth.' },
    ar: { title: 'حشوات تجميلية في دبي | د. هنادي خميري', desc: 'حشوات تجميلية فاخرة مصممة لتكرار التشريح والشفافية الطبيعية للأسنان.' }
  },
  'guided-biofilm-therapy': {
    en: { title: 'Guided Biofilm Therapy (GBT) in Dubai | Dr. Hanadi Khamiri', desc: 'Swiss EMS warm-water spa hygiene protocol that removes biofilm, stains, and plaque gently.' },
    ar: { title: 'علاج الجير الموجه (GBT) في دبي | د. هنادي خميري', desc: 'بروتوكول النظافة السويسري لإزالة الرواسب والتصبغات بلطف.' }
  },
  'family-care': {
    en: { title: 'Family Dental Care in Dubai | Dr. Hanadi Khamiri', desc: 'Comprehensive, minimally invasive general dentistry emphasizing preventive wellness.' },
    ar: { title: 'رعاية أسنان العائلة في دبي | د. هنادي خميري', desc: 'طب أسنان عام شامل ومخفف التوغل مع التركيز على الوقاية.' }
  }
};

export async function generateMetadata(props: { params: Promise<{ lang: string; service: string }> }): Promise<Metadata> {
  const params = await props.params;
  const typedLang = params.lang === 'ar' ? 'ar' : 'en';
  const meta = servicesMap[params.service as keyof typeof servicesMap];
  if (!meta) return { title: 'Service Not Found | Dr. Hanadi Khamiri' };
  
  return {
    title: meta[typedLang].title,
    description: meta[typedLang].desc,
    alternates: {
      canonical: `https://drhanadikhamiri.com/${params.lang}/services/${params.service}`,
    },
    openGraph: {
      title: meta[typedLang].title,
      description: meta[typedLang].desc,
      url: `https://drhanadikhamiri.com/${params.lang}/services/${params.service}`,
    }
  };
}

export default async function ServicePage(props: { params: Promise<{ lang: string; service: string }> }) {
  const params = await props.params;
  if (!servicesMap[params.service as keyof typeof servicesMap]) {
    notFound();
  }
  return <ServiceClientWrapper serviceSlug={params.service} />;
}
