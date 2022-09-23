export interface LayoutProps {
	children: React.ReactNode;
}

export interface CommitCardProps {
	id: number;
	message: string;
	dateAuthored: string;
	profileName: string;
	profileImage: any;
}
