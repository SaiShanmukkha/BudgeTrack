export default async function handler(req, res) {
    try{      
      const response = await fetch(process.env.HYGRAPH_RW_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.HYGRAPH_TOKEN}`
        },
        body: JSON.stringify({
          query: `
            query MyQuery {
              finances(orderBy: createdAt_ASC, last: 9) {
                amount
                createdAt
                categoryName {
                  categoryName
                }
                financeName
                id
                isIncome
              }
            }
            `,
        }),
      });
      const json = await response.json();
      if(response.ok){
        return res.status(200).json(json.data.finances.reverse());
      }else{
        return res.status(400).json({"message":"Error Occurred while fetching transactions."})
      }
      } catch (e) {
        console.error("Error fetching transactions: ", e);
        res.status(500).json({"message" : "Your Request can't be processed."});
      }
  };