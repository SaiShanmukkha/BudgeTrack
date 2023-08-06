import styles from '../../../styles/Home.module.css';
import { categoryIcons } from '../Utilities/constants';
import Loader from '../Loader.jsx';

export default function RecentTransactions(props) {  
  return (
    <div className={styles.rtCard}>
        <div className={styles.rtItemHeader}>
            <h2>Recent Transactions</h2>
        </div>
        <div className={styles.rtItemtrasactions}>
          {
              props.loading ? <Loader /> : props.recentTransactions.length > 0 ? props.recentTransactions.map((transaction)=>{
                  return <div className={styles.rtItem} key={transaction.id}>
                          <div className={styles.rtItemDetail}>
                              <div className={`${styles.rtItemIcon}`} style={{'backgroundColor': '#bb45e6', 'border': '2px solid #560f70'}}>{transaction.isIncome?categoryIcons["income"]:categoryIcons[transaction.categoryName.categoryName]}</div>
                              <p>{new Date(transaction.createdAt).toISOString().substr(0, 10)}</p>
                              <p>{transaction.financeName}</p>
                          </div>
                          <p className={styles.rtItemValue} style={{'color':transaction.isIncome?'green':'red'}}>{transaction.isIncome?"+$":"-$"}{transaction.amount}</p>
                      </div> 
              }) : <p style={{textAlign: "center", marginTop: "20px"}}>No Transactions Found</p>
          }
        </div>
    </div>
  )
}
