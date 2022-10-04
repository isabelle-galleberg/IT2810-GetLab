export default interface Commit {
  id: string;
  short_id: string;
  title: string;
  author_name: string;
  author_email: string;
  committed_date: string;
  message: string;
}
