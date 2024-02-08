import { Card, CardHeader, CardFooter, Image, Link } from "@nextui-org/react";

import MovieRating from "../MovieRating";
import MoreInformations from "./MoreInformations";

const apiImgPath = process.env.NEXT_PUBLIC_API_IMG_PATH;

export default function MovieCard({ movie }) {
  const posterPath = movie.poster_path
    ? `${apiImgPath}w500${movie.poster_path}`
    : `/images/no_image.png`;

  return (
    <>
      <Link href={`tv/movie/${movie.id}`}>
        <div className="flex flex-col items-center text-cultured cursor-pointer transition-transform duration-200 hover:transform-[scale(1.1)]">
          <Card
            isFooterBlurred
            className="max-w-[250px] max-h-[300px] col-span-12 sm:col-span-5 transition-shadow hover:shadow-lg hover:shadow-[#ee80ff]"
          >
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
              <span className="text-tiny uppercase font-bold">
                {movie.title}
              </span>
              <h4 className="font-medium text-2xl">
                {" "}
                <MovieRating voteAverage={movie.vote_average} />
              </h4>
            </CardHeader>
            <Image
              removeWrapper
              className="z-0 w-[300px] h-[300px] scale-125 -translate-y-6 object-cover brightness-50"
              src={posterPath}
              alt=""
              priority="true"
              loading="lazy"
            />
            <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
              <div>
                <MoreInformations movie={movie} />
              </div>
            </CardFooter>
          </Card>
        </div>
      </Link>
    </>
  );
}
