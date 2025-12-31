export function UserCard({ user, onClick }) {
  const userName = user.personaname;

  return (
    <div>
      <div class="relative">
        <h2 class="flex items-center w-full h-10 pl-8 pr-3 text-sm text-gray-700  focus:outline-none  shadow-sm focus:border-blue-500  border-2 border-solid border-gray-300 rounded-2xl bg-gray-300">
          <strong> {userName} </strong>
        </h2>
        <span
          class="absolute inset-y-0 left-0 flex items-center justify-center ml-2 cursor-pointer"
          onClick={onClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}
