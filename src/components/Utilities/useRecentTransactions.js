import { useSession } from "next-auth/react";
import useSWR from 'swr';

export function useRecentTransactions(){
    const { data:session } = useSession({ required: true, });
    
    const recentTransactionsFetcher = async () => {
      const response = await fetch('/api/hygraph/fetchrecenttransactions', { 
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: session.user.userId,
            })
          });
  
      const data = await response.json();
  
      if(data["message"] == undefined){
          return data.recentTransactions;
      }
  }
    const { data, error, isLoading, mutate } = useSWR("/api/hygraph/fetchrecenttransactions", recentTransactionsFetcher);
    return {
        recentTransactions: data,
        isLoading,
        isError: error,
        mutate
    }
}