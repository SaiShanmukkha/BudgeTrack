import styles from "@/styles/transactions.module.css";
import { Chart } from "react-google-charts";

export default function PieChart(props){

    const options = {
        title: "Expenses - Category Wise",
        is3D: true,
        legend: "Finance Data"
    }

    return (
        <div className={styles.pieChart}>
        <Chart
            chartType="PieChart"
            data={props.pie_data}
            options={options}
            height={"350px"}
            width={"100%"}
        />
    </div>
    );
}