// src/app/api/jobs/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Pastikan import helper prisma yg kita buat sebelumnya

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      title, description, salary, location, type, categoryId, authorId 
    } = body;

    // Validasi sederhana
    if (!title || !salary || !categoryId || !authorId) {
      return NextResponse.json({ message: 'Data tidak lengkap' }, { status: 400 });
    }

    // Simpan ke Database
    const job = await prisma.job.create({
      data: {
        title,
        description,
        salary: Number(salary),     // Pastikan jadi number
        location,
        type,
        categoryId: Number(categoryId), // Pastikan jadi number
        authorId: Number(authorId)      // Pastikan jadi number
      }
    });

    return NextResponse.json({ message: 'Lowongan berhasil dibuat', job }, { status: 201 });

  } catch (error) {
    console.error("Job Error:", error);
    return NextResponse.json({ message: 'Gagal membuat lowongan' }, { status: 500 });
  }
}