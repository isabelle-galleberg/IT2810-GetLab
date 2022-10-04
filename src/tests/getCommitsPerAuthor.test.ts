import getCommitsPerAuthor from "../services/getCommitsPerAuthor";

describe("getCommitsPerAuthor", () => {
  test("should return the number of commits per author", () => {
    const input = [
      { author_email: "user1@gmail.com" },
      { author_email: "user1@gmail.com" },
      { author_email: "user2@stud.ntnu.no" },
      { author_email: "user3@ntnui.no" },
      { author_email: "user3@ntnui.no" },
      { author_email: "user3@ntnui.no" },
    ];

    const output = new Map<string, number>();
    output.set("user1@gmail.com", 2);
    output.set("user2@stud.ntnu.no", 1);
    output.set("user3@ntnui.no", 3);

    expect(getCommitsPerAuthor(input)).toEqual(output);
  });
});
