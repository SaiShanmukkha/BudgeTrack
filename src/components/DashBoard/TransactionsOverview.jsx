import styles from '@/styles/TransactionsOverview.module.css'

export default function TransactionsOverview(props) {  
  return (
    <div className={styles.toCard}>
        
        <h2>Transaction Detail</h2>

        <div className={styles.toItem}>
            <h4>Total Transactions</h4>
            <p className={styles.toItemValue} style={{'color':'black'}}>{props.data.total_transactions}</p>
        </div> 

        <div className={styles.toItem}>
            <h4>Total InFlows</h4>
            <p className={styles.toItemValue} style={{'color':'black'}}>{props.data.inflow_transactions}</p>
        </div> 
        
        <div className={styles.toItem}>
            <h4>Total OutFlows</h4>
            <p className={styles.toItemValue} style={{'color':'black'}}>{props.data.outflow_transactions}</p>
        </div> 
        
    </div>
  )
}
