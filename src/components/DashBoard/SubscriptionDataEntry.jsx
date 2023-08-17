import { useState } from "react";
import { toast } from "react-toastify";
import styles from "../../../styles/Home.module.css";
import formStyle from "../../../styles/RegForm.module.css";
import { useSession } from "next-auth/react" 

export default function SubscriptionDataEntry(props) {
  const [sData, setSData] = useState({
    name: "",
    amount: 0.00,
    date: new Date().toISOString().split("T")[0],
    description: "",

  });


  const { data:session } = useSession({ required: true, });
  const renewal_periods = ["daily", "weekly", "monthly", "Quaterly", "Half Yearly", "anually", "Custom"];
  
  
  async function addTransaction(data) {
    const response = await fetch("/api/hygraph/addtransaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      toast.success("Data Added Successfully.");
      return true;
    } else {
      toast.error("Failed to add data.");
      return false;
    }
  }

  function validateForm() {
    if (
      name.trim() != "" &&
      amount.trim() != "" &&
      description.trim() != "" &&
      categoryId != ""
    ) {
      if (parseFloat(amount) > 0) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const data = {
        name,
        date,
        amount: parseFloat(amount),
        description,
        category: categoryId,
        userId: session.user.userId,
        isIncome: isExpense === "false" ? true : false,
      };

      // Add Transaction
      if (addTransaction(data)) {
        const setR = props.setReload;
        setR(true);
        setAmount("");
        setCategoryId("");
        setDescription("");
        setName("");
        setDate(new Date().toISOString().split("T")[0]);
      }
    } else {
      toast.error("Enter Valid Data");
    }
  };

  return (
    <div className={styles.edCard}>
      <div className={styles.edCardHeader}>
        <h2>Subscription Form</h2>
      </div>

      <div className={formStyle.edForm}>
        <form onSubmit={handleSubmit}>
          <div className={formStyle.flexGroup}>
            <div className={formStyle.expenseCategory}>
            <label htmlFor="category">Renewal Period</label>
            <select>
                <option value={""} disabled defaultChecked>
                -- Select period --
                </option>
                {renewal_periods.map((ele, idx) => {
                    return (
                        <option value={ele} key={idx}>
                        {ele}
                        </option>
                    );
                    })}
            </select>
            </div>
            <div className={formStyle.expenseName}>
                <label htmlFor="name">Custom Renewal Days</label>
                <input
                value={sData.name}
                type={"number"}
                required
                />
            </div>
          </div>

          <div className={formStyle.flexGroup}>
            <div className={formStyle.expenseName}>
                <label htmlFor="name">Name</label>
                <input
                type={"text"}
                required
                />
            </div>

            <div className={formStyle.expenseName}>
                <label htmlFor="name">Plan</label>
                <input
                type={"text"}
                required
                />
            </div>
          </div>

          <div className={formStyle.flexGroup}>
            <div className={formStyle.financeAmount}>
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                required
              />
            </div>

            <div className={formStyle.financeAmount}>
              <label htmlFor="date">Date</label>
              <input
                type="date"
                required
              />
            </div>
          </div>

          <div className={formStyle.flexGroup}>
            <div className={formStyle.financeAmount}>
              <label htmlFor="date">Subscription Logo</label>
              <select
                required
              >
                <option value={""} disabled defaultChecked>
                -- Select period --
                </option>
                {renewal_periods.map((ele, idx) => {
                    return (
                        <option value={ele} key={idx}>
                        {ele}
                        </option>
                    );
                })}
            </select>
            </div>
            <div className={formStyle.financeAmount}>
              <input
                type="image"
                required
              />
            </div>
          </div>

          <div className={formStyle.expenseDescription}>
            <label htmlFor="description">Description</label>
            <textarea
              required
            ></textarea>
          </div>

          <input
            type={"submit"}
            value="Save"
            className={formStyle.expenseSubmit}
          />
        </form>
      </div>
    </div>
  );
}
