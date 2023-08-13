import React from "react";
import Modal from "./Modal";
import styles from "../../../styles/RTModalView.module.css"

export default function RtModalView({ transaction, showModal, setShowModal }) {
  if (!transaction) return null;
  return (
    <Modal isOpen={showModal} close={() => setShowModal(false)}>
      <h2 className={styles.rtModalHeader}>Transaction Details</h2>
      <form>
        <div className={styles.rtModelFormField}>
          <label>Finance Name</label>
          <input onChange={()=>{}} value={transaction.financeName} readOnly />
        </div>
        <div className={styles.rtModelFormField}>
          <label>Date</label>
          <input onChange={()=>{}} value={(transaction.createdAt).substring(0,10)} readOnly />
        </div>
        <div className={styles.rtModelFormField}>
          <label>Amount</label>
          <input onChange={()=>{}} value={transaction.amount} readOnly />
        </div>
        <div className={styles.rtModelFormField}>
          <label>Is Income</label>
          <input onChange={()=>{}} value={transaction.isIncome ? "Yes" : "No"} readOnly />
        </div>
        <div className={styles.rtModelFormField}>
          <label>Category</label>
          <input onChange={()=>{}} value={transaction.categoryName.categoryName} readOnly />
        </div>
        <div className={styles.rtModelFormField}>
          <label>Description</label>
          <input onChange={()=>{}} value={transaction.description} readOnly />
        </div>
      </form>
      
    </Modal>
  );
}
