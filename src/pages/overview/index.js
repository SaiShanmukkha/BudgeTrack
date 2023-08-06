import Head from "next/head";
import { useEffect, useState } from "react";
import common from "@/styles/Common.module.css";
import styles from "@/styles/transactions.module.css";
import Loader from "@/src/components/Loader";
import CyborgMap from "@/src/components/Utilities/CyborgMap";
import ExpOverview from "@/src/components/DashBoard/Overview";
import PieChart from "@/src/components/Charts/PieChart";
import BarChart from "@/src/components/Charts/BarChart";
import DataTable from "@/src/components/Charts/DataTable";

export default function Overview() {
  const date = new Date();
  const [loading, setLoading] = useState(true);  
  const [month, setMonth] = useState(`0${date.getMonth() + 1}`);
  const [year, setYear] = useState(date.getFullYear());
  const [analyticsData, setAnalyticsData] = useState({});

  let years_data = [];
  // Starting Year From 2023
  for (let i = 2023; i <= date.getFullYear(); i++) {
    years_data.push(i);
  }
  
  const months_data = [
      {
        name: "January",
        value: "01",
        days: 31
      },
      {
        name: "February",
        value: "02",
        days: ((year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0)) ? 29 : 28
      },
      {
        name: "March",
        value: "03",
        days: 31
      },
      {
        name: "April",
        value: "04",
        days: 30
      },
      {
        name: "May",
        value: "05",
        days: 31
      },
      {
        name: "June",
        value: "06",
        days: 30
      },
      {
        name: "July",
        value: "07",
        days: 31
      },
  
      {
        name: "August",
        value: "08",
        days: 31
      },
      {
        name: "September",
        value: "09",
        days: 30
      },
      {
        name: "October",
        value: "10",
        days: 31
      },
      {
        name: "November",
        value: "11",
        days: 30
      },
      {
        name: "December",
        value: "12",
        days: 31
      },
    ];

  const dataForTable = (transactions)=>{
    let tableData = [];

    for(const trans of transactions){
      tableData.push([new Date(trans.financeDate), trans.financeName, trans.amount, trans.categoryName.categoryName, trans.isIncome])
    }

    return [["Date", "Transaction Name", "Amount", "Category", "isIncome"], ...tableData];
  };

  const classifyByDay = (transactions) => {
    const dayNumbers = Array.from({ length: months_data[parseInt(month)]["days"] }, (_, i) => i + 1);

    const monthMap = dayNumbers.reduce((map, day) => {
      map.set(day, {income: 0.0, expense: 0.0});
      return map;
    }, new Map());

    for(const trans of transactions){
      const findate = trans["financeDate"]
      const day = parseInt(findate.substring(findate.length - 2));
      let ei = monthMap.get(day)
      if(trans.isIncome){
        ei.income += trans.amount;
        monthMap.set(day, ei);
      }else{
        ei.expense += trans.amount;
        monthMap.set(day, ei);
      }
    }

    const finalData = [...monthMap].map(([key, val]) => [key, val["income"], val["expense"]])
    return [["day", "income", "expense"], ...finalData];
  }

  const classifyFinanceData = (transactions) => {
    let income = 0;
    let expense = 0;
    let total_transactions = transactions.length;
    let inflow_transactions = 0;
    let outflow_transactions = 0;
    let category_map = new CyborgMap();
    if (transactions.length > 0) {
      transactions.forEach((ele) => {
        if (ele.isIncome) {
          inflow_transactions++;
          income += parseFloat(ele.amount);
        } else {
          outflow_transactions++;
          expense += parseFloat(ele.amount);
          if(category_map.has(ele.categoryName.categoryName)){
            category_map.increment(ele.categoryName.categoryName, parseFloat(ele.amount));
          }else{
            category_map.set(ele.categoryName.categoryName, parseFloat(ele.amount));
          }
        }
      });
    }
    income = income.toFixed(2);
    expense = expense.toFixed(2);
    let arr = Array.from(category_map, function (entry) {
      return [ entry[0], parseFloat(entry[1]) ];
    });
    arr = [["Category", "Expense"], ...arr];
    let data = { 
      "overview" : {income, expense, total_transactions, inflow_transactions, outflow_transactions}, 
      "pieChart": arr, 
      "barChart": classifyByDay(transactions),
      "tableData": dataForTable(transactions),
    };
    setAnalyticsData(data);
  };

  const fetchData = async () => {
    setLoading(true);
    let res = await fetch(
      `/api/hygraph/fetchtransactionbyfilters?month=${month}&year=${year}`, { cache: 'no-store'}
    );
    if (res.status == 200) {
      let data = await res.json();
      classifyFinanceData(data.transactions);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
      <div className={common.container}>
        <Head>
          <title>BudgeTrack - Overview</title>
          <meta name="description" content="All Expenses Data at One Place" />
        </Head>

        <main className={common.mainContent}>
          <div className={styles.transaction_filters}>
            <h3 className={styles.transaction_filters_header}>Choose Filters: </h3>
            <div className={styles.selector}>
              <select
                className={styles.month_filter}
                onChange={(e) => setMonth(e.target.value)}
                value={month}
              >
                {months_data.map((e) => {
                  return (
                    <option value={`${e.value}`} key={e.value}>
                      {e.name}
                    </option>
                  );
                })}
              </select>
              <select
                className={styles.year_filter}
                onChange={(e) => setYear(e.target.value)}
              >
                {/* Showing Data Only From 2023 */}
                {years_data.map((e) => {
                  return (
                    <option
                      value={`${e}`}
                      key={e}
                      defaultValue={e === date.getFullYear()}
                    >
                      {e}
                    </option>
                  );
                })}
              </select>
            </div>

            <button
              className={styles.show_data}
              onClick={fetchData}
              type="button"
            >
              Show Data
            </button>
          </div>

          <div className={styles.transaction_data}>
            {loading ? (
              <div className={styles.loaderContainer}>
                <Loader />
              </div>
            ) : (
              <> 
                
                <section className={styles.sectionOne}>
                  <ExpOverview data={analyticsData["overview"]} />              
                  <PieChart pie_data={analyticsData["pieChart"]} />
                </section>

                <section>
                  <BarChart bar_data={analyticsData["barChart"]} /> 
                </section>

                <section>
                  <DataTable tableData={analyticsData["tableData"]} />
                </section>        
      
              </>
            )}
          </div>
        </main>
      </div>
  );
}


Overview.auth = true;