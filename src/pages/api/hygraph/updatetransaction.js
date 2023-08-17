export default async function handler(req, res) {
    try{
      if(req.method === "POST"){
        const add_mutation = `
        mutation MyMutation {
          updateFinance(
            data: {
              categoryName: {
                connect: {
                  id: "${bdata.category}"
                }
              },
              amount: ${bdata.amount}, 
              description: "${bdata.description}", 
              financeDate: "${bdata.financeDate}", 
              financeName: "${bdata.financeName}", 
              isIncome: ${bdata.isIncome}
            }
            where: {id: "${bdata.id}"}
          ) {
            id
          }
        }
        `;

        const updateMutationResp = await fetch(process.env.HYGRAPH_RW_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.HYGRAPH_TOKEN}`            
          },
          body: JSON.stringify({
            query: add_mutation
          })
        });

        if(updateMutationResp.status === 200){
          const updateMutationRespData = await updateMutationResp.json(); 
          const publishMutResp = await fetch(process.env.HYGRAPH_RW_ENDPOINT, {
            method: 'POST',
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.HYGRAPH_TOKEN}`
            },
            body: JSON.stringify({
              query: `
                mutation Assets {
                  publishFinance(where: {id: "${updateMutationRespData.data.updateFinance.id}"}) {
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
      res.status(500).json({"message" : "Your Request can't be processed."});
    }
  }