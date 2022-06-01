import { searchMovie } from "../../components/search-movies/search-movieApi";


export function Movie() {
    const {movieId} = useParams();
    searchMovie(name);
  return (
    <div>
      <h1>Movie</h1>
    </div>
  );
}