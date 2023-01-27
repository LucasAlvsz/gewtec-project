import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import Address from "./AddressModel"

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

	@OneToMany(type => Address, address => address.user)
	addresses: Address[]
}
