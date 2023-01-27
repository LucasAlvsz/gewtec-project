import { Router } from "express"

import { signUpSchema } from "@/schemas"
import { validateSchema } from "@/middlewares"
import { authController } from "@/controllers"

const authRouter = Router()

authRouter.post("/sign-up", validateSchema(signUpSchema), authController.signUp)

export default authRouter
