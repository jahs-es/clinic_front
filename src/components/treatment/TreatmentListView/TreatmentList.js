import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Box, Card, makeStyles } from '@material-ui/core'
import EnhancedTableHead from '../../common/table/ExtendedTable'
import TreatmentDetail from '../TreatmentDetail'

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}))

const TreatmentList = ({ className, treatments, ...rest }) => {
  const classes = useStyles()

  const cells = [
    { id: 'name', type: 'string', disablePadding: true, label: 'Nombre' },
    { id: 'active', type: 'boolean', disablePadding: true, label: 'Activo' },
    { id: 'createdAt', type: 'date', disablePadding: true, label: 'Creado' },
  ]

  console.log('Render Results treatment->')

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <EnhancedTableHead cells={cells} rows={treatments} formToShow={<TreatmentDetail />} />
        </Box>
      </PerfectScrollbar>
    </Card>
  )
}

TreatmentList.propTypes = {
  className: PropTypes.string,
  treatments: PropTypes.array.isRequired
}

export default TreatmentList
