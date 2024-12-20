import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const creator1 = await prisma.creator.create({
    data: {
      name: 'Creator One',
      email: 'creator1@example.com',
      description: 'The best membership in marketing',
      tags: ['Marketing', 'Fintech'],
    },
  });

  await prisma.membership.createMany({
    data: [
      {
        title: 'Basic Membership',
        price: 9.99,
        benefits: ['Access to basic content', 'Email support'],
        creatorId: creator1.id,
      },
      {
        title: 'Premium Membership',
        price: 19.99,
        benefits: ['Access to all content', 'Priority support'],
        creatorId: creator1.id,
      },
    ],
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
