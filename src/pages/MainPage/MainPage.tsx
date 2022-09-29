import { Select } from "@mantine/core";
import { useState } from "react";
import CommitsWrapper from "../../components/Wrappers/CommitsWrapper";
import IssuesWrapper from "../../components/Wrappers/IssuesWrapper";
import "./MainPage.css";
import { Pagination } from "@mantine/core";

export default function MainPage() {
  const [value, setValue] = useState<string | null>(null);
  const [pageinator, setPageinator] = useState<any>({
    page: 1,
    perPage: 10,
    total: 1,
  });
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
        radius="md"
        onChange={setValue}
        data={[
          { value: "commits", label: "Commit log" },
          { value: "issues", label: "Issues" },
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
      <Pagination
        total={pageinator.total}
        page={pageinator.page}
        onChange={setPage}
      />
    </div>
  );
}
