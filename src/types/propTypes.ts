import Branch from "./api/branch";

export interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  disabled?: boolean;
}
export interface CommitCardProps {
  title: string;
  committedAt: string;
  author: string;
}
export interface CommitsChartProps {
  projectId: string;
  token: string;
}
export interface IssueCardProps {
  title: string;
  labels: string[];
  issueNumber: string;
  createdAt: string;
  author: string;
}
export interface LayoutProps {
  children: React.ReactNode;
}
export interface TextFieldProps {
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface CommitFilterProps {
  filter: { branch: string };
  setFilter: (filter: { branch: string }) => void;
  branches: Branch[];
  setBranches: (branches: Branch[]) => void;
  setDateRange: (dateRange: { dateFrom: string; dateTo: string }) => void;
}
export interface IssueFilterProps {
  setFilterCreator: any;
  setFilterLabels: any;
}

export interface DateRangeProps {
  dateFrom: string;
  dateTo: string;
}
