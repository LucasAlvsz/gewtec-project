import { Address } from "@/models"

type AddressData = Omit<Address, "id">

type CepResponse = { logradouro: string; localidade: string; uf: string }

export { AddressData, CepResponse }
