import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Index";
import Auth from "./pages/auth/Index";
import Movie from "./pages/movie/Index";
import TvShows from "./pages/tv/Index";
import Rated from "./pages/Trending/Index";
function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/rated" element={<Rated />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/tvshows/:id" element={<TvShows />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
