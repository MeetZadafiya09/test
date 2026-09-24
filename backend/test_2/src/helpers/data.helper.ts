import _ from "lodash";

export const dataFilter = <T extends Record<string, any>>(
    obj: T,
    keys: (keyof T)[],
    allowEmpty = true
): Partial<T> => {
    if (allowEmpty) {
        return _.pick(obj, keys);
    } else {
        return _.pickBy(_.pick(obj, keys), (value) => !!value) as Partial<T>;
    }
};
