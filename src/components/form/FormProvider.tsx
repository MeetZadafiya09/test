import {
    FormProvider as Form,
    type FieldValues,
    type UseFormReturn,
} from "react-hook-form";
import React, { type SubmitEventHandler } from "react";

export interface FormProviderProps<T extends FieldValues> {
    methods: UseFormReturn<T>;
    className?: string
    children: React.ReactNode;
    onSubmit: SubmitEventHandler<HTMLFormElement>;
    [key: string]: unknown
}

const FormProvider = <T extends FieldValues>({
    methods,
    className = "",
    onSubmit,
    children,
    ...others
}: FormProviderProps<T>) => {
    return (
        <Form {...methods}>
            <form className={className} noValidate onSubmit={onSubmit} {...others}>
                {children}
            </form>
        </Form>
    );
};

export default FormProvider;