async function getBranches(projecID: number): Promise<unknown> {
    const response = await fetch('https://gitlab.com/api/v4/projects/' + projecID.toString() +'/repository/branches');
    const data = await response.json();
    return data;
}

const branchService = {
    getBranches
}

export default branchService;