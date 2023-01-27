import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export default class Address {
	@PrimaryGeneratedColumn()
	id: number

	@Column({
		type: "varchar",
	})
	cep: string

	@Column({
		type: "varchar",
	})
	address: string

	@Column({
		type: "varchar",
	})
	city: string

	@Column({
		type: "varchar",
	})
	state: string
}
