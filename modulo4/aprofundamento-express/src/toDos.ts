export type ToDo = {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

export const toDos:ToDo[] = [
    {
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: false
      },
      {
        userId: 1,
        id: 2,
        title: "quis ut nam facilis et officia qui",
        completed: false
      },
      {
        userId: 2,
        id: 4,
        title: "et porro tempora",
        completed: true
      },
      {
        userId: 2,
        id: 5,
        title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
        completed: false
      },
      {
        userId: 3,
        id: 7,
        title: "illo expedita consequatur quia in",
        completed: false
      },
      {
        userId: 3,
        id: 8,
        title: "quo adipisci enim quam ut ab",
        completed: true
      },
]