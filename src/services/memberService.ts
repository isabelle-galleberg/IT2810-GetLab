// Returns list of names of all active members in a project (Members with at least one commit or created an issue).

import Commit from "../types/api/commit";
import { Issue } from '../types/api/issue';

//Iterates through all pages.
async function getActiveMembers(
  projectId: string,
  privateToken: string
): Promise<string[]> {
  try {
    let commitData: Commit[] = [];
    let response_size = 100;
    let page = 1;
    while (response_size === 100) {
      const commitResponse = await fetch(
        "https://gitlab.stud.idi.ntnu.no/api/v4/projects/" +
          projectId +
          "/repository/commits?per_page=100&private_token=" +
          privateToken +
          "&page=" +
          page
      );
      const response_data = await commitResponse.json();
      response_size = response_data.length;
      commitData = commitData.concat(response_data);
      page++;
    }

    let issueData: Issue[] = [];
    response_size = 100;
    page = 1;
    while (response_size === 100) {
      const issueResponse = await fetch(
        "https://gitlab.stud.idi.ntnu.no/api/v4/projects/" +
          projectId +
          "/issues?per_page=100&private_token=" +
          privateToken +
          "&page=" +
          page
      );
      const response_data = await issueResponse.json();
      response_size = response_data.length;
      issueData = issueData.concat(response_data);
      page++;
    }

    let activeMembers: string[] = [];
    for (const commit of commitData) {
      if (!activeMembers.includes(commit.author_name)) {
        activeMembers.push(commit.author_name);
      }
    }
    for (const issue of issueData) {
      if (!activeMembers.includes(issue.author.name)) {
        activeMembers.push(issue.author.name);
      }
    }
    return activeMembers;
  } catch (error) {
    console.log(error);
    return [];
  }
}

const memberService = {
  getActiveMembers,
};

export default memberService;
