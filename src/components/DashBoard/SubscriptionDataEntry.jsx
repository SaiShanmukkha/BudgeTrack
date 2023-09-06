import { useState } from "react";
import { toast } from "react-toastify";
import styles from "../../../styles/Home.module.css";
import formStyle from "../../../styles/SubForm.module.css";
import { useSession } from "next-auth/react" 
import { useSubscriptions } from "../Utilities/useSubscriptions";

export default function SubscriptionDataEntry(props) {
  const renewal_periods = ["daily", "weekly", "monthly", "Quaterly", "Half Yearly", "anually", "Custom"];
  const [sData, setSData] = useState({
    name: "",
    amount: "",
    startDate: new Date().toISOString().split("T")[0],
    description: "",
    renewalPeriod: "",
    plan: "",
    isCustom: false,
    customDays: "",
  });
  const { data:session } = useSession({ required: true, });
  const { mutate } = useSubscriptions();
  
  async function addSubscription(data) {
    const response = await fetch("/api/hygraph/addsubscription", {
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
      sData.name.trim() != "" &&
      sData.amount.trim() != "" &&
      sData.description.trim() != "" &&
      sData.plan.trim() != "" &&
      sData.renewalPeriod != "" 
    ) {
      if (parseFloat(sData.amount) > 0) {
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
        price: parseFloat(sData.amount),
        title: sData.name,
        renewal: sData.renewalPeriod,
        description: sData.description,
        plan: sData.plan,
        userId: session.user.userId,
        customDays: sData.isCustom?parseInt(sData.customDays): 0,
      };
      // Add Subscription
      if (addSubscription(data)) {
        setTimeout(()=>mutate(true), 1500);
        setSData({
          name: "",
          amount: "",
          startDate: new Date().toISOString().split("T")[0],
          description: "",
          renewalPeriod: "",
          plan: "",
          isCustom: false,
          customDays: 0
        })
      }
    } else {
      toast.error("Please Enter Valid Data");
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
            <div className={formStyle.formElement}>
                <label htmlFor="name">Name</label>
                <input
                value={sData.name}
                onChange={(e)=>setSData({...sData, name: e.target.value})}
                type={"text"}
                placeholder={"Subscription Name"}
                required
                />
            </div>

            <div className={formStyle.formElement}>
                <label htmlFor="name">Plan</label>
                <input
                type={"text"}
                value={sData.plan}
                onChange={(e)=>setSData({...sData,plan:e.target.value})}
                placeholder="Premium or Basic"
                required
                />
            </div>
          </div>

          <div className={formStyle.flexGroupOne}>
            <div className={formStyle.formElement}>
              <label htmlFor="category">Renewal Period</label>
              <select
              value={sData.renewalPeriod}
              onChange={(e)=>{
                if(e.target.value === "Custom"){
                  setSData({...sData, isCustom:true, renewalPeriod: e.target.value});
                }else{
                  setSData({...sData, isCustom: false, renewalPeriod: e.target.value});
                }
              }}
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

            { sData.isCustom ? 
            <div className={formStyle.formElement}>
                <label htmlFor="name">Custom Days</label>
                <input
                type={"number"}
                value={sData.customDays}
                placeholder="0"
                onChange={(e)=>setSData({...sData, customDays:e.target.value})}
                required
                />
            </div> : <div className={formStyle.formElement}></div>}
          </div>


          <div className={formStyle.flexGroupOne}>

            <div className={formStyle.formElement}>
              <label htmlFor="date">Start Date</label>
              <input
                type="date"
                value={sData.startDate}
                onChange={(e)=>setSData({...sData, startDate: e.target.value})}
                required
              />
            </div>
            
            <div className={formStyle.formElement}>
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                value={sData.amount}
                placeholder="0.00"
                onChange={(e)=>setSData({...sData, amount: e.target.value})}
                required
              />
            </div>
          </div>

          <div className={formStyle.formElement}>
            <label htmlFor="description">Description</label>
            <textarea
              value={sData.description}
              onChange={(e)=>setSData({...sData, description:e.target.value})}
              placeholder="describe about subscription..."
              required
            ></textarea>
          </div>

          <input
            type={"submit"}
            value="Save"
            className={formStyle.submitBtn}
          />
        </form>
      </div>
    </div>
  );
}
