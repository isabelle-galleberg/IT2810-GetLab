import { useEffect, useState } from "react";
import CommitCard from "../../components/CommitCard/CommitCard";
import IssueCard from "../../components/IssueCard/IssueCard";
import commitService from "../../services/commitServices";
import issueService from "../../services/issueService";
import "./MainPage.css";

export default function MainPage() {
  const [commits, setCommits] = useState<any[]>([]);
  const [issues, setIssues] = useState<any[]>([]);

  // show all commits for this project
  useEffect(() => {
    commitService
      .getAllCommits("17379", "glpat-GPrQJsa8_WicT1Fo5Ve1")
      .then((commits: any[]) => {
        setCommits(commits);
      });
  }, []);

  // show all issues for this project
  useEffect(() => {
    issueService
      .getAllIssues("17379", "glpat-GPrQJsa8_WicT1Fo5Ve1")
      .then((issues: any[]) => {
        setIssues(issues);
      });
  }, []);

  return (
    <div className="mainPage">
      <div className="issueCards">
        {issues.map((res: any) => {
          return (
            <IssueCard
              key={res.id}
              title={res.title}
              labels={res.labels}
              author={res.author.username}
              createdAt={res.updated_at.slice(0, 10)}
              issueNumber={res.iid}
            />
          );
        })}
      </div>
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
