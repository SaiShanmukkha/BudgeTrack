export default async function handler(req, res) {
    try{
      if(req.method === "POST"){
        const data = req.body;
        const add_mutation = `
          mutation Assets {
            createFinance(
              data: {
                description: "${data.description}", 
                financeName: "${data.name}", 
                isIncome: ${data.isIncome}, 
                financeDate: "${data.date}",
                categoryName: {
                  connect: {
                    id: "${data.category}"
                  }
                }, 
                amount: ${data.amount}
              }
            ) {
              id
              isIncome
              description
              financeName
              amount
              financeDate
              createdAt
            }
          }
        `;

        const addMutationResp = await fetch(process.env.HYGRAPH_RW_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.HYGRAPH_TOKEN}`
          },
          body: JSON.stringify({
            query: add_mutation
          })
        });

        if(addMutationResp.status === 200){
          const addMutationRespData = await addMutationResp.json();      
          const publishMutResp = await fetch(process.env.HYGRAPH_RW_ENDPOINT, {
            method: 'POST',
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.HYGRAPH_TOKEN}`
            },
            body: JSON.stringify({
              query: `
                mutation Assets {
                  publishFinance(where: {id: "${addMutationRespData.data.createFinance.id}"}) {
                    id
                    stage
                  }
                }
              `
            })
          });

          if(publishMutResp.status === 200){
            res.status(200).json({"message": "Success"});
          }else{
            res.status(400).json({"message": "Error Occurred While publishing data"})
          }
        }else{
          res.status(400).json({"message": "Error Occurred While adding data"})
        }
        
      }else{
        res.status(400).json({"message": "Bad Method"});
      }
    }catch(e){
      console.log("Error in add transaction: ", e);
      res.status(500).json({"message" : "Your Request can't be processed."});
    }
  }