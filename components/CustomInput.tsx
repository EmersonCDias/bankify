import React from 'react'
import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Control, FieldPath } from 'react-hook-form'
import { z } from 'zod'
import { authFormSchema } from '@/lib/utils'

const formSchema = authFormSchema('sign-up')

type CustomInputProps = {
  id: string
  control: Control<z.infer<typeof formSchema>>
  name: FieldPath<z.infer<typeof formSchema>>
  label: string
  placeholder: string
  type?: React.HTMLInputTypeAttribute
}

const CustomInput = ({
  id,
  control,
  name,
  label,
  placeholder,
  type = 'text',
}: CustomInputProps) => {
  return (
    <div>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <>
            <div className="form-item">
              <FormLabel>{label}</FormLabel>

              <div className="flex w-full flex-col">
                <FormControl>
                  <Input
                    id={id}
                    placeholder={placeholder}
                    className="input-class"
                    type={type}
                    {...field}
                  />
                </FormControl>
              </div>

              <FormMessage className="form-message mt-2" />
            </div>
          </>
        )}
      />
    </div>
  )
}

export default CustomInput
