function SearchInput({ onChange }) {
  return (
    <div>
      <div className="relative">
        <input
          className=" w-full h-10 pl-8 pr-3 text-sm text-gray-700  focus:outline-none  shadow-sm focus:border-blue-500  border-2 border-solid border-gray-300 rounded-2xl bg-gray-300"
          placeholder="HELLDIVERS™ 2" //TODO: This could be dynamically set to a random game
          onChange={onChange}
        />
        <span className="absolute inset-y-0 left-0 flex items-center justify-center ml-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="black"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}

export { SearchInput };
