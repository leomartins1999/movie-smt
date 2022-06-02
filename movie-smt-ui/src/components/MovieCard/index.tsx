import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "../../components";
import styles from "./MovieCard.module.scss";
import { Movie } from "../../utils/types";

export function MovieCard({ id, title, overview, poster_path }: Movie) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }, [id]);
  return (
    <div className={styles.container}>
      <div>
        <Link to={`/movie/${id}`}>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <img src={poster_path} alt={title} />
              <h2>{title}</h2>
              <p>
                {overview.length > 300
                  ? `${overview.substring(0, 300)}...`
                  : overview}
              </p>
            </>
          )}
        </Link>
      </div>
    </div>
  );
}
