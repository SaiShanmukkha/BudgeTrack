import styles from "@/styles/transactions.module.css";
import { Chart } from "react-google-charts";

export default function BarChart(props){
    const options = {
        legend: { position: "top" },
        title: "Day Wise Comparison",
        chartArea: { width: "50%" },
        colors: ["green", "red"],
        diff: { newData: { widthFactor: 0.5 } },
        chartArea: { 
          width: "80%",
        },
        animation:{
          duration: 1000,
          easing: 'out',
          startup: true
        },
        hAxis: {
          title: "Day",
          minValue: 1,
          ticks: props.bar_data.map(([a1, a2, a3])=>a1)
        },
        vAxis: {
          title: "Transaction Value",
          minValue: 0
        },
      };

    return (
        <div className={styles.pieChart}>
            <Chart
            chartType="ColumnChart"
            width="100%"
            height="400px"
            data={props.bar_data}
            options={options}
            />
        </div>
    );
}