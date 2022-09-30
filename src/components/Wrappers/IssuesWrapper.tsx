import { useEffect, useState } from "react";
import issueService from "../../services/issueService";
import IssueCard from "../IssueCard/IssueCard";
import "./Wrapper.css";

export default function IssuesWrapper(props: any) {
  const [issues, setIssues] = useState<any[]>([]);

  useEffect(() => {
    issueService
      .getIssues(
        "17379",
        "glpat-GPrQJsa8_WicT1Fo5Ve1",
        props.pageinator.perPage,
        props.pageinator.page
      )
      .then((issues: any) => {
        props.setPageinator(issues.totalPages, null);
        setIssues(issues.data);
      });
  }, [props.pageinator.page]);

  return (
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
  );
}
