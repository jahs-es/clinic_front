import React from 'react'
import { Box, Container, makeStyles } from '@material-ui/core'
import Page from 'src/theme/Page'
import { useSelector } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import Alert from '@material-ui/lab/Alert'
import PatientList from './PatientList'
import Toolbar from './Toolbar'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}))

const PatientListView = () => {
  const classes = useStyles()
  const { patients, isLoading, error } = useSelector((state) => state.PatientsState)

  return (
    <Page
      className={classes.root}
      title="Pacientes"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          { isLoading ? <CircularProgress /> : <PatientList patients={patients} />}
        </Box>
        { error
        && <Alert severity="error">Error en la carga ...</Alert>}
      </Container>
    </Page>
  )
}

export default PatientListView
