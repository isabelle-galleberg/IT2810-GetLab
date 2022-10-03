import { useEffect, useState } from "react";
import issueService from "../../services/issueService";
import { Issue } from "../../types/api/issue";
import IssueCard from "../IssueCard/IssueCard";
import IssuesFilter from "../IssuesFilter/IssuesFilter";
import "./Wrapper.css";

export default function IssuesWrapper({ paginator }: any) {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [issuesByLabels, setIssuesByLabels] = useState<Issue[]>([]);
  const [creator, setCreator] = useState<string | null>(null);
  const [filterLabels, setFilterLabels] = useState<string[]>([]);

  useEffect(() => {
    setIssues([]);
    issueService
      .getIssues(
        "17379",
        "glpat-GPrQJsa8_WicT1Fo5Ve1",
        paginator.perPage,
        paginator.page
      )
      .then((res: { data: Issue[] }) => {
        res.data.map((data: Issue) => {
          if (creator === data.author.name || creator === null) {
            setIssues((issues) => [...issues, data]);
          }
        });
      });
  }, [creator, filterLabels]);

  useEffect(() => {
    setIssuesByLabels([]);
    issueService
      .getIssuesByLabels("17379", filterLabels, "glpat-GPrQJsa8_WicT1Fo5Ve1")
      .then((res: Issue[]) => {
        res.map((data: Issue) => {
          if (creator === data.author.name || creator === null) {
            setIssuesByLabels((issuesByLabels) => [...issuesByLabels, data]);
          }
        });
      });
  }, [creator, filterLabels]);

  return (
    <div>
      <div className="issuesFilter">
        <IssuesFilter
          filterLabels={filterLabels}
          setFilterLabels={setFilterLabels}
          creator={creator}
          setCreator={setCreator}
        ></IssuesFilter>
      </div>
      <div className="issueCards">
        {(filterLabels.length < 1 || filterLabels.length === undefined) &&
          issues.map((res: Issue) => {
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
        {filterLabels.length > 0 &&
          issuesByLabels.map((res: Issue) => {
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
