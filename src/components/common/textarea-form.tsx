import { TextareaHTMLAttributes } from 'react'
import {
  Control,
  Controller,
  FieldValues,
  Path,
  useFormState,
} from 'react-hook-form'
import Textarea from '../ui/textarea'

type TextInputFormProps<T extends FieldValues> = {
  label: string
  id: string
  name: Path<T>
  placeholder: string
  control: Control<T>
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'name'>

const TextareaForm = <T extends FieldValues>({
  label,
  id,
  name,
  placeholder,
  control,
  ...props
}: TextInputFormProps<T>) => {
  const { errors } = useFormState({ control, name })
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div>
          <Textarea
            label={label}
            id={id}
            name={field.name}
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

export default TextareaForm
