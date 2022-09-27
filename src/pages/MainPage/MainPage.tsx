import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommitCard from "../../components/CommitCard/CommitCard";
import CommitFilter from "../../components/commitFilter/commitFilter";
import commitService from "../../services/commitServices";
import { setCommits } from "../../store/commitStore";
import "./MainPage.css";

export default function MainPage() {
  const commits = useSelector((state: any) => state.commitStore.commits);
  const filter = useSelector((state: any) => state.commitStore.filter);
  const dispatch = useDispatch();

  // show all commits for this project
  useEffect(() => {
    if (filter.branch) {
      commitService
        .getCommitsByBranch(
          "17379",
          filter.branch,
          "glpat-GPrQJsa8_WicT1Fo5Ve1"
        )
        .then((commits: any[]) => {
          dispatch(setCommits(commits));
        })
        .catch((e) => console.log(e));
    }
  }, [filter]);

  return (
    <div className="mainPage">
      <CommitFilter />
      <div className="commitCards">
        {commits.map((res: any) => {
          return (
            <CommitCard
              key={res.id}
              id={res.id}
              message={res.title}
              dateAuthored={res.committed_date.slice(0, 10)}
              profileName={res.committer_name}
            />
          );
        })}
      </div>
    </div>
  );
}
