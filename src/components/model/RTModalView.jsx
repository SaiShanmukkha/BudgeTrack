import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import styles from "../../../styles/RTModalView.module.css"
import { toast } from "react-toastify";

export default function RtModalView({ mutate, transaction, showModal, setShowModal, categories }) {
  const [tForm, setTForm] = useState({
    amount:transaction.amount,
    category:transaction.categoryName.id,
    createdAt:(transaction.createdAt).substring(0,10),
    description:transaction.description,
    financeDate: (transaction.financeDate).substring(0,10),
    financeName:transaction.financeName,
    id:transaction.id,
    isIncome:transaction.isIncome,
    editable: false,
  });

  const [editable, setEditable] = useState(false);

  useEffect(()=>{
    if (!transaction) return null;
    return ()=>{};
  }, [transaction]);

  const handleUpdate = (e)=>{
    e.preventDefault();
    if(transaction.amount != tForm.amount || (transaction.financeDate).substring(0,10) != tForm.financeDate || transaction.categoryName.id != tForm.category || transaction.financeName != tForm.financeName || transaction.isIncome != tForm.isIncome || transaction.description != tForm.description){
      fetch('/api/hygraph/updatetransaction', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            amount:parseFloat(tForm.amount),
            category:tForm.category,
            createdAt:(transaction.createdAt).substring(0,10),
            description:tForm.description,
            financeDate: tForm.financeDate,
            financeName:tForm.financeName,
            id:tForm.id,
            isIncome:(tForm.isIncome)=== "false" ? true : false
          }
        )
      })
      .then((resposnse)=>{
        if(resposnse.ok){
          toast.success("Updated transaction successfully.");
          setShowModal(false);
          setEditable(false);
          mutate(true);
        }else{
          toast.error("Failed to update transaction.");
        }
      }).catch((e)=>{
        toast.error("Failed to update transaction.");
      });
    }else{
      toast.info("Nothing to update.");
    }
  }

  const handleDelete = (e, id)=>{
    e.preventDefault();

    if(confirm('Are you sure you want to delete')){
      fetch('/api/hygraph/deletetransaction', { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id
        })
      })
      .then((resposnse)=>{
        if(resposnse.ok){
          toast.success("Deleted transaction successfully");
          setShowModal(false);
          mutate(true);
        }else{
          new Error("Failed to delete transaction");
        }
      }).catch((e)=>{
        toast.error("Failed to delete");
      })
    }
  }

  const handleCancelUpdate = (e) =>{
    e.preventDefault();
    setEditable(false);
  }

  return (
    <Modal isOpen={showModal} close={() => setShowModal(false)}>
      <h2 className={styles.rtModalHeader}>Transaction Details</h2>
      <form>
        <div className={styles.rtModelFormField}>
          <label>Finance Name</label>
          <input required type="text" onChange={(e)=>{setTForm({...tForm, financeName:e.target.value})}} className={editable ? styles.editableInputField : ""} value={tForm.financeName} readOnly={editable ? false:true} />
        </div>
        <div className={styles.rtModelFormField}>
          <label>Finance Date</label>
          <input required type="date" onChange={(e)=>{setTForm({...tForm, financeDate:e.target.value})}} className={editable ? styles.editableInputField : ""} value={tForm.financeDate} readOnly={editable ? false:true} />
        </div>
        <div className={styles.rtModelFormField}>
          <label>Creation Date</label>
          <input required type="date" value={tForm.createdAt} readOnly />
        </div>
        <div className={styles.rtModelFormField}>
          <label>Amount</label>
          <input required type="number" onChange={(e)=>{setTForm({...tForm, amount:e.target.value})}} className={editable ? styles.editableInputField : ""} value={tForm.amount} readOnly={editable ? false:true} />
        </div>
        <div className={styles.rtModelFormField}>
          <label>Is Income</label>
          <p hidden={editable ? true:false} className={styles.valueDisplayTagP} >{tForm.isIncome ? "Yes" : "No"}</p>
          <select
            required
            value={tForm.isIncome}
            hidden={editable ? false:true}
            onChange={(e) => setTForm({...tForm, isIncome: e.target.value, category: "clhk4hvpb33he0blfi6uv8edm"})}
          >
            <option value={"false"}>
              Expense
            </option>
            <option value={"true"}>
              Income
            </option>
          </select>
        </div>
        <div className={styles.rtModelFormField}>
          <label>Category</label>
          <p hidden={editable ? true:false} className={styles.valueDisplayTagP} >{tForm.category}</p>
          <select
            value={tForm.category}
            required
            id="category"
            disabled={tForm.isIncome=="true"?true:false}
            hidden={editable ? false:true}
            name="category"
            onChange={(e) => setTForm({...tForm, category:e.target.value})}
          >
            {categories != null
              ? categories.map((cat) => {
                  return (
                    <option value={cat.id} key={cat.id} defaultChecked={cat.categoryName.id==tForm.category?true:false}>
                      {cat.categoryName}
                    </option>
                  );
                })
              : null}
          </select>
        </div>
        <div className={styles.rtModelFormField}>
          <label>Description</label>
          <textarea onChange={(e)=>{setTForm({...tForm, description:e.target.value})}} className={editable ? styles.editableInputField : ""} value={tForm.description} readOnly={editable ? false:true} />
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
          <button onClick={(e)=>{handleDelete(e, tForm.id)}} className={styles.deleteBtn}>Delete</button>
        </>}
      </div>
    </Modal>
  );
}
