import styles from '../../../styles/Home.module.css'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Colors,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  import faker from 'faker';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Colors,
    Title,
    Tooltip,
    Legend
  );


export default function FinanceAnalysis(props) {

  

    const options = {
        responsive: true,
        animations: {
          tension: {
            duration: 1000,
            easing: 'easeInOutQuart',
            from: 1,
            to: 0,
            loop: false
          }
        },
        plugins: {
          legend: {
            position: 'top',
            display: false,
          },
          title: {
            display: true,
            text: 'Yearly Financial Data',
          },
        },
      };
      
      const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      
      const data = {
        labels,
        datasets: [
          {
            label: 'Income',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            borderColor: 'green',
            backgroundColor: '#9BD0F5',
            borderWidth: 1,
            pointBackgroundColor: "#9BD0F5",
            pointHoverBackgroundColor: 'yellow',
            pointRadius: 2,
          },
          {
            label: 'Expenditure',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            borderColor: 'red',
            backgroundColor: '#FFB1C1',
            borderWidth: 1,
            pointBackgroundColor: "#FFB1C1",
            pointHoverBackgroundColor: 'yellow',
            pointRadius: 2,
          },
        ],
      };

  return (
    <div className={styles.egCard}>
        <div className={styles.egItemHeader}>
            <h3>Financial Analysis</h3>
            <select>
                <option>Expense</option>
                <option>Income</option>
                <option>Both</option>
            </select>
        </div>

        <Line options={options} data={data} />
        
    </div>
  )
}

