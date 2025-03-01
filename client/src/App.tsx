import { BrowserRouter as Router } from 'react-router-dom'
import { AuthContext } from './context'
import { useAuth } from './hooks/auth.hook.tsx'
import { useRoutes } from './routes'
import { Loader, Navbar } from './components'
import 'materialize-css'

export const App = () => {
	const { login, logout, token, userId, ready } = useAuth()
	const isAuthenticated = !!token
	const routes = useRoutes(isAuthenticated)

	if (!ready) {
		return <Loader />
	}

	return (
	<Router>
		<AuthContext.Provider value={{ token, userId, login, logout, isAuthenticated }}>
			{isAuthenticated && <Navbar />}
			<div className="container">{routes}</div>
		</AuthContext.Provider>
	</Router>
	)
}
