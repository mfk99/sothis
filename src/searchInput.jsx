function SearchInput({ onChange }) {
    return (
        <input 
        class="font-mono border-2 border-solid border-gray-300 p-4 rounded-2xl "
        placeholder='Filter games...'
        onChange={onChange}
    />
    )
}

export { SearchInput }