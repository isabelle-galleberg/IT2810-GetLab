import { useEffect, useState } from "react";
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
  useEffect(() => {
    commitService
      .getAllCommits("17379", "glpat-GPrQJsa8_WicT1Fo5Ve1")
      .then((commits: any[]) => {
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
