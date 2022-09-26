async function getAllCommits(projecID: string, privateToken: string): Promise<unknown> {
    const response = await fetch('https://gitlab.com/api/v4/projects/' + projecID +'/repository/commits?private_token=' + privateToken);
    const data = await response.json();
    return data;
}

async function getCommitsByBranch(projecID: string, branchName: string, privateToken: string): Promise<unknown> {
    const response = await fetch('https://gitlab.com/api/v4/projects/' + projecID +'/repository/commits?ref_name=' + branchName + '?private_token=' + privateToken);
    const data = await response.json();
    return data;
}

const commitService = {
    getAllCommits,
    getCommitsByBranch
}

export default commitService;