import { useEffect, useState } from "react";
import issueService from "../../services/issueService";
import IssueCard from "../IssueCard/IssueCard";
import "./Wrapper.css";

export default function IssuesWrapper() {
  const [issues, setIssues] = useState<any[]>([]);

  useEffect(() => {
    issueService
      .getAllIssues("17379", "glpat-GPrQJsa8_WicT1Fo5Ve1")
      .then((issues: any[]) => {
        setIssues(issues);
      });
  }, []);

  return (
    <div>
      issuesFilter
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
    </div>
  );
}