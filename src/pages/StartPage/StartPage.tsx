import React, { useContext, useEffect, useState } from "react";
import "./StartPage.css";
import Button from "../../components/Button/Button";
import TextField from "../../components/TextField/TextField";
import { useNavigate } from "react-router-dom";
import branchService from "../../services/branchService";
import { GitlabContext } from "../../context/GitlabContext";

export default function StartPage() {
  const [errorMessage, setErrorMessage] = useState(false);

  const { setProjectId } = useContext(GitlabContext);
  const { setAccessToken } = useContext(GitlabContext);

  const [localProjectId, setLocalProjectId] = useState<string | null>(null);
  const [localAccessToken, setLocalAccessToken] = useState<string | null>(null);

  const credentialsInLocalStorage =
    localStorage.getItem("projectId") && localStorage.getItem("accessToken");

  const navigate = useNavigate();

  // when changing text field, update name value and hide error message
  const changeProjectId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalProjectId(e.target.value.replace(/\s/g, ""));
    setErrorMessage(false);
  };

  useEffect(() => {
    setAccessToken("");
    setProjectId("");
  }, []);

  // when changing text field, update api value and hide error message
  const changeAccessToken = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalAccessToken(e.target.value.replace(/\s/g, ""));
    setErrorMessage(false);
  };

  const connectUsingPrevCred = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const projectIdLocal = localStorage.getItem("projectId");
    const accessTokenLocal = localStorage.getItem("accessToken");
    if (projectIdLocal != null && accessTokenLocal != null) {
      setProjectId(projectIdLocal);
      setAccessToken(accessTokenLocal);
      connect(projectIdLocal, accessTokenLocal);
    }
  };

  function onConnect(e: any) {
    e.preventDefault();
    if (localProjectId && localAccessToken) {
      localStorage.setItem("projectId", localProjectId);
      localStorage.setItem("accessToken", localAccessToken);
      setProjectId(localProjectId);
      setAccessToken(localAccessToken);
    }
    connect(localProjectId, localAccessToken);
  }
  const connect = (_projectId: string | null, _accessToken: string | null) => {
    // checks whether the text fields are filled in
    // if not: show error message
    // else:
    if (!_projectId || !_accessToken) {
      setErrorMessage(true);
    } else {
      // Validate credentials
      branchService.getBranches(_projectId, _accessToken).then((branches) => {
        if (branches) {
          navigate("/data");
        } else {
          setErrorMessage(true);
        }
      });
    }
  };

  return (
    <div className="credentialsContainer">
      <h1>Welcome to GetLab!</h1>
      <h3>Please enter your credentials</h3>
      <div className="formWrapper">
        <form>
          <TextField
            onChange={changeProjectId}
            placeholder="Project Id"
          ></TextField>
          <TextField
            onChange={changeAccessToken}
            placeholder="Access token"
          ></TextField>

          <Button onClick={onConnect} disabled={false}>
            Connect
          </Button>
          {credentialsInLocalStorage && (
            <div>
              <Button onClick={connectUsingPrevCred}>
                Connect using previous credentials
              </Button>
            </div>
          )}
          {errorMessage && (
            <p className="errorMessage">
              These credentials are not valid. Please try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
