export default async function handler(req, res) {
    let subcriptions_data = [];
    let aresubcriptionsAvailable = true;
    let currentIndex = 0;
  
    try {
      while (aresubcriptionsAvailable) {
        const response = await fetch(process.env.HYGRAPH_RW_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
          },
          body: JSON.stringify({
            query: `
            query MyQuery {
                userSubscriptionsConnection {
                  edges {
                    node {
                      description
                      id
                      plan
                      price
                      renewal
                      title
                      logo {
                        fileName
                        id
                        url
                      }
                    }
                  }
                  pageInfo {
                    endCursor
                    hasNextPage
                    hasPreviousPage
                    pageSize
                    startCursor
                  }
                }
              }
              
              `,
          }),
        });
  
        const json = await response.json();
        if(response.ok){
          currentIndex += json.data.userSubscriptionsConnection.pageInfo.pageSize;
          aresubcriptionsAvailable = json.data.userSubscriptionsConnection.pageInfo.hasNextPage;
          for(let nd of json.data.userSubscriptionsConnection.edges){
              subcriptions_data.push(nd.node);
          }
        }else{
          return res.status(400).json({"message":"Error Occurred while fetching subcriptions."})
        }
      }
      return res.status(200).json({"subcriptions": subcriptions_data});
    } catch (e) {
      console.error("Error fetching subcriptions: ", e);
      res.status(400).json({ message: "Bad Request" });
    }
  }