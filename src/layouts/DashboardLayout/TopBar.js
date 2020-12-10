import React from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { AppBar, Box, IconButton, makeStyles, Toolbar } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import InputIcon from '@material-ui/icons/Input'
import Logo from 'src/theme/Logo'
import { useDispatch } from 'react-redux'
import { signOut } from '../../store/modules/auth/actions/authAction'
import { resetPatient } from '../../store/modules/patient/actions/patientAction'

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  }
}))

const TopBar = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {
  const classes = useStyles()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logoutUser = () => {
    dispatch(signOut())
    dispatch(resetPatient())
    navigate('/', { replace: true })
  }

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box flexGrow={1} />
        <IconButton
          color="inherit"
          onClick={onMobileNavOpen}
        >
          <MenuIcon />
        </IconButton>
        <IconButton color="inherit" />
        <IconButton color="inherit" onClick={logoutUser}>
          <InputIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
}

export default TopBar
