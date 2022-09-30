//Inspired by https://react-chartjs-2.js.org/examples/vertical-bar-chart/

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
    commitService
      .getCommitsPerAuthor(projectId, token)
      .then((commitsPerAuthor: Map<string, number>) => {
        setContributors(Array.from(commitsPerAuthor.keys()));
        setCommits(Array.from(commitsPerAuthor.values()));
      });
  }, []);

  return <Bar data={data} options={options} className="commitsChart" />;
}
