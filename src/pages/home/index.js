import Head from 'next/head'
import common from '@/styles/Common.module.css'
import styles from "@/styles/Home.module.css"
import RecentTransactions from "@/src/components/DashBoard/RecentTransactions"
import CategoriesData from "@/src/components/DashBoard/CategoriesData"
import Subscriptions from "@/src/components/DashBoard/Subscriptions"
import EntryForms from '../../components/DashBoard/EntryForms'

export default function Home() {
  return (
    <>
      <div className={common.container}>
        <Head>
          <title>BudgeTrack | Home</title>
          <meta name="description" content="Tracking All Finances at One Place" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={common.mainContent}>
          <div className={styles.sectionOne}>
              <EntryForms />
              <RecentTransactions />
          </div>
        
          <div className={styles.sectionTwo}>
            <CategoriesData />
            <Subscriptions />
          </div>
        </main>   
      </div>
    </>
  )
}

Home.auth = true;