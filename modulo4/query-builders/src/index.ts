import express from "express";
import cors from "cors";
import { ping } from "./endpoints/ping";
import { createPerfume } from "./endpoints/createPerfume";
import { getPerfumes } from "./endpoints/getPerfumes";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || 3003, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`)
});

app.get("/ping", ping)

//Create perfume
app.post("/perfumes", createPerfume)

//Read (Get) perfumes
app.get("/perfumes", getPerfumes)

// Implemente seus endpoints abaixo