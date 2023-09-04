import useSWR from 'swr';

export function useCategories() {
    const categoryFetcher =  async () => {
        const response = await fetch("/api/hygraph/fetchcategories");
        const data = await response.json();
        
        if(data["message"] === undefined) {
            return data.categories;
        }
    }
    
    const { data, error, isLoading } = useSWR("/api/hygraph/fetchcategories", categoryFetcher);
    return {
        categories: data,
        isLoading,
        isError: error,
      }
}