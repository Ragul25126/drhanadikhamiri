import type { MetadataRoute } from 'next';
import { getSupabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // revalidate at most once per hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://drhanadikhamiri.com';

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
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
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.created_at || new Date()),
      changeFrequency: 'monthly',
      priority: 0.8,
    }));

    return [...staticUrls, ...blogUrls];
  } catch {
    return staticUrls;
  }
}
