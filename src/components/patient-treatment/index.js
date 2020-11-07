import React, { memo, useEffect } from 'react'
import { Box, Container, Grid, makeStyles } from '@material-ui/core'
import Page from 'src/theme/Page'
import SearchCombo from '../common/SearchCombo'
import PatientCard from '../patient/PatientCard'
import { useDispatch, useSelector } from 'react-redux'
import PatientTreatmentList from './PatientTreatmentList'
import searchPatients from '../../services/patient/search-patient'
import { setPatient } from '../../store/modules/patient/actions/patientAction'
import { fetchTreatments } from '../../store/modules/treatment/actions/treatmentAction'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}))

const PatientTreatmentView = () => {
  const classes = useStyles()
  const { patientTreatments } = useSelector((state) => state.PatientsState)
  const dispatch = useDispatch()

  // eslint-disable-next-line
  useEffect(() => {
    dispatch(fetchTreatments())
  },
  // eslint-disable-next-line
  [])

  const emptyPatient = {
    id: '',
    name: '',
    address: '',
    email: '',
    phone: ''
  }

  return (
    <Page
      className={classes.root}
      title="Index"
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          {/* eslint-disable-next-line max-len */}
          <SearchCombo searchFunction={searchPatients} searchAction={setPatient} emptyElement={emptyPatient} />
        </Box>
        <Grid
          container
          spacing={1}
        >
          <Grid
            item
            xs
            sm={3}
          >
            <Box mt={3}>
              <PatientCard />
            </Box>
          </Grid>
          <Grid
            item
            xs
            sm={9}
          >
            <Box mt={3}>
              <PatientTreatmentList patientTreatments={patientTreatments} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Page>
  )
}

export default memo(PatientTreatmentView)
