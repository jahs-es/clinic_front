import React, { cloneElement, memo, useState } from 'react'
import PropTypes from 'prop-types'
import { Avatar, Box, Checkbox, makeStyles, TableCell, TableRow } from '@material-ui/core'
import moment from 'moment'
import EditIcon from '@material-ui/icons/Edit'
import getInitials from '../../../utils/getInitials'
import DialogForm from '../DialogForm'

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}))

const getBooleanValue = (value) => {
  return value ? 'Si' : 'No'
}

const RowItem = ({ row, cells, formToShow }) => {
  const [open, setOpen] = useState(false)
  const classes = useStyles()

  const dialogForm = cloneElement(formToShow, {
    entity: row,
    closeDialog: () => {},
  })

  console.log('Render Item -> ', row)

  return (
    <TableRow
      hover
      key={row.id}
      role="checkbox"
      tabIndex={-1}
      // selected={selectedCustomerIds.indexOf(row.id) !== -1}
    >
      <TableCell padding="checkbox">
        <Checkbox
          // checked={selectedCustomerIds.indexOf(row.id) !== -1}
          // onChange={(event) => handleSelectOne(event, row.id)}
          value="true"
        />
      </TableCell>
      <TableCell>
        <Box
          alignItems="center"
          display="flex"
        >
          <Avatar
            className={classes.avatar}
            src={row.avatar_path}
          >
            {getInitials(row.name)}
          </Avatar>
        </Box>
      </TableCell>
      {cells.map((definition) => (
        <TableCell>
          {(() => {
            switch (definition.type) {
              case 'date':
                return moment(row[definition.id]).format('DD/MM/YYYY')
              case 'boolean':
                return getBooleanValue(row[definition.id])
              default:
                return row[definition.id]
            }
          })()}
        </TableCell>
      ))}
      <TableCell>
        <DialogForm
          open={open}
          setOpen={setOpen}
          row={row}
          icon={<EditIcon />}
          formToShow={dialogForm}
        />
      </TableCell>
    </TableRow>
  )
}

RowItem.propTypes = {
  row: PropTypes.object.isRequired,
  cells: PropTypes.array.isRequired,
  formToShow: PropTypes.object.isRequired
}

export default memo(RowItem)
