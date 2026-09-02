import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { get } from 'lodash'
import { Controller, useFormContext, type FieldError } from 'react-hook-form'

export interface SelectFieldProps {
    name: string,
    label: string
    options: {
        label: string
        value: string
    }[]
}

const SelectField = ({ name, label, options = [] }: SelectFieldProps) => {
    const { control } = useFormContext()
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, formState: { errors } }) => {
                const fieldError = get(errors, name) as FieldError | undefined;
                return (
                    <FormControl fullWidth error={!!fieldError}>
                        <InputLabel id={`${name}-label`}>
                            {label}
                        </InputLabel>
                        <Select labelId={`${name}-label`} {...field} label={label}>
                            {
                                options.map((item) => (
                                    <MenuItem key={item.value} value={item.value}>
                                        {item.label}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                        <FormHelperText>
                            {fieldError?.message}
                        </FormHelperText>
                    </FormControl>
                )
            }}
        />
    )
}

export default SelectField;