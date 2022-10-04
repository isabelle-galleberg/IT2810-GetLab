// Returns a map of how many commits each user has made. Iterates through all pages.
const getCommitsPerAuthor = (commits: any[]): Map<string, number> => {
  let commitsPerAuthor = new Map<string, number>();

  for (const commit of commits) {
    if (commitsPerAuthor.has(commit.author_email)) {
      commitsPerAuthor.set(
        commit.author_email,
        commitsPerAuthor.get(commit.author_email)! + 1
      );
    } else {
      commitsPerAuthor.set(commit.author_email, 1);
    }
  }
  return commitsPerAuthor;
};

export default getCommitsPerAuthor;
