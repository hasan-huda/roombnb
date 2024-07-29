import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phoneNumber: z.string().regex(
    /^(\+?1\s?(\([2-9]\d{2}\)|[2-9]\d{2})\s?\d{3}[-.\s]?\d{4})|(\+?\d{1,3}[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9})$/,
    { message: "Invalid phone number" }
  ).optional(),
});

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
        return NextResponse.json(
            { error: "Email is required" },
            { status: 400 }
        );
    }

    try {
        const user = await db.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { email, firstName, lastName, phoneNumber } = data;

    const user = await db.user.create({
      data: {
        email,
        firstName,
        lastName,
        phoneNumber,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
export async function PUT(request: NextRequest) {
    try {
        const data = await request.json();

        const {
            email,
            firstName,
            lastName,
            phoneNumber,
        } = data;

        if (!email) {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        const user = await db.user.update({
            where: { email },
            data: {
                firstName,
                lastName,
                phoneNumber,
  
            },
        });

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
