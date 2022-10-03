import React, { useContext, useState } from "react";
import "./StartPage.css";
import Button from "../../components/Button/Button";
import TextField from "../../components/TextField/TextField";
import { GitlabContext } from "../../context/GitlabContext";
import { useNavigate } from "react-router-dom";
import branchService from "../../services/branchService";

export default function StartPage() {
  // const [projectId, setProjectId] = useState<string | null>(null);
  // const [accessToken, setAccessToken] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState(false);
  const { projectId, setProjectId } = useContext(GitlabContext);
  const { apiSecret, setApiSecret } = useContext(GitlabContext);
  const credentialsInLocalStorage =
    localStorage.getItem("projectId") && localStorage.getItem("apiSecret");
  const navigate = useNavigate();

  // when changing text field, update name value and hide error message
  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectId(e.target.value);
    setErrorMessage(false);
  };

  // when changing text field, update api value and hide error message
  const changeApi = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiSecret(e.target.value);
    setErrorMessage(false);
  };

  const connectUsingPrevCred = async (e: any) => {
    e.preventDefault();
    const projectIdLocal = localStorage.getItem("projectId");
    const apiSecretLocal = localStorage.getItem("apiSecret");
    if (projectIdLocal != null && apiSecretLocal != null) {
      setProjectId(projectIdLocal);
      setApiSecret(apiSecretLocal);
      connect(projectIdLocal, apiSecretLocal);
    }
  };

  function onConnect(e: any) {
    e.preventDefault();
    if (projectId && apiSecret) {
      localStorage.setItem("projectId", projectId);
      localStorage.setItem("apiSecret", apiSecret);
    }
    connect(projectId, apiSecret);
  }
  const connect = (_projectId: string, _apiSecret: string) => {
    // checks whether the text fields are filled in
    // if not: show error message
    // else:
    if (!_projectId || !_apiSecret) {
      setErrorMessage(true);
    } else {
      // Validate credentials
      branchService.getBranches(_projectId, _apiSecret).then((branches) => {
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
          <TextField onChange={changeName} placeholder="Project ID"></TextField>
          <TextField
            onChange={changeApi}
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
