import { User, Transaction } from "./types"
export const users: User[] = [
    {   
        id: 1,
        name: "Leona",
        CPF: "100.973.909-33",
        birthDate: "08/09/1997",
        balance: 200,
        statement: [
            {
              value: 199.90,
              date: "06/07/2022",
              description: "Boleto de luz"
            },
            {
                value: 79.90,
                date: "07/07/2022",
                description: "Boleto de água"
              }
        ]
    },
    {   
        id: 2,
        name: "Isabelle",
        CPF: "080.074.269-90",
        birthDate: "20/10/1997",
        balance: 300,
        statement: []
    }
]