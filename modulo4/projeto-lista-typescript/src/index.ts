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