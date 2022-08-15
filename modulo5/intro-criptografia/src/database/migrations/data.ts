import { IUserDB, USER_ROLES } from "../../models/User"
import { HashManager } from "../../services/HashManager"

const hashManager = new HashManager()
const password1 = hashManager.hash("bananinha")
const password2 = hashManager.hash("qwerty00")
const password3 = hashManager.hash("asdfg123")

export const users: IUserDB[] = [
    {
        id: "bb9b7ee8-ae4b-4bd1-9bd6-e7e21594399b",
        nickname: "FunDev",
        email: "astrodev@gmail.com",
        password: "$2a$12$RBAWOHpUvGTE.MEeIohAzec9tlVqtNA/x2PMPt/Hrt0vI437cQdJC",   //"bananinha",
        role: USER_ROLES.NORMAL
    },
    {
        id: "f03017bb-2c08-4cdc-bb63-7fbd7cebe01f",
        nickname: "Fulilin",
        email: "fulano@gmail.com",
        password: "$2a$12$PULtVNlAll87D6E8pR/0HO9vbzVDPaUMA89rc5cNmYoAAepbwmkcO", //"qwerty00",
        role: USER_ROLES.ADMIN
    },
    {
        id: "7079b8e4-95cd-48aa-82a9-77454e94b789",
        nickname: "Ciclanin",
        email: "ciclana@gmail.com",
        password: "$2a$12$LkWMqS3oPhP2iVMcZOVvWer9ahUPulxjB0EA4TWPxWaRuEEfYGu/i",  //"asdfg123",
        role: USER_ROLES.NORMAL
    }
]