import { validDate } from "../components/Wrappers/CommitsWrapper";

describe("validDate", () => {
  test("should return true for a valid date and false for an invalid date", () => {
    expect(validDate("2022-11-06", "2022-10-04", "2023-10-04")).toEqual(true);
    expect(validDate("2022-11-06", "2023-10-04", "2023-11-04")).toEqual(false);
    expect(validDate("2022-11-06", "2021-10-04", "2021-11-04")).toEqual(false);
  });
});
