import { InputHTMLAttributes } from 'react'
import {
  Control,
  Controller,
  FieldValues,
  Path,
  useFormState,
} from 'react-hook-form'
import TextInput from '../ui/text-input'

type TextInputFormProps<T extends FieldValues> = {
  label: string
  id: string
  name: Path<T>
  type: string
  placeholder: string
  control: Control<T>
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'name'>

const TextInputForm = <T extends FieldValues>({
  label,
  id,
  name,
  type,
  placeholder,
  control,
  ...props
}: TextInputFormProps<T>) => {
  const { errors } = useFormState({ control, name })
  console.log(errors)
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div>
          <TextInput
            label={label}
            id={id}
            name={field.name}
            type={type}
            placeholder={placeholder}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            ref={field.ref}
            aria-invalid={!!errors}
            aria-describedby={errors ? `${id}-error` : undefined}
            {...props}
          />
          {errors?.[name]?.message ? (
            <span
              id={`${id}-error`}
              className="mt-1 block text-xs text-red-600"
            >
              {errors[name].message as string}
            </span>
          ) : null}
        </div>
      )}
    />
  )
}

export default TextInputForm
