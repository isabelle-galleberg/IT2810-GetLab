import { useContext, useEffect, useState } from "react";
import issueService from "../../services/issueService";
import { MultiSelect, Select } from "@mantine/core";
import "./IssuesFilter.css";
import memberService from "../../services/memberService";
import { GitlabContext } from "../../context/GitlabContext";
import { IssueFilterProps } from '../../types/propTypes';


export default function IssuesFilter({
  setFilterCreator,
  setFilterLabels,
}: IssueFilterProps) {
  const { projectId, accessToken } = useContext(GitlabContext);
  const [allLabels, setAllLabels] = useState<string[]>([]);
  const [creators, setCreators] = useState<string[]>([]);

  function setCreator(creator: string) {
    setFilterCreator({ ...setFilterCreator, creator });
  }

  function setLabels(labels: string[]) {
    setFilterLabels({ ...setFilterLabels, labels });
  }

  useEffect(() => {
    issueService.getLabels(projectId, accessToken).then((labels: string[]) => {
      setAllLabels(labels);
    });
    memberService
      .getActiveMembers(projectId, accessToken)
      .then((creators: string[]) => {
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
        dropdownPosition="bottom"
      />
      <Select
        label="Filter by creator"
        data={creators}
        searchable
        clearable
        placeholder="All creators"
        onChange={setCreator}
        dropdownPosition="bottom"
      />
    </div>
  );
}
