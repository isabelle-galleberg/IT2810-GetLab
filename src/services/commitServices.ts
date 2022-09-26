async function getAllCommits(projecID: number): Promise<unknown> {
    const response = await fetch('https://gitlab.com/api/v4/projects/' + projecID.toString() +'/repository/commits');
    const data = await response.json();
    return data;
}

async function getCommitsByBranch(projecID: number, branchName: string): Promise<unknown> {
    const response = await fetch('https://gitlab.com/api/v4/projects/' + projecID.toString() +'/repository/commits?ref_name=' + branchName);
    const data = await response.json();
    return data;
}

const commitService = {
    getAllCommits,
    getCommitsByBranch
}

export default commitService;