// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Start seeding...')

  // 1. CLEANUP (Hapus data lama biar bersih)
  await prisma.application.deleteMany()
  await prisma.job.deleteMany()
  await prisma.category.deleteMany()
  await prisma.user.deleteMany()

  // 2. KATEGORI (Sesuai Data Kamu)
  const categoriesData = [
    'Food & Beverage (F&B)',
    'Retail & Penjualan',
    'Pendidikan & Tutor',
    'Logistik & Kurir',
    'Administrasi & Perkantoran',
    'Digital & Kreatif',
    'Event & Harian',
    'Jasa Pribadi & Rumah Tangga',
    'Manufaktur Ringan & Gudang',
    'Online / Remote'
  ]

  // Simpan kategori ke map biar gampang dipanggil nanti
  const catMap: Record<string, number> = {}

  for (const name of categoriesData) {
    const cat = await prisma.category.create({ data: { name } })
    catMap[name] = cat.id
    console.log(`Created Category: ${name}`)
  }

  // Password Hash (Semua user passwordnya: "123456")
  const hashedPassword = await bcrypt.hash('123456', 10)

  // 3. USER UMKM (Penyedia Kerja)
  
  // UMKM 1: Cafe
  const umkmCafe = await prisma.user.create({
    data: {
      email: 'owner@kopisenja.com',
      password: hashedPassword,
      name: 'Bpk. Herman (Kopi Senja)',
      role: 'UMKM',
      phone: '081234567890',
      address: 'Jl. Dago Atas No. 10, Bandung',
      businessName: 'Cafe Kopi Senja',
      businessType: 'Food & Beverage',
      businessDesc: 'Coffee shop kekinian dengan suasana nyaman untuk mahasiswa.'
    }
  })

  // UMKM 2: Retail
  const umkmRetail = await prisma.user.create({
    data: {
      email: 'hrd@majujaya.com',
      password: hashedPassword,
      name: 'Ibu Susi (Toko Maju)',
      role: 'UMKM',
      phone: '081987654321',
      address: 'Jl. Ahmad Yani No. 55, Bandung',
      businessName: 'Toko Maju Jaya',
      businessType: 'Retail',
      businessDesc: 'Toko kelontong modern dan grosir sembako.'
    }
  })

  // UMKM 3: Event Organizer
  const umkmEvent = await prisma.user.create({
    data: {
      email: 'admin@festive.id',
      password: hashedPassword,
      name: 'Festive Creative',
      role: 'UMKM',
      phone: '081299887766',
      address: 'Jl. Braga No. 20, Bandung',
      businessName: 'Festive EO',
      businessType: 'Event Organizer',
      businessDesc: 'Penyelenggara event musik dan festival lokal.'
    }
  })

  // 4. USER PEKERJA (Pencari Kerja)
  const worker1 = await prisma.user.create({
    data: {
      email: 'budi@gmail.com',
      password: hashedPassword,
      name: 'Budi Santoso',
      role: 'PEKERJA',
      phone: '085512345678',
      address: 'Jl. Tubagus Ismail',
      gender: 'L',
      birthDate: new Date('2003-05-15'),
      education: 'Mahasiswa ITB Semester 4',
      experience: 'Pernah jadi waiters 3 bulan.'
    }
  })

  const worker2 = await prisma.user.create({
    data: {
      email: 'siti@gmail.com',
      password: hashedPassword,
      name: 'Siti Aminah',
      role: 'PEKERJA',
      phone: '085587654321',
      address: 'Jl. Cisitu Lama',
      gender: 'P',
      birthDate: new Date('2004-08-20'),
      education: 'Mahasiswa Unpad Semester 2',
      experience: 'Admin Online Shop.'
    }
  })

  // 5. LOWONGAN KERJA (JOBS)

  // Job dari Cafe Kopi Senja
  const job1 = await prisma.job.create({
    data: {
      title: 'Barista Part-Time Malam',
      description: 'Dibutuhkan barista shift malam (18.00 - 23.00). Pengalaman tidak diutamakan, yang penting mau belajar.',
      salary: 100000,
      location: 'Dago Atas, Bandung',
      type: 'Part-Time',
      status: 'OPEN',
      categoryId: catMap['Food & Beverage (F&B)'],
      authorId: umkmCafe.id
    }
  })

  const job2 = await prisma.job.create({
    data: {
      title: 'Waiters Weekend',
      description: 'Melayani customer di hari Sabtu & Minggu. Cocok untuk mahasiswa.',
      salary: 80000,
      location: 'Dago Atas, Bandung',
      type: 'Part-Time',
      status: 'OPEN',
      categoryId: catMap['Food & Beverage (F&B)'],
      authorId: umkmCafe.id
    }
  })

  // Job dari Toko Maju Jaya
  const job3 = await prisma.job.create({
    data: {
      title: 'Kasir Toko',
      description: 'Menjaga kasir dan input data penjualan. Harus teliti menghitung uang.',
      salary: 120000,
      location: 'Cicadas, Bandung',
      type: 'Full-Time',
      status: 'OPEN',
      categoryId: catMap['Retail & Penjualan'],
      authorId: umkmRetail.id
    }
  })

  const job4 = await prisma.job.create({
    data: {
      title: 'Staff Gudang Ringan',
      description: 'Membantu packing barang dan stok opname harian.',
      salary: 90000,
      location: 'Gedebage, Bandung',
      type: 'Harian',
      status: 'OPEN',
      categoryId: catMap['Manufaktur Ringan & Gudang'],
      authorId: umkmRetail.id
    }
  })

  // Job dari Festive EO
  const job5 = await prisma.job.create({
    data: {
      title: 'Crew Konser Musik',
      description: 'Crew lapangan untuk event musik tanggal 30 Desember. Makan ditanggung.',
      salary: 200000,
      location: 'Lapangan Gasibu',
      type: 'Event',
      status: 'OPEN',
      categoryId: catMap['Event & Harian'],
      authorId: umkmEvent.id
    }
  })

  const job6 = await prisma.job.create({
    data: {
      title: 'Desainer Grafis Freelance',
      description: 'Membuat poster event instagram. Bisa kerjakan dari kosan.',
      salary: 300000,
      location: 'Remote / Online',
      type: 'Part-Time',
      status: 'OPEN',
      categoryId: catMap['Digital & Kreatif'],
      authorId: umkmEvent.id
    }
  })

  // Tambahan Job Random
  await prisma.job.create({
    data: {
      title: 'Guru Les Matematika SD',
      description: 'Mengajar anak SD kelas 4-6. Sabar menghadapi anak-anak.',
      salary: 75000,
      location: 'Antapani, Bandung',
      type: 'Part-Time',
      status: 'OPEN',
      categoryId: catMap['Pendidikan & Tutor'],
      authorId: umkmRetail.id // Anggaplah Ibu Susi cari guru buat anaknya
    }
  })

  await prisma.job.create({
    data: {
      title: 'Admin Online Shop',
      description: 'Balas chat customer di WhatsApp dan Shopee. Fast response.',
      salary: 1500000, // Gaji Bulanan
      location: 'Cibiru, Bandung',
      type: 'Part-Time',
      status: 'OPEN',
      categoryId: catMap['Online / Remote'],
      authorId: umkmCafe.id 
    }
  })

  // 6. SIMULASI LAMARAN (APPLICATIONS)
  
  // Budi melamar jadi Barista
  await prisma.application.create({
    data: {
      jobId: job1.id,
      workerId: worker1.id,
      status: 'INTERVIEW',
      note: 'Saya sangat suka kopi dan ingin belajar latte art.'
    }
  })

  // Budi melamar jadi Crew Konser
  await prisma.application.create({
    data: {
      jobId: job5.id,
      workerId: worker1.id,
      status: 'PENDING',
      note: 'Saya kuat angkat barang dan siap lembur.'
    }
  })

  // Siti melamar jadi Desainer
  await prisma.application.create({
    data: {
      jobId: job6.id,
      workerId: worker2.id,
      status: 'ACCEPTED',
      note: 'Portofolio desain sudah saya lampirkan di link profil.'
    }
  })

  console.log('✅ Seeding Finished! Database is now alive with dummy data.')
}

main()
  .then(async () => { await prisma.$disconnect() })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })