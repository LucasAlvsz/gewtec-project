import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export default class User {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ length: 255, type: "varchar", nullable: false })
	name: string

	@Column({
		unique: true,
		type: "varchar",
		nullable: false,
	})
	email: string

	@Column({ type: "varchar", nullable: false })
	password: string

	@Column({ type: "varchar", nullable: false })
	birthDate: string
}
