import styles from "@/styles/Subscriptions.module.css";
import Loader from "../../components/Loader"
import { useSubscriptions } from "../Utilities/useSubscriptions";

export default function Subscriptions(){
    const subscriptionsInfo = useSubscriptions();
    return (
        <div className={styles.SubscriptionsDataCard}>
            <h2>Subscriptions</h2>
            {
                (subscriptionsInfo.isLoading) ? <Loader /> : (subscriptionsInfo.subscriptions.length > 0 ? 
                <div className={styles.SubscriptionsDataCardBody}>
                    {
                        subscriptionsInfo.subscriptions.map((ele)=>{
                            return (
                                <div key={ele.id} className={styles.SubscriptionCardTile}>
                                    <div className={styles.SubscriptionCardTileHeader}>
                                        {/* <Image fill={true} alt={ele.title} src={ele.logo.url} className={styles.subscriptionImg} /> */}
                                        <h1 className={styles.subscriptionTitle}>{ele.title}</h1>
                                        <p>${ele.price}</p>
                                    </div>
                                    <p>{ele.renewal} Renewal - {ele.plan} Plan</p>
                                    <p>{ele.description}</p>
                                </div>
                            );
                        })
                    }
                </div> : <div className={styles.noSubscriptions}>No Active Subscriptions</div>)
            }
        </div>
    );
}