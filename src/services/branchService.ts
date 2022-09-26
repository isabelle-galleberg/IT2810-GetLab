async function getBranches(projecID: string): Promise<unknown> {
    const response = await fetch('https://gitlab.com/api/v4/projects/' + projecID +'/repository/branches');
    const data = await response.json();
    return data;
}

const branchService = {
    getBranches
}

export default branchService;