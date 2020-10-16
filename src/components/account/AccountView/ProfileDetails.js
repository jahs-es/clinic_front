import React, { useState } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core'

const roles = [
  {
    value: 'admin',
    label: 'Admin'
  },
  {
    value: 'paciente',
    label: 'Paciente'
  },
  {
    value: 'sanitario',
    label: 'Sanitario'
  }
]

const useStyles = makeStyles(() => ({
  root: {}
}))

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles()
  const [values, setValues] = useState({
    name: '',
    email: '',
    rol: '',
    password: '',
    password2: '',
  })

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    })
  }

  const differentPass = () => {
    return values.password !== values.password2
  }

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="Edita la información y da a grabar"
          title="Ficha del usuario"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Name"
                name="name"
                onChange={handleChange}
                required
                value={values.name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Selecciona el rol"
                name="rol"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.rol}
                variant="outlined"
              >
                {roles.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Indica la contraseña"
                label="Contraseña"
                name="password"
                type="password"
                onChange={handleChange}
                required
                error={differentPass()}
                value={values.password}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Repite la contraseña"
                label="Contraseña"
                name="password2"
                type="password"
                onChange={handleChange}
                required
                value={values.password2}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
          >
            Grabar
          </Button>
        </Box>
      </Card>
    </form>
  )
}

ProfileDetails.propTypes = {
  className: PropTypes.string
}

export default ProfileDetails
