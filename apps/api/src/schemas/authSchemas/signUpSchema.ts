import Joibase from "joi"
import JoiDate from "@joi/date"
const Joi = Joibase.extend(JoiDate)

const bodySchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().required(),
	birthDate: Joi.date().required(),
	cep: Joi.string().required(),
	address: Joi.string().required(),
	city: Joi.string().required(),
	state: Joi.string().required(),
}).options({ allowUnknown: false })

const signUpSchema = Joi.object({
	body: bodySchema,
}).options({ allowUnknown: true })

export default signUpSchema
