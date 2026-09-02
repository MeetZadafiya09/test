import * as yup from 'yup'

const userSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().required('Email is required').email('Email is not valid'),
    age: yup.string().required('Age is required'),
    city: yup.string().required('Please select city'),
    gender : yup.string().required('Please select gender'),
    hobbies : yup.array().of(yup.string().required('Hobby is required')).required('Hobby is required').min(1,'Please select at least on hobby')
})

export { userSchema }

export type UserSchemaType = yup.InferType<typeof userSchema>