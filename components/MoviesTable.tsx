'use client';

import React from 'react';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, getKeyValue } from "@heroui/table";

import { MovieList } from '@/types';

export default function MoviesTable({ movies }: { movies: MovieList[]; }) {

  const columns = [
    {
      key: "title",
      label: "Title"
    },
    {
      key: "franchise",
      label: "Franchise"
    },
    {
      key: "year",
      label: "Released"
    },
    {
      key: "genres",
      label: "Genre"
    },
    {
      key: "director",
      label: "Director"
    },
    {
      key: "cast",
      label: "Cast"
    },
    {
      key: "crew",
      label: "Crew"
    },
    {
      key: "formats",
      label: "Format"
    },
    {
      key: "watched",
      label: "Watched"
    }
  ];

  console.log(columns);

  const rows = movies.map((m, i) => {
    return {
      key: m.id + i,
      title: m.title,
      franchise: m.franchise?.name,
      year: m.year,
      genres: m.genres.map(g => g.genre.name).join(', '),
      director: m.director?.name,
      cast: m.cast.map(c => c.person.name).join(', '),
      crew: m.crew.map(c => c.person.name).join(', '),
      formats: m.formats.map(f => f.format.name).join(' | '),
      watched: m.watched?.toString() || "n/a"
    };
  });

  return (
    <Table aria-label='List of all the movies'>
      <TableHeader columns={columns}>
        {column => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
