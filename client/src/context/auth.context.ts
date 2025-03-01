import { createContext } from 'react'

const noop = () => {}

interface IAuthContext {
	token: string | null
	userId: string | null
	login: (token: string, userId: string) => void
	logout: () => void
	isAuthenticated: boolean
}

export const AuthContext = createContext<IAuthContext>({
	token: null,
	userId: null,
	login: noop,
	logout: noop,
	isAuthenticated: false
})