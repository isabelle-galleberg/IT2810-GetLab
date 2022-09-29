import { Select } from "@mantine/core";
import { useState } from "react";
import CommitsWrapper from "../../components/Wrappers/CommitsWrapper";
import IssuesWrapper from "../../components/Wrappers/IssuesWrapper";
import "./MainPage.css";

export default function MainPage() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <div className="mainPage">
      <Select
        className="select"
        placeholder="Pick one"
        radius="md"
        onChange={setValue}
        data={[
          { value: 'commits', label: 'Commit log' },
          { value: 'issues', label: 'Issues' },
        ]}
      />
      <div>
        {value === "commits" &&
          <div>
            <CommitsWrapper></CommitsWrapper>
          </div>
        }
        {value === "issues" &&
          <div>
            <IssuesWrapper></IssuesWrapper>
          </div>
        }
      </div>
    </div>
  );
}
