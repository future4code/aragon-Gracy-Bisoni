export type Transaction={
    value: number,
    date: string,
    description:string
}

export type User= {
    id: number,
    name:string,
    CPF: string,
    birthDate: string,
    balance:number,
    statement: Transaction[]
}