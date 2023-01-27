import { AppDataSource } from "@/config"

import { User } from "@/models"
import { UserData } from "@/types/UserTypes"

const save = async (userData: UserData): Promise<User> => {
	const user = new User()
	user.name = userData.name
	user.email = userData.email
	user.password = userData.password
	user.birthDate = userData.birthDate
	return AppDataSource.manager.save(user)
}

const findByEmail = async (email: string): Promise<User | undefined> => {
	return AppDataSource.manager.findOneBy(User, { email })
}

export default {
	save,
	findByEmail,
}
