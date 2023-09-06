import common from "../../styles/Common.module.css"
import styles from "../../styles/Idx.module.css"
import Head from "next/head"
import Image from "next/image";

export default function Index() {
  return (
    <>
      <div className={common.container}>
        
        <Head>
          <title>BudgeTrack</title>
          <meta name="description" content="Tracking All Finances at One Place" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.mainContent}>       
            
            <div className={styles.sectionOne}>
              <Image fill={true} alt={"Analytics Theme Pic"} src={"/analytics.png"} className={styles.analyticImg} />
              <div className={styles.statement}>
                <h1>Take Control of Your Finances: Simplify Expense Tracking with Our Powerful Tool.</h1>
                <p>Taking control of your finances has never been this easy. Let our tracker do the heavy lifting for you.</p>
              </div>
            </div>

            <div className={styles.sectionTwo}>
                <h1>Accessible expense reports.</h1>
                <h1>Designed for sharing.</h1>
                <div className={styles.aboutContainer}>
                  <div className={styles.aboutCard}>
                    <div className={styles.cardIcon}>
                      <Image alt={"keep tabs on finances"} src={"/favicon.ico"} width={40} height={40} />
                    </div>
                    <h3>Get a quick overview</h3>
                    <p>Get a quick overview of your spending habits, track income, and stay in control of your budget—all in one place.</p>
                  </div>

                  <div className={styles.aboutCard}>
                    <div className={styles.cardIcon}>
                      <Image alt={"keep tabs on finances"} src={"/favicon.ico"} width={40} height={40} />
                    </div>
                    <h3>Keep tabs on your finances</h3>
                    <p>Make smarter decisions with instant access to key financials including income, expenses, outstanding invoices, and more.</p>
                  </div>

                  <div className={styles.aboutCard}>
                    <div className={styles.cardIcon}>
                      <Image alt={"keep tabs on finances"} src={"/favicon.ico"} width={40} height={40} />
                    </div>
                    <h3>See and Share</h3>
                    <p>Instantly see how you’re doing with profit & loss reports. Share them with your accountant for a better picture of your work.</p>
                  </div>
                </div>
            </div>

            <div className={styles.sectionThree}>
              <Image fill={true} alt={"Analytics Theme Pic"} src={"/dataanalysis.png"} className={styles.section3AnalyticImg} />
              <div className={styles.section3Data}>
                <h1>Stay in the know about cash flow</h1>
                <p>BudgeTrack tracks your expenses throughout the year, so you can predict and manage your cash flow with ease. View the built-in cash flow statement and see how much money you have—so you can cover your bills.**</p>
              </div>
            </div>

            <div className={styles.sectionFour}>
              <h1>Safe, secure &amp; ad-free</h1>

              <div className={styles.featureCards}>
                <div className={styles.featureCard}>
                  <h3>Safe</h3>
                  <p>BudgeTrack uses robust authentication mechanisms to prevent unauthorized access.</p>
                </div>

                <div className={styles.featureCard}>
                  <h3>Bank-grade security</h3>
                  <p>BudgeTrack protects your data with robust 256-bit excryption.</p>
                </div>

                <div className={styles.featureCard}>
                  <h3>Won&apos;t sell your data</h3>
                  <p>Privacy matters. We’re ad-free, and we’ll never sell your data.</p>
                </div>
              </div>
            </div>
        </main>
      </div>
    </>
  );
}
