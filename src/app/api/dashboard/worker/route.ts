import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { workerId } = await request.json(); // Kita kirim ID user dari frontend

    const applications = await prisma.application.findMany({
      where: { workerId: Number(workerId) },
      include: {
        job: {
          include: { author: true } // Ambil info Job & Info Perusahaan
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(applications);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}