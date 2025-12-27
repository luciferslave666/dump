// src/app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      name, email, password, role, 
      phone, address, gender, birthDate, education, experience,
      businessName, businessType, businessDesc
    } = body;

    // 1. Cek Email
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: 'Email sudah terdaftar!' }, { status: 400 });
    }

    // 2. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Format Tanggal Lahir (Jika ada)
    const formattedBirthDate = birthDate ? new Date(birthDate) : null;

    // 4. Simpan ke Database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        phone,
        address,
        gender,
        birthDate: formattedBirthDate,
        education,
        experience,
        businessName,
        businessType,
        businessDesc
      },
    });

    return NextResponse.json({ message: 'Registrasi berhasil', user }, { status: 201 });
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json({ message: 'Terjadi kesalahan server' }, { status: 500 });
  }
}