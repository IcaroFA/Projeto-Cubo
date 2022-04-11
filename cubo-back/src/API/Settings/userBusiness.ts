import { UserDTO, UserDTOmap } from "../../Types/Interfaces/userTDO";
import { User } from "../../Types/Models/userModel";
import { IdMaker } from "../../Utilities/idMaker";
import { UserDatabase } from "../Data/userDatabase";

export class UserBusiness {
    constructor(
        private idMaker: IdMaker,
        private userData: UserDatabase
    ){ }

    createUser = async (input: UserDTO) => {

        if(!input.name || !input.lastName || !input.participation){
            throw new Error("Todos os campos devem ser preenchidos")
        }

        if(!Number.isInteger(input.participation)){
            throw new Error("O valor deve ser um número inteiro")
        }

        const id: string = this.idMaker.generate()

        const userStats: UserDTOmap = {
            id: id,
            name: input.name,
            lastName: input.lastName,
            participation: input.participation,
        }

        await this.userData.createUser(userStats)
    }

    getAllUsers = async () => {
        const usersList: User = await this.userData.getAllUsers()

        if(!usersList){
            throw new Error('Em branco neste momento')
        }

        return usersList

    }

    deleteById = async (id: string) => {
        await this.userData.deleteById(id)
    } 

    chanceParticipationById = async (id: string, participation: number) => {
        const userChanged: User = await this.userData.chanceParticipationById(id, participation)

        if(!id){
            throw new Error("Não informe uma id nesse campo")
        }

        if(!participation){
            throw new Error("Você deve informar a participação do aluno")
        }

        return userChanged
    }
}