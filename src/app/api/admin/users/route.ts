import { getSupabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    const adminClient = getSupabaseAdmin();
    const { data, error } = await adminClient.auth.admin.listUsers();

    if (error) {
      console.error('Supabase listUsers error:', error);
      return Response.json({ error: error.message || 'Failed to list users' }, { status: 500 });
    }

    const users = data.users.map((u) => ({
      id: u.id,
      email: u.email || 'No email',
      created_at: u.created_at,
      last_sign_in_at: u.last_sign_in_at || null,
    }));

    return Response.json({ users });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Internal server error';
    console.error('Admin users GET error:', err);
    return Response.json({ error: msg }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return Response.json({ error: 'Email and password are required' }, { status: 400 });
    }
    if (password.length < 6) {
      return Response.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    const adminClient = getSupabaseAdmin();
    const { data, error } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (error) {
      console.error('Supabase createUser error:', error);
      return Response.json({ error: error.message || 'Failed to create user' }, { status: 500 });
    }

    return Response.json({ message: 'User created successfully', user: data.user }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Internal server error';
    console.error('Admin users POST error:', err);
    return Response.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return Response.json({ error: 'User id is required' }, { status: 400 });
    }

    const adminClient = getSupabaseAdmin();
    const { error } = await adminClient.auth.admin.deleteUser(id);

    if (error) {
      console.error('Supabase deleteUser error:', error);
      return Response.json({ error: error.message || 'Failed to delete user' }, { status: 500 });
    }

    return Response.json({ message: 'User deleted successfully' });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Internal server error';
    console.error('Admin users DELETE error:', err);
    return Response.json({ error: msg }, { status: 500 });
  }
}
