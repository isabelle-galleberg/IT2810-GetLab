import { useState } from "react";
import { CommitCardProps } from "../../types/propTypes";
import "./CommitCard.css";
import { CgMoreR } from "react-icons/cg";

export default function CommitCard({
	message,
	dateAuthored,
	profileName,
	profileImage,
}: CommitCardProps) {
	const [isActive, setActive] = useState(false);

	function isOverflown(element: any) {
		console.log(element.scrollWidth);
		return element.scrollWidth > element.clientWidth;
	}

	const handleToggle = () => {
		let card = document.getElementById("message");
		console.log(isOverflown(card));

		if (isActive) {
			setActive(false);
		} else {
			setActive(true);
		}
	};

	return (
		<div id="cm" className="commitCard">
			<div className="commitMessage">
				<p id="message" className={isActive ? "fullMessage" : "message"}>
					{message}
				</p>
				<CgMoreR onClick={handleToggle} className="showMoreIcon" />
			</div>
			<div className="commitInfo">
				<img className="profileImage" src={profileImage} alt="profileImage" />
				<p className="profileName">{profileName}</p>
				<p className="authored">{`commited on ${dateAuthored}`}</p>
			</div>
		</div>
	);
}
