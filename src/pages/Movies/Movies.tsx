import React from "react";
import { Container, MoviesContainer } from "./Movies.styled.js";
import SearchBar from "../../components/SearchBar/SearchBar.tsx";
import { useEffect, useState } from "react";
import { apiSearchMovies } from "../../components/api.ts";
import MoviesList from "../../components/MoviesList/MoviesList.tsx";
import Button from "../../components/ButtonLoadMore/Button.tsx";
import Loader from "../../components/Loader/Loader.tsx";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import type { MovieResponse,Movie } from "../../types/movie.types.ts";


export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [btnLoadMore, setBtnLoadMore] = useState<boolean>(false);

  const query = searchParams.get("query") ?? "";

  async function getSearchMovies(e:any) {
    e.preventDefault();

    const queryEl = e.target.search.value

    if (queryEl === "") {
      toast.info("Enter your request, please!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (queryEl === query) {
      toast.info("Enter new request, please!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    setSearchParams({ query: queryEl });

    setPage(1);
    setMovies([]);
  }

  function onLoadMoreClick() {
    setPage((page) => page + 1);
  }

  useEffect(() => {
    if (query === "") {
      return;
    }

    async function searchMovie() {
      try {
        setLoading(true);
        setError(false);
        const data:MovieResponse = await apiSearchMovies(query, page);
       
        const totalPage = Math.ceil(data.total_results / data.results.length);

        if (page === 1) {
          setMovies([...data.results]);
        } else {
          setMovies((movies) => [...movies, ...data.results]);
        }

        if (data.total_results) {
          if (data.results.length !== 0 && totalPage <= data.total_pages) {
            setBtnLoadMore(true);
          } else {
            toast.info(
              "We're sorry, but you've reached the end of search results.",
              {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
                theme: "light",
              }
            );
            setBtnLoadMore(false);
          }
        }

        if (page < 2) {
          if (data.total_results === 0) {
            toast.info(
              "Sorry, we couldn't find any movies matching your search.",
              {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
                theme: "light",
              }
            );
          } else {
            toast.success(`Hooray! We've found ${data.total_results} movies!`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              progress: undefined,
              theme: "light",
            });
          }
        }
      } catch (error) {
        setError(true);
        toast.error("Oops, something went wrong! Reload this page!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "light",
        });
      } finally {
        setLoading(false);
      }
    }
    searchMovie();
  }, [query, page]);

  return (
    <Container>
      <SearchBar value={query} onSearch={getSearchMovies} />
      {movies.length > 0 && (
        <MoviesContainer>
          <MoviesList movies={movies} />
        </MoviesContainer>
      )}
      {movies.length !== 0 && btnLoadMore && (
        <Button onClick={onLoadMoreClick} />
      )}
      {loading && <Loader />}
      {error && toast.error("Oops, something went wrong! Reload this page!")}
    </Container>
  );
}
