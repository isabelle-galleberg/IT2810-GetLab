export interface Issue {
  id: string;
  iid: string;
  name: string;
  project_id: string;
  string: string;
  title: string;
  description: string;
  labels: string[];
  author: { name: string; username: string };
  updated_at: string;
}
