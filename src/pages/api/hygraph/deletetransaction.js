export default async function handler(req, res) {  
  if(req.method === 'POST'){
    const bdata = req.body;
    try {
        const response = await fetch(process.env.HYGRAPH_RW_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
          },
          body: JSON.stringify({
            query: `
                mutation MyMutation {
                    deleteFinance(where: {id: "${bdata.id}"}){
                      id
                    }
                }
              `,
          }),
        });
        if(response.ok){
            return res.status(200).json({"message": "Deleted Successfully."});         
        }else{
          return res.status(400).json({"message":"Error Occurred."});
        }
    } catch (e) {
      return res.status(400).json({ message: "Bad Request" });
    }
  }else{
    return res.status(405).json({ message: "Method Not Allowed." });
  }
  }