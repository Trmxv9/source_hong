import formatDate from "@/utils/formatDate";

export default function MoreInformations({ movie }) {
  return (
    <>
      <div>{formatDate(movie.first_air_date)}</div>
    </>
  );
}
