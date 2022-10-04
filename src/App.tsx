import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import StartPage from "./pages/StartPage/StartPage";
import { GitlabContext, GitlabCredentials } from "./context/GitlabContext";
import { useEffect, useState } from "react";
import branchService from "./services/branchService";
import { getRepositoryName } from "./services/repositoryServices";
function App() {
  const [projectId, setProjectId] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>("");
  const [repositoryName, setRepositoryName] = useState<string | null>(null);

  useEffect(() => {
    if (projectId && accessToken) {
      getRepositoryName(projectId, accessToken).then((name) => {
        setRepositoryName(name);
      });
    }
  }, [accessToken, projectId]);

  return (
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
      <div className="container">
        <header>
          <a href="/project2">
            <img
              className="getLabLogo"
              src={require("./assets/logo.png")}
              alt=""
            />
          </a>
          <div className="headerContainer">
            <h1>Get your GitLab data with GetLab!</h1>
            {repositoryName && <h1>Now showing: {repositoryName}</h1>}
          </div>
        </header>
        <main>
          <BrowserRouter basename="/project2">
            <Routes>
              <Route path="/" element={<StartPage />} />
            </Routes>
            <Routes>
              <Route path="/data" element={<MainPage />} />
            </Routes>
          </BrowserRouter>
        </main>
        <footer>
          <p>
            Created with <span className="heart">&hearts;</span> by Ole, Axel,
            Eva and Isabelle
          </p>
        </footer>
      </div>
    </GitlabContext.Provider>
  );
}

export default App;
