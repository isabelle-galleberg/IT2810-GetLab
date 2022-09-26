async function getAllIssues(projecID: number): Promise<unknown> {
    const response = await fetch('https://gitlab.com/api/v4/projects/' + projecID.toString() +'/repository/issues');
    const data = await response.json();
    return data;
}

async function getIssuesByLabels(projecID: number, labelList: string[]): Promise<unknown> {

    const labelString = labelList.join(',');

    const response = await fetch('https://gitlab.com/api/v4/projects/' + projecID.toString() +'/repository/issues?labels=' + labelString);
    const data = await response.json();
    return data;
}

const issueService = {
    getAllIssues,
    getIssuesByLabels
}

export default issueService;