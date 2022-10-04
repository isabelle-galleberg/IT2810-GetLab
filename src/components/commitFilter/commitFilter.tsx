import "./commitFilter.css";
import { Select } from "@mantine/core";
import { DateRangePicker, DateRangePickerValue } from "@mantine/dates";
import Branch from "../../types/api/branch";
import branchService from "../../services/branchService";
import { useContext, useEffect } from "react";
import { GitlabContext } from "../../context/GitlabContext";

function CommitFilter({
  setFilter,
  filter,
  setBranches,
  branches,
  setDateRange,
}: any) {
  const { projectId, accessToken } = useContext(GitlabContext);

  const updateBranch = (branch: string) => {
    setFilter({ ...filter, branch: branch });
  };

  const updateDate = (value: DateRangePickerValue) => {
    var dateFrom = getDate(value, 0);
    var dateTo = getDate(value, 1);
    setDateRange({ ...setDateRange, dateFrom: dateFrom, dateTo: dateTo });
  };

  useEffect(() => {
    branchService
      .getBranches(projectId, accessToken)
      .then((brancheRes: Branch[]) => {
        setBranches(brancheRes);
        updateBranch(brancheRes.find((m: Branch) => m.default)?.name ?? "");
      });
  }, []);

  const branchSelectItems = branches.map((branch: Branch) => ({
    label: branch.name,
    value: branch.name,
  }));

  function getDate(value: DateRangePickerValue, index: number) {
    var year = String(value?.[index]?.getFullYear());
    var month = String(Number(value?.[index]?.getMonth()) + 1);
    var date = String(value?.[index]?.getDate());
    if (date.length === 1) {
      date = "0" + date;
    }
    if (month.length === 1) {
      month = "0" + month;
    }
    return year + "-" + month + "-" + date;
  }

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
        inputFormat="YYYY.MM.DD"
        onChange={updateDate}
      />
    </div>
  );
}
export default CommitFilter;
