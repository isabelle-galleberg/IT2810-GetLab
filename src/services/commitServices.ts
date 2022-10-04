// Returns the response of an api call to get the commits of a project. Iterates through all pages.
async function getAllCommits(
  projectId: string,
  privateToken: string
): Promise<any> {
  try {
    let data: any[] = [];
    let response_size = 100;
    let page = 1;
    while (response_size === 100) {
      const response = await fetch(
        "https://gitlab.stud.idi.ntnu.no/api/v4/projects/" +
          projectId +
          "/repository/commits?per_page=100&private_token=" +
          privateToken +
          "&page=" +
          page
      );
      const response_data = await response.json();
      response_size = response_data.length;
      data = data.concat(response_data);
      page++;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}

// Returns the response of an api call to get the commits of a given branch. Iterates through all pages.
async function getCommitsByBranch(
  projectId: string,
  branchName: string,
  privateToken: string,
  dateRange: any
): Promise<any> {
  let data = [] as any[];
  try {
    let url =
      "https://gitlab.stud.idi.ntnu.no/api/v4/projects/" +
      projectId +
      "/repository/commits?ref_name=" +
      branchName +
      "&per_page=100&private_token=" +
      privateToken;
    if (!isNaN(dateRange.from.getDate()) && !isNaN(dateRange.to.getDate())) {
      url +=
        "&since=" +
        dateRange.from.toISOString() +
        "&until=" +
        dateRange.to.toISOString();
    }
    let nextPage = "1" as string | null;
    while (nextPage) {
      const response = await fetch(url + "&page=" + nextPage);
      const response_data = await response.json();
      data = data.concat(response_data);
      nextPage = response.headers.get("x-next-page");
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}

const commitService = {
  getAllCommits,
  getCommitsByBranch,
};

export default commitService;
