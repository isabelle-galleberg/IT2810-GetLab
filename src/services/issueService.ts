
// Returns the response of an api call to get the issues of a project and how many pages the response has
async function getIssues(
  projectId: string,
  privateToken: string,
  numberOfIssues: string,
  page: number
): Promise<any> {
  try {
    const response = await fetch(
      "https://gitlab.stud.idi.ntnu.no/api/v4/projects/" +
        projectId +
        "/issues?per_page=" +
        numberOfIssues +
        "&private_token=" +
        privateToken +
        "&page=" +
        page
    );
    const data = await response.json();
    const totalPages = response.headers.get("X-Total-Pages");
    return { data, totalPages };
  } catch (error) {
    console.log(error);
  }
}

// Returns the response of an api call to get the issues with a set of given labels
async function getIssuesByLabels(
  projectId: string,
  labelList: string[],
  privateToken: string
): Promise<any> {
  try {
    const labelString = labelList.join(",");
    const response = await fetch(
      "https://gitlab.stud.idi.ntnu.no/api/v4/projects/" +
        projectId +
        "/issues?labels=" +
        labelString +
        "&private_token=" +
        privateToken
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// Returns a list of all labelnames in a project
async function getLabels(
  projectId: string,
  privateToken: string
): Promise<any> {
  try {
    const response = await fetch(
      "https://gitlab.stud.idi.ntnu.no/api/v4/projects/" +
        projectId +
        "/labels?private_token=" +
        privateToken
    );
    const data = await response.json();
    let labelList: string[] = [];
    for (const label of data) {
      if (!labelList.includes(label.name)) {
        labelList.push(label.name);
      }
    }
    return labelList;
  } catch (error) {
    console.log(error);
  }
}

const issueService = {
  getIssues,
  getIssuesByLabels,
  getLabels,
};

export default issueService;
