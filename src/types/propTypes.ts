export interface LayoutProps {
  children: React.ReactNode;
}
export interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  disabled?: boolean;
};
export interface TextFieldProps {
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface CommitCardProps {
	id: number;
	message: string;
	dateAuthored: string;
	profileName: string;
}
