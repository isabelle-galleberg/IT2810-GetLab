import "./commitFilter.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Select } from "@mantine/core";

import { DateRangePicker } from "@mantine/dates";
import { setBranches, setFilter } from "../../store/commitStore";
import { useDispatch } from "react-redux";
import Branch from "../../types/api/branch";
import branchService from "../../services/branchService";

function CommitFilter() {
  const branches = useSelector((state: any) => state.commitStore.branches);
  const filter = useSelector((state: any) => state.commitStore.filter);
  const commits = useSelector((state: any) => state.commitStore.commits);
  const dispatch = useDispatch();

  useEffect(() => {
    branchService
      .getBranches("17379", "glpat-GPrQJsa8_WicT1Fo5Ve1")
      .then((brancheRes: Branch[]) => {
        dispatch(setBranches(brancheRes));
        // get default branch
        updateBranch(brancheRes.find((m: Branch) => m.default)?.name ?? "");
      });
  }, []);

  const updateBranch = (branch: string) => {
    dispatch(setFilter({ ...filter, branch: branch }));
  };

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
