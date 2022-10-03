import "./commitFilter.css";
import { Select } from "@mantine/core";

import { DateRangePicker } from "@mantine/dates";
import Branch from "../../types/api/branch";
import branchService from "../../services/branchService";
import { useEffect } from "react";

function CommitFilter({
  setFilter,
  filter,
  setBranches,
  branches,
}: any) {
  const updateBranch = (branch: string) => {
    setFilter({ ...filter, branch: branch });
  };

  useEffect(() => {
    branchService
      .getBranches("17379", "glpat-GPrQJsa8_WicT1Fo5Ve1")
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
