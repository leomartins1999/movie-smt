import { Container, Typography } from "@mui/material";
import Search from "./components/search/Search";

function App() {
  return (
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
  );
}

export default App;
