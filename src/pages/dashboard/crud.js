import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import '../styles/crud.css'; // Import your CSS file for styling

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Crud = () => {
    // Example data: customer counts for each month
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Added Customers',
                data: [50, 60, 70, 180, 190, 200, 210], // Replace with your actual data
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
            
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Customers',
                },
            },
        },
    };

    return (
        <div className="crud-container">
            <h1>Customer Management</h1>
            {/* Your CRUD operations and other components */}
            <div className="chart-container">
                <h2>Customer Counts Per Month</h2>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default Crud;
