import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { authorId } = await request.json();

    const jobs = await prisma.job.findMany({
      where: { authorId: Number(authorId) },
      include: {
        applicants: { // Ambil daftar pelamar
          include: { worker: true }, // Sertakan biodata pelamar
          orderBy: { createdAt: 'desc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching candidates' }, { status: 500 });
  }
}