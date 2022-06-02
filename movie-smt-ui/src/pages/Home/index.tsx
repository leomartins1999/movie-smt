import { Container, Typography } from "@mui/material";
import {Search} from "../../components";
import styles from "./Home.module.scss";

export function Home() {
  return (
    <div className={styles.Home}>
      <Container
      sx={{
        width: "100%",
        height: "100%",
        paddingTop: "10%"
      }}
    >
      <Typography variant="h2" color="white">
        Movie SMT
      </Typography>
      <Search />
    </Container>
    </div>
  );
}