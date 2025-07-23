import { forwardRef, TextareaHTMLAttributes } from 'react'

type TextInputProps = {
  label: string
} & TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = forwardRef<HTMLTextAreaElement, TextInputProps>(
  ({ label, id, name, placeholder, ...props }, ref) => {
    return (
      <div>
        <label
          htmlFor={id}
          className="block text-sm/6 font-medium text-gray-900"
        >
          {label}
        </label>
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          ref={ref}
          {...props}
          rows={4}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900  outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400  focus:outline-2 focus:-outline-offset-2 focus:outline-orange-400 sm:text-sm/6 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:outline-gray-200"
        />
      </div>
    )
  },
)

export default Textarea
