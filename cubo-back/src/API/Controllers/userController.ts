import { Request, Response } from "express"
import { UserDTO } from "../../Types/Interfaces/userTDO"
import { User } from "../../Types/Models/userModel"
import { UserBusiness } from "../Settings/userBusiness"


export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ) { }

    createUser = async (req: Request, resp: Response):Promise<void> => {
        const input: UserDTO = {
            name: req.body.name,
            lastName: req.body.lastName,
            participation: req.body.participation
        }

        try{
            await this.userBusiness.createUser(input)

            resp.status(201).send("Usuário criado com sucesso!")
        } catch (error: any) {
            resp.status(400).send(error.message || error.sqlMessage)
        }
    }

    getAllUsers = async (req: Request, resp: Response) => {
        try {
            const users: User = await this.userBusiness.getAllUsers()

            resp.status(200).send({results: users})
        } catch (error: any) {
            resp.status(400).send(error.message || error.sqlMessage)
        }
    }

    deleteById = async (req: Request, resp: Response) => {
        const id: string = req.params.id

        try{
            await this.userBusiness.deleteById(id)

            resp.status(200).send("Usuário deletado!")
        } catch (error: any) {
            resp.status(400).send(error.message || error.sqlMessage)
        }
    }

    chanceParticipationById = async (req: Request, resp: Response) => {
        const id: string = req.params.id
        const participation: number = req.body.participation

        try{
            const users: User = await this.userBusiness.chanceParticipationById(id, participation)

            resp.status(200).send({message: "A participação desse usuário foi alterada", user: users})
        } catch (error: any) {
            resp.status(400).send(error.message || error.sqlMessage)
        }
    }
} 