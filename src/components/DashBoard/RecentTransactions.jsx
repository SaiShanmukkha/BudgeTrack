import styles from "../../../styles/Home.module.css";
import { categoryIcons } from "../Utilities/constants";
import Loader from "../Loader.jsx";
import { useState, useRef } from "react";
import RtModalView from "../model/RTModalView";
import { useRecentTransactions } from "../Utilities/useRecentTransactions";
import { useCategories } from "../Utilities/useCategories";

export default function RecentTransactions(props) {
  const [showModal, setShowModal] = useState(false);
  const clicked_transaction = useRef(null);
  const recentTransactionsInfo = useRecentTransactions();
  const categoriesInfo = useCategories();

  const handleClick = (transaction) => {
    setShowModal(true);
    clicked_transaction.current = transaction;
  };

  return (
    <div className={styles.rtCard}>
      <div className={styles.rtItemHeader}>
        <h2>Recent Transactions</h2>
      </div>
      {showModal && (
        <RtModalView
          categories={categoriesInfo.categories}
          transaction={clicked_transaction.current}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
      <div className={styles.rtItemtrasactions}>
        {recentTransactionsInfo.isLoading ? (
          <Loader />
        ) : recentTransactionsInfo.recentTransactions.length > 0 ? (
          recentTransactionsInfo.recentTransactions.map((transaction) => {
            return (
              <div
                className={styles.rtItem}
                key={transaction.id}
                onClick={() => {
                  handleClick(transaction);
                }}
              >
                <div className={styles.rtItemDetail}>
                  <div className={`${styles.rtItemIcon}`}>
                    {transaction.isIncome
                      ? categoryIcons["income"]
                      : categoryIcons[transaction.categoryName.categoryName]}
                  </div>
                  <p>
                    {new Date(transaction.financeDate)
                      .toISOString()
                      .substring(0, 10)}
                  </p>
                  <p>{transaction.financeName}</p>
                </div>
                <p
                  className={styles.rtItemValue}
                  style={{ color: transaction.isIncome ? "green" : "red" }}
                >
                  {transaction.isIncome ? "+$" : "-$"}
                  {transaction.amount}
                </p>
              </div>
            );
          })
        ) : (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            No Transactions Found
          </p>
        )}
      </div>
    </div>
  );
}
