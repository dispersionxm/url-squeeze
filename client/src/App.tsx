import { useRoutes } from './routes'
import 'materialize-css'

export const App = () => {
	const routes = useRoutes(false)

	return <div className="container">{routes}</div>
}
