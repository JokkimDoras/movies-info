import React from "react";
import { useEffect, useState } from "react";
import MoviesList from "../../components/MoviesList/MoviesList.tsx";
import getApi from "../../components/api.ts";
import { toast } from "react-toastify";
import {
  MoviesContainer,
  MoviesTitle,
  Container,
} from "./HomePage.styled.js";
import type { MovieResponse,Movie } from "../../types/movie.types.ts";

export default function HomePage() {
  const [trending, setTrending] = useState<Movie[]>([]);

  useEffect(() => {
    if (trending.length > 0) {
      return;
    }

    async function api() {
      try {
        const data:MovieResponse = await getApi();
        setTrending(data.results);
      } catch (error) {
        toast.error("Oops, something went wrong! Reload this page!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
    api();
  }, [trending]);

  return (
    <Container>
      <MoviesContainer>
        <MoviesTitle>Trending Today</MoviesTitle>
        <MoviesList movies={trending} />
      </MoviesContainer>
    </Container>
  );
}
