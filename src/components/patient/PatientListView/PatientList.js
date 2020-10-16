import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Box, Card, makeStyles } from '@material-ui/core'
import EnhancedTableHead from '../../common/table/ExtendedTable'
import PatientDetail from '../PatientDetail'

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}))

const PatientList = ({ className, patients, ...rest }) => {
  const classes = useStyles()

  const cells = [
    { id: 'name', type: 'string', disablePadding: true, label: 'Nombre' },
    { id: 'address', type: 'string', disablePadding: true, label: 'Dirección' },
    { id: 'email', type: 'string', disablePadding: true, label: 'Email' },
    { id: 'phone', type: 'string', disablePadding: true, label: 'Teléfono' },
    { id: 'createdAt', type: 'date', disablePadding: true, label: 'Creado' },
  ]

  console.log('Render Results patients ->')

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <EnhancedTableHead cells={cells} rows={patients} formToShow={<PatientDetail />} />
        </Box>
      </PerfectScrollbar>
    </Card>
  )
}

PatientList.propTypes = {
  className: PropTypes.string,
  patients: PropTypes.array.isRequired
}

export default PatientList
