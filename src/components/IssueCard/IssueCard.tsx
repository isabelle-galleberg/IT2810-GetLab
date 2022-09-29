import "./IssueCard.css";
import { IssueCardProps } from "../../types/propTypes";

export default function IssueCard(props: IssueCardProps) {
  return (
    <div className="issueCard">
      <div className="issueTitle">{props.title}</div>
      <div className="labels">
        {props.labels.map((label: string) => {
          return (
            <div className="label" key={label}>
              {label}
            </div>
          );
        })}
      </div>
      <div className="issueInfo">
        <div className="issueNumber">{`#${props.issueNumber}`}</div>
        <div className="createdAt">{`created ${props.createdAt} by`}</div>
        <div className="author">{props.author}</div>
      </div>
    </div>
  );
}
