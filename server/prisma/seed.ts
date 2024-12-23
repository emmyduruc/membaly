import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      name: 'User One',
      role: 'USER',
      verified: true,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      name: 'User Two',
      role: 'CREATOR',
      verified: true,
    },
  });

  const membership1 = await prisma.membership.create({
    data: {
      title: 'Membership One',
      description: 'Description of Membership One',
      price: 29.99,
      benefits: ['Benefit 1', 'Benefit 2'],
      tags: ['Tag1', 'Tag2'],
      pictures: ['pic1.jpg', 'pic2.jpg'],
      creatorId: user2.id,
    },
  });

  const membership2 = await prisma.membership.create({
    data: {
      title: 'Membership Two',
      description: 'Description of Membership Two',
      price: 49.99,
      benefits: ['Benefit A', 'Benefit B'],
      tags: ['TagA', 'TagB'],
      pictures: ['picA.jpg', 'picB.jpg'],
      creatorId: user2.id,
    },
  });

  await prisma.rating.createMany({
    data: [
      {
        score: 4,
        comment: 'Great membership!',
        userId: user1.id,
        membershipId: membership1.id,
      },
      {
        score: 5,
        comment: 'Excellent membership!',
        userId: user1.id,
        membershipId: membership2.id,
      },
    ],
  });

  await prisma.recommendation.createMany({
    data: [
      { recommenderId: user1.id, membershipId: membership1.id },
      { recommenderId: user1.id, membershipId: membership2.id },
    ],
  });

  await prisma.favorite.createMany({
    data: [
      { userId: user1.id, membershipId: membership1.id },
      { userId: user1.id, membershipId: membership2.id },
    ],
  });

  await prisma.successStory.createMany({
    data: [
      {
        title: 'Success Story One',
        content: 'Content of Success Story One',
        media: ['media1.jpg', 'media2.mp4'],
        userId: user2.id,
        membershipId: membership1.id,
      },
      {
        title: 'Success Story Two',
        content: 'Content of Success Story Two',
        media: ['mediaA.jpg', 'mediaB.mp4'],
        userId: user2.id,
        membershipId: membership2.id,
      },
    ],
  });

  await prisma.subscription.createMany({
    data: [
      { userId: user1.id, tier: 'Basic' },
      { userId: user2.id, tier: 'Premium' },
    ],
  });

  await prisma.category.createMany({
    data: [
      { name: 'Marketing', description: 'Marketing-related memberships' },
      { name: 'Fintech', description: 'Fintech-related memberships' },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
