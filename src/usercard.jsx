export function UserCard({ user }) {
	// console.log(user)
	const userName = "Username: "+user.personaname

	return (
		<div
			class="font-mono border-2 border-solid border-gray-300 p-4 rounded-2xl"
		>
			<h2>
				<strong> {userName} </strong>
			</h2>
		</div>
	)
}
