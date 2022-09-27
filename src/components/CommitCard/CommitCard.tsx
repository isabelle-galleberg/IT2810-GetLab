import { CommitCardProps } from "../../types/propTypes";
import "./CommitCard.css";

export default function CommitCard({
  title,
  committedAt,
  author,
}: CommitCardProps) {
  return (
    <div className="commitCard">
      <div className="title">{title}</div>
      <div className="commitInfo">
        <div className="author">{author}</div>
        <div className="committedAt">{`commited on ${committedAt}`}</div>
      </div>
    </div>
  );
}
