
import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// POST /api/contact - Handle contact form submissions
export const POST = async (req: NextRequest) => {
  const supabase = await createClient();

  try {
    const { name, email, subject, message } = await req.json();

    // Server-side validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Basic email format validation
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Option 2 (Database Storage): Save the contact inquiry to a dedicated contact_inquiries table
    // First, we need to ensure the 'contact_inquiries' table exists in the Supabase schema.
    // Assuming a table structure like: id (uuid), name (text), email (text), subject (text), message (text), created_at (timestamp)
    const { data, error } = await supabase
      .from('contact_inquiries')
      .insert({
        name,
        email,
        subject,
        message,
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving contact inquiry:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Option 1 (Email Service): If an email service was integrated, this is where you'd send the email.
    // For example: await sendEmail(name, email, subject, message);
    console.log('Contact inquiry saved:', data);

    return NextResponse.json({ message: 'Your inquiry has been sent successfully!' }, { status: 200 });

  } catch (error) {
    console.error('Error processing contact form submission:', error);
    return NextResponse.json({ error: 'Failed to process inquiry' }, { status: 500 });
  }
};
