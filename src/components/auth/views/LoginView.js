import React from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { Box, Button, Container, Link, makeStyles, TextField, Typography } from '@material-ui/core'
import Page from 'src/theme/Page'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '@material-ui/lab/Alert';
import { SignIn } from '../../../store/modules/auth/actions/authAction'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}))

const LoginView = () => {
  const classes = useStyles()
  const navigate = useNavigate()

  const currentState = useSelector((state) => state.Auth)
  const dispatch = useDispatch()

  const userLogin = (credentials) => dispatch(SignIn(credentials))

  if (currentState.isAuthenticated) {
    navigate('/app/dashboard', { replace: true })
  }

  return (
    <Page
      className={classes.root}
      title="Acceso"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: 'jahs.es@gmail.com',
              password: 'admin'
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Debe ser un email válido').max(255).required('Email es requerido'),
              password: Yup.string().max(255).required('Contraseña es requerida')
            })}
            onSubmit={(values) => {
              userLogin({
                email: values.email,
                password: values.password
              })
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Acceso de usuario
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Contraseña"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting && currentState.isLoading}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Acceder
                  </Button>
                </Box>

                { currentState.loginError
                  && <Alert severity="error">{currentState.loginError}</Alert>}

                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  No tienes cuenta?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="h6"
                  >
                    Registrate
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  )
}

export default LoginView
