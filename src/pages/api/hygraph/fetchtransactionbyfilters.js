export default async function handler(req, res) {
    try{      
      let transactions_data = [];
      let areTransactionsAvailable = true;
      let currentIndex = 0;

      const query = req.query;
      let startMonth = parseInt(query["month"]);
      let startYear = parseInt(query["year"]);
      
      let endMonth = startMonth == 12 ?(startMonth + 1) % 12 : startMonth + 1;
      let endYear = startMonth == 12 ? startYear + 1 : startYear;
      startMonth = startMonth < 11 ? `0${startMonth}` : startMonth;
      endMonth = endMonth < 11 ? `0${endMonth}` : endMonth;

      while(areTransactionsAvailable){
          const response = await fetch(process.env.HYGRAPH_RW_ENDPOINT, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${process.env.HYGRAPH_TOKEN}`
            },
            body: JSON.stringify({
              query: `
              query MyQuery {
                financesConnection(orderBy: financeDate_DESC, skip: ${currentIndex} where: {financeDate_gte: "${startYear.toString()}-${startMonth.toString()}-01T00:00:00-06:00", financeDate_lt: "${endYear.toString()}-${endMonth.toString()}-01T00:00:00-06:00"}) {
                  pageInfo {
                    endCursor
                    hasPreviousPage
                    hasNextPage
                    startCursor
                    pageSize
                  }
                  edges {
                    cursor
                    node {
                      amount
                      createdAt
                      isIncome
                      categoryName {
                        categoryName
                        id
                      }
                      description
                      financeDate
                      financeName
                      id
                    }
                  }
                }
              }
                `,
            }),
          });
          const json = await response.json();
          if(response.ok){
            currentIndex += json.data.financesConnection.pageInfo.pageSize;
            areTransactionsAvailable = json.data.financesConnection.pageInfo.hasNextPage;
            for(let nd of json.data.financesConnection.edges){
                transactions_data.push(nd.node);
            }
          }else{
            return res.status(400).json({"message":"Error Occurred while fetching transactions."})
          }
        }
        return res.status(200).json({"transactions":transactions_data});
      } catch (e) {
        console.error("Error fetching transactions: ", e);
        res.status(500).json({"message" : "Your Request can't be processed."});
      }
  };