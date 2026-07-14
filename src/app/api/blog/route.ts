import { getSupabaseAdmin } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    const supabase = getSupabaseAdmin();

    if (slug) {
      // Fetch single post by slug
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        return Response.json({ error: 'Post not found' }, { status: 404 });
      }
      return Response.json({ post: data });
    }

    // Fetch all posts
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase blog fetch error:', error);
      return Response.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
    }

    return Response.json({ posts: data });
  } catch (err) {
    console.error('Blog GET error:', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, slug, category, excerpt, image, content } = body;

    if (!title || !category || !excerpt) {
      return Response.json({ error: 'Title, category, and excerpt are required' }, { status: 400 });
    }

    // Auto-generate slug from title if not provided
    const finalSlug = slug || title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([{ title, slug: finalSlug, category, excerpt, image: image || '', content: content || '' }])
      .select();

    if (error) {
      console.error('Supabase blog insert error:', error);
      return Response.json({ error: 'Failed to create blog post' }, { status: 500 });
    }

    return Response.json({ message: 'Blog post created', post: data[0] }, { status: 201 });
  } catch (err) {
    console.error('Blog POST error:', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return Response.json({ error: 'Blog post id is required' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);

    if (error) {
      console.error('Supabase blog delete error:', error);
      return Response.json({ error: 'Failed to delete blog post' }, { status: 500 });
    }

    return Response.json({ message: 'Blog post deleted' });
  } catch (err) {
    console.error('Blog DELETE error:', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
