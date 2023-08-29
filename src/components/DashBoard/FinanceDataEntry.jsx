import { useState } from "react";
import { toast } from "react-toastify";
import styles from "../../../styles/Home.module.css";
import formStyle from "../../../styles/RegForm.module.css";
import { useSession } from "next-auth/react" 

export default function FinanceDataEntry(props) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [isExpense, setIsExpense] = useState("true");
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
        <h3>Transaction Form</h3>
      </div>

      <div className={formStyle.edForm}>
        <form onSubmit={handleSubmit}>
          <div className={formStyle.flexGroup}>
            <div className={formStyle.financeType}>
              <label htmlFor="isExpense">Finance Record Type</label>
              <select
                value={isExpense}
                id="isExpense"
                name="isExpense"
                onChange={(e) => {
                  setIsExpense(e.target.value);
                  // Defaulting to Other
                  setCategoryId("clhk4hvpb33he0blfi6uv8edm");
                }}
              >
                <option value={"true"} defaultChecked>
                  Expense
                </option>
                <option value={"false"}>Income</option>
              </select>
            </div>

            {isExpense == "true" ? (
              <div className={formStyle.expenseCategory}>
                <label htmlFor="category">Category</label>
                <select
                  value={categoryId}
                  required
                  id="category"
                  name="category"
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value={""} disabled defaultChecked>
                    -- Select category --
                  </option>
                  {props.categories != null
                    ? props.categories.map((cat) => {
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
              value={name}
              type={"text"}
              placeholder="Transaction Name"
              required
              id="name"
              name="name"
              maxLength={60}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={formStyle.flexGroup}>
            <div className={formStyle.financeAmount}>
              <label htmlFor="amount">Amount</label>
              <input
                value={amount}
                type="number"
                min={0}
                step="0.01"
                placeholder="0.00"
                required
                id="amount"
                name="amount"
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className={formStyle.financeAmount}>
              <label htmlFor="date">Date</label>
              <input
                value={date}
                type="date"
                required
                id="date"
                name="date"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className={formStyle.expenseDescription}>
            <label htmlFor="description">Description</label>
            <textarea
              value={description}
              placeholder="describe about transaction..."
              required
              id="description"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
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
