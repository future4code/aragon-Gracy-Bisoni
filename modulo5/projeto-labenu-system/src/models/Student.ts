export interface IStudentDB{
        id: string,
        name: string,
        email: string,
        birthdate: Date,
        classroomId: string,
}

export interface IHobbyDB{
    id: string,
    title: string
}

export interface IStudentsHobbiesDB{
    student_id: string,
    hobby_id: string
}

export class Student{
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private birthdate: Date,
        private classroomId: string,
        private hobbies: string[]
    ){}
}