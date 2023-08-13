import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import styles from "../../../styles/RTModalView.module.css"

export default function RtModalView({ transaction, showModal, setShowModal }) {
  const [tForm, setTForm] = useState({...transaction});
  const [editable, setEditable] = useState(false);
  useEffect(()=>{
    if (!transaction) return null;
    return ()=>{};
  }, []);

  const handleUpdate = (e)=>{
    e.preventDefault();
    setEditable(false);
  }

  const handleCancelUpdate = (e) =>{
    e.preventDefault();
    if(tForm != transaction){
      confirm("Are you sure you want to cancel?");
    }
    setEditable(false);
  }

  return (
    <Modal isOpen={showModal} close={() => setShowModal(false)}>
      <h2 className={styles.rtModalHeader}>Transaction Details</h2>
      <form>
        <div className={styles.rtModelFormField}>
          <label>Finance Name</label>
          <input type="text" onChange={(e)=>{setTForm({...tForm, financeName:e.target.value})}} className={editable ? styles.editableInputField : ""} value={tForm.financeName} readOnly={editable ? false:true} />
        </div>
        <div className={styles.rtModelFormField}>
          <label>Date</label>
          <input type="date" onChange={(e)=>{setTForm(transaction.createdAt=e.target.value)}} className={editable ? styles.editableInputField : ""} value={tForm.createdAt} readOnly={editable ? false:true} />
        </div>
        <div className={styles.rtModelFormField}>
          <label>Amount</label>
          <input type="number" onChange={(e)=>{setTForm(transaction.amount=e.target.value)}} className={editable ? styles.editableInputField : ""} value={tForm.amount} readOnly={editable ? false:true} />
        </div>
        <div className={styles.rtModelFormField}>
          <label>Is Income</label>
          <input onChange={()=>{}} value={tForm.isIncome ? "Yes" : "No"} readOnly />
        </div>
        <div className={styles.rtModelFormField}>
          <label>Category</label>
          <input onChange={()=>{}} value={tForm.categoryName.categoryName} readOnly />
        </div>
        <div className={styles.rtModelFormField}>
          <label>Description</label>
          <textarea onChange={(e)=>{setTForm(transaction.description=e.target.value)}} className={editable ? styles.editableInputField : ""} value={tForm.description} readOnly={editable ? false:true} />
        </div>
      </form>
      <div className={styles.rtModelFormBtns}>
        {editable ? 
        <>
          <button onClick={handleUpdate} className={styles.updateBtn}>Update</button>
          <button onClick={handleCancelUpdate} className={styles.cancelBtn}>Cancel</button>
        </> :
        <>
          <button onClick={()=>setEditable(true)} className={styles.editBtn}>Edit</button>
          <button onClick={()=>{setEditable(false);setShowModal(false); }} className={styles.deleteBtn}>Delete</button>
        </>}
      </div>
    </Modal>
  );
}
