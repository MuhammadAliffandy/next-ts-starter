import { User } from "@//utils/types"
import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_PATCH, PROVIDER_POST, PROVIDER_PUT } from "../provider"

const delay = (): Promise<void> => new Promise(res => setTimeout(() => res(), 800))


export const getAllUsers = async () => {
    await delay()
    const response = await PROVIDER_GET(`users`)
    return response
}

export const getUser = async (token: string ) => {
    await delay()
    const response = await PROVIDER_GET(`users/current`, token)
    return response
}

export const updateUsers = async (id: string ,data: User, token: string) => {
    await delay()
    const response = await PROVIDER_PATCH(`users/${id}`,data, token)
    return response
}

export const createUser = async (data:User, token: string) => {
    await delay()
    const response = await PROVIDER_POST(`users`,data, token)
    return response
}