import { useEffect, useState } from "react";
import issueService from "../../services/issueService";
import IssueCard from "../IssueCard/IssueCard";
import IssuesFilter from "../IssuesFilter/IssuesFilter";
import "./Wrapper.css";

export default function IssuesWrapper({ pageinator, setPageinator }: any) {
  const [issues, setIssues] = useState<any[]>([]);
  const [issuesByLabels, setIssuesByLabels] = useState<any[]>([]);
  const [filterCreator, setFilterCreator] = useState<any>({ creator: null });
  const [filterLabels, setFilterLabels] = useState<any>({ labels: [] });
  var count = 0;

  useEffect(() => {
    setIssues([]);
    issueService
      .getIssues(
        "17379",
        "glpat-GPrQJsa8_WicT1Fo5Ve1"
      )
      .then((res: any) => {
        res.map((data: any) => {
          if (
            filterCreator.creator === data.author.name ||
            filterCreator.creator === null
          ) {
            count = count + 1;
            setIssues((issues) => [...issues, data]);
            setPageinator(null, count);
          }
        });
      });
  }, [filterCreator, filterLabels]);

  useEffect(() => {
    setIssuesByLabels([]);
    issueService
      .getIssuesByLabels(
        "17379",
        filterLabels.labels,
        "glpat-GPrQJsa8_WicT1Fo5Ve1"
      )
      .then((res: any) => {
        res.map((data: any) => {
          if (
            filterCreator.creator === data.author.name ||
            filterCreator.creator === null
          ) {
            setIssuesByLabels((issuesByLabels) => [...issuesByLabels, data]);
            setPageinator(null, res.length);
          }
        });
      });
  }, [filterCreator, filterLabels]);

  const issuesByLabelPerPage = issuesByLabels.slice((pageinator.page - 1) * pageinator.perPage, pageinator.page * pageinator.perPage);
  const issuesPerPage = issues.slice((pageinator.page - 1) * pageinator.perPage, pageinator.page * pageinator.perPage);

  return (
    <div>
      <div className="issuesFilter">
        <IssuesFilter
          filterLabels={filterLabels}
          setFilterLabels={setFilterLabels}
          filterCreator={filterCreator}
          setFilterCreator={setFilterCreator}
          onChange={pageinator.page = 1}
        ></IssuesFilter>
      </div>
      <div className="issueCards">
        {(filterLabels.labels.length < 1 ||
          filterLabels.labels.length === undefined) &&
          issuesPerPage.map((res: any) => {
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
        {(filterLabels.labels.length > 0 &&
          issuesByLabelPerPage
            .map((res: any) => {
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
            })
        )}
      </div>
    </div>
  );
}
