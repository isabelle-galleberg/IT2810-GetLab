import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import StartPage from "./pages/StartPage/StartPage";
import Chart from "./components/CommitsChart/CommitsChart";

function App() {
  return (
    <div className="container">
      <header>
        <a href="/">
          <img className="getLabLogo" src={require("./assets/logo.png")} alt="" />
        </a>
        <h1>Get your GitLab data with GetLab!</h1>
      </header>
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StartPage />} />
          </Routes>
          <Routes>
            <Route path="/data" element={<MainPage />} />
          </Routes>
          <Routes>
            <Route path="/chart" element={<Chart projectId="17379" token="glpat-GPrQJsa8_WicT1Fo5Ve1" />} />
          </Routes>
        </BrowserRouter>
      </main>
      <footer>
        <p>
          Created with <span className="heart">&hearts;</span> by Ole, Axel, Eva
          and Isabelle
        </p>
      </footer>
    </div>
  );
}

export default App;
