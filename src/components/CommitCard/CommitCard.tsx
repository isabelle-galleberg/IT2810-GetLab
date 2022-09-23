import { useEffect, useState } from "react";
import { CommitCardProps } from "../../types/propTypes";
import "./CommitCard.css";
import { CgMoreR } from "react-icons/cg";

export default function CommitCard({
	id,
	message,
	dateAuthored,
	profileName,
	profileImage,
}: CommitCardProps) {
	const [completeMessage, setCompleteMessage] = useState(false);
	const [overflow, setOverflow] = useState(false);

	// if commit message causes overflow, add "show more" button to commit card
	useEffect(() => {
		let commitCard = document.getElementById(`commitCard${id}`);
		let commitMessage = document.getElementById(`message${id}`);
		if (
			commitMessage &&
			commitCard &&
			commitMessage.scrollWidth > commitCard.clientWidth
		) {
			setOverflow(true);
		}
	}, []);

	// show the complete commit message when "show more" button is clicked
	const showMessageOverflow = () => {
		if (completeMessage) {
			setCompleteMessage(false);
		} else {
			setCompleteMessage(true);
		}
	};

	return (
		<div id={`commitCard${id}`} className="commitCard">
			<div className="commitMessage">
				<p
					id={`message${id}`}
					className={completeMessage ? "completeMessage" : "message"}
				>
					{message}
				</p>
				{overflow ? (
					<CgMoreR onClick={showMessageOverflow} className="showMoreIcon" />
				) : (
					""
				)}
			</div>
			<div className="commitInfo">
				<img className="profileImage" src={profileImage} alt="profileImage" />
				<p className="profileName">{profileName}</p>
				<p className="dateAuthored">{`commited on ${dateAuthored}`}</p>
			</div>
		</div>
	);
}
