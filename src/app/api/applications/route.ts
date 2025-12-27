// src/app/api/applications/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { jobId, workerId, note } = body;

    // 1. Validasi Data
    if (!jobId || !workerId) {
      return NextResponse.json({ message: 'Data tidak lengkap' }, { status: 400 });
    }

    // 2. Cek apakah user ini SUDAH pernah melamar job ini?
    const existingApp = await prisma.application.findFirst({
      where: {
        jobId: Number(jobId),
        workerId: Number(workerId)
      }
    });

    if (existingApp) {
      return NextResponse.json({ message: 'Kamu sudah melamar posisi ini sebelumnya.' }, { status: 400 });
    }

    // 3. Simpan Lamaran Baru
    const application = await prisma.application.create({
      data: {
        jobId: Number(jobId),
        workerId: Number(workerId),
        note: note || '',
        status: 'PENDING'
      }
    });

    return NextResponse.json({ message: 'Lamaran berhasil dikirim!', application }, { status: 201 });

  } catch (error) {
    console.error("Apply Error:", error);
    return NextResponse.json({ message: 'Gagal mengirim lamaran' }, { status: 500 });
  }
}