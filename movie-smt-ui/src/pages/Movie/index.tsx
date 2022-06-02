import { useParams } from "react-router-dom";

export function Movie() {
  const { movieId } = useParams();

  return (
    <div>
      <h1>Movie {movieId}</h1>
    </div>
  );
}
