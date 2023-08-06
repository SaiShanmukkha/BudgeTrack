import prisma from "../../components/Utilities/prismadb"
import bcrypt from "bcrypt"

export default async function handler(req, res){
    if(req.method === "POST"){
            const { name, email, password } = req.body;

            if(!name || !email || !password){
                return res.status(400).json({ message: "Missing fields" });
            }

            const emailExist = await prisma.user.findUnique({
                where: {
                    email
                }
            });

        
            if(emailExist) {
                return res.status(400).json({"message":`Email already exists`})
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    hashedPassword
                }
            });
            
            console.log(user);
            return res.status(200).json(user);
    }

    return res.status(405).json({"message":"Method not allowed"});
}