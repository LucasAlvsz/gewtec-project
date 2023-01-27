import { AppDataSource } from "@/config"
import { Address } from "@/models"
import { AddressData } from "@/types/AddressTypes"

const save = async (addressData: AddressData): Promise<Address> => {
	const address = new Address()
	address.address = addressData.address
	address.city = addressData.city
	address.state = addressData.state
	address.cep = addressData.cep
	address.user = addressData.user
	await AppDataSource.manager.save(address)
	return address
}

export default {
	save,
}
