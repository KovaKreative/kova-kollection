// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Genres
  const genres = ['Action', 'Sci-Fi', 'Drama', 'Horror', 'Comedy'].map(name =>
    prisma.genre.upsert({
      where: { name },
      update: {},
      create: { name },
    })
  );

  // Formats
  const formats = ['Blu-Ray', 'DVD', 'Digital', '4K Blu-Ray'].map(name =>
    prisma.format.upsert({
      where: { name },
      update: {},
      create: { name },
    })
  );

  // Franchises
  const franchises = ['Blade Runner', 'Alien', 'The Matrix'].map(name =>
    prisma.franchise.upsert({
      where: { name },
      update: {},
      create: { name },
    })
  );

  // People (Actors, Directors, Crew)
  const peopleNames = [
    'Ryan Gosling',
    'Harrison Ford',
    'Ana de Armas',
    'Denis Villeneuve',
    'Hampton Fancher',
    'Roger Deakins',
  ];

  const people = peopleNames.map(name =>
    prisma.person.upsert({
      where: { name },
      update: {},
      create: { name },
    })
  );

  await Promise.all([...genres, ...formats, ...franchises, ...people]);

  const [
    action, sciFi, drama,
  ] = await prisma.genre.findMany();

  const [
    bluRay, dvd, digital,
  ] = await prisma.format.findMany();

  const [
    franchiseBladeRunner,
  ] = await prisma.franchise.findMany({
    where: { name: 'Blade Runner' },
  });

  const director = await prisma.person.findUnique({
    where: { name: 'Denis Villeneuve' },
  });
  // Explicitly typing these helps TypeScript know what to expect
  const cast: { id: string; }[] = await prisma.person.findMany({
    where: {
      name: {
        in: ['Ryan Gosling', 'Harrison Ford', 'Ana de Armas'],
      },
    },
    select: { id: true }, // only fetch IDs
  });

  const crew: { id: string; }[] = await prisma.person.findMany({
    where: {
      name: {
        in: ['Hampton Fancher', 'Roger Deakins'],
      },
    },
    select: { id: true }, // only fetch IDs
  });


  const movie = await prisma.movie.create({
    data: {
      title: 'Blade Runner 2049',
      year: 2017,
      watched: new Date('2023-08-15'),
      director: { connect: { id: director!.id } },
      franchise: { connect: { id: franchiseBladeRunner.id } },
      genres: {
        create: [
          { genre: { connect: { id: action.id } } },
          { genre: { connect: { id: sciFi.id } } },
          { genre: { connect: { id: drama.id } } },
        ],
      },
      formats: {
        create: [
          { format: { connect: { id: bluRay.id } } },
          { format: { connect: { id: digital.id } } },
        ],
      },
      cast: {
        create: cast.map((actor) => ({
          person: { connect: { id: actor.id } },
        })),
      },
      crew: {
        create: crew.map((person) => ({
          person: { connect: { id: person.id } },
        })),
      },
    },
  });

  console.log('Seeded movie:', movie.title);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
