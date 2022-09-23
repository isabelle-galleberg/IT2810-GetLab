import CommitCard from "../../components/CommitCard/CommitCard";
import "./MainPage.css";

const dummyData = [
	{
		message: "docs: styling backend readme hallo",
		authored: "2021-03-01",
		profileName: "Shomlings",
		profileImage:
			"https://gitlab.stud.idi.ntnu.no/uploads/-/system/user/avatar/9754/avatar.png?width=192",
	},
	{
		message: "docs: styling backend readme hei",
		authored: "2021-03-01",
		profileName: "Shomlings",
		profileImage:
			"https://gitlab.stud.idi.ntnu.no/uploads/-/system/user/avatar/9754/avatar.png?width=192",
	},
	{
		message: "docs: styling",
		authored: "2021-03-01",
		profileName: "Shomlings",
		profileImage:
			"https://gitlab.stud.idi.ntnu.no/uploads/-/system/user/avatar/9754/avatar.png?width=192",
	},
	{
		message:
			"docs: styling backend readme blablablablab lablablablab lablablablab lablablabla se så flink jeg er:)",
		authored: "2021-03-01",
		profileName: "Shomlings",
		profileImage:
			"https://gitlab.stud.idi.ntnu.no/uploads/-/system/user/avatar/9754/avatar.png?width=192",
	},
];

export default function MainPage() {
	return (
		<div className="mainPage">
			<div className="commitCards">
				{dummyData.map((res: any) => {
					return (
						<CommitCard
							message={res.message}
							dateAuthored={res.authored}
							profileName={res.profileName}
							profileImage={res.profileImage}
						/>
					);
				})}
			</div>
		</div>
	);
}
