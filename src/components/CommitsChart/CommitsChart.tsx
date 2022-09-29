//Inspired by https://react-chartjs-2.js.org/examples/vertical-bar-chart/

import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import commitService from '../../services/commitServices';

export interface CommitsChartProps {
  projectId: string;
  token: string;
}

export default function Chart({ projectId, token }: CommitsChartProps) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };
  
  const [contributors, setContributors] = useState<string[]>([]);
  const [commits, setCommits] = useState<number[]>([]);

  useEffect(() => {
    commitService
      .getCommitsPerAuthor(projectId, token)
      .then((commitsPerAuthor: Map<string, number>) => {
        const contributors = Array.from(commitsPerAuthor.keys());
        const commits = Array.from(commitsPerAuthor.values());
        setContributors(contributors);
        setCommits(commits);
      });
  }, []);
  
  const data = {
    labels: contributors,
    datasets: [
      {
        label: 'Commits',
        data: commits,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return <Bar data={data} options={options} />;
}

