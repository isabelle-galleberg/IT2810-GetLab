import { Select } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import CommitsWrapper from "../../components/Wrappers/CommitsWrapper";
import IssuesWrapper from "../../components/Wrappers/IssuesWrapper";
import "./MainPage.css";
import { Pagination } from "@mantine/core";
import Chart from "../../components/CommitsChart/CommitsChart";
import { GitlabContext } from "../../context/GitlabContext";
import branchService from "../../services/branchService";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const { projectId, apiSecret } = useContext(GitlabContext);
  const [value, setValue] = useState<string | null>(null);
  const navigate = useNavigate();
  const [pageinator, setPageinator] = useState<any>({
    page: 1,
    perPage: 10,
    total: 1,
  });
  function setDisplayType(value: string) {
    setValue(value);
    setPage(1);
  }

  useEffect(() => {
    // Validate credentials
    branchService.getBranches(projectId, apiSecret).then((branches) => {
      debugger;
      if (!branches) {
        navigate("/");
      }
    });
  }, []);

  function setPage(page: number) {
    setPageinator({ ...pageinator, page });
  }

  function setPageinatorWrap(maxPages: number, maxItems: number) {
    let data = {};
    if (maxPages != null) data = { ...pageinator, total: maxPages };
    else if (maxItems != null)
      data = { ...pageinator, total: maxItems / pageinator.perPage };
    setPageinator(data);
  }

  return (
    <div className="mainPage">
      <Select
        className="select"
        placeholder="Pick one"
        onChange={setDisplayType}
        data={[
          { value: "commits", label: "Commit log" },
          { value: "issues", label: "Issues" },
          { value: "commitsChart", label: "Commits chart" },
        ]}
      />
      {value === "commits" && (
        <CommitsWrapper
          setPageinator={setPageinatorWrap}
          pageinator={pageinator}
        />
      )}
      {value === "issues" && (
        <IssuesWrapper
          setPageinator={setPageinatorWrap}
          pageinator={pageinator}
        />
      )}
      {value === "commitsChart" && (
        <Chart projectId={projectId} token={apiSecret} />
      )}
      <br />
      {(value === "commits" || value === "issues") && (
        <Pagination
          total={pageinator.total}
          page={pageinator.page}
          onChange={setPage}
        />
      )}
    </div>
  );
}
