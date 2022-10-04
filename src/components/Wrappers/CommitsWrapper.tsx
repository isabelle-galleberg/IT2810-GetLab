import { useContext, useEffect, useState } from "react";
import { GitlabContext } from "../../context/GitlabContext";
import commitService from "../../services/commitServices";
import Branch from "../../types/api/branch";
import Commit from "../../types/api/commit";
import { DateRangeProps } from '../../types/propTypes';
import CommitCard from "../CommitCard/CommitCard";
import CommitFilter from "../commitFilter/commitFilter";
import "./Wrapper.css";

export default function CommitsWrapper() {
  const { projectId, accessToken } = useContext(GitlabContext);
  const [commits, setCommits] = useState<Commit[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [filter, setFilter] = useState<{ branch: string }>({
    branch: "",
  });
  const [dateRange, setDateRange] = useState<DateRangeProps>({
    dateFrom: "",
    dateTo: "",
  });

  useEffect(() => {
    setCommits([]);
    commitService
      .getCommitsByBranch(projectId, filter.branch, accessToken, {
        from: new Date(dateRange.dateFrom),
        to: new Date(dateRange.dateTo),
      })
      .then((res: Commit[]) => {
        setCommits(res);
      });
  }, [filter, dateRange]);

  return (
    <div>
      <div className="commitFilter">
        <CommitFilter
          branches={branches}
          setBranches={setBranches}
          filter={filter}
          setFilter={setFilter}
          setDateRange={setDateRange}
        ></CommitFilter>
      </div>
      <div className="commitCards">
        {commits.map((res: Commit) => {
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

export function validDate(
  commitDate: string,
  fromDate: string,
  toDate: string
) {
  var date = Date.parse(commitDate);
  var from = Date.parse(fromDate);
  var to = Date.parse(toDate);
  if (from <= date && date <= to) {
    return true;
  }
  return false;
}
