export default async function handler(req, res) {
    let categories_data = [];
    let areCategoriesAvailable = true;
    let currentIndex = 0;
  
    try {
      while (areCategoriesAvailable) {
        const response = await fetch(process.env.HYGRAPH_RW_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
          },
          body: JSON.stringify({
            query: `
                query MyQuery {
                  categoriesConnection(skip: ${currentIndex}) {
                    pageInfo {
                      endCursor
                      hasNextPage
                      hasPreviousPage
                      pageSize
                      startCursor
                    }
                    edges {
                      node {
                        categoryName
                        id
                      }
                      cursor
                    }
                  }
                }
              `,
          }),
        });
  
        const json = await response.json();
        if(response.ok){
          currentIndex += json.data.categoriesConnection.pageInfo.pageSize;
          areCategoriesAvailable = json.data.categoriesConnection.pageInfo.hasNextPage;
          for(let nd of json.data.categoriesConnection.edges){
              categories_data.push(nd.node);
          }
        }else{
          return res.status(400).json({"message":"Error Occurred while fetching categories."})
        }
      }
      return res.status(200).json({"categories": categories_data});
    } catch (e) {
      console.error("Error fetching categories: ", e);
      res.status(400).json({ message: "Bad Request" });
    }
  }