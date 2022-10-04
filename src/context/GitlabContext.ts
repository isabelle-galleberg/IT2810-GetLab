import { createContext } from "react";

export type GitlabCredentials = {
  projectId: string;
  setProjectId: (c: string) => void;
  accessToken: string;
  setAccessToken: (c: string) => void;
};

export const GitlabContext = createContext<GitlabCredentials>(
  {} as GitlabCredentials
);
