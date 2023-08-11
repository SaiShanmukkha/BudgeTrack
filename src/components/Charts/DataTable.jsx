import styles from "@/styles/DataTable.module.css";
import { Chart } from "react-google-charts";

export default function DataTable(props){
    const options = {
        legend: { position: "top" },
        title: "Day Wise Comparison",
        curveType: "function",
        allowHtml: true,
        cssClassNames:{
          headerRow: `${styles.headerRow}`,
          tableRow: `${styles.tableRow}`,
          oddTableRow: `${styles.oddTableRow}`,
          selectedTableRow: `${styles.selectedTableRow}`,
          hoverTableRow: `${styles.hoverTableRow}`,
          headerCell: `${styles.headerCell}`,
          tableCell: `${styles.tableCell}`,
          rowNumberCell: `${styles.rowNumberCell}`
        },
        width: "100%",
        frozenColumns: 3,
        animation:{
          duration: 1000,
          easing: 'out',
          startup: true
        },
      };

      const formatters = [
        {
            type: "DateFormat",
            column: 0,
            options: {
              formatType: "medium",
            },
        },
        {
            type: "NumberFormat",
            column: 2,
            options: {
              prefix: "$",
              fractionDigits: 2,
            },
        }
      ];

    return (
        <div className={styles.dataTable}>
            <Chart
            chartType="Table"
            width="100%"
            data={props.tableData}
            options={options}
            formatters={formatters}
            />
        </div>
    );
}