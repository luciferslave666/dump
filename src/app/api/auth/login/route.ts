// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // 1. Cari User berdasarkan Email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json({ message: 'Email tidak ditemukan' }, { status: 404 });
    }

    // 2. Cek Password (Bandingkan hash)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Password salah' }, { status: 401 });
    }

    // 3. Login Berhasil - Kembalikan data user (TANPA Password)
    const { password: _, ...userData } = user; // Buang field password

    return NextResponse.json({
      message: 'Login berhasil',
      user: userData 
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: 'Terjadi kesalahan server' }, { status: 500 });
  }
}