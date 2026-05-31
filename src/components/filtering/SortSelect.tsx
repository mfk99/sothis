import type { SortMode } from "../../types/sorting";

function SortSelect({ onChange }: { onChange: (value: SortMode) => void }) {
  return (
    <div>
      <div className="relative">
        <select
          className=" w-full h-10 pl-8 pr-3 text-sm text-gray-700  focus:outline-none  shadow-sm focus:border-blue-500  border-2 border-solid border-gray-300 rounded-2xl bg-gray-300"
          defaultValue="alphabetical"
          onChange={(e) => onChange(e.target.value as SortMode)}
        >
          <option value="alphabetical">A-Z</option>
          <option value="alphabetical-asc">Z-A</option>
          <option value="playtime">Most played</option>
          <option value="playtime-asc">Least played</option>
        </select>
        <span className="absolute inset-y-0 left-0 flex items-center justify-center ml-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="black"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}

export { SortSelect };
