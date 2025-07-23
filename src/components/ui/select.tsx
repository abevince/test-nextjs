import { ChevronDownIcon } from 'lucide-react'

const Select = ({
  value,
  label,
  options,
  onChange,
}: {
  label?: string
  options: {
    label: string
    value: string
  }[]
  value: string
  onChange: (value: string) => void
}) => {
  return (
    <div>
      {label && (
        <label
          htmlFor="location"
          className="block text-sm/6 font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      <div className="mt-1 grid grid-cols-1">
        <select
          id="location"
          name="location"
          defaultValue={value}
          onChange={(e) => onChange(e.target.value)}
          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900  outline-1 -outline-offset-1 outline-gray-300 focus:outline  focus:-outline-offset-2 focus:outline-orange-600 sm:text-sm/6"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon
          aria-hidden="true"
          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
        />
      </div>
    </div>
  )
}

export default Select
