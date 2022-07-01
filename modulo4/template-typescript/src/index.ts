// Exercício 1 
let ano:string | number = '1997'
ano = 2003

console.log(ano)
// usando o operador "|" na tipagem, eu posso atribuir mais de um tipo de valor possível a variável

// Exercício 2
type Pessoa = {
    nome: string
    idade: number
    corFavorita: string
}

const eu:Pessoa = {
    nome: 'Belle',
    idade: 24,
    corFavorita:'lilás'
}

console.log(eu)

// Exercício 3
// parte 1
// entrada: array de números
// saída: objeto com propriedades dos números listados

// parte 2
// array de números ordenados, const "soma"

type Estatisticas = {
    maior: number,
    menor: number,
    media: number
}


function obterEstatisticas(numeros:Array<number>):{} {

    const numerosOrdenados:Array<number> = numeros.sort(
        (a, b) => a - b
    )

    let soma:number = 0

    for (let num of numeros) {
        soma += num
    }

    const estatisticas:Estatisticas = {
        maior: numerosOrdenados[numeros.length - 1],
        menor: numerosOrdenados[0],
        media: soma / numeros.length
    }

    return estatisticas
}

console.log(obterEstatisticas([2,5,9,6]))

// Exercício 4
// parte 1
type Posts = {
    autor:string,
    texto:string
}

const posts:Posts[] = [
    {
      autor: "Alvo Dumbledore",
      texto: "Não vale a pena viver sonhando e se esquecer de viver"
    },
    {
      autor: "Severo Snape",
      texto: "Menos 10 pontos para Grifinória!"
    },
    {
      autor: "Hermione Granger",
      texto: "É levi-ô-sa, não levio-sá!"
    },
    {
      autor: "Dobby",
      texto: "Dobby é um elfo livre!"
    },
    {
      autor: "Lord Voldemort",
      texto: "Avada Kedavra!"
    }
  ]

  // parte 2
  // uma array de objetos posts e um autor, retorna os posts que contém o mesmo autor de entrada
  function buscarPostsPorAutor(posts: Posts[], autorInformado:string):Posts[] {
    return posts.filter(
      (post) => {
        return post.autor === autorInformado
      }
    )
  }



