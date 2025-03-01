import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context'
import { useNavigate } from 'react-router-dom'
import { useHttp } from '../../hooks'

export const CreatePage: React.FC = () => {
	const auth = useContext(AuthContext)
	const navigate = useNavigate()
	const { request } = useHttp()
	const [link, setLink] = useState<string>('')

	const keydownHandler = async (e: React.KeyboardEvent): Promise<void> => {
		if (e.key === 'Enter') {
			try {
				const data = await request(`${import.meta.env.VITE_API_URL}/api/link/generate`, 'POST', { from: link }, {
					Authorization: `Bearer ${auth.token}`
				})
				navigate('/detail/' + data.link._id)
			} catch (e) {

			}
		}
	}

	return (
		<div className="row">
			<div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
				<div className="input-field">
					<input
						id="link"
						type="text"
						value={link}
						onChange={(e) => setLink(e.target.value)}
						onKeyDown={keydownHandler}
					/>
					<label htmlFor="link">Вставьте ссылку...</label>
				</div>
			</div>
		</div>
	)
}
