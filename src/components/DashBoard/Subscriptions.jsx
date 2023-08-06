import styles from "@/styles/Subscriptions.module.css";
import Image from "next/image";

export default function Subscriptions(props){
    const subscriptions = ["spotify", "amazonprime", "linkedin", "youtube"]
    return (
        <div className={styles.SubscriptionsDataCard}>
            <h2>Subscriptions</h2>
            <div className={styles.SubscriptionsDataCardBody}>
                {
                    subscriptions.map((ele)=>{
                        return (
                            <div key={ele} className={styles.SubscriptionCardTile}>
                                <div className={styles.SubscriptionCardTileHeader}>
                                    <Image className={styles.SubscriptionLogo} src={`/${ele}.png`} alt={ele} width={250} height={60} />
                                    <p>$4.55</p>
                                </div>
                                <p>Monthly Plan</p>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}