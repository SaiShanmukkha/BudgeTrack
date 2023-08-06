import common from "@/styles/Common.module.css"
import styles from "@/styles/Error400.module.css"
import Image from "next/image";

export default function Error400(){
    return (
        <main className={common.container}>
            <div className={styles.ErrorContainer}>
                <Image alt="Error404Image" src="/tom2.png" width={"250"} height={"250"} className={styles.Img} />
                <div className={styles.ErrorMessageContainer}>
                    <h1>Oh No!</h1>
                    <h2>The page you&apos;re looking for can&apos;t be found :(</h2>
                </div>
            </div>
        </main>
    );
}