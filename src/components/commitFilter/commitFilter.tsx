import "./commitFilter.css";
import { Select } from "@mantine/core";

import { DateRangePicker } from "@mantine/dates";
import Branch from "../../types/api/branch";
import branchService from "../../services/branchService";
import { useContext, useEffect } from "react";
import { GitlabContext } from "../../context/GitlabContext";

function CommitFilter({
  setFilter,
  filter,
  setBranches,
  branches,
  branch,
}: any) {
  const updateBranch = (branch: string) => {
    setFilter({ ...filter, branch: branch });
  };

  const { projectId, apiSecret } = useContext(GitlabContext);

  useEffect(() => {
    branchService
      .getBranches(projectId, apiSecret)
      .then((brancheRes: Branch[]) => {
        setBranches(brancheRes);
        updateBranch(brancheRes.find((m: Branch) => m.default)?.name ?? "");
      });
  }, []);

  const branchSelectItems = branches.map((branch: Branch) => ({
    label: branch.name,
    value: branch.name,
  }));

  return (
    <div className="filter">
      <Select
        label="Filter by branch"
        data={branchSelectItems}
        searchable
        onChange={updateBranch}
        value={filter.branch}
      />
      <DateRangePicker
        label="Filter by date"
        placeholder="Seeing all commits"
        inputFormat="YYYY-MM-DD"
      />
    </div>
  );
}

export default CommitFilter;
