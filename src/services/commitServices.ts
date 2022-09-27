async function getAllCommits(projectID: string, privateToken: string): Promise<any> {
    try {
        const response = await fetch('https://gitlab.stud.idi.ntnu.no/api/v4/projects/' + projectID +'/repository/commits?private_token=' + privateToken);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function getCommitsByBranch(projectID: string, branchName: string, privateToken: string): Promise<any> {
    try {
        const response = await fetch('https://gitlab.stud.idi.ntnu.no/api/v4/projects/' + projectID +'/repository/commits?ref_name=' + branchName + '&private_token=' + privateToken);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

const commitService = {
    getAllCommits,
    getCommitsByBranch
}

export default commitService;