import React from 'react'
import { Link } from 'react-router-dom'

const HorizontalMenuNavLink = ({path, children}) => {
	return (
		<Link className="h-full w-full flex items-start" to={path}>
			<span>{children}</span>
		</Link>
	)
}

export default HorizontalMenuNavLink