async function getAllIssues(projecID: string, privateToken: string): Promise<unknown> {
    const response = await fetch('https://gitlab.com/api/v4/projects/' + projecID +'/repository/issues?private_token=' + privateToken);
    const data = await response.json();
    return data;
}

async function getIssuesByLabels(projecID: string, labelList: string[], privateToken: string): Promise<unknown> {

    const labelString = labelList.join(',');

    const response = await fetch('https://gitlab.com/api/v4/projects/' + projecID +'/repository/issues?labels=' + labelString + '?private_token=' + privateToken);
    const data = await response.json();
    return data;
}

const issueService = {
    getAllIssues,
    getIssuesByLabels
}

export default issueService;