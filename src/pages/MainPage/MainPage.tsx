import { useEffect, useState } from "react";
import CommitCard from "../../components/CommitCard/CommitCard";
import IssueCard from "../../components/IssueCard/IssueCard";
import commitService from "../../services/commitServices";
import issueService from "../../services/issueService";
import "./MainPage.css";
import { Pagination } from "@mantine/core";

export default function MainPage() {
  const [commits, setCommits] = useState<any[]>([]);
  const [issues, setIssues] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // pagination for commit cards
  const commitsPerPage = 10;
  const totalPagesCommits = Math.ceil(commits.length / commitsPerPage);
  const indexOfLastCommit = currentPage * commitsPerPage;
  const indexOfFirstCommit = indexOfLastCommit - commitsPerPage;
  const currentCommits = commits.slice(indexOfFirstCommit, indexOfLastCommit);

  // pagination for issue cards
  const [totalPagesIssues, setTotalPagesIssues] = useState(1);

  useEffect(() => {
    commitService
      .getAllCommits("17379", "glpat-GPrQJsa8_WicT1Fo5Ve1")
      .then((commits: any[]) => {
        setCommits(commits);
      });
  }, []);

  useEffect(() => {
    issueService
      .getIssues("17379", "glpat-GPrQJsa8_WicT1Fo5Ve1", "5", currentPage)
      .then((issues: any) => {
        setIssues(issues.data);
        setTotalPagesIssues(issues.totalPages);
      });
  }, [currentPage]);

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
        <Pagination
          total={totalPagesIssues}
          page={currentPage}
          onChange={setCurrentPage}
        />
      </div>
      <div className="commitCards">
        {currentCommits.map((res: any) => {
          return (
            <CommitCard
              key={res.id}
              title={res.title}
              committedAt={res.committed_date.slice(0, 10)}
              author={res.committer_name}
            />
          );
        })}
        <Pagination
          total={totalPagesCommits}
          page={currentPage}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
