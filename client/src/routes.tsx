import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthPage, CreatePage, DetailPage, LinksPage } from './pages'

export const useRoutes = (isAuthenticated: boolean) => {
	if (isAuthenticated) {
		return (
			<Routes>
				<Route path="/links" element={<LinksPage />} />
				<Route path="/create" element={<CreatePage />} />
				<Route path="/detail/:id" element={<DetailPage />} />
				<Route path="*" element={<Navigate to="/create" />} />
			</Routes>
		)
	} else {
		return (
			<Routes>
				<Route path="/" element={<AuthPage />} />
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		)
	}
}
