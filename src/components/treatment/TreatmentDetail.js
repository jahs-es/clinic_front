import React from 'react'
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { Formik } from 'formik'
import * as Yup from 'yup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { createTreatment, updateTreatment } from '../../store/modules/treatment/actions/treatmentAction'

const TreatmentDetail = ({ entity, closeDialog }) => {
  const dispatch = useDispatch()
  const { isLoading } = useSelector((state) => state.TreatmentsState)

  const handleSave = (e) => {
    if (e.id === undefined) {
      dispatch(createTreatment(e))
    } else {
      dispatch(updateTreatment(e))
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
        active: entity.active
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().max(255).required('Name is required')
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
        values,
        setFieldValue
      }) => (
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader
              subheader="Indique los datos y pulse Guardar:"
              title="Tratamiento"
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
                  <FormControlLabel
                    control={(
                      <Checkbox
                        name="active"
                        checked={values.active}
                        onChange={() => setFieldValue('active', !values.active)}
                      />
                    )}
                    label="Activo"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box justifyContent="space-between" display="flex" p={2}>
              <Button
                color="primary"
                disabled={isLoading}
                variant="contained"
                onClick={handleCancel}
              >
                Cancelar
              </Button>
              <Button
                color="primary"
                disabled={isLoading}
                type="submit"
                variant="contained"
              >
                Guardar
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  )
}

export default TreatmentDetail
