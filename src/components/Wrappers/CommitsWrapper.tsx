import { useContext, useEffect, useState } from "react";
import { GitlabContext } from "../../context/GitlabContext";
import commitService from "../../services/commitServices";
import Branch from "../../types/api/branch";
import Commit from "../../types/api/commit";
import CommitCard from "../CommitCard/CommitCard";
import CommitFilter from "../commitFilter/commitFilter";
import "./Wrapper.css";

export default function CommitsWrapper({ pageinator, setPageinator }: any) {
  const { projectId, accessToken } = useContext(GitlabContext);
  const [commits, setCommits] = useState<Commit[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [filter, setFilter] = useState<any>({
    branch: "",
  });
  const [dateRange, setDateRange] = useState<any>({
    dateFrom: "",
    dateTo: "",
  });
  var count = 0;

  useEffect(() => {
    setCommits([]);
    commitService
      .getCommitsByBranch(projectId, filter.branch, accessToken)
      .then((res: Commit[]) => {
        res.map((data: Commit) => {
          if (
            validDate(
              data.committed_date.slice(0, 10),
              dateRange.dateFrom,
              dateRange.dateTo
            ) ||
            dateRange.dateFrom === ""
          ) {
            count = count + 1;
            setCommits((commits) => [...commits, data]);
            setPageinator(null, count);
          }
        });
      });
  }, [filter, dateRange]);

  function validDate(commitDate: string, fromDate: string, toDate: string) {
    var date = Date.parse(commitDate);
    var from = Date.parse(fromDate);
    var to = Date.parse(toDate);
    if (from <= date && date <= to) {
      return true;
    }
    return false;
  }

  const commitsPerPage = commits.slice(
    (pageinator.page - 1) * pageinator.perPage,
    pageinator.page * pageinator.perPage
  );

  return (
    <div>
      <div className="commitFilter">
        <CommitFilter
          branches={branches}
          setBranches={setBranches}
          filter={filter}
          setFilter={setFilter}
          dateRange={dateRange}
          setDateRange={setDateRange}
          onChange={(pageinator.page = 1)}
        ></CommitFilter>
      </div>
      <div className="commitCards">
        {commitsPerPage.map((res: Commit) => {
          return (
            <CommitCard
              key={res.id}
              title={res.title}
              committedAt={res.committed_date.slice(0, 10)}
              author={res.author_name}
            />
          );
        })}
      </div>
    </div>
  );
}
