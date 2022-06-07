import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./MovieCard.module.scss";
import { Movie } from "../../utils/types";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  createTheme,
  Skeleton,
  Typography,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";

const theme = createTheme({
  palette: {
    background: {
      paper: "#242424",
    },
    text: {
      primary: "#CFD3FD",
      secondary: "#46505A",
    },
    action: {
      active: "#001E3C",
    },
  },
});

export function MovieCard({ id, title, overview, poster_path }: Movie) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, [id]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <ThemeProvider theme={theme}>
          <Link to={`/movie/${id}`}>
            <Card sx={[{ width: 200 }, { height: 400 }]}>
              {loading ? (
                <>
                  <Skeleton variant="rectangular" animation="wave" width="100%" height={300} />
                  <Skeleton variant="text" animation="wave" />
                  <Skeleton animation="wave" />
                </>
              ) : (
                <CardActionArea>
                  <CardMedia component="img" src={poster_path} alt="poster" />
                  <CardContent>
                      <Typography>{title}</Typography>
                      <Typography>
                        <div className={styles.description}>
                          <p>2012</p>
                          <p>R-Rated</p>
                          <p>6.8</p>
                        </div>
                      </Typography>
                  </CardContent>
                </CardActionArea>
              )}
            </Card>
          </Link>
        </ThemeProvider>
      </div>
    </div>
  );
}
