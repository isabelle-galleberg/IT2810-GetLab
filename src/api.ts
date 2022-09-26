export async function getBranches(projecID: number): Promise<unknown> {

    const response = await fetch('https://gitlab.com/api/v4/projects/' + projecID.toString() +'/repository/branches');
    const data = await response.json();
    return data;
}

export async function getAllCommits(projecID: number): Promise<unknown> {

    const response = await fetch('https://gitlab.com/api/v4/projects/' + projecID.toString() +'/repository/commits');
    const data = await response.json();
    return data;
}

export async function getCommitsByBranch(projecID: number, branchName: string): Promise<unknown> {

    const response = await fetch('https://gitlab.com/api/v4/projects/' + projecID.toString() +'/repository/commits?ref_name=' + branchName);
    const data = await response.json();
    return data;
}


export async function getAllIssues(projecID: number): Promise<unknown> {

    const response = await fetch('https://gitlab.com/api/v4/projects/' + projecID.toString() +'/repository/issues');
    const data = await response.json();
    return data;
}

export async function getIssuesByLabels(projecID: number, labelList: string[]): Promise<unknown> {

    const labelString = labelList.join(',');

    const response = await fetch('https://gitlab.com/api/v4/projects/' + projecID.toString() +'/repository/issues?labels=' + labelString);
    const data = await response.json();
    return data;
}