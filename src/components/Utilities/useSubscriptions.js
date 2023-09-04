import { useSession } from "next-auth/react";
import useSWR from 'swr';

export function useSubscriptions(){
    const { data:session } = useSession({ required: true, });

    const subscriptionsFetcher = async () => {
      const response = await fetch('/api/hygraph/fetchsubscriptions', { 
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: session.user.userId,
            })
          });
      const data = await response.json();
      if(data["message"] == undefined) {
          return data.subscriptions;
      }
    }

    const { data, error, isLoading, mutate } = useSWR("/api/hygraph/fetchsubscriptions", subscriptionsFetcher);
    return {
        subscriptions: data,
        isLoading,
        isError: error,
        mutate
    }
}