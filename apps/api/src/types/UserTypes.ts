import { User } from "@/models"
import { AddressData } from "./AddressTypes"

type UserData = Omit<User, "id">
type UserBody = UserData & AddressData

export { UserData, UserBody }
