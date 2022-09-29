// Returns list of names of all active members in a project (Members with at least one commit or created an issue)
async function getActiveMembers(projectId: string, privateToken: string): Promise<any> {
    try {
        const commitResponse = await fetch('https://gitlab.stud.idi.ntnu.no/api/v4/projects/' + projectId +'/repository/commits?per_page=100&private_token=' + privateToken);
        const commitData = await commitResponse.json();
        const issueResponse = await fetch('https://gitlab.stud.idi.ntnu.no/api/v4/projects/' + projectId +'/issues?per_page=100&private_token=' + privateToken);
        const issueData = await issueResponse.json();
        let activeMembers: string[] = [];
        for (const commit of commitData){
            if (!activeMembers.includes(commit.author_name)){
                activeMembers.push(commit.author_name);
            }
        }
        for (const issue of issueData){
            if (!activeMembers.includes(issue.author.name)){
                activeMembers.push(issue.author.name);
            }
        }
        return activeMembers;
    } catch (error) {
        console.log(error);
    }
}

const memberService = {
    getActiveMembers
};

export default memberService;