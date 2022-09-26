async function getAllCommits(projecID: string): Promise<unknown> {
    const response = await fetch('https://gitlab.com/api/v4/projects/' + projecID +'/repository/commits');
    const data = await response.json();
    return data;
}

async function getCommitsByBranch(projecID: string, branchName: string): Promise<unknown> {
    const response = await fetch('https://gitlab.com/api/v4/projects/' + projecID +'/repository/commits?ref_name=' + branchName);
    const data = await response.json();
    return data;
}

const commitService = {
    getAllCommits,
    getCommitsByBranch
}

export default commitService;