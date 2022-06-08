import {
  Autocomplete,
  IconButton,
  Menu,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import {
  fetchMoviesAsync,
  getMovies,
  getMoviesStatus,
  MovieStatus,
} from "../../reducers/movies";
import { Box } from "@mui/system";
import { HiOutlineSearch } from "react-icons/hi";

export function Search() {
  const [anchorElSearchBar, setAnchorElSearchBar] =
    useState<null | HTMLElement>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const status = useAppSelector(getMoviesStatus);
  const movies = useAppSelector(getMovies);

  useEffect(() => {
    dispatch(fetchMoviesAsync());
  }, [dispatch]);

  function getMovieID(name: string | null) {
    const movie = movies.find((movie) => movie.title === name);
    return movie?.id;
  }

  const handleOpenSearchBar = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElSearchBar(event.currentTarget);
  };

  const handleCloseSearchBar = () => {
    setAnchorElSearchBar(null);
  };

  return (
    <Box sx={{ flexGrow: 1, display: "flex" }}>
      <IconButton
        size="large"
        aria-label="search"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
        onClick={handleOpenSearchBar}
      >
        <HiOutlineSearch />
      </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElSearchBar}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElSearchBar)}
          onClose={handleCloseSearchBar}
        >
          <Box sx={{ width: 400, border: "none", pl: 1, pr: 1 }}>
            <Autocomplete
              loading={status === MovieStatus.Loading}
              options={movies.map((m) => m.title)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  id="standard-search"
                  type="search"
                  variant="standard"
                  label="Search for your favorite show/movie"
                />
              )}
              onInputChange={(_, value) => dispatch(fetchMoviesAsync(value))}
              onChange={(_, value) => navigate(`/movie/${getMovieID(value)}`)}
            />
          </Box>
        </Menu>
    </Box>
  );
}
