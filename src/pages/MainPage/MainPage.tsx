import { Select } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import CommitsWrapper from "../../components/Wrappers/CommitsWrapper";
import IssuesWrapper from "../../components/Wrappers/IssuesWrapper";
import "./MainPage.css";
import Chart from "../../components/CommitsChart/CommitsChart";
import { GitlabContext } from "../../context/GitlabContext";
import branchService from "../../services/branchService";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const { projectId, accessToken, setAccessToken, setProjectId } =
    useContext(GitlabContext);
  const [value, setValue] = useState<string | null>(null);
  const navigate = useNavigate();
  function setDisplayType(value: string) {
    if (typeof Storage !== "undefined") {
      if (value === "") {
        if (sessionStorage.value !== null) {
          setValue(sessionStorage.value);
        }
      } else {
        sessionStorage.value = value;
        setValue(value);
      }
    } else if (value !== "") {
      setValue(value);
    }
  }

  useEffect(() => {
    // Validate credentials
    const lsAccessToken = localStorage.getItem("accessToken");
    const lsProjectId = localStorage.getItem("projectId");

    if (!lsAccessToken || !lsProjectId) {
      navigate("/");
      return;
    } else {
      setAccessToken(lsAccessToken);
      setProjectId(lsProjectId);
    }

    branchService.getBranches(lsProjectId, lsAccessToken).then((branches) => {
      if (!branches) {
        navigate("/");
      }
    });
  }, []);

  function getLabelOfStoredValue() {
    if (typeof Storage !== "undefined") {
      if (sessionStorage.value !== null) {
        if (sessionStorage.value === "commits") return "Commit log";
        else if (sessionStorage.value === "issues") return "Issues";
        else if (sessionStorage.value === "commitsChart")
          return "Commits chart";
      }
    }
    return "Pick one";
  }

  useEffect(() => {
    setDisplayType("");
  }, []);

  return (
    <div className="mainPage">
      <Select
        className="select"
        label="What would you like to see?"
        placeholder={getLabelOfStoredValue()}
        onChange={setDisplayType}
        data={[
          { value: "commits", label: "Commit log" },
          { value: "issues", label: "Issues" },
          { value: "commitsChart", label: "Commits chart" },
        ]}
      />
      {value === "commits" && <CommitsWrapper />}
      {value === "issues" && <IssuesWrapper />}
      {value === "commitsChart" && (
        <Chart projectId={projectId} token={accessToken} />
      )}
    </div>
  );
}
