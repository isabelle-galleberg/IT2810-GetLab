// Returns the response of an api call to get the commits of a project. Iterates through all pages.
async function getAllCommits(
  projectId: string,
  privateToken: string
): Promise<any> {
  try {
    let data: any[] = [];
    let response_size = 100;
    let page = 1;
    while (response_size == 100) {
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
  privateToken: string
): Promise<any> {
  try {
    let data: any[] = [];
    let response_size = 100;
    let page = 1;
    while (response_size == 100) {
      const response = await fetch(
        "https://gitlab.stud.idi.ntnu.no/api/v4/projects/" +
          projectId +
          "/repository/commits?ref_name=" +
          branchName +
          "&per_page=100&private_token=" +
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

// Returns a map of how many commits each user has made. Iterates through all pages.
async function getCommitsPerAuthor(
  projectId: string,
  privateToken: string
): Promise<any> {
  try {
    let data: any[] = [];
    let response_size = 100;
    let page = 1;
    while (response_size == 100) {
      const response = await fetch(
        "https://gitlab.stud.idi.ntnu.no/api/v4/projects/" +
          projectId +
          "/repository/commits?ref_name=main&per_page=100&private_token=" +
          privateToken +
          "&page=" +
          page
      );
      const response_data = await response.json();
      response_size = response_data.length;
      data = data.concat(response_data);
      page++;
    }
    let commitsPerAuthor = new Map<string, number>();
    for (const commit of data) {
      if (commitsPerAuthor.has(commit.author_email)) {
        commitsPerAuthor.set(
          commit.author_email,
          commitsPerAuthor.get(commit.author_email)! + 1
        );
      } else {
        commitsPerAuthor.set(commit.author_email, 1);
      }
    }
    return commitsPerAuthor;
  } catch (error) {
    console.log(error);
  }
}

const commitService = {
  getAllCommits,
  getCommitsByBranch,
  getCommitsPerAuthor,
};

export default commitService;
