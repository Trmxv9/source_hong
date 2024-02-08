import React, { useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Divider,
  Button,
  User,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import NavBar from "@/components/Navbar";

import getMovieData from "@/services/getMovieData";
import formatDate from "@/utils/formatDate";

import MovieRating from "@/components/MovieRating";

import { useRouter } from "next/router";

interface MovieProps {
  movie: {
    backdrop_path: string;
    name: string;
    id: string;
    runtime: number;
    genres: { id: number; name: string }[];
    overview: string;
    vote_average: number;
    vote_count: number;
    first_air_date: string;
    seasons: number;
  };
  user: {
    username: string;
    avatar: string;
    id: string;
  } | null;
  cone: any;
  token: string | null;
  imdbid: string;
  mainCast: {
    id: number;
    name: string;
    profile_path: string;
    character: string;
  }[];
  trailerD: { name: string; key: string }[];
}

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const apiLanguage = process.env.NEXT_PUBLIC_API_LANGUAGE;
const apiImgPath = process.env.NEXT_PUBLIC_API_IMG_PATH;

export default function Movie({
  movie,
  mainCast,
  trailerD,
  imdbid,
  user,
  cone,
  token,
}: MovieProps) {
  const src = movie.backdrop_path
    ? `${apiImgPath}w1280${movie.backdrop_path}`
    : `/images/no_image.png`;

  const {
    name,
    genres,
    overview,
    id,
    vote_average: voteAverage,
    vote_count: voteCount,
    first_air_date: releaseDate,
  } = movie;

  const [selectedTrailerIndex, setSelectedTrailerIndex] = useState<
    number | null
  >(null);

  const handleOpen = (index: number) => {
    setSelectedTrailerIndex(index);
  };

  const onClose = () => {
    setSelectedTrailerIndex(null);
  };

  const composeList = (dataArray: { id: number; name: string }[]) =>
    dataArray.map((data, index) => (
      <span key={data.id}>
        {index !== dataArray.length - 1 ? `${data.name}, ` : data.name}
      </span>
    ));

  const composeAt = (
    dataArray: {
      id: number;
      name: string;
      profile_path: string;
      character: string;
    }[]
  ) =>
    dataArray.map((data, index) => (
      <User
        key={data.id}
        name={index !== dataArray.length - 1 ? `${data.name} ` : data.name}
        description={data.character}
        avatarProps={{
          size: "lg",
          src: `https://image.tmdb.org/t/p/w1280${data.profile_path}`,
        }}
      />
    ));

  const composeTrailer = (trailer: { name: string; key: string }[]) =>
    trailer.map((data, index) => (
      <span key={data.key}>
        <Modal
          backdrop="blur"
          isOpen={selectedTrailerIndex === index}
          onClose={onClose}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {index !== trailer.length - 1 ? `${data.name}` : data.name}
                </ModalHeader>
                <ModalBody>
                  <iframe
                    src={`https://www.youtube.com/embed/${data.key}`}
                    title="YouTube video player"
                    width="100%"
                    height="350px"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </ModalBody>
                <ModalFooter>
                  <Button color="warning" variant="light" onPress={onClose}>
                    Voltar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <Button color="secondary" onPress={() => handleOpen(index)}>
          {index !== trailer.length - 1 ? `${data.name}` : data.name}{" "}
          <i className="fas fa-play"></i>
        </Button>
      </span>
    ));

  const router = useRouter();

  const handleVoltar = () => {
    router.back();
  };

  const showInfos = releaseDate !== "" || voteCount !== 0 || voteAverage !== 0;

  return (
    <>
      <NavBar user={user} cone={cone} token={token} />
      <div>
        <center>
          <Card className="py-4 max-w-[800px] mt-5 mb-5">
            <CardBody className="overflow-visible py-2">
              <Image
                alt=""
                className="object-cover rounded-xl w-max"
                src={src}
              />
            </CardBody>

            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <h4 className="font-bold text-large mb-3">{name}</h4>
              <div className="flex gap-2">
                <Button onClick={handleVoltar} color="danger" variant="shadow">
                  Voltar
                </Button>
              </div>

              {trailerD && trailerD.length > 0 && (
                <>
                  <Divider className="my-4" />
                  <p className="text-tiny uppercase text-[17px] mb-3 font-bold">
                    Trailer
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {composeTrailer(trailerD)}
                  </div>
                </>
              )}

              {overview && overview.length > 0 && (
                <>
                  <Divider className="my-4" />
                  <p className="text-tiny uppercase text-[17px] mb-3 font-bold">
                    Sinopse
                  </p>
                  <blockquote>{overview}</blockquote>
                </>
              )}

              <Divider className="my-4" />
              {showInfos && (
                <>
                  {" "}
                  <p className="text-tiny uppercase text-[17px] mb-3 font-bold">
                    Infos
                  </p>
                  <small className="text-default-500 flex">
                    <div className="flex h-5 items-center space-x-4 text-small">
                      {releaseDate === "" ? null : (
                        <>
                          <div>
                            {formatDate(releaseDate)}{" "}
                            <i className="fa-regular fa-calendar-clock text-rose-50"></i>
                          </div>
                          <Divider orientation="vertical" />
                        </>
                      )}
                      {voteCount === 0 ? null : (
                        <>
                          <div>
                            {voteCount}{" "}
                            <i className="fa-solid fa-heart text-red-600"></i>
                          </div>
                          <Divider orientation="vertical" />
                        </>
                      )}
                      {voteAverage === 0 ? null : (
                        <>
                          {" "}
                          <div>
                            <MovieRating voteAverage={voteAverage} />
                          </div>
                        </>
                      )}
                    </div>
                  </small>
                </>
              )}

              {genres && genres.length > 0 && (
                <>
                  <Divider className="my-4" />
                  <p className="text-tiny text-[17px] uppercase font-bold mb-3">
                    Gênero
                  </p>
                  <small className="text-default-700 text-[15px]">
                    {composeList(genres)}
                  </small>
                </>
              )}
              {mainCast && mainCast.length > 0 && (
                <>
                  <Divider className="my-4" />
                  <p className="text-tiny text-[17px] uppercase font-bold mb-3">
                    Atores principais
                  </p>
                  <small className="flex flex-wrap gap-3 ">
                    {composeAt(mainCast)}
                  </small>
                </>
              )}
            </CardHeader>
          </Card>
        </center>
      </div>
    </>
  );
}

export const getStaticPaths = async () => ({
  paths: [
    {
      params: {
        id: "315635",
      },
    },
  ],
  fallback: "blocking",
});

export const getStaticProps = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = params;

  const movieUrl = `tv/${id}?api_key=${apiKey}&${apiLanguage}`;
  const movieTrailer = `tv/${id}/videos?api_key=${apiKey}&${apiLanguage}`;
  const movieCreditsUrl = `tv/${id}/credits?api_key=${apiKey}&${apiLanguage}`;
  const movieUrl2 = `/tv/${id}/external_ids?api_key=${apiKey}&${apiLanguage}`;

  const movie = await getMovieData(movieUrl);
  const movieCredits = await getMovieData(movieCreditsUrl);
  const movie2 = await getMovieData(movieUrl2);
  const trailer = await getMovieData(movieTrailer);

  const { cast } = movieCredits;
  const mainCast = cast?.slice(0, 5);
  const imdbid = movie2.imdb_id;
  const trailerD = trailer.results;

  return {
    props: {
      movie,
      mainCast,
      trailerD,
      imdbid,
    },
    revalidate: 300,
  };
};
