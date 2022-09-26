async function getAllIssues(projecID: string, privateToken: string): Promise<unknown> {
    try {
        const response = await fetch('https://gitlab.com/api/v4/projects/' + projecID +'/repository/issues?private_token=' + privateToken);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function getIssuesByLabels(projecID: string, labelList: string[], privateToken: string): Promise<unknown> {
    try {
        const labelString = labelList.join(',');

        const response = await fetch('https://gitlab.com/api/v4/projects/' + projecID +'/repository/issues?labels=' + labelString + '?private_token=' + privateToken);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

const issueService = {
    getAllIssues,
    getIssuesByLabels
}

export default issueService;