import express from "express";
import { UserController } from "../API/Controllers/userController";
import { UserDatabase } from "../API/Data/userDatabase";
import { UserBusiness } from "../API/Settings/userBusiness";
import { IdMaker } from "../Utilities/idMaker";

export const userRouter = express.Router()

const userControler = new UserController(
    new UserBusiness(
        new IdMaker(),
        new UserDatabase()
    )
)

userRouter.get('/', userControler.getAllUsers)
userRouter.post('/create', userControler.createUser)
userRouter.put('/:id', userControler.chanceParticipationById)
userRouter.delete('/:id', userControler.deleteById) 