// app/api/rentals/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { z } from 'zod';

// Define the schema for creating a rental
const rentalSchema = z.object({
  title: z.string(),
  description: z.string(),
  maxGuests: z.number().int(),
  bedrooms: z.number().int(),
  bathrooms: z.number().int(),
  pricePerNight: z.number().positive(),
  instantBooking: z.boolean().optional(),
  locationId: z.number().int(),
});

export async function GET() {
  try {
    const rentals = await db.rental.findMany({
      include: {
        images: true,
        availability: true,
        reviews: true,
        amenities: true,
        bookings: true,
      },
    });

    return NextResponse.json(rentals);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate the data against the schema
    const parsedData = rentalSchema.parse(data);

    const rental = await db.rental.create({
      data: parsedData,
    });

    return NextResponse.json(rental);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Return validation errors
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}