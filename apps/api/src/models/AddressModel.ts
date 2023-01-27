import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
	JoinColumn,
} from "typeorm"
import User from "./UserModel"

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

	@ManyToOne(() => User, user => user.addresses)
	@JoinColumn({ name: "user_id" })
	user: User
}
