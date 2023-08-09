import Head from 'next/head'
import common from '@/styles/Common.module.css'
import styles from "@/styles/Home.module.css"
import FinanceDataEntry from "@/src/components/DashBoard/FinanceDataEntry"
import RecentTransactions from "@/src/components/DashBoard/RecentTransactions"
import CategoriesData from "@/src/components/DashBoard/CategoriesData"
import Subscriptions from "@/src/components/DashBoard/Subscriptions"
import { useState, useEffect } from 'react';

export default function Home() {   
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [categories, setCategories] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  
  useEffect(() => {
    setTimeout(()=>{
        fetch("/api/hygraph/fetchcategories", { cache: "no-store"})
        .then((response) => response.json())
        .then((data) => {
          if(data["message"] == undefined) {
            setCategories(data.categories);
          }
        });

        fetch('/api/hygraph/fetchrecenttransactions', { cache: 'no-store'})
        .then(response => response.json())
        .then(data => {
          setRecentTransactions(data);
        });

        fetch('/api/hygraph/fetchsubscriptions', { cache: 'no-store'})
        .then(response => response.json())
        .then(data => {
          setSubscriptions(data.subcriptions);
        });
        
        setLoading(false);
        setReload(false);
      }, 2000);
      return () => {};      
    },[reload]);
    
     
  return (
    <>
      <div className={common.container}>

        <Head>
          <title>BugeTrack | Home</title>
          <meta name="description" content="Tracking All Finances at One Place" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={common.mainContent}>
          <div className={styles.sectionOne}>
              <FinanceDataEntry categories={categories} setReload={setReload} />
              <RecentTransactions recentTransactions={recentTransactions} loading={loading} />
          </div>

          <div className={styles.sectionTwo}>
            <CategoriesData loading={loading} categories={categories} />
            <Subscriptions loading={loading} subscriptions={subscriptions} />
          </div>
        </main>   
        
      </div>
    </>
  )
}

Home.auth = true;