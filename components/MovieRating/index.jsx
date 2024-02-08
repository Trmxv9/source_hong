export default function MovieRating({ voteAverage }) {
  return (
    <div>
      <span>{voteAverage.toFixed(1)} <i className="fa-solid fa-stars text-yellow-300"></i></span>
    </div>
  );
}
