import { nodeModuleNameResolver } from "typescript"

// Exercício 1
function returnTypeOfParameter (parameter:any):void{
    console.log(typeof parameter)
}

returnTypeOfParameter(2)
returnTypeOfParameter('Leona')

// Exercício 2
function phraseNameAndBirthday (name:string, birthday:string):string{
    const splitDate:string[] = birthday.split("/")
    return `Olá! Me chamo ${name} e nasci no dia ${splitDate[0]}, do mês ${splitDate[1]} e ano de ${splitDate[2]}.`
}

console.log(phraseNameAndBirthday("Isa","20/10/1997"))

// Exercício 3
enum GENERO {
	ACAO="ação",
	DRAMA="drama",
	COMEDIA="comédia",
	ROMANCE="romance",
	TERROR="terror"
}

type Filme = {
    nome: string,
    anoLancamento: number,
    genero: GENERO
    pontuacao?:number
}

function buscaFilme(nome:string, anoLancamento:number, genero:GENERO, pontuacao?:number):Filme{
    
    if(pontuacao!==undefined){
        const filme:Filme = {
            nome: nome,
            anoLancamento:anoLancamento,
            genero:genero,
            pontuacao:pontuacao
        }
        return filme
    } else {
        const filme:Filme = {
            nome: nome,
            anoLancamento:anoLancamento,
            genero:genero
        }
        return filme
    }
}

console.log(buscaFilme("Duna", 2021, GENERO.ACAO))

// Exercício 4
enum SETOR{
    MARKETING='marketing',
    VENDAS='vendas',
    FINANCEIRO='financeiro'
}

type Funcionario={
    nome:string,
    salário: number,
    setor:SETOR,
    presencial: boolean
}

const colaboradores:Funcionario[] = [
	{ nome: "Marcos", salário: 2500, setor: SETOR.MARKETING, presencial: true },
	{ nome: "Maria" ,salário: 1500, setor: SETOR.VENDAS, presencial: false},
	{ nome: "Salete" ,salário: 2200, setor: SETOR.FINANCEIRO, presencial: true},
	{ nome: "João" ,salário: 2800, setor: SETOR.MARKETING, presencial: false},
	{ nome: "Josué" ,salário: 5500, setor: SETOR.FINANCEIRO, presencial: true},
	{ nome: "Natalia" ,salário: 4700, setor: SETOR.VENDAS, presencial: true},
	{ nome: "Paola" ,salário: 3500, setor: SETOR.MARKETING, presencial: true }
]

function buscaMarketingPresencial(colaboradores:Funcionario[]):Funcionario[]{
    let filtraLista = colaboradores.filter((funcionario)=> {
        return funcionario.setor === 'marketing' && funcionario.presencial === true
    })

    return filtraLista
}

console.log(buscaMarketingPresencial(colaboradores))

// Exercício 5
type Usuario ={
    name:string,
    email:string,
    role:string
}

const usuarios:Usuario[] = [
	{name:'Rogério', email: "roger@email.com", role: "user"},
	{name: "Ademir", email: "ademir@email.com", role: "admin"},
	{name: "Aline", email: "aline@email.com", role: "user"},
	{name: "Jéssica", email: "jessica@email.com", role: "user"},  
	{name: "Adilson", email: "adilson@email.com", role: "user"},  
	{name: "Carina", email: "carina@email.com", role: "admin"}      
]

function buscaAdmin (usuarios:Usuario[]):string[]{
    const emailAdmin = usuarios.filter((usuario)=> {
        return usuario.role === 'admin'
    }).map((usuario)=> {
        return usuario.email
    })

    return emailAdmin
}

console.log(buscaAdmin(usuarios))

// Exercício 6
type Cliente = {
    cliente: string,
    saldoTotal: number,
    debitos: Array<number>
}

const clientes:Array<Cliente> = [
	{ cliente: "João", saldoTotal: 1000, debitos: [100, 200, 300] },
	{ cliente: "Paula", saldoTotal: 7500, debitos: [200, 1040] },
	{ cliente: "Pedro", saldoTotal: 10000, debitos: [5140, 6100, 100, 2000] },
	{ cliente: "Luciano", saldoTotal: 100, debitos: [100, 200, 1700] },
	{ cliente: "Artur", saldoTotal: 1800, debitos: [200, 300] },
	{ cliente: "Soter", saldoTotal: 1200, debitos: [] }
]

function prospectaEmprestimo(clientes:Cliente[]):Cliente[]{
    const clienteNegativado = clientes.map((cliente)=> {
        let divida = cliente.debitos.reduce((total,debito)=> total+debito, 0)
        cliente.saldoTotal=cliente.saldoTotal-divida
        cliente.debitos=[]
        return cliente
    }).filter((saldoAtual)=> {
        return saldoAtual.saldoTotal < 0
    })

    return clienteNegativado

}

console.log(prospectaEmprestimo(clientes))

// Exercício 7
type Produto={
    nome:string,
    quantidade:number,
    valorUnitario:string|number
}

const ajustaPreco = (preco :number): string => {
	const valorAjustado: string = preco.toFixed(2).replace('.', ',')
	return "R$ "+valorAjustado
}

const produtos:Produto[]= [
	{ nome: "MacMugffin", quantidade: 37, valorUnitario: 51.040},
	{ nome: "Vassoura voadora", quantidade: 56, valorUnitario: 210.0},
	{ nome: "Laço da verdade", quantidade: 32, valorUnitario: 571.5},
	{ nome: "O precioso", quantidade: 1, valorUnitario: 9181.923},
	{ nome: "Caneta de 250 cores", quantidade: 123, valorUnitario: 17},
	{ nome: "Plumbus", quantidade: 13, valorUnitario: 140.44},
	{ nome: "Pokebola", quantidade: 200, valorUnitario: 99.9915}
]

function ajustaProduto(produtos:Produto[]):Produto[]{
    const novaLista = produtos.map((produto)=> {
        produto.valorUnitario = ajustaPreco(produto.valorUnitario as number)
        return produto
    }).sort((a,b)=> a.quantidade - b.quantidade)

    return novaLista
}
console.log(ajustaProduto(produtos))

// Exercício 8
function checkIdStatus(birthdayDate:string, idDate:string):boolean{
    const birthdayDateNumber:Array<number> = birthdayDate.split('/').map((num)=> {
        return Number(num)
    })

    const idDateNumber:Array<number> = idDate.split('/').map((num)=>{
        return Number(num)
    })

    const currentYear:number = new Date().getFullYear()

    const idAge:number = currentYear - idDateNumber[2]
    const currentAge:number = currentYear - birthdayDateNumber[2]

    if(currentAge<=20 && idAge>=5 || (currentAge > 20 && currentAge <= 50) && idAge >= 10 || currentAge > 50 && idAge >= 15){
        return true
    } else {
        return false
    }
    
}

console.log(checkIdStatus("20/10/1997", "05/03/2005"))

// Exercício 9
function anagrama(palavra:string):number{
    let array= palavra.split('')
    let fatorial = array.length
    let resultado = fatorial
    for(let i=fatorial-1; i>1; i--){
        resultado*=i
    }
    return resultado
}
console.log(anagrama('boi'))
console.log(anagrama('comida'))
