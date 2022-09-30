import React, { useContext, useState } from "react";
import "./StartPage.css";
import Button from "../../components/Button/Button";
import TextField from "../../components/TextField/TextField";
import { GitlabContext } from "../../context/GitlabContext";
import { useNavigate } from "react-router-dom";

export default function StartPage() {
  // const [projectId, setProjectId] = useState<string | null>(null);
  // const [accessToken, setAccessToken] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState(false);
  const { projectId, setProjectId } = useContext(GitlabContext);
  const { apiSecret, setApiSecret } = useContext(GitlabContext);
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

  const onConnect = (e: any) => {
    e.preventDefault();

    // checks whether the text fields are filled in
    // if not: show error message
    // else:
    if (!Boolean(projectId) || !Boolean(apiSecret)) {
      setErrorMessage(true);
    } else {
      navigate("/data");
    }
  };

  return (
    <div className="credentialsContainer">
      <h1>Welcome to GetLab!</h1>
      <h3>Please enter your credentials</h3>
      <div className="formWrapper">
        <form>
          <TextField
            onChange={(e) => changeName(e)}
            placeholder="Project ID"
          ></TextField>
          <TextField
            onChange={(e) => changeApi(e)}
            placeholder="Access token"
          ></TextField>
          <Button onClick={(e) => onConnect(e)} disabled={false}>
            Connect
          </Button>
          {errorMessage && (
            <p className="errorMessage">
              Empty input field, fill in your credentials!
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
