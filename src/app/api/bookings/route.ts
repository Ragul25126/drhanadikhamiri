import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { service, name, phone, email } = body;

    // Basic validation
    if (!service || !name || !phone || !email) {
      return Response.json(
        { error: 'All fields are required: service, name, phone, email' },
        { status: 400 }
      );
    }

    if (!email.includes('@')) {
      return Response.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    if (phone.length < 8) {
      return Response.json(
        { error: 'Phone number must be at least 8 characters' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          service,
          patient_name: name,
          phone,
          email,
          status: 'pending',
        },
      ])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      return Response.json(
        { error: 'Failed to save booking. Please try again.' },
        { status: 500 }
      );
    }

    return Response.json(
      { message: 'Booking created successfully', booking: data[0] },
      { status: 201 }
    );
  } catch (err) {
    console.error('Booking API error:', err);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase fetch error:', error);
      return Response.json(
        { error: 'Failed to fetch bookings' },
        { status: 500 }
      );
    }

    return Response.json({ bookings: data });
  } catch (err) {
    console.error('Bookings GET error:', err);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
