import formatDate from "@/utils/formatDate";

export default function MoreInformations({ movie }) {
  return (
    <>
      <div>{formatDate(movie.release_date)}</div>
    </>
  );
}
