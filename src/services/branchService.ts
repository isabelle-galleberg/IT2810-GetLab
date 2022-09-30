// Returns the response of an api call to get the branches of a project. Iterates through all pages.
async function getBranches(
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
          "/repository/branches?per_page=100&private_token=" +
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

const branchService = {
  getBranches,
};

export default branchService;
