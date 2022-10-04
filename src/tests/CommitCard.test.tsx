import renderer from "react-test-renderer";
import CommitCard from "../components/CommitCard/CommitCard";

describe("<CommitCard />", () => {
  it("should render a commit card with given values", () => {
    const elem = renderer
      .create(
        <CommitCard
          title="My first commit"
          committedAt="10.08.2022"
          author="me"
        />
      )
      .toJSON();
    expect(elem).toMatchSnapshot();
  });
});
