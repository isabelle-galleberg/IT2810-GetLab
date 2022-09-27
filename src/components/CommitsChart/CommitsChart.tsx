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

function createChart(projectId: string, token: string) {
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

  const [commits, setCommits] = useState<any[]>([]);

  useEffect(() => {
    commitService
      .getAllCommits("17379", "glpat-GPrQJsa8_WicT1Fo5Ve1")
      .then((commits: any[]) => {
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

export function Chart() {
  return createChart("17379", "glpat-GPrQJsa8_WicT1Fo5Ve1");
}
