import styles from '@/styles/Home.module.css'

export default function ExpOverview(props) {  
  return (
    <div className={styles.eoCard}>

        <div className={styles.eoItemHeader}>
            <h2>Cash Flow Overview</h2>
        </div>

        <div className={styles.eoItem}>
            <h4>Expenditure</h4>
            <p className={styles.eoItemValue}>{props.data===undefined? 0:props.data.expense}</p>
        </div> 

        <div className={styles.eoItem}>
            <h4>Income</h4>
            <p className={styles.eoItemValue}>{props.data===undefined? 0:props.data.income}</p>
        </div> 
    </div>
  )
}
