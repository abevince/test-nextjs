const Checkbox = ({
  label,
  id,
  name,
  checked,
  onChange,
}: {
  label: string
  id: string
  name: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
    <div className="flex gap-3">
      <div className="flex h-6 shrink-0 items-center">
        <div className="group grid size-4 grid-cols-1">
          <input
            id={id}
            name={name}
            type="checkbox"
            onChange={onChange}
            checked={checked}
            aria-describedby="favorites-description"
            className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-blue-400 checked:bg-blue-500 indeterminate:border-blue-400 indeterminate:bg-orange-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
          />
          <svg
            fill="none"
            viewBox="0 0 14 14"
            className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
          >
            <path
              d="M3 8L6 11L11 3.5"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-0 group-has-[:checked]:opacity-100"
            />
            <path
              d="M3 7H11"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-0 group-has-[:indeterminate]:opacity-100"
            />
          </svg>
        </div>
      </div>
      <div className="text-sm/6">
        <label htmlFor={id} className="font-medium text-gray-900">
          {label}
        </label>
      </div>
    </div>
  )
}

export default Checkbox
