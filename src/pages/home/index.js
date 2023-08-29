import Head from 'next/head'
import common from '@/styles/Common.module.css'
import styles from "@/styles/Home.module.css"
import RecentTransactions from "@/src/components/DashBoard/RecentTransactions"
import CategoriesData from "@/src/components/DashBoard/CategoriesData"
import Subscriptions from "@/src/components/DashBoard/Subscriptions"
import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import EntryForms from '../../components/DashBoard/EntryForms'

export default function Home() {   
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [categories, setCategories] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const { data:session } = useSession({ required: true, });

  useEffect(() => {
    setTimeout(()=>{
        if(sessionStorage.getItem("categories") === null){
          fetch("/api/hygraph/fetchcategories")
          .then((response) => response.json())
          .then((data) => {
            if(data["message"] === undefined) {
              setCategories(data.categories);
              sessionStorage.setItem("categories", JSON.stringify(data.categories))
            }
          });
        }else{
          setCategories(JSON.parse(sessionStorage.getItem("categories")))
        }

        fetch('/api/hygraph/fetchrecenttransactions', { 
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: session.user.userId,
          })
        })
        .then(response => response.json())
        .then(data => {
          if(data["message"] == undefined){
            setRecentTransactions(data);
          }
        });

        fetch('/api/hygraph/fetchsubscriptions', { 
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: session.user.userId,
          })
        })
        .then(response => response.json())
        .then(data => {
          if(data["message"] == undefined) {
            setSubscriptions(data.subcriptions);
          }
        });
        
        setLoading(false);
        setReload(false);
      }, 1500);
      return () => {};      
    },[reload, session.user.userId]);
    
     
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
              <EntryForms setReload={setReload} categories={categories} />
              <RecentTransactions setReload={setReload} categories={categories} recentTransactions={recentTransactions} loading={loading} />
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