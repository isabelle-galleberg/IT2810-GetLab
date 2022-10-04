// Returns the response of an api call to get the commits of a project. Iterates through all pages.
export async function getRepositoryName(
  projectId: string,
  privateToken: string
): Promise<string | null> {
  try {
    const response = await fetch(
      "https://gitlab.stud.idi.ntnu.no/api/v4/projects/" +
        projectId +
        "?private_token=" +
        privateToken
    );
    const response_data = await response.json();
    return response_data.name;
  } catch {
    return null;
  }
}
