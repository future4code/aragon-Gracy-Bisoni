const criaTaskList = (task) => {
    const taskList = []
    const novaLista = [...taskList,task]
    return console.log(`Tarefa adicionada com sucesso! Tarefas: ${novaLista}`)
}

criaTaskList(process.argv[2])