import { User } from "@/models"
import { ConflictError } from "@/errors"
import { cryptographyUtils } from "@/utils"
import { UserData } from "@/types/UserTypes"
import { userRepository } from "@/respositories"

const create = async (user: UserData): Promise<void> => {
	const userExists = await validateUserExistence(user.email)
	if (userExists) throw new ConflictError("User already exists")

	await userRepository.save({
		...user,
		password: cryptographyUtils.encryptWithSalt(user.password),
	})
}

const validateUserExistence = async (email: string): Promise<User | null> => {
	const user = await userRepository.findByEmail(email)
	return user || null
}

export default {
	create,
}
