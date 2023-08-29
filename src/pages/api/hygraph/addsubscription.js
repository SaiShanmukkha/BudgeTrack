export default async function handler(req, res) {
    try{
      if(req.method === "POST"){
        const data = req.body;
        const add_mutation = `
        mutation MyMutation {
            createUserSubscription(
              data: {
                price: ${data.price},
                title: "${data.title}",
                renewal: "${data.renewal}",
                userId: "${data.userId}",
                customDays: ${data.customDays},
                description: "${data.description}",
                plan: "${data.plan}"
                }
            ) {
              description
              customDays
              createdAt
              id
              plan
              price
              renewal
              title
              userId
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
                  publishUserSubscription(where: {id: "${addMutationRespData.data.createUserSubscription.id}"}) {
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