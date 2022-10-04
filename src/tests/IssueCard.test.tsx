import renderer from "react-test-renderer";
import IssueCard from "../components/IssueCard/IssueCard";

describe("<IssueCard />", () => {
  it("should render an issue card with given values", () => {
    const elem = renderer
      .create(
        <IssueCard
          title="Make it work"
          labels={["priority: high"]}
          issueNumber={1}
          createdAt="10.08.2022"
          author="me"
        />
      )
      .toJSON();
    expect(elem).toMatchSnapshot();
  });
});
