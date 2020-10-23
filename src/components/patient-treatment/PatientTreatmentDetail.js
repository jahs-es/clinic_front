import React from 'react'
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { Formik } from 'formik'
import * as Yup from 'yup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import CustomSelect from '../common/CustomSelect'
import { createPatientTreatment, updatePatientTreatment } from '../../store/modules/patient/actions/patientAction'

const PatientTreatmentDetail = ({ entity, closeDialog }) => {
  const dispatch = useDispatch()

  const { isLoading, patient } = useSelector((state) => state.PatientsState)
  const { treatments } = useSelector((state) => state.TreatmentsState)

  // eslint-disable-next-line no-shadow
  const getOptions = (treatments) => treatments.map((t) => {
    return {
      value: t.id,
      label: t.name
    }
  })

  const getSelectedOption = (entity) => {
    return {
      value: entity.treatment_id,
      label: entity.treatment
    }
  }

  const handleSave = (e) => {
    e.patient_id = patient.id
    e.patient = patient.name

    if (e.id === undefined) {
      dispatch(createPatientTreatment(e))
    } else {
      dispatch(updatePatientTreatment(e))
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
        patient_id: entity.patient_id,
        treatment_id: getSelectedOption(entity),
        detail: entity.detail,
        active: entity.active
      }}
      validationSchema={Yup.object().shape({
        detail: Yup.string().max(255).required('Se requiere un detalle'),
        treatment_id: Yup.object().required('Se requiere un tratamiento').nullable()
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
          setFieldValue,
          setFieldTouched
        }) => (
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader
              subheader="Indique los datos y pulse Guardar:"
              title="Tratamiento de paciente"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                  <TextField
                    error={Boolean(touched.detail && errors.detail)}
                    fullWidth
                    helperText={touched.detail && errors.detail}
                    label="Detalle"
                    margin="normal"
                    name="detail"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.detail || ''}
                    variant="outlined"
                    autoFocus
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <CustomSelect
                    id="treatment_id"
                    value={values.treatment_id}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    title="Tratamiento:"
                    touched={touched.treatment_id}
                    errors={errors.treatment_id}
                    options={getOptions(treatments)}
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

export default PatientTreatmentDetail
