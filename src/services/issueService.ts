// Returns the response of an api call to get the issues. Iterates through all pages.
async function getIssues(
  projectId: string,
  privateToken: string
): Promise<any> {
  try {
    let data: any[] = [];
    let response_size = 100;
    let page = 0;
    while (response_size == 100) {
      page++;
      const response = await fetch(
        "https://gitlab.stud.idi.ntnu.no/api/v4/projects/" +
        projectId +
        "/issues?per_page=100" +
        "&private_token=" +
        privateToken +
        "&page=" +
        page
      );
      const response_data = await response.json();
      response_size = response_data.length;
      data = data.concat(response_data);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}

// Returns the response of an api call to get the issues with a set of given labels. Iterates through all pages.
async function getIssuesByLabels(
  projectId: string,
  labelList: string[],
  privateToken: string
): Promise<any> {
  try {
    let data: any[] = [];
    let response_size = 100;
    let page = 0;
    while (response_size == 100) {
      page++;
      const labelString = labelList.join(",");
      const response = await fetch(
        "https://gitlab.stud.idi.ntnu.no/api/v4/projects/" +
        projectId +
        "/issues?labels=" +
        encodeURIComponent(labelString) +
        "&per_page=100&private_token=" +
        privateToken +
        "&page=" +
        page
      );
      const response_data = await response.json();
      response_size = response_data.length;
      data = data.concat(response_data);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}

// Returns a list of all labelnames in a project. Iterates through all pages.
async function getLabels(
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
        "/labels?per_page=100&private_token=" +
        privateToken +
        "&page=" +
        page
      );
      const response_data = await response.json();
      response_size = response_data.length;
      data = data.concat(response_data);
      page++;
    }
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
