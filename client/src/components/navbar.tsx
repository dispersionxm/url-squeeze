import { NavLink, useNavigate } from 'react-router-dom'
import React, { useContext } from 'react'
import { AuthContext } from '../context'

export const Navbar: React.FC = () => {
	const auth = useContext(AuthContext)
	const navigation = useNavigate()

	const logoutHandler = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
		event.preventDefault()
		auth.logout()
		navigation('/')
	}

	return (
		<nav>
			<div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem' }}>
				<NavLink to="/" className="brand-logo">Сокращение ссылок</NavLink>
				<ul id="nav-mobile" className="right hide-on-med-and-down">
					<li><NavLink to="/links">Ссылки</NavLink></li>
					<li><NavLink to="/create">Создать</NavLink></li>
					<li><a href="/" onClick={logoutHandler}>Выйти</a></li>
				</ul>
			</div>
		</nav>
	)
}