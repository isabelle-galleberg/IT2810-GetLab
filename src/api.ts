export function getBranches(projecID: number): Promise<unknown> {

    return fetch('https://gitlab.com/api/v4/projects/' + projecID.toString() +'/repository/branches')
        .then(response => response.json())
        .then(response => {
            return response as unknown;
        })
}

export function getAllCommits(projecID: number): Promise<unknown> {

    return fetch('https://gitlab.com/api/v4/projects/' + projecID.toString() +'/repository/commits')
        .then(response => response.json())
        .then(response => {
            return response as unknown;
        })
}

export function getCommitsByBranch(projecID: number, branchName: string): Promise<unknown> {

    return fetch('https://gitlab.com/api/v4/projects/' + projecID.toString() +'/repository/commits?ref_name=' + branchName)
        .then(response => response.json())
        .then(response => {
            return response as unknown;
        })
}


export function getAllIssues(projecID: number): Promise<unknown> {

    return fetch('https://gitlab.com/api/v4/projects/' + projecID.toString() +'/repository/issues')
        .then(response => response.json())
        .then(response => {
            return response as unknown;
        })
}

export function getIssuesByLabels(projecID: number, labelList: string[]): Promise<unknown> {

    const labelString = labelList.join(',');

    return fetch('https://gitlab.com/api/v4/projects/' + projecID.toString() +'/repository/issues?labels=' + labelString)
        .then(response => response.json())
        .then(response => {
            return response as unknown;
        })
}