// Returns the response of an api call to get the commits of a project
async function getAllCommits(
  projectId: string,
  privateToken: string
): Promise<any> {
  try {
    const response = await fetch(
      "https://gitlab.stud.idi.ntnu.no/api/v4/projects/" +
        projectId +
        "/repository/commits?private_token=" +
        privateToken
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// Returns the response of an api call to get the commits of a given branch
async function getCommitsByBranch(
  projectId: string,
  branchName: string,
  privateToken: string
): Promise<any> {
  try {
    const response = await fetch(
      "https://gitlab.stud.idi.ntnu.no/api/v4/projects/" +
        projectId +
        "/repository/commits?ref_name=" +
        branchName +
        "&private_token=" +
        privateToken
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// Returns a map of how many commits each user has made
async function getCommitsPerAuthor(projectId: string, privateToken: string): Promise<any> {
    try {
        const response = await fetch('https://gitlab.stud.idi.ntnu.no/api/v4/projects/' + projectId +'/repository/commits?ref_name=main&per_page=10000&private_token=' + privateToken);
        const data = await response.json();
        let commitsPerAuthor = new Map<string, number>();
        for (const commit of data){
            if (commitsPerAuthor.has(commit.author_name)){
                commitsPerAuthor.set(commit.author_name, commitsPerAuthor.get(commit.author_name)! + 1);
            } else {
                commitsPerAuthor.set(commit.author_name, 1);
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
    getCommitsPerAuthor
}

export default commitService;
