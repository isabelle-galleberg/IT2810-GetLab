import { useContext, useEffect, useState } from "react";
import { GitlabContext } from "../../context/GitlabContext";
import issueService from "../../services/issueService";
import IssueCard from "../IssueCard/IssueCard";
import IssuesFilter from "../IssuesFilter/IssuesFilter";
import "./Wrapper.css";

export default function IssuesWrapper({ pageinator, setPageinator }: any) {
  const [issues, setIssues] = useState<any[]>([]);
  const [issuesByLabels, setIssuesByLabels] = useState<any[]>([]);
  const [filterCreator, setFilterCreator] = useState<any>({ creator: null });
  const [filterLabels, setFilterLabels] = useState<any>({ labels: [] });
  const { accessToken, projectId } = useContext(GitlabContext);

  useEffect(() => {
    setIssues([]);
    issueService.getIssues(projectId, accessToken).then((res: any) => {
      res.map((data: any) => {
        if (
          filterCreator.creator === data.author.name ||
          filterCreator.creator === null
        ) {
          setIssues((issues) => [...issues, data]);
        }
      });
    });
  }, [filterCreator, filterLabels]);

  useEffect(() => {
    setIssuesByLabels([]);
    issueService
      .getIssuesByLabels(projectId, filterLabels.labels, accessToken)
      .then((res: any) => {
        res.map((data: any) => {
          if (
            filterCreator.creator === data.author.name ||
            filterCreator.creator === null
          ) {
            setIssuesByLabels((issuesByLabels) => [...issuesByLabels, data]);
          }
        });
      });
  }, [filterCreator, filterLabels]);

  return (
    <div>
      <div className="issuesFilter">
        <IssuesFilter
          filterLabels={filterLabels}
          setFilterLabels={setFilterLabels}
          filterCreator={filterCreator}
          setFilterCreator={setFilterCreator}
        ></IssuesFilter>
      </div>
      <div className="issueCards">
        {(filterLabels.labels.length < 1 ||
          filterLabels.labels.length === undefined) &&
          issues.map((res: any) => {
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
        {filterLabels.labels.length > 0 &&
          issuesByLabels.map((res: any) => {
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
