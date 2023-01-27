import { DataSource } from "typeorm"
import { Address, User } from "@/models"

export const AppDataSource = new DataSource({
	type: "mysql",
	url: process.env.DATABASE_URL,
	synchronize: true,
	logging: false,
	entities: [User, Address],
	migrations: [],
})

await AppDataSource.initialize()
