import { Request, Response } from "express"

import { userService } from "@/services"

export const signUp = async (req: Request, res: Response) => {
	await userService.create(req.body)
	res.sendStatus(201)
}

export default {
	signUp,
}
