import { Select } from "@mantine/core";
import { useEffect, useState } from "react";
import CommitsWrapper from "../../components/Wrappers/CommitsWrapper";
import IssuesWrapper from "../../components/Wrappers/IssuesWrapper";
import "./MainPage.css";
import { Pagination } from "@mantine/core";
import Chart from "../../components/CommitsChart/CommitsChart";

export default function MainPage() {
  const [value, setValue] = useState<string | null>(null);
  const [pageinator, setPageinator] = useState<any>({
    page: 1,
    perPage: 10,
    total: 1,
  });

  function setDisplayType(value: string) {
    if (typeof Storage !== "undefined") {
      if (value === "") {
        if (sessionStorage.value !== null) {
          setValue(sessionStorage.value);
          setPage(1);
        }
      } else {
        sessionStorage.value = value;
        setValue(value);
        setPage(1);
      }
    } else if (value !== "") {
      setValue(value);
      setPage(1);
    }
  }

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
        placeholder={getLabelOfStoredValue()}
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
        <Chart projectId={"17379"} token={"glpat-GPrQJsa8_WicT1Fo5Ve1"} />
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
