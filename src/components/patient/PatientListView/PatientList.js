import React from 'react'
import PropTypes from 'prop-types'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Box } from '@material-ui/core'
import EnhancedTable from '../../common/table/ExtendedTable'
import PatientDetail from '../PatientDetail'

const PatientList = ({ patients }) => {
  const cells = [
    { id: 'name', type: 'string', disablePadding: true, label: 'Nombre' },
    { id: 'address', type: 'string', disablePadding: true, label: 'Dirección' },
    { id: 'email', type: 'string', disablePadding: true, label: 'Email' },
    { id: 'phone', type: 'string', disablePadding: true, label: 'Teléfono' },
    { id: 'createdAt', type: 'date', disablePadding: true, label: 'Creado' },
  ]

  console.log('Render PatientList', patients)

  return (
    <PerfectScrollbar>
      <Box minWidth={1050}>
        <EnhancedTable cells={cells} rows={patients} formToShow={<PatientDetail />} />
      </Box>
    </PerfectScrollbar>
  )
}

PatientList.propTypes = {
  patients: PropTypes.array.isRequired
}

export default PatientList
