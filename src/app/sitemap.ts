import type { MetadataRoute } from 'next';
import { getSupabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // revalidate at most once per hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://drhanadikhamiri.com';

  const generateI18nEntry = (path: string, priority: number, changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never') => ({
    url: `${baseUrl}/en${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: {
        en: `${baseUrl}/en${path}`,
        ar: `${baseUrl}/ar${path}`,
      }
    }
  });

  const staticUrls: MetadataRoute.Sitemap = [
    generateI18nEntry('', 1.0, 'weekly'),
    generateI18nEntry('/blog', 0.9, 'daily'),
    generateI18nEntry('/services/cosmetic-veneers-lumineers', 0.9, 'monthly'),
    generateI18nEntry('/services/invisalign-clear-aligners', 0.9, 'monthly'),
    generateI18nEntry('/services/ceramic-crowns', 0.8, 'monthly'),
    generateI18nEntry('/services/aesthetic-fillings', 0.8, 'monthly'),
    generateI18nEntry('/services/guided-biofilm-therapy', 0.8, 'monthly'),
    generateI18nEntry('/services/family-care', 0.8, 'monthly'),
  ];

  try {
    const supabase = getSupabaseAdmin();
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('slug, created_at')
      .order('created_at', { ascending: false });

    if (error || !posts) {
      return staticUrls;
    }

    const blogUrls: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${baseUrl}/en/blog/${post.slug}`,
      lastModified: new Date(post.created_at || new Date()),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/en/blog/${post.slug}`,
          ar: `${baseUrl}/ar/blog/${post.slug}`,
        }
      }
    }));

    return [...staticUrls, ...blogUrls];
  } catch {
    return staticUrls;
  }
}

