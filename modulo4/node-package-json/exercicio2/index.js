const operacoesMatematicas = (operacao, num1, num2) => {
    switch(operacao){
        case 'add':
            return console.log(Number(num1)+Number(num2));
        case 'sub':
            return console.log(Number(num1)-Number(num2));
        case 'mult':
            return console.log(Number(num1)*Number(num2));
        case 'div':
            return console.log(Number(num1)/Number(num2))
    }
}

operacoesMatematicas(process.argv[2], process.argv[3], process.argv[4])