// The movie and series pages have not been translated into English. You can easily create both versions or more.

import React, { useEffect, useState } from "react";
import { parse } from "cookie";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import MovieCard from "@/components/MovieCard";
import NavBar from "@/components/Navbar";
import getMovieData from "@/services/getMovieData";
import Paginations from "@/components/Pagination";
import Search from "@/components/Search";
import {
  Chip,
  Code,
  Select,
  SelectItem,
  Divider,
  Button,
  Link,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import useQueryParams from "@/hooks/useQueryParams";

interface Movie {
  id: number;
}

interface FilmesProps {
  user: {
    username: string;
    avatar: string;
    id: string;
  } | null;
  cone: any;
  token: string | null;
  topMoviesData: {
    results: Movie[];
    total_pages: number;
  };
  page: number;
}

const apiPageLimit = 500;

const MoviesPage: React.FC<FilmesProps> = ({
  user,
  cone,
  token,
  topMoviesData,
  page,
}) => {
  const { results: topMoviesList, total_pages: totalPages } = topMoviesData;
  const numberOfPages = totalPages > apiPageLimit ? apiPageLimit : totalPages;

  const [isBlocked, setIsBlocked] = useState<boolean>(false);

  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const search = useQueryParams("search");

  const handleCategoryClick = (category: string | null) => {
    if (category !== selectedCategory) {
      setSelectedCategory((category) => category);
      router.push({
        pathname: "/tv",
        query: { category },
      });
    } else if (search) {
      setSelectedCategory((category) => category);
      router.push({
        pathname: "/tv",
        query: { category, search: null },
      });
    }
  };

  // Below is a blocker designed for those who do not reside in Brazil due to a lack of English translation!
  useEffect(() => {
    const checkLocation = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();

        if (data.country !== "BR") {
          setIsBlocked(true);
        }
      } catch (error) {
        console.error("Erro ao obter informações de geolocalização:", error);
      }
    };

    checkLocation();
  }, []);

  if (isBlocked) {
    return (
      <>
        <NavBar user={user} cone={cone} token={token} />
        <center>
          <div className="p-4 md:p-20 pb-6 min-h-[calc(100vh-5.6rem)] ">
            <Code size="lg">
              <Chip
                startContent={<i className="fas fa-times-circle"></i>}
                variant="faded"
                color="warning"
                className="mr-2 max-w-[300px]"
              >
                Warning
              </Chip>
              This page is not available in this region.
            </Code>
          </div>
        </center>
      </>
    );
  }

  return (
    <>
      <NavBar user={user} cone={cone} token={token} />

      <div className="flex justify-center mt-5">
        {selectedCategory ? (
          <h2 className="texto">{selectedCategory}</h2>
        ) : null}
      </div>
      <div className="mt-2 flex justify-center gap-3">
        <Select
          label="Categoria"
          placeholder="Seleciona uma Categoria"
          defaultSelectedKeys={["Todos"]}
          className="max-w-xs"
        >
          <SelectItem key="Todos" onClick={() => handleCategoryClick("")}>
            Todos
          </SelectItem>
          <SelectItem
            key="Netflix"
            onClick={() => handleCategoryClick("netflix")}
          >
            Netflix
          </SelectItem>
          <SelectItem
            key="Crunchyroll"
            onClick={() => handleCategoryClick("crunchyroll")}
          >
            Crunchyroll
          </SelectItem>
          <SelectItem
            key="Disney"
            onClick={() => handleCategoryClick("disney")}
          >
            Disney
          </SelectItem>
          <SelectItem
            key="GloboPlay"
            onClick={() => handleCategoryClick("globoplay")}
          >
            GloboPlay
          </SelectItem>
          <SelectItem key="HBO MAX" onClick={() => handleCategoryClick("hbo")}>
            HBO MAX
          </SelectItem>
        </Select>
      </div>

      <div className="flex justify-center mt-5 h-5 items-center space-x-4 text-small">
        <Button color="secondary" isDisabled>
          Filmes
        </Button>
        <Divider orientation="vertical" />
        <Button color="secondary" as={Link} href="/tv/serie">
          Séries
        </Button>
      </div>

      <center className="mt-20 mb-[-30px] ">
        <Search />
      </center>

      <div className="p-4 md:p-20 pb-6 min-h-[calc(100vh-5.6rem)] ">
        {topMoviesList.length > 0 ? (
          <span className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-4 items-center text-cultured cursor-pointer transition-transform duration-200 hover:transform-[scale(1.1)]">
            {topMoviesList.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </span>
        ) : (
          <center>
            <div className="mb-3">
              <Code size="lg">
                <Chip
                  startContent={<i className="fas fa-times-circle"></i>}
                  variant="faded"
                  color="warning"
                  className="mr-2"
                >
                  Aviso
                </Chip>
                Nenhum resultado encontrado!
              </Code>
            </div>
            <div className="max-w-[300px]">
              <Accordion variant="shadow">
                <AccordionItem
                  key="1"
                  aria-label="Possível problema #1"
                  title="Possível problema #1"
                >
                  <blockquote>
                    {" "}
                    O título não foi encontrado ou não existe!
                  </blockquote>
                </AccordionItem>
                <AccordionItem
                  key="2"
                  aria-label="Possível problema #2"
                  title="Possível problema #2"
                >
                  <blockquote>Developer: Invalid API key</blockquote>
                </AccordionItem>
              </Accordion>
            </div>
          </center>
        )}
        <center>
          <div className="mt-5 ">
            <Paginations totalPages={numberOfPages} initialPage={page} />
          </div>
        </center>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const cookies = parse(context.req.headers.cookie || "");
  const user = cookies.discordUser
    ? JSON.parse(decodeURIComponent(cookies.discordUser))
    : null;
  const cone = cookies.discordCone
    ? JSON.parse(decodeURIComponent(cookies.discordCone))
    : null;
  const token = cookies.discordToken || null;

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const apiLanguage = process.env.NEXT_PUBLIC_API_LANGUAGE;
  const apiPath = process.env.NEXT_PUBLIC_API_PATH;

  const page = context.query?.page || 1;
  const search = context.query?.search || null;
  const selectedCategory = context.query?.category || null;

  let moviesUrl;

  if (search) {
    moviesUrl = `search/movie?api_key=${apiKey}&${apiLanguage}&query=${search}&page=${page}`;
  } else {
    if (selectedCategory) {
      switch (selectedCategory) {
        case "netflix":
          moviesUrl = `/discover/movie?air_date.lte=&certification_country=BR&page=${page}&show_me=0&sort_by=popularity.desc&vote_average.gte=0&vote_average.lte=10&vote_count.gte=0&watch_region=BR&with_watch_providers=8&with_runtime.gte=0&with_runtime.lte=400&${apiLanguage}&api_key=${apiKey}`;
          break;
        case "disney":
          moviesUrl = `/discover/movie?air_date.lte=&certification_country=BR&page=${page}&show_me=0&sort_by=popularity.desc&vote_average.gte=0&vote_average.lte=10&vote_count.gte=0&watch_region=BR&with_watch_providers=337&with_runtime.gte=0&with_runtime.lte=400&${apiLanguage}&api_key=${apiKey}`;
          break;
        case "globoplay":
          moviesUrl = `/discover/movie?air_date.lte=&certification_country=BR&page=${page}&show_me=0&sort_by=popularity.desc&vote_average.gte=0&vote_average.lte=10&vote_count.gte=0&watch_region=BR&with_watch_providers=307&with_runtime.gte=0&with_runtime.lte=400&${apiLanguage}&api_key=${apiKey}`;
          break;
        case "hbo":
          moviesUrl = `/discover/movie?air_date.lte=&certification_country=BR&page=${page}&show_me=0&sort_by=popularity.desc&vote_average.gte=0&vote_average.lte=10&vote_count.gte=0&watch_region=BR&with_watch_providers=384&with_runtime.gte=0&with_runtime.lte=400&${apiLanguage}&api_key=${apiKey}`;
          break;
        case "crunchyroll":
          moviesUrl = `/discover/movie?air_date.lte=&certification_country=BR&page=${page}&show_me=0&sort_by=popularity.desc&vote_average.gte=0&vote_average.lte=10&vote_count.gte=0&watch_region=BR&with_watch_providers=283%7C478&with_runtime.gte=0&with_runtime.lte=400&${apiLanguage}&api_key=${apiKey}`;
          break;
        default:
          break;
      }
    } else {
      moviesUrl = `movie/popular?api_key=${apiKey}&${apiLanguage}&page=${page}`;
    }
  }

  const topMoviesData = await getMovieData(`${apiPath}${moviesUrl}`);

  const serializedData = JSON.parse(JSON.stringify(topMoviesData));

  return {
    props: {
      user,
      cone,
      token,
      topMoviesData: serializedData,
      page,
      selectedCategory,
    },
  };
};

export default MoviesPage;
