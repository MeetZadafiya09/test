import { Box } from '@mui/material';
import MUITextField from '@mui/material/TextField';
import { get } from 'lodash';
import { Controller, useFormContext, type FieldError } from 'react-hook-form';

export interface TextFieldProps {
    name: string
    label: string
    number?: boolean
}

const TextField = ({ name, label, number = false, ...others }: TextFieldProps) => {
    const { control } = useFormContext()
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, formState: { errors } }) => {
                const fieldError = get(errors, name) as FieldError | undefined;
                return (
                    <Box>
                        <MUITextField
                            {...field}
                            label={label}
                            fullWidth
                            error={!!fieldError}
                            helperText={fieldError?.message}
                            {...(number ? {
                                inputMode:'numeric',
                                onChange:(e)=>{
                                    const value = e.target.value.replace(/\D/g,"")
                                    field.onChange(value)
                                }
                            } : {})}
                            {...others}
                        />
                    </Box>
                )
            }}
        />
    )
}

export default TextField;