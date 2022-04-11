import { UserDTOmap } from "../../Types/Interfaces/userTDO"
import { User } from "../../Types/Models/userModel"
import { BaseDatabase } from "./ConnectionData"


export class UserDatabase extends BaseDatabase {
    static TABLE_NAME = "case_Cubo"

    createUser = async (user: any):Promise<void> => {
        await this.connectionData()
            .into(UserDatabase.TABLE_NAME)
            .insert(user)
    }

    getAllUsers = async ():Promise<User | null> => {
        const results: any = await this.connectionData()
            .from(UserDatabase.TABLE_NAME)
            .select("*")

        const users: User = results.map((user: UserDTOmap) => ({
            id: user.id, 
            name: user.name, 
            lastName: user.lastName, 
            participation: user.participation
        }))

        return results.length ? users : null
    }

    deleteById = async (id: string):Promise<void> => {
        await this.connectionData()
            .from(UserDatabase.TABLE_NAME)
            .where({id: id})
            .del()
    }

    chanceParticipationById = async (id: string, changes: number):Promise<User | null> => {
        await this.connectionData()
            .into(UserDatabase.TABLE_NAME)
            .where({id: id})
            .update({participation: changes})

        const results: any = await this.connectionData()
            .from(UserDatabase.TABLE_NAME)
            .select("*")
            .where({id: id})

        const users: User = results.map((user: UserDTOmap) => ({
            id: user.id, 
            name: user.name, 
            lastName: user.lastName, 
            participation: user.participation
        }))

        return results.length ? users : null
    }
}