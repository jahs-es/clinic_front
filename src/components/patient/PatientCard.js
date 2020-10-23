import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { AddCircle, ArtTrack, Home, Phone } from '@material-ui/icons'
import Grid from '@material-ui/core/Grid'
import EditIcon from '@material-ui/icons/Edit'
import { Divider } from '@material-ui/core'
import grey from '@material-ui/core/colors/grey'
import { useSelector } from 'react-redux'
import getInitials from '../../utils/getInitials'
import DialogForm from '../common/DialogForm'
import PatientDetail from './PatientDetail'
import PatientTreatmentDetail from '../patient-treatment/PatientTreatmentDetail'

const useStyles = makeStyles(() => ({
  avatar: {
    backgroundColor: grey[300],
  },
}))

const emptyPatient = {
  name: '',
  address: '',
  email: '',
  phone: ''
}

const emptyPatientTreatment = {
  patient_id: null,
  treatment_id: null,
  detail: '',
  active: true
}

const PatientCard = () => {
  const classes = useStyles()
  const { patient } = useSelector((state) => state.PatientsState)

  return (
    <Card>
      <CardHeader
        avatar={(
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            src={patient.avatar_path}
          >
            {getInitials(patient.name)}
          </Avatar>
        )}
        title={patient.name}
        subheader={patient.email}
      />
      <Divider />
      <CardContent>
        <Grid container direction="row" justify={'flex-start'} alignItems={'center'}>
          <Grid item>
            <IconButton disabled>
              <Home />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="textSecondary" component="p">
              {patient.address}
            </Typography>
          </Grid>
        </Grid>
        <Grid container direction="row" justify={'flex-start'} alignItems={'center'}>
          <Grid item>
            <IconButton disabled>
              <Phone />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="textSecondary" component="p">
              {patient.phone}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardActions disableSpacing>
        <DialogForm
          row={emptyPatient}
          icon={<AddCircle />}
          formToShow={<PatientDetail />}
          toolTipTitle="Crear paciente"
        />
        {patient.id !== undefined && patient.id !== ''
        && (
        <>
          <DialogForm
            row={patient}
            icon={<EditIcon />}
            formToShow={<PatientDetail />}
            toolTipTitle="Editar paciente"
          />
          <DialogForm
            row={emptyPatientTreatment}
            icon={<ArtTrack />}
            formToShow={<PatientTreatmentDetail />}
            toolTipTitle="Crear tratamiento a paciente"
          />
        </>
        )}
      </CardActions>
    </Card>
  )
}

export default PatientCard
