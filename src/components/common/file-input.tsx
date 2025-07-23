import { Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

// Types for props
export type FileInputProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  label?: string
  helperText?: string
  accept?: string
  multiple?: boolean
  disabled?: boolean
  className?: string
  description?: string
}

const FileInput = <T extends FieldValues>({
  name,
  control,
  label = 'Add Image',
  helperText = 'PNG, JPG, GIF up to 10MB',
  accept = 'image/*',
  multiple = false,
  disabled = false,
  className = '',
  description = '',
}: FileInputProps<T>) => {
  const [preview, setPreview] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (file: File | File[] | null) => void,
  ) => {
    const files = e.target.files
    if (!files || files.length === 0) {
      setPreview(null)
      onChange(null)
      return
    }
    if (multiple) {
      onChange(Array.from(files))
      setPreview(null)
    } else {
      const file = files[0]
      if (file && file.type.startsWith('image/')) {
        setPreview(URL.createObjectURL(file))
      } else {
        setPreview(null)
      }
      onChange(file)
    }
  }

  return (
    <Controller
      name={name as Path<T>}
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <label
            className="block text-sm/6 font-medium text-gray-900 mb-2"
            id="cover-photo-label"
          >
            {label}
          </label>
          <div
            className={`mt-2 flex justify-center items-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 cursor-pointer outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 relative aspect-video ${className}`}
            tabIndex={0}
            aria-label={label}
            role="button"
            onClick={() => {
              if (!disabled) inputRef.current?.click()
            }}
            onKeyDown={(e) => {
              if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault()
                inputRef.current?.click()
              }
            }}
          >
            <div className="text-center w-full">
              <ImageIcon
                aria-hidden="true"
                className="mx-auto size-12 text-gray-300"
              />
              <div className="mt-4 flex text-sm/6 text-gray-600 justify-center items-center">
                <span className="relative font-semibold text-blue-600 hover:text-blue-500 bg-white rounded-md py-1">
                  Upload a file
                </span>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs/5 text-gray-600">{helperText}</p>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                ref={inputRef}
                accept={accept}
                multiple={multiple}
                disabled={disabled}
                aria-label={label}
                tabIndex={-1}
                onChange={(e) => handleFileChange(e, field.onChange)}
              />
            </div>
            {preview && (
              <div className="absolute top-0 left-0 w-full h-full">
                <Image
                  src={preview}
                  alt="Preview"
                  fill={true}
                  className="object-cover"
                />
              </div>
            )}
          </div>
          {description && (
            <p className="text-xs text-gray-500 mt-2">{description}</p>
          )}
          {fieldState.error && (
            <p className="text-red-500 text-sm">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  )
}

export default FileInput
