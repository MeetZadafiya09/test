import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel } from "@mui/material"
import { get } from "lodash"
import { Controller, useFormContext, type FieldError } from "react-hook-form"

export interface CheckboxFieldProps {
    name: string,
    label: string
    options: {
        label: string
        value: string
    }[]
}

const CheckboxField = ({ name, label, options }: CheckboxFieldProps) => {
    const { control } = useFormContext()
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, formState: { errors } }) => {
                const fieldError = get(errors, name) as FieldError | undefined
                return (
                    <FormControl fullWidth error={!!fieldError}>
                        <FormLabel id={`${name}-label`}>
                            {label}
                        </FormLabel>
                        <FormGroup row >
                            {
                                options.map((item) => (
                                    <FormControlLabel key={item.value} control={<Checkbox checked={field.value.includes(item.value)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                field.onChange([
                                                    ...field.value,
                                                    item.value
                                                ])
                                            } else {
                                                field.onChange(
                                                    field.value.filter((value: string) => item.value != value)
                                                )
                                            }
                                        }}
                                    />} label={item.label} />
                                ))
                            }
                        </FormGroup>
                        <FormHelperText>
                            {fieldError?.message}
                        </FormHelperText>
                    </FormControl>
                )
            }}
        />
    )
}

export default CheckboxField;