import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, password, ...dataToUpdate } = body;

    // Jika user ingin ganti password, kita hash dulu
    if (password) {
      dataToUpdate.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: dataToUpdate,
    });

    // Hapus password dari return agar aman
    const { password: _, ...userSafe } = updatedUser;

    return NextResponse.json(userSafe);
  } catch (error) {
    return NextResponse.json({ message: 'Gagal update profil' }, { status: 500 });
  }
}