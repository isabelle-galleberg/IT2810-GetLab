import React, { useState } from "react";
import { useSelector } from "react-redux";
// import select from mantine
import { Select } from "@mantine/core";
import { setFilter } from "../../store/commitStore";
import { useDispatch } from "react-redux";
// import Branch from "../../types/api/branch";
// import Commit from "../../types/api/commit";
// import { setBranches, setCommits } from "../../store/user";
// import store

function CommitFilter() {
  // setBranches(["asdad"]);
  const branches = useSelector((state: any) => state.commitStore.branches);
  const filter = useSelector((state: any) => state.commitStore.filter);
  const commits = useSelector((state: any) => state.commitStore.commits);
  const dispatch = useDispatch();

  const updateBranch = (branch: string) => {
    let newFilter = { ...filter };
    newFilter.branch = branch;
    dispatch(setFilter(newFilter));
  };

  const branchSelectItems = branches.map((branch: any) => ({
    label: branch.name,
    value: branch.name,
  }));

  return (
    <div>
      <Select
        label="Your favorite framework/library"
        placeholder="Pick one"
        data={branchSelectItems}
        searchable
        onChange={updateBranch}
        value={filter.branch}
      />
    </div>
  );
}

export default CommitFilter;
