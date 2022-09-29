async function getBranches(
  projectId: string,
  privateToken: string
): Promise<any> {
  try {
    const response = await fetch(
      "https://gitlab.stud.idi.ntnu.no/api/v4/projects/" +
        projectId +
        "/repository/branches?private_token=" +
        privateToken
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

const branchService = {
  getBranches,
};

export default branchService;
