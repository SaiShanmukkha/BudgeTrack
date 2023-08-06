import common from "../../styles/Common.module.css"
import styles from "../../styles/Idx.module.css"
import Head from "next/head"
import Image from "next/image";

export default function Index() {
  return (
    <>
      <div className={common.container}>

        <Head>
          <title>BugeTrack</title>
          <meta name="description" content="Tracking All Finances at One Place" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.mainContent}>            
            <div className={styles.onAuthInfoCard}> 
              <h2>User Information</h2>
              <div className={styles.InfoSection}>
                <div>
                  <h4>Name</h4>
                  <p>Demo Name, Patnaik</p>
                </div>
                <div>
                  <h4>Email</h4>
                  <p>demoemail@example.com</p>
                </div>
                <div>
                  <h4>Email Verified</h4>
                  <p>Yes</p>
                </div>
              </div>
              <button className={styles.infoBtn}>Sign Out</button>
            </div>

            <div className={styles.sectionOne}>
              <div className={styles.partOne}>
                <h1>Track Your Finances At One Place Like No Where Else.</h1>
              </div>

              <div className={styles.partTwo}>
                <Image alt={"Analytics Theme Pic"} src={"/dataanalysis.png"} width={600} height={550} />
              </div>
            </div>

            <div className={styles.sectionTwo}>

            </div>
        </main>
      </div>
    </>
  );
}
