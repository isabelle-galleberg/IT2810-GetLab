import { useEffect, useState } from "react";
import CommitCard from "../../components/CommitCard/CommitCard";
import commitService from "../../services/commitServices";
import "./MainPage.css";

export default function MainPage() {
  const [commits, setCommits] = useState<any[]>([]);

  // show all commits for this project
  useEffect(() => {
    commitService
      .getAllCommits("17379", "glpat-GPrQJsa8_WicT1Fo5Ve1")
      .then((commits: any[]) => {
        setCommits(commits);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="mainPage">
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
