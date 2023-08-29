import styles from "../../../styles/EntryForm.module.css"
import FinanceDataEntry from  "../../components/DashBoard/FinanceDataEntry"
import SubscriptionDataEntry from "@/src/components/DashBoard/SubscriptionDataEntry"
import { useState } from "react";

function EntryForms(props) {
    const [showTransactionForm, setShowTransactionForm] = useState(true);
    return (
        <div className={styles.EntryFormCard}>
            <div className={styles.btnHeader}>
                <button type="button" style={showTransactionForm ? {backgroundColor: "purple", color: "white"}: {}} onClick={()=>setShowTransactionForm(true)}>Add Transaction</button>
                <button type="button" style={showTransactionForm ? {}: {backgroundColor: "purple", color: "white"}} onClick={()=>setShowTransactionForm(false)}>Add Subscription</button>
            </div>
            {
                showTransactionForm ? <FinanceDataEntry categories={props.categories} setReload={props.setReload} /> :
                <SubscriptionDataEntry setReload={props.setReload} />
            }
        </div>
    );
}

export default EntryForms;