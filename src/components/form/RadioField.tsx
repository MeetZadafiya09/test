import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from "@mui/material"
import { get } from "lodash"
import { Controller, useFormContext, type FieldError } from "react-hook-form"

export interface RadioFieldProps {
    name: string,
    label: string
    options: {
        label: string
        value: string
    }[]
}

const RadioField = ({ name, label, options }: RadioFieldProps) => {
    const { control } = useFormContext()
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, formState: { errors } }) => {
                const fieldError = get(errors, name) as FieldError | undefined;
                return (
                    <FormControl fullWidth error={!!fieldError}>
                        <FormLabel>{label}</FormLabel>
                        <RadioGroup {...field} row>
                            {
                                options.map((item) => (
                                    <FormControlLabel
                                        key={item.value}
                                        value={item.value}
                                        label={item.label}
                                        control={<Radio />}
                                    />
                                ))
                            }
                        </RadioGroup>
                        <FormHelperText>
                            {fieldError?.message}
                        </FormHelperText>
                    </FormControl>
                )
            }}

        />
    )
}

export default RadioField