// app/api/rentals/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { z } from 'zod';

const rentalSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  maxGuests: z.number().int().optional(),
  bedrooms: z.number().int().optional(),
  bathrooms: z.number().int().optional(),
  pricePerNight: z.number().positive().optional(),
  instantBooking: z.boolean().optional(),
  locationId: z.number().int().optional(),
});

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const rental = await db.rental.findUnique({
      where: { id: parseInt(id) },
      include: {
        images: true,
        availability: true,
        reviews: true,
        amenities: true,
        bookings: true,
      },
    });

    if (!rental) {
      return NextResponse.json({ error: 'Rental not found' }, { status: 404 });
    }

    return NextResponse.json(rental);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const data = await request.json();

    // Validate the data against the schema
    const parsedData = rentalSchema.parse(data);

    const rental = await db.rental.update({
      where: { id: parseInt(id) },
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

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    await db.rental.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'Rental deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}