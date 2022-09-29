import "./IssueCard.css";
import { IssueCardProps } from "../../types/propTypes";

export default function IssueCard({
  title,
  labels,
  issueNumber,
  createdAt,
  author,
}: IssueCardProps) {
  return (
    <div className="issueCard">
      <div className="issueTitle">{title}</div>
      <div className="labels">
        {labels.map((label: string) => {
          return (
            <div className="label" key={label}>
              {label}
            </div>
          );
        })}
      </div>
      <div className="issueInfo">
        <div className="issueNumber">{`#${issueNumber}`}</div>
        <div className="createdAt">{`created ${createdAt} by`}</div>
        <div className="author">{author}</div>
      </div>
    </div>
  );
}
