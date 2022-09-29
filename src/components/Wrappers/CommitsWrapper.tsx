import { useEffect, useState } from "react";
import commitService from "../../services/commitServices";
import CommitCard from "../CommitCard/CommitCard";
import CommitFilter from "../commitFilter/commitFilter";
import "./Wrapper.css";

export default function CommitsWrapper() {
  const [commits, setCommits] = useState<any[]>([]);

  useEffect(() => {
    commitService
      .getAllCommits("17379", "glpat-GPrQJsa8_WicT1Fo5Ve1")
      .then((commits: any[]) => {
        setCommits(commits);
      });
  }, []);

  return (
    <div>
      <div className="commitFilter">
        <CommitFilter></CommitFilter>
      </div>
      <div className="commitCards">
        {commits.map((res: any) => {
          return (
            <CommitCard
              key={res.id}
              title={res.title}
              committedAt={res.committed_date.slice(0, 10)}
              author={res.committer_name}
            />
          );
        })}
      </div>
    </div>
  );
}