import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import StartPage from "./pages/StartPage/StartPage";
import { GitlabContext, GitlabCredentials } from "./context/GitlabContext";
import { useState } from "react";
function App() {
  const [projectId, setProjectId] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>("");
  return (
    <div className="container">
      <header>
        <a href="/">
          <img
            className="getLabLogo"
            src={require("./assets/logo.png")}
            alt=""
          />
        </a>
        <h1>Get your GitLab data with GetLab!</h1>
      </header>
      <main>
        <GitlabContext.Provider
          value={
            {
              projectId,
              setProjectId,
              accessToken: accessToken,
              setAccessToken: setAccessToken,
            } as GitlabCredentials
          }
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<StartPage />} />
            </Routes>
            <Routes>
              <Route path="/data" element={<MainPage />} />
            </Routes>
          </BrowserRouter>
        </GitlabContext.Provider>
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
