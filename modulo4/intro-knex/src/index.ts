import express, {Request, Response }from "express";
import cors from "cors";
import connection from "./database/connection";

const app = express();

app.use(express.json());
app.use(cors());

// aula
// GET produtos com query busca
app.get('/produtos',async (req:Request, res:Response)=> {
    let errorCode = 400
    try {
        const busca = req.query.busca as string

        if (busca) {
            const [resultado] = await connection.raw(`
                SELECT * FROM Produtos
                WHERE nome LIKE "%${busca.toLowerCase()}%";
            `)
            return res.status(200).send({produtos: resultado})
        }
        const [resultado] = await connection.raw(`
            SELECT * FROM Produtos
        `)

        res.status(200).send({result: resultado})
    } catch (error) {
        res.status(errorCode).send({message: error.message})
    }
})

app.listen(process.env.PORT || 3003, () => {
  console.log(`Server running on port ${process.env.PORT || 3003}`)
});