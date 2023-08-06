import common from "@/styles/Common.module.css"
import styles from "@/styles/Error500.module.css"
import Image from "next/image";

export default function Error500(){
    return (
        <main className={common.container}>
            <div className={styles.ErrorContainer}>
                <Image alt="Error500Image" src={"/tom.png"} width={"250"} height={"250"} className={styles.Img}/>
                <div className={styles.ErrorMessageContainer}>
                    <h1>Oops!</h1>
                    <h2>Internal Server Error :(</h2>
                </div>
            </div>
        </main>
    );
}