import { getValue } from "@testing-library/user-event/dist/utils";
import { createContext, FC, useState } from "react";

export type GitlabCredentials = {
  projectId: string;
  apiSecret: string;
};

const contextDefaultValues: GitlabCredentials = {
  projectId: "",
  apiSecret: "",
};

export const GitlabContext =
  createContext<GitlabCredentials>(contextDefaultValues);

const GitlabContextProvider: FC = ({ children }: any) => {
  const [projectId, setProjectId] = useState<string>(
    contextDefaultValues.projectId
  );
  const [apiSecret, setApiSecret] = useState<string>(
    contextDefaultValues.projectId
  );

  return <GitlabContext.Provider value={}>{children}</GitlabContext.Provider>;
};

export default GitlabContextProvider;
