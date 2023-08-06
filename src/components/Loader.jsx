import styles from "@/styles/Loader.module.css";

export default function Loader(){
    return (
        <div className={styles.LoaderContainer}>
            <div className={`${styles.Loader1} ${styles.Loader}`} style={{"--delay":"100ms"}}></div>
            <div className={`${styles.Loader2} ${styles.Loader}`} style={{"--delay":"200ms"}}></div>
            <div className={`${styles.Loader3} ${styles.Loader}`} style={{"--delay":"300ms"}}></div>
            <div className={`${styles.Loader4} ${styles.Loader}`} style={{"--delay":"400ms"}}></div>
        </div>
    );
}