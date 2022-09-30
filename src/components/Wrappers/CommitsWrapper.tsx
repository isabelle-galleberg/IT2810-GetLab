import { useEffect, useState } from "react";
import commitService from "../../services/commitServices";
import CommitCard from "../CommitCard/CommitCard";
import CommitFilter from "../commitFilter/commitFilter";
import "./Wrapper.css";

export default function CommitsWrapper(props: any) {
  const [commits, setCommits] = useState<any[]>([]);

  useEffect(() => {
    commitService
      .getAllCommits("17379", "glpat-GPrQJsa8_WicT1Fo5Ve1")
      .then((commits: any[]) => {
        setCommits(commits);
        props.setPageinator(null, commits.length);
      });
  }, [props.pageinator.page]);

  return (
    <div>
      <div className="commitFilter">
        <CommitFilter></CommitFilter>
      </div>
      <div className="commitCards">
        {commits
          .splice(
            (props.pageinator.page - 1) * props.pageinator.perPage,
            props.pageinator.page * props.pageinator.perPage
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
