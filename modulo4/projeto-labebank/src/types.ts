export type Transaction={
    value: number,
    date: Date,
    description:string
}

export type User= {
    name:string,
    CPF: string,
    birth_date: string,
    balance:number,
    statement: Transaction[]
}