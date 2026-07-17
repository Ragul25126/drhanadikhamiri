import { getSupabaseAdmin } from '@/lib/supabase';
import BlogClientWrapper, { type BlogPost } from './BlogClientWrapper';

export const dynamic = 'force-dynamic';

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      return [];
    }
    return data as BlogPost[];
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();
  return <BlogClientWrapper initialPosts={posts} />;
}
