import React from 'react'
import { ILink } from '../interfaces'
import { Link } from 'react-router-dom'

interface ILinksListProps {
	links: Array<ILink>
}

export const LinksList: React.FC<ILinksListProps> = ({ links }) => {
	return (
		<table>
			<thead>
			<tr>
				<th>No</th>
				<th>Оригинальная</th>
				<th>Сокращённая</th>
				<th>Открыть</th>
			</tr>
			</thead>

			<tbody>
			{links.map((link, index) => {
				return (
					<tr key={link._id}>
						<td>{ index + 1}</td>
						<td>{ link.from }</td>
						<td>{ link.to }</td>
						<td>
							<Link to={`/detail/${link._id}`}>Открыть</Link>
						</td>
					</tr>
				)
			})}
			</tbody>
		</table>
	)
}