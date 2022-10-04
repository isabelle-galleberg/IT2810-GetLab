import { useEffect, useState } from "react";
import "./CommitsChart.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import commitService from "../../services/commitServices";
import { CommitsChartProps } from "../../types/propTypes";
import getCommitsPerAuthor from "../../services/getCommitsPerAuthor";

export default function Chart({ projectId, token }: CommitsChartProps) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const [contributors, setContributors] = useState<string[]>([]);
  const [commits, setCommits] = useState<number[]>([]);

  const data = {
    labels: contributors.map((c) => c.split("@")[0]),
    datasets: [
      {
        label: "Commits",
        data: commits,
        backgroundColor: "rgba(245, 101, 39, 0.8)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  useEffect(() => {
    commitService.getAllCommits(projectId, token).then((commits: any) => {
      setContributors(Array.from(getCommitsPerAuthor(commits).keys()));
      setCommits(Array.from(getCommitsPerAuthor(commits).values()));
    });
  }, []);

  return <Bar data={data} options={options} className="commitsChart" />;
}
