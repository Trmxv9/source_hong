import axios, { AxiosResponse } from "axios";

const apiPath = process.env.NEXT_PUBLIC_API_PATH;

interface Movie {
  id: number;
  title: string;
  release_date: string;
}

interface MovieDataResponse {
  data: any;
  imdb_id: any;
  cast: {
    slice(arg0: number, arg1: number): unknown; cast: any; 
};
  results: Movie[];
  total_pages: number;
}

const api = axios.create({
  baseURL: apiPath,
});

export default async function getMovieData(
  url: string
): Promise<MovieDataResponse> {
  let data: MovieDataResponse = {
    results: [],
    total_pages: 0,
    cast: {
      slice: function (arg0: number, arg1: number): unknown {
        throw new Error("Function not implemented.");
      },
      cast: undefined
    },
    imdb_id: undefined
  };

  try {
    const response: AxiosResponse<MovieDataResponse> = await api.get(url);
    data = response.data;
  } catch (err) {
    console.error(err);
  }

  return data;
}
