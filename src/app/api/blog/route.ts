import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
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
    const { title, category, excerpt, image, content } = body;

    if (!title || !category || !excerpt) {
      return Response.json({ error: 'Title, category, and excerpt are required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .insert([{ title, category, excerpt, image: image || '', content: content || '' }])
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
