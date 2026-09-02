import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { userSchema, type UserSchemaType } from "../lib/schema"
import FormProvider from "../components/form/FormProvider"
import { Button, Grid, Stack } from "@mui/material"
import TextField from "../components/form/TextField"
import SelectField from "../components/form/SelectField"
import RadioField from "../components/form/RadioField"
import CheckboxField from "../components/form/CheckboxField"
import useUserStore from "../store/users.store"
import { Link, useNavigate, useParams } from "react-router"
import { useEffect } from "react"

const cityOptions: {
  value: string,
  label: string
}[] = [
    {
      label: 'Surat',
      value: 'surat'
    },
    {
      label: 'Ahemdabad',
      value: 'ahemdabad'
    },
    {
      label: 'Rajkot',
      value: 'rajkot'
    }
  ]

const genderoptions: {
  value: string,
  label: string
}[] = [
    {
      label: 'Male',
      value: 'male'
    },
    {
      label: 'Female',
      value: 'female'
    }
  ]

const hobbiesOptions: {
  value: string,
  label: string
}[] = [
    {
      label: 'Sports',
      value: 'sports'
    },
    {
      label: 'Reading',
      value: 'reading'
    },
    {
      label: 'Movies',
      value: 'movies'
    }
  ]

const AddEditUsers = () => {
  const { addUser, users, updateUser } = useUserStore()
  const { id } = useParams()
  const navigate = useNavigate()
  const defaultValues = {
    name: '',
    email: '',
    age: '',
    gender: '',
    city: '',
    hobbies: []
  }
  const methods = useForm<UserSchemaType>({
    defaultValues,
    resolver: yupResolver(userSchema)
  })
  const { handleSubmit, reset } = methods;
  const onSubmit = (values: UserSchemaType) => {
    if (id) {
      updateUser(id, {
        id,
        ...values
      })
    } else {
      addUser({
        id: String(Date.now()),
        ...values
      })
    }
    reset(defaultValues)
    navigate('/users')

  }

  useEffect(() => {
    if (id) {
      const exitingUser = users.find((item) => item.id == id)
      reset({
        name: exitingUser?.name,
        email: exitingUser?.email,
        age: exitingUser?.age,
        gender: exitingUser?.gender,
        city: exitingUser?.city,
        hobbies: exitingUser?.hobbies
      })
    }
  }, [id])
  return (
    <div>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="row">
          <Button
            variant="contained"
            component={Link}
            to="/users"
          >
            Go to Home
          </Button>
        </Stack>
        <Stack sx={{
          marginTop: 2
        }} spacing={2}>
          <Grid container spacing={4}>
            <Grid size={6}>
              <TextField name="name" label='Name' />
            </Grid>
            <Grid size={6}>
              <TextField name="email" label='Email' />
            </Grid>
            <Grid size={6}>
              <TextField number name="age" label='Age' />
            </Grid>
            <Grid size={6}>
              <SelectField name="city" label="City" options={cityOptions} />
            </Grid>
            <Grid size={6}>
              <RadioField
                name="gender"
                label="Gender"
                options={genderoptions}
              />
            </Grid>
            <Grid size={6}>
              <CheckboxField
                name="hobbies"
                label="Hobbies"
                options={hobbiesOptions}
              />
            </Grid>
          </Grid>
          <Stack direction="row">
            <Button variant="contained" type="submit">
              Add
            </Button>
          </Stack>
        </Stack>
      </FormProvider>
    </div>
  )
}

export default AddEditUsers;