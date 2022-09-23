import CommitCard from "../../components/CommitCard/CommitCard";
import "./MainPage.css";

const dummyData = [
	{
		id: "1",
		message: "docs: styling backend readme hallo",
		authored: "2021-03-01",
		profileName: "Shomlings",
		profileImage:
			"https://gitlab.stud.idi.ntnu.no/uploads/-/system/user/avatar/9754/avatar.png?width=192",
	},
	{
		id: "2",
		message: "docs: styling backend readme hei",
		authored: "2021-03-01",
		profileName: "Shomlings",
		profileImage:
			"https://gitlab.stud.idi.ntnu.no/uploads/-/system/user/avatar/9754/avatar.png?width=192",
	},
	{
		id: "3",
		message: "docs: styling",
		authored: "2021-03-01",
		profileName: "Shomlings",
		profileImage:
			"https://gitlab.stud.idi.ntnu.no/uploads/-/system/user/avatar/9754/avatar.png?width=192",
	},
	{
		id: "4",
		message:
			"docs: styling backend readme blablablablab lablablablab lablablablab lablablabla se så flink jeg er:) docs: styling backend readme blablablablab lablablablab lablablablab lablablabla se så flink jeg er:) docs: styling backend readme blablablablab lablablablab lablablablab lablablabla se så flink jeg er:)",
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
							id={res.id}
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
