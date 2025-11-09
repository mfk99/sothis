export function UserCard({ user }) {
	// console.log(user)
	const userName = "Username: "+user.personaname

	return (
		<div
			style={{
				border: '1px solid #ccc',
				borderRadius: '20px',
				padding: '1rem',
				marginBottom: '1rem',
				fontFamily: 'monospace',
			}}
		>
			<h2>
				<strong> {userName} </strong>
			</h2>
		</div>
	)
}
