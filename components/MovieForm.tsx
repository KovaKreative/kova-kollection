'use client';

import { Link } from '@heroui/link';
import { Form, Input, Button } from '@heroui/react';
import { useState } from 'react';
export default function MovieForm() {

  const [titleQuery, setTitleQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState([]);
  const [movieInfo, setMovieInfo] = useState<{ details?: any, credits?: any; } | null>(null);

  const searchMovie = async function() {
    setSearchQuery([]);
    setMovieInfo(null);

    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${titleQuery}&include_adult=false&language=en-US&page=1`;

      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_ACCESS_TOKEN}`
        }
      };

      fetch(url, options)
        .then(res => res.json())
        .then(json => setSearchQuery(json.results))
        .catch(err => console.error(err));


    } catch (err) {
      console.log(err);
    }
  };

  const getMovieDetails = async function(movieId: number) {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_ACCESS_TOKEN}`
        }
      };

      await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
        .then(res => res.json())
        .then(json => setMovieInfo({ details: json, credits: null }))
        .catch(err => console.error(err));


      fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, options)
        .then(res => res.json())
        .then(json => setMovieInfo(prev => ({ ...prev, credits: json })))
        .catch(err => console.error(err));


    } catch (err) {
      console.log(err);
    }
  };


  return (
    <section>
      <Form onSubmit={e => {
        e.preventDefault();
        searchMovie();
      }
      }>
        <Input
          value={titleQuery}
          onValueChange={setTitleQuery}
          type="text"
          label="Title"
        />
        <Button type='submit'>Search</Button>
      </Form>
      {movieInfo === null ?

        searchQuery.length > 0
        &&
        searchQuery!.map((m: any, i) => {
          return <Button variant='ghost' className='border-none block w-full' radius='none' onPress={() => getMovieDetails(m.id)}>{m.title}</Button>;
        })

        :

        <p>{JSON.stringify(movieInfo.details.genres)}</p>

      }
    </section>
  );
}
