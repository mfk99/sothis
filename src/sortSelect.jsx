function SortSelect({ onChange }) {
    return (
    <select
						class="font-mono border-2 border-solid border-gray-300 p-4 rounded-2xl"
						defaultValue="alphabetical"
						onChange={onChange}
					>
						<option value="alphabetical">Alphabetical</option>
						<option value="alphabetical-asc">Alphabetical, ascending</option>
						<option value="playtime">Playtime</option>
						<option value="playtime-asc">Playtime, ascending</option>
					</select>)
}

export {SortSelect}