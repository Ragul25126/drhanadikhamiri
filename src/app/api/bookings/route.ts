import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { service, name, phone, email } = body;

    if (!service || !name || !phone || !email) {
      return Response.json({ error: 'All fields are required' }, { status: 400 });
    }
    if (!email.includes('@')) {
      return Response.json({ error: 'Invalid email address' }, { status: 400 });
    }
    if (phone.length < 8) {
      return Response.json({ error: 'Phone number must be at least 8 characters' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('bookings')
      .insert([{ service, patient_name: name, phone, email, status: 'booked', notes: '' }])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      return Response.json({ error: 'Failed to save booking' }, { status: 500 });
    }

    return Response.json({ message: 'Booking created', booking: data[0] }, { status: 201 });
  } catch (err) {
    console.error('Booking API error:', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
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
      return Response.json({ error: 'Failed to fetch bookings' }, { status: 500 });
    }

    return Response.json({ bookings: data });
  } catch (err) {
    console.error('Bookings GET error:', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return Response.json({ error: 'Booking id is required' }, { status: 400 });
    }

    // Only allow updating specific fields
    const allowed: Record<string, unknown> = {};
    if (updates.status !== undefined) allowed.status = updates.status;
    if (updates.notes !== undefined) allowed.notes = updates.notes;
    if (updates.patient_name !== undefined) allowed.patient_name = updates.patient_name;
    if (updates.phone !== undefined) allowed.phone = updates.phone;
    if (updates.email !== undefined) allowed.email = updates.email;
    if (updates.service !== undefined) allowed.service = updates.service;

    if (Object.keys(allowed).length === 0) {
      return Response.json({ error: 'No valid fields to update' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('bookings')
      .update(allowed)
      .eq('id', id)
      .select();

    if (error) {
      console.error('Supabase update error:', error);
      return Response.json({ error: 'Failed to update booking' }, { status: 500 });
    }

    return Response.json({ message: 'Booking updated', booking: data[0] });
  } catch (err) {
    console.error('Booking PATCH error:', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return Response.json({ error: 'Booking id is required' }, { status: 400 });
    }

    const { error } = await supabase.from('bookings').delete().eq('id', id);

    if (error) {
      console.error('Supabase delete error:', error);
      return Response.json({ error: 'Failed to delete booking' }, { status: 500 });
    }

    return Response.json({ message: 'Booking deleted' });
  } catch (err) {
    console.error('Booking DELETE error:', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
