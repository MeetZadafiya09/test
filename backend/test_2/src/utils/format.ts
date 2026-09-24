import { ERRORS_MESSAGE } from "../lib/errors.js";

const formatFieldName = (field: string): string => {
    if (!field || typeof field !== 'string') return field;
    return field
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (char, index) =>
            index === 0 ? char.toUpperCase() : char.toLowerCase()
        );
};


const formatNameSlug = (name: string): string => {
    return name.toLowerCase().replace(/\s+/g, '-');
};

const isCustomErrorMessage = (message: string): boolean => {
    return typeof message === 'string' && message.startsWith('_ERR_');
};

const getErrorMessage = (message: string): string => {
    return ERRORS_MESSAGE[message] || '';
};

const getLengthValidationMessage = (fieldName: string, validatorArgs: number[]) => {
    const [min, max] = validatorArgs;

    return `${formatFieldName(fieldName)} must be between ${min} and ${max} characters`;
};

export { formatFieldName, formatNameSlug, isCustomErrorMessage, getErrorMessage, getLengthValidationMessage };