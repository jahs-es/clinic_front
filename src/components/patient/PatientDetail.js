import React from 'react'
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { Formik } from 'formik'
import * as Yup from 'yup'
import PropTypes from 'prop-types'
import { createPatient, updatePatient } from '../../store/modules/patient/actions/patientAction'

const PatientDetail = ({ entity, closeDialog }) => {
  const dispatch = useDispatch()
  const { isSaving } = useSelector((state) => state.PatientsState)

  const onUpdateSuccess = () => {
  }

  const handleSave = (e) => {
    if (e.id === undefined) {
      dispatch(createPatient(e))
    } else {
      dispatch(updatePatient(e, onUpdateSuccess))
    }
    closeDialog()
  }

  const handleCancel = () => {
    closeDialog()
  }

  return (
    <Formik
      enableReinitialize
      initialValues={{
        id: entity.id,
        name: entity.name,
        address: entity.address,
        email: entity.email,
        phone: entity.phone
      }}

      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        name: Yup.string().max(255).required('Name is required'),
        phone: Yup.string().max(255).required('Phone is required')
      })}

      onSubmit={(values) => {
        handleSave(values)
      }}
    >
      {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          touched,
          values
        }) => (
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader
              subheader="Valores del paciente"
              title="Paciente"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    fullWidth
                    helperText={touched.name && errors.name}
                    label="Name"
                    margin="normal"
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.name || ''}
                    variant="outlined"
                    autoFocus
                  />
                </Grid>
                <Grid item md={12} xs={12}>

                  <TextField
                    error={Boolean(touched.address && errors.address)}
                    fullWidth
                    helperText={touched.address && errors.address}
                    label="Address"
                    margin="normal"
                    name="address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="address"
                    value={values.address || ''}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email Address"
                    margin="normal"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.email || ''}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>

                  <TextField
                    error={Boolean(touched.phone && errors.phone)}
                    fullWidth
                    helperText={touched.phone && errors.phone}
                    label="Phone"
                    margin="normal"
                    name="phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.phone || ''}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box justifyContent="space-between" display="flex" p={2}>
              <Button
                color="primary"
                disabled={isSaving}
                variant="contained"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                disabled={isSaving}
                type="submit"
                variant="contained"
              >
                Save
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  )
}

PatientDetail.propTypes = {
  entity: PropTypes.object.isRequired,
  closeDialog: PropTypes.func.isRequired
}

export default PatientDetail
