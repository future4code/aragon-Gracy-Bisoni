import { IClassroomDB, MODULE } from "../models/Classroom";
import { IHobbyDB, IStudentDB, IStudentsHobbiesDB } from "../models/Student";

export const classrooms: IClassroomDB[] = [
    {
        id: "101",
        name:"aragon",
        module: MODULE.CINCO
    },
    {
        id: "102",
        name:"hooks",
        module: MODULE.TRÊS
    },
    {
        id: "103",
        name:"moreira",
        module: MODULE.ZERO
    }
]

export const students: IStudentDB[]= [
    {
        id: "201",
        name: "Belle",
        email: "teste@belle.com",
        birthdate: new Date("1997-10-20"),
        classroomId: "102"
    },
    {
        id:"202",
        name: "Leona",
        email: "teste@leona.com",
        birthdate: new Date("1997-09-08"),
        classroomId: "103"
    },
    {
        id:"203",
        name: "Nicoly",
        email: "teste@nicoly.com",
        birthdate: new Date("1999-06-10"),
        classroomId: "102"
    }
]

export const hobbies:IHobbyDB[]= [
    {
        id:"301",
        title:"Assistir série"
    },
    {
        id:"302",
        title:"Ler livros"
    },
    {
        id:"303",
        title:"Dançar"
    }
]

export const studentsHobbies:IStudentsHobbiesDB[] = [
    {
        student_id: "101",
        hobby_id: "301"
    }
]