'use client';

import { CategoryScale, Chart, LineElement, LinearScale, PointElement, Tooltip } from "chart.js";
import { Line } from "react-chartjs-2";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

interface ILineChartProps {
    data: {
        labels: string[];
        datasets: {
            label: string;
            data: number[];
        }[];
    };
}

export const LineChart = ({ data }: ILineChartProps) => {
    return <Line data={data} />;
};