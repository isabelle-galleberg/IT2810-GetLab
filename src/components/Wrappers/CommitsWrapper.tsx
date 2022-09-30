import { useContext, useEffect, useState } from "react";
import { GitlabContext } from "../../context/GitlabContext";
import commitService from "../../services/commitServices";
import CommitCard from "../CommitCard/CommitCard";
import CommitFilter from "../commitFilter/commitFilter";
import "./Wrapper.css";

export default function CommitsWrapper({ pageinator, setPageinator }: any) {
  const [commits, setCommits] = useState<any[]>([]);
  const [filter, setFilter] = useState<any>({
    branch: "",
    dateFrom: "",
    dateTo: "",
  });
  const [branches, setBranches] = useState<any[]>([]);
  const { apiSecret, projectId } = useContext(GitlabContext);

  useEffect(() => {
    commitService.getAllCommits(projectId, apiSecret).then((commits: any[]) => {
      setCommits(commits);
      setPageinator(null, commits.length);
    });
  }, [filter]);

  return (
    <div>
      <div className="commitFilter">
        <CommitFilter
          branches={branches}
          setBranches={setBranches}
          filter={filter}
          setFilter={setFilter}
        ></CommitFilter>
      </div>
      <div className="commitCards">
        {commits
          .splice(
            (pageinator.page - 1) * pageinator.perPage,
            pageinator.page * pageinator.perPage
          )
          .map((res: any) => {
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
