import { User } from "@/models"
import { ConflictError, NotFoundError } from "@/errors"
import { cryptographyUtils } from "@/utils"
import { UserBody } from "@/types/UserTypes"
import { addressRepository, userRepository } from "@/respositories"
import { AddressData, CepResponse } from "@/types/AddressTypes"

const create = async (user: UserBody): Promise<void> => {
	const userExists = await validateUserExistence(user.email)
	if (userExists) throw new ConflictError("User already exists")

	const cepExists = await validateCep(user.cep)
	if (!cepExists) throw new NotFoundError("CEP not found")

	if (validateAddress(user, cepExists))
		throw new ConflictError("Address does not match CEP")

	const createdUser = await userRepository.save({
		...user,
		password: cryptographyUtils.encryptWithSalt(user.password),
	})

	await addressRepository.save({
		address: user.address,
		cep: user.cep,
		city: user.city,
		state: user.state,
		user: createdUser,
	})
}

const validateUserExistence = async (email: string): Promise<User | null> => {
	const user = await userRepository.findByEmail(email)
	return user || null
}

const validateCep = async (cep: string): Promise<CepResponse> => {
	const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
	const data = await response.json()
	if (data.erro) throw new NotFoundError("CEP not found")

	return data
}

const validateAddress = (
	addressData: Omit<AddressData, "adress">,
	CepResponse: Omit<CepResponse, "logradouro">
): boolean => {
	const { localidade, uf } = CepResponse
	const { city: addressCidade, state: addressUf } = addressData
	return localidade === addressCidade && uf === addressUf
}

export default {
	create,
}
