import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context'
import { useParams } from 'react-router-dom'
import { useHttp } from '../../hooks'
import { LinkCard, Loader } from '../../components'
import { ILink } from '../../interfaces'

export const DetailPage: React.FC = () => {
	const { token } = useContext(AuthContext)
	const { request, loading } = useHttp()
	const [link, setLink] = useState<ILink | null>(null)
	const linkId = useParams().id

	const getLink = useCallback(async () => {
		try {
			const fetched = await request(`${import.meta.env.VITE_API_URL}/api/link/${linkId}`, 'GET', null, {
				Authorization: `Bearer ${ token }`
			})
			console.log('fetched', fetched)
			setLink(fetched)
		} catch (e) {

		}
	}, [linkId, request, token])

	useEffect(() => {
		getLink()
	}, [getLink])

	if (loading) {
		return <Loader />
	}

	return (
		<>
			{!loading && link && <LinkCard link={link} />}
		</>
	)
}
