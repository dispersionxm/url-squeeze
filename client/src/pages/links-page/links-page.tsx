import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHttp } from '../../hooks'
import { AuthContext } from '../../context'
import { ILink } from '../../interfaces'
import { LinksList, Loader } from '../../components'

export const LinksPage: React.FC = () => {
	const [links, setLinks] = useState<Array<ILink> | []>([])
	const { loading, request } = useHttp()
	const { token } = useContext(AuthContext)

	const fetchLinks = useCallback(async () => {
		try {
			const fetched = await request(`${import.meta.env.VITE_API_URL}/api/link`, 'GET', null, {
				Authorization: `Bearer ${token}`
			})
			setLinks(fetched)
		} catch (e) {

		}
	}, [token, request])

	useEffect(() => {
		fetchLinks()
	}, [fetchLinks])

	if (loading) {
		return <Loader />
	}

	return (
		<>
			{!loading && links && (
				<LinksList links={links} />
			)}
		</>
	)
}
