import React from 'react';
import { prisma } from '@/prisma/globalPrismaClientInstance';
import { title, subtitle } from '@/components/primitives';
import { Button } from '@heroui/button';
import { MovieList } from '@/types';
import MoviesTable from '@/components/MoviesTable';
import { Link } from '@heroui/link';

export default async function Movies() {

  const movies: MovieList[] = await prisma.movie.findMany({
    include: {
      cast: {
        include: {
          person: true
        }
      },
      crew: {
        include: {
          person: true
        }
      },
      director: true,
      formats: {
        include: {
          format: true
        }
      },
      franchise: true,
      genres: {
        include: {
          genre: true
        }
      }
    }
  });

  return (
    <section>
      <h2 className={subtitle()}>
        Movie List
      </h2>
      <Button as={Link} href='/movies/new' >+ Add Movie</Button>
      <MoviesTable movies={[...movies, ...movies, ...movies, ...movies]} />
    </section>
  );
}
