async function getIssues(projectID: string, privateToken: string, numberOfIssues: string, page: number): Promise<any> {
    try {
        const response = await fetch('https://gitlab.stud.idi.ntnu.no/api/v4/projects/' + projectID + '/issues?per_page=' + numberOfIssues + '&private_token=' + privateToken + "&page=" + page);
        const data = await response.json();
        const totalPages = response.headers.get("X-Total-Pages");
        return {data, totalPages};
    } catch (error) {
        console.log(error);
    }
}

async function getIssuesByLabels(projectID: string, labelList: string[], privateToken: string): Promise<any> {
    try {
        const labelString = labelList.join(',');
        const response = await fetch('https://gitlab.stud.idi.ntnu.no/api/v4/projects/' + projectID +'/issues?labels=' + labelString + '&private_token=' + privateToken);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

const issueService = {
    getIssues,
    getIssuesByLabels
}

export default issueService;