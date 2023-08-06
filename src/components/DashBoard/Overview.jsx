import ExpOverview from "@/src/components/DashBoard/ExpOverview";
import TransactionsOverview from "@/src/components/DashBoard/TransactionsOverview";

export default function Overview(props){
    return (
        <div>
            <ExpOverview  data={props.data}/>
            <TransactionsOverview data={props.data}/>
        </div>
    );
}