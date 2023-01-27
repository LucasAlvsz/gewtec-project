import { DataSource } from "typeorm"
import { User } from "@/models"

export const AppDataSource = new DataSource({
	type: "mysql",
	url: process.env.DATABASE_URL,
	synchronize: true,
	logging: false,
	entities: [User],
	migrations: [],
})

await AppDataSource.initialize()
