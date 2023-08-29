export default async function handler(req, res) {
  if(req.method === 'POST') {
    try{      
      const data = req.body;
      const response = await fetch(process.env.HYGRAPH_RW_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.HYGRAPH_TOKEN}`
        },
        body: JSON.stringify({
          query: `
            query MyQuery {
              finances(where: {userId: "${data.userId}"}, orderBy: createdAt_ASC, last: 10) {
                amount
                createdAt
                financeDate
                categoryName {
                  categoryName
                  id
                }
                financeName
                description
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
        res.status(500).json({"message" : "Your Request can't be processed."});
      }
    }else{
      return res.status(405).json({"message":"Invalid Method."})
    }
  };