import { User } from "@/models"

type UserData = Omit<User, "id">

export { UserData }
