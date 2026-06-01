type UserIdInputProps = {
  onChange: (value: string) => void;
};

export function UserIdInput({ onChange }: UserIdInputProps) {
  return (
    <div className="pb-3">
      <input
        className=" w-full h-10 pl-3 pr-3 text-sm text-gray-700  focus:outline-none  shadow-sm focus:border-blue-500  border-2 border-solid border-gray-300 rounded-2xl bg-gray-300"
        placeholder="Insert your steam ID here"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
