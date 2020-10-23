import useTheme from '@material-ui/core/styles/useTheme'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import React, { cloneElement, memo, useState } from 'react'
import Tooltip from '@material-ui/core/Tooltip'

// eslint-disable-next-line react/prop-types
const DialogForm = ({ row, icon, toolTipTitle, formToShow }) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [open, setOpen] = useState(false)

  const closeDialog = () => {
    setOpen(false)
  }

  const dialogForm = cloneElement(formToShow, {
    entity: row,
    closeDialog,
  })

  return (
    <div>
      <Tooltip title={toolTipTitle}>
        <IconButton
          variant="outlined"
          color="inherit"
          onClick={(e) => {
            e.stopPropagation()
            setOpen(true)
          }}
        >
          {icon}
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
        fullWidth
        fullScreen={fullScreen}
        onExiting={() => {
        }}
      >
        <DialogContent>
          {dialogForm}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default memo(DialogForm)
