import { useState } from "react";
import { toast } from "react-toastify";
import styles from "../../../styles/Home.module.css";
import formStyle from "../../../styles/RegForm.module.css";
import { useSession } from "next-auth/react";
import  { useCategories } from "../Utilities/useCategories";
import  { useRecentTransactions } from "../Utilities/useRecentTransactions";

export default function FinanceDataEntry(props) {

  const { categories } = useCategories();
  const { mutate } = useRecentTransactions();
  const [tForm, setTForm] = useState({
    name: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
    categoryId: "",
    isExpense: "true",
  });

  const { data:session } = useSession({ required: true, });

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
      tForm.name.trim() != "" &&
      tForm.amount.trim() != "" &&
      tForm.description.trim() != "" &&
      tForm.categoryId != ""
    ) {
      if (parseFloat(tForm.amount) > 0) {
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
        name: tForm.name,
        date: tForm.date,
        amount: parseFloat(tForm.amount),
        description: tForm.description,
        category: tForm.categoryId,
        userId: session.user.userId,
        isIncome: tForm.isExpense === "false" ? true : false,
      };

      // Add Transaction
      if (addTransaction(data)) {
        setTimeout(()=>mutate(true), 1500);
        setTForm({
          name: "",
          amount: "",
          date: new Date().toISOString().split("T")[0],
          description: "",
          categoryId: "",
          isExpense: "true",
        });
      }
    } else {
      toast.error("Enter Valid Data");
    }
  };

  return (
    <div className={styles.edCard}>
      <div className={styles.edCardHeader}>
        <h2>Transaction Form</h2>
      </div>

      <div className={formStyle.edForm}>
        <form onSubmit={handleSubmit}>
          <div className={formStyle.flexGroup}>
            <div className={formStyle.financeType}>
              <label htmlFor="isExpense">Finance Record Type</label>
              <select
                value={tForm.isExpense}
                id="isExpense"
                name="isExpense"
                onChange={(e) => {
                  // Defaulting to Other
                  setTForm({...tForm, isExpense: e.target.value, categoryId: "clhk4hvpb33he0blfi6uv8edm"})
                }}
              >
                <option value={"true"} defaultChecked>
                  Expense
                </option>
                <option value={"false"}>Income</option>
              </select>
            </div>

            {tForm.isExpense == "true" ? (
              <div className={formStyle.expenseCategory}>
                <label htmlFor="category">Category</label>
                <select
                  value={tForm.categoryId}
                  required
                  id="category"
                  name="category"
                  onChange={(e) => setTForm({...tForm, categoryId: e.target.value})}
                >
                  <option value={""} disabled defaultChecked>
                    -- Select category --
                  </option>
                  {categories != null
                    ? categories.map((cat) => {
                        return (
                          <option value={cat.id} key={cat.id}>
                            {cat.categoryName}
                          </option>
                        );
                      })
                    : null}
                </select>
              </div>
            ) : (
              <></>
            )}
          </div>

          <div className={formStyle.expenseName}>
            <label htmlFor="name">Name</label>
            <input
              value={tForm.name}
              type={"text"}
              placeholder="Transaction Name"
              required
              id="name"
              name="name"
              maxLength={60}
              onChange={(e) => setTForm({...tForm, name: e.target.value})}
            />
          </div>

          <div className={formStyle.flexGroup}>
            <div className={formStyle.financeAmount}>
              <label htmlFor="amount">Amount</label>
              <input
                value={tForm.amount}
                type="number"
                min={0}
                step="0.01"
                placeholder="0.00"
                required
                id="amount"
                name="amount"
                onChange={(e) => setTForm({...tForm, amount: e.target.value})}
              />
            </div>

            <div className={formStyle.financeAmount}>
              <label htmlFor="date">Date</label>
              <input
                value={tForm.date}
                type="date"
                required
                id="date"
                name="date"
                onChange={(e) => setTForm({...tForm, date: e.target.value})}
              />
            </div>
          </div>

          <div className={formStyle.expenseDescription}>
            <label htmlFor="description">Description</label>
            <textarea
              value={tForm.description}
              placeholder="describe about transaction..."
              required
              id="description"
              name="description"
              onChange={(e) => setTForm({...tForm, description: e.target.value})}
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
