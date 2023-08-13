import styles from '../../../styles/Home.module.css';
import { categoryIcons } from '../Utilities/constants';
import Loader from '../Loader.jsx';
import { useState, useRef } from 'react';
import RtModalView from "../model/RTModalView"

export default function RecentTransactions(props) {  
  const [showModal, setShowModal] = useState(false);
  const clicked_transaction = useRef(null);

  const handleClick = (transaction) => {
    setShowModal(true);
    clicked_transaction.current = transaction;
    console.log(clicked_transaction.current);
  }
  
  return (
    <div className={styles.rtCard}>
        <div className={styles.rtItemHeader}>
            <h2>Recent Transactions</h2>
        </div>
        {showModal && <RtModalView transaction={clicked_transaction.current} showModal={showModal} setShowModal={setShowModal} />}
        <div className={styles.rtItemtrasactions}>
          {
            props.loading ? <Loader /> : props.recentTransactions.length > 0 ? props.recentTransactions.map((transaction)=>{
              return <div className={styles.rtItem} key={transaction.id} onClick={()=>{
                handleClick(transaction);
              }}>
                          <div className={styles.rtItemDetail}>
                              <div className={`${styles.rtItemIcon}`} >{transaction.isIncome?categoryIcons["income"]:categoryIcons[transaction.categoryName.categoryName]}</div>
                              <p>{new Date(transaction.createdAt).toISOString().substring(0, 10)}</p>
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
