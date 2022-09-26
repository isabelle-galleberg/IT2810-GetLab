async function getAllIssues(projecID: string): Promise<unknown> {
    const response = await fetch('https://gitlab.com/api/v4/projects/' + projecID +'/repository/issues');
    const data = await response.json();
    return data;
}

async function getIssuesByLabels(projecID: string, labelList: string[]): Promise<unknown> {

    const labelString = labelList.join(',');

    const response = await fetch('https://gitlab.com/api/v4/projects/' + projecID +'/repository/issues?labels=' + labelString);
    const data = await response.json();
    return data;
}

const issueService = {
    getAllIssues,
    getIssuesByLabels
}

export default issueService;