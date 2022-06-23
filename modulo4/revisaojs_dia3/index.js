// Warmup
const writeNum = (num) => {
    const writed = ["zero", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez"];
    
    if (typeof num === 'number' && num > writed.length-1 || num < 0){
        return 'Insira um número entre 0 e 10';
    } else if (typeof num === 'string'){
        return 'Insira um número algorítmico'
    }
    return writed[num];

};

console.log(writeNum(9))
console.log(writeNum("oito"))

//Exercício diário

const contas = [
	{
		email: "astrodev@labenu.com",
		password: "abc123"
	},
	{
		email: "bananinha@gmail.com",
		password: "bananinha"
	}
]

const login = (email, password) => {
    if (email.includes("@") && password.length>=6){
        for (let i=0; i <=contas.length; i++){
            const validacaoEmail = contas[i].email === email
            const validacaoPassword = contas[i].password === password
            const autoriza = validacaoEmail && validacaoPassword
            
            if (autoriza){
                return "login bem sucedido"
            } else {
                return 'email ou senha incorretos'
            }
        }
    } else{
        return 'email inválido ou senha com menos de 6 caracteres'
    }                                                         
}

console.log(login("astrodev@labenu.com", "abc123"))
console.log(login("bananinha@gmail.com", "banana"))
console.log(login("astrodev.labenu.com", "abc123"))
console.log(login("bananinha@gmail.com", "ba"))
console.log(login("bananinha@gmail.com", "abc123"))