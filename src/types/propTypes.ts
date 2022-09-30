export interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  disabled?: boolean;
};
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
  issueNumber: number;
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
