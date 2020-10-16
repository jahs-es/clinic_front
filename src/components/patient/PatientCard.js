import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { useSelector } from 'react-redux';
import { AddCircle, Home, Phone } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import { Divider } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import getInitials from '../../utils/getInitials';

const useStyles = makeStyles(() => ({
  avatar: {
    backgroundColor: grey[300],
  },
}))

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
        <Tooltip title="Editar">
          <IconButton aria-label="add to favorites">
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Añadir cita">
          <IconButton aria-label="add to favorites">
            <AddCircle />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  )
}

export default PatientCard
