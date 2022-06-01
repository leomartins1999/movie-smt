import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "./components";

function App() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
