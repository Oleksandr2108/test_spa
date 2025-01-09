"use client";

import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Chart = () => {
  const users = useSelector((state: RootState) => state.users.users);

  const companyCount: { [key: string]: number } = {};

  users.forEach((user) => {
    const companyName = user.company.name;

    if (!companyCount[companyName]) {
      companyCount[companyName] = 0;
    }
    companyCount[companyName]++;
  });

  const labels = Object.keys(companyCount);
  const data = Object.values(companyCount);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Users",
        data,
        backgroundColor: "rgba(29, 78, 216, 0.6)",
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top" as const,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        title: {
          display: false,
        },
      },
      y: {
        title: {
          display: false,
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full ">
      <Bar
        data={chartData}
        options={options}
      />
    </div>
  );
};
export default Chart;
