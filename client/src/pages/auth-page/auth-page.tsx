import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../context'
import { useHttp, useMessage } from '../../hooks'

interface IForm {
	email: string
	password: string
}

export const AuthPage: React.FC = () => {
	const auth = useContext(AuthContext)
	const message = useMessage()
	const { loading, request, error, clearError } = useHttp()
	const [form, setForm] = useState<IForm>({
		email: '',
		password: ''
	})

	useEffect(() => {
		message(error)
		clearError()
	}, [error, message, clearError])

	useEffect(() => {
		// @ts-ignore
		window.M.updateTextFields()
	}, [])

	const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [event.target.name]: event.target.value })
	}

	const registerHandler = async () => {
		try {
			const data = await request(
				`${import.meta.env.VITE_API_URL}/api/auth/register`,
				'POST',
				{ ...form }
			)
			message(data.message)

			setForm({ email: '', password: '' })

		} catch (e) {}
	}

	const loginHandler = async () => {
		try {
			const data = await request(
				`${import.meta.env.VITE_API_URL}/api/auth/login`,
				'POST',
				{ ...form }
			)
			auth.login(data.token, data.userId)

		} catch (e) {}
	}

	return (
		<div className="row">
			<div className="col s6 offset-s3">
				<h1>Сократи ссылку</h1>

				<div className="card blue darken-1">
					<div className="card-content white-text">
						<span className="card-title">Авторизация</span>

						<div className="input-field">
							<input
								// placeholder="Введите свой email..."
								id="email"
								type="text"
								name="email"
								value={form.email}
								className="yellow-input"
								onChange={changeHandler}
							/>
							<label htmlFor="email">Введите свой email...</label>
						</div>

						<div className="input-field">
							<input
								// placeholder="Введите свой пароль..."
								id="password"
								type="password"
								name="password"
								value={form.password}
								className="yellow-input"
								onChange={changeHandler}
							/>
							<label htmlFor="password">Введите свой пароль...</label>
						</div>
					</div>

					<div className="card-action">
						<button
							className="btn yellow darken-4"
							style={{ marginRight: 10 }}
							onClick={loginHandler}
							disabled={loading}
						>
							Login
						</button>
						<button
							className="btn grey lighten-1 black-text"
							onClick={registerHandler}
							disabled={loading}
						>
							Registration
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
