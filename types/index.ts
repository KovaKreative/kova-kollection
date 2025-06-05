import { Prisma } from "@prisma/client";

export type MovieList = Prisma.MovieGetPayload<{
  include: {
    cast: {
      include: {
        person: true;
      };
    };
    crew: {
      include: {
        person: true;
      };
    };
    director: true;
    formats: {
      include: {
        format: true;
      };
    };
    franchise: true;
    genres: {
      include: {
        genre: true;
      };
    };
  };
}>;