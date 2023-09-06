import styles from "@/styles/transactions.module.css";
import { Chart } from "react-google-charts";

export default function PieChart(props){

    const options = {
        title: "Expenses - Category Wise",
        is3D: true,
        legend: "Finance Data",
        backgroundColor: 'transparent',
        titleTextStyle: {
            color: "blueviolet",
            bold: true,
            fontSize: 20
        },
        legend: {
            textStyle: {
                color: "grey",
                bold: true,
            }
        },
        animation: {
            duration: 1,
            easing: "inAndOut",
            startup: true,
            
        }
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