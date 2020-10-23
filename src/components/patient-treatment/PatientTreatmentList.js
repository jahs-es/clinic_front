import React from 'react'
import PropTypes from 'prop-types'
import EnhancedTable from '../common/table/ExtendedTable'
import PatientTreatmentDetail from './PatientTreatmentDetail'

const PatientTreatmentList = ({ patientTreatments }) => {
  const cells = [
    { id: 'appointment', type: 'date', disablePadding: true, label: 'Fecha' },
    { id: 'treatment', type: 'string', disablePadding: true, label: 'Tratamiento' },
    { id: 'detail', type: 'string', disablePadding: true, label: 'Detalle' }
  ]

  return (
    <EnhancedTable cells={cells} rows={patientTreatments} formToShow={<PatientTreatmentDetail />} />
  )
}

PatientTreatmentList.propTypes = {
  patientTreatments: PropTypes.array.isRequired
}

export default PatientTreatmentList
