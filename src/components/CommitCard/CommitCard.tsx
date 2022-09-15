import { CommitCardProps } from "../../types/propTypes";
import "./CommitCard.css";

export default function CommitCard({
	message,
	dateAuthored,
	profileName,
	profileImage,
}: CommitCardProps) {
	
	return (
		<div className="commitCard">
			<p className="message">{message}</p>
			<div className="commitInfo">
				<img className="profileImage" src={profileImage} alt="profileImage" />
				<p>{profileName}</p>
				<p className="authored">{`commited on ${dateAuthored}`}</p>
			</div>
		</div>
	);
}
