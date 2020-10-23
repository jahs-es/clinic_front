import React from 'react'
import PropTypes from 'prop-types'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Box } from '@material-ui/core'
import EnhancedTable from '../../common/table/ExtendedTable'
import TreatmentDetail from '../TreatmentDetail'

const TreatmentList = ({ treatments }) => {
  const cells = [
    { id: 'name', type: 'string', disablePadding: true, label: 'Nombre' },
    { id: 'active', type: 'boolean', disablePadding: true, label: 'Activo' },
    { id: 'createdAt', type: 'date', disablePadding: true, label: 'Creado' },
  ]

  console.log('Render TreatmentList', treatments)

  return (
    <PerfectScrollbar>
      <Box minWidth={1050}>
        <EnhancedTable cells={cells} rows={treatments} formToShow={<TreatmentDetail />} />
      </Box>
    </PerfectScrollbar>
  )
}

TreatmentList.propTypes = {
  treatments: PropTypes.array.isRequired
}

export default TreatmentList
