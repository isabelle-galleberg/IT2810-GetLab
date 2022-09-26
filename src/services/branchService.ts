async function getBranches(projecID: string, privateToken: string): Promise<unknown> {
    try {
        const response = await fetch('https://gitlab.com/api/v4/projects/' + projecID +'/repository/branches?private_token=' + privateToken);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

const branchService = {
    getBranches
}

export default branchService;