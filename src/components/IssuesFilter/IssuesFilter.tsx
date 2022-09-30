import { useEffect, useState } from "react";
import issueService from "../../services/issueService";
import { MultiSelect, Select } from "@mantine/core";
import "./IssuesFilter.css";
import memberService from "../../services/memberService";

export default function IssuesFilter({
  filterCreator,
  setFilterCreator,
  filterLabels,
  setFilterLabels,
}: any) {
  const [allLabels, setAllLabels] = useState<any[]>([]);
  const [creators, setCreators] = useState<any[]>([]);

  function setCreator(creator: string) {
    setFilterCreator({ ...setFilterCreator, creator });
  }

  function setLabels(labels: string[]) {
    setFilterLabels({ ...setFilterLabels, labels });
  }

  useEffect(() => {
    issueService
      .getLabels("17379", "glpat-GPrQJsa8_WicT1Fo5Ve1")
      .then((labels: any[]) => {
        setAllLabels(labels);
      });
    memberService
      .getActiveMembers("17379", "glpat-GPrQJsa8_WicT1Fo5Ve1")
      .then((creators: any[]) => {
        setCreators(creators);
      });
  }, []);

  return (
    <div className="filter">
      <MultiSelect
        data={allLabels}
        label="Filter by labels"
        placeholder="All labels"
        clearButtonLabel="Clear selection"
        clearable
        onChange={setLabels}
      />
      <Select
        label="Filter by creator"
        data={creators}
        searchable
        clearable
        placeholder="All creators"
        onChange={setCreator}
      />
    </div>
  );
}
